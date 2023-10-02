import { arrifiied, creatStateNode, createTaskQueue, getTag } from "../Misc";

const taskQueue = createTaskQueue();

let subTask = null,
  pendingCommit = null;

const commitAllWork = (fiber) => {
  fiber.effects.forEach((item) => {
    if (item.effectTag === "placement") {
      let fiber = item;
      let parentFiber = item.parent;
      while (parentFiber.tag === "class_component" || parentFiber.tag === "function_component") {
        parentFiber = parentFiber.parent;
      }
      if (fiber.tag === "host_component") {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });

  // 备份旧的fiber节点对象
  // fiber
  console.log(222, fiber);
};

const getFirstTask = () => {
  const task = taskQueue.pop();

  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null,
  };
};

const reconcileChildren = (fiber, children) => {
  const arrifiiedChildren = arrifiied(children);

  let index = 0;
  let numberOfElements = arrifiiedChildren.length;
  let element = null,
    newFiber = null,
    prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiiedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: "placement",
      parent: fiber,
    };

    newFiber.stateNode = creatStateNode(newFiber);

    console.log(345, newFiber);
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;

    index++;
  }
};

const executeTask = (fiber) => {
  if (fiber.tag === "class_component") {
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === "function_component") {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling;
    }

    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
};

const workLoop = (deadline) => {
  if (!subTask) {
    subTask = getFirstTask();
  }
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};

const performTask = (deadline) => {
  workLoop(deadline);
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};

export const render = (element, dom) => {
  /**
   * 1, 向任务队列中添加任务
   * 2，指定在浏览器空闲时执行任务
   */

  taskQueue.push({
    dom,
    props: {
      children: element,
    },
  });

  requestIdleCallback(performTask);
};

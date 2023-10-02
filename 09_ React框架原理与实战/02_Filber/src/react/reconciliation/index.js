import { updateNodeElement } from "../DOM";
import { arrifiied, creatStateNode, createTaskQueue, getRoot, getTag } from "../Misc";

const taskQueue = createTaskQueue();

let subTask = null,
  pendingCommit = null;

const commitAllWork = (fiber) => {
  fiber.effects.forEach((item) => {
    if (item.tag === "class_component") {
      item.stateNode.__fiber = item;
    }

    // 删除节点
    if (item.effectTag === "delete") {
      item.parent.stateNode.removeChild(item.stateNode);
    }
    // 更新节点
    else if (item.effectTag === "update") {
      // 判读节点是否相同。 不同则创建新的节点
      if (item.type === item.alternate.type) {
        updateNodeElement(item.stateNode, item, item.alternate);
      } else {
        item.parent.stateNode.replaceChild(item.stateNode, item.alternate.stateNode);
      }
    }
    // 初始创建节点
    else if (item.effectTag === "placement") {
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
  fiber.stateNode.__rootFiberContainer = fiber;
  console.log(222, fiber);
};

const getFirstTask = () => {
  const task = taskQueue.pop();

  if (task.from === "class_component") {
    const root = getRoot(task.instace);
    task.instace.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: "host_root",
      effects: [],
      child: null,
      alternate: root,
    };
  }

  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer,
  };
};

const reconcileChildren = (fiber, children) => {
  const arrifiiedChildren = arrifiied(children);

  let index = 0;
  let numberOfElements = arrifiiedChildren.length;
  let element = null,
    newFiber = null,
    prevFiber = null,
    alternate = null;

  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements || alternate) {
    element = arrifiiedChildren[index];
    // 节点删除
    if (!element && alternate) {
      alternate.effectTag = "delete";
      fiber.effects.push(alternate);
    }
    // 节点更新
    else if (element && alternate) {
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update",
        parent: fiber,
        alternate,
      };

      // 判读更新的节点是否相同
      if (element.type === alternate.type) {
        newFiber.stateNode = alternate.stateNode;
      } else {
        newFiber.stateNode = creatStateNode(newFiber);
      }
    }
    // 初始渲染
    else if (element && !alternate) {
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement",
        parent: fiber,
      };

      newFiber.stateNode = creatStateNode(newFiber);
    }

    console.log(345, newFiber);
    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevFiber.sibling = newFiber;
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;

    index++;
  }
};

const executeTask = (fiber) => {
  if (fiber.tag === "class_component") {
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState,
      };
    }
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

export const scheduleUpdate = (instace, partialState) => {
  taskQueue.push({
    from: "class_component",
    instace,
    partialState,
  });

  requestIdleCallback(performTask);
};

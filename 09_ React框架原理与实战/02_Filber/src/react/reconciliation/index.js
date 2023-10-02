import { arrifiied, creatStateNode, createTaskQueue, getTag } from "../Misc";

const taskQueue = createTaskQueue();

let subTask = null,
  pendingCommit = null;

const commitAllWork = (filber) => {
  filber.effects.forEach(item => {
    if (item.effectTag === 'placement') {
      item.parent.stateNode.appendChild(item.stateNode)
    }
  })
  console.log(222, filber);

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

const reconcileChildren = (filber, children) => {
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
      parent: filber,
    };

    newFiber.stateNode = creatStateNode(newFiber);

    if (index === 0) {
      filber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;

    index++;
  }
};

const executeTask = (filber) => {
  reconcileChildren(filber, filber.props.children);

  if (filber.child) {
    return filber.child;
  }

  let currentExecutelyFiber = filber;

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

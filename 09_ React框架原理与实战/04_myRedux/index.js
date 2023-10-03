function createStore(reducer, initilaState, enhancer) {
  // 约束reducer参数类型
  if (typeof reducer !== "function") {
    throw new Error("reducer必须是函数");
  }

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("enhancer必须是函数");
    }
    return enhancer(createStore)(reducer, initilaState);
  }
  var currentState = initilaState;

  var currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("action必须是对象");
    }
    if (typeof action.type === "undefined") {
      throw new Error("action必须要有type属性");
    }
    currentState = reducer(currentState, action);

    for (let i = 0; i < currentListeners.length; i++) {
      let listener = currentListeners[i];

      listener();
    }
  }

  function subscribe(listener) {
    currentListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// 判断是否是对象
function isPlainObject(obj) {
  // 排查基础数据类型和null
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  // 区分数组和对象 原型对象对比的方式
  let proto = obj;
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, initialState) {
      const store = createStore(reducer, initialState);
      const middlewareApi = {
        getState: store.getState,
        dispatch: store.dispatch,
      };
      const chain = middlewares.map((middleware) => middleware(middlewareApi));
      let dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

function compose() {
  let fns = [...arguments];
  return function (dispatch) {
    for (let i = fns.length - 1; i >= 0; i--) {
      dispatch = fns[i](dispatch);
    }
    return dispatch;
  };
}

function bindActionCreators(actionCreators, dispatch) {
  let boundActionCreators = {};

  for (let key in actionCreators) {
    boundActionCreators[key] = function () {
      dispatch(actionCreators[key]());
    };
  }

  return boundActionCreators;
}

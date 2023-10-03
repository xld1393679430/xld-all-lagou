function createStore(reudcer, initilaState) {
  var currentState = initilaState;

  var currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reudcer(currentState, action);

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

import { createStore, Action } from 'redux';

interface State {
  value: number;
}

function counterReducer(state: State = { value: 0 }, action: Action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

export const storeRedux = createStore(counterReducer);

export const counterSelector = (state: State) => state.value;

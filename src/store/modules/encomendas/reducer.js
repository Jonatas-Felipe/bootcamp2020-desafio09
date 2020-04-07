import produce from 'immer';

const INITIAL_STATE = {
  encomenda: [],
};

export default function encomendas(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@orders/GET_DATA_SUCCESS': {
        draft.encomenda = action.encomenda;
        break;
      }

      default:
    }
  });
}

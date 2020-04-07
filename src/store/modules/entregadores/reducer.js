import produce from 'immer';

const INITIAL_STATE = {
  entregador: [],
};

export default function encomendas(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@couriers/GET_DATA_SUCCESS': {
        draft.entregador = action.entregador;
        break;
      }

      default:
    }
  });
}

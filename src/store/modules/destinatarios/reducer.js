import produce from 'immer';

const INITIAL_STATE = {
  destinatario: [],
};

export default function destinatarios(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipients/GET_DATA_SUCCESS': {
        draft.destinatario = action.destinatario;
        break;
      }

      default:
    }
  });
}

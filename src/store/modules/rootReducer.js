import { combineReducers } from 'redux';

import auth from './auth/reducer';
import encomendas from './encomendas/reducer';
import entregadores from './entregadores/reducer';
import destinatarios from './destinatarios/reducer';

export default combineReducers({
  auth,
  encomendas,
  entregadores,
  destinatarios,
});

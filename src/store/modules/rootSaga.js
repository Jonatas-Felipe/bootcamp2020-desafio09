import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import encomendas from './encomendas/sagas';
import entregadores from './entregadores/sagas';
import destinatarios from './destinatarios/sagas';

export default function* rootSaga() {
  return yield all([auth, encomendas, entregadores, destinatarios]);
}

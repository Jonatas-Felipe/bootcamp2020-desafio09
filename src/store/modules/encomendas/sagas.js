import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { getDataSuccess, ordersFailure } from './actions';

export function* registerOrders({ payload }) {
  try {
    yield call(api.post, '/entrega', payload);

    toast.success('Encomenda cadastrada com sucesso!');

    history.push('/entregas');
  } catch (err) {
    const { response } = err;

    const error =
      response.status === '500'
        ? 'Verifique sua conexão com a internet'
        : response.data.error;
    toast.error(error);
    yield put(ordersFailure());
  }
}

export function* getDataToUpdate({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/entrega/${id}`);
    yield put(getDataSuccess(response.data));

    history.push('/encomendas/editar');
  } catch (error) {
    toast.error('Erro ao puxar os dados da encomenda tente novamente');
    yield put(ordersFailure());
  }
}

export function* setDataToUpdate({ payload }) {
  if (!payload) return;
  const { encomenda } = payload.encomendas;
  yield put(getDataSuccess(encomenda));
}

export function* updateOrders({ payload }) {
  try {
    const { id, recipient_id, deliveryman_id, product } = payload;
    const data = {
      recipient_id,
      deliveryman_id,
      product,
    };

    yield call(api.put, `/entrega/${id}`, data);

    toast.success('Encomenda alterada com sucesso!');

    history.push('/entregas');
  } catch (error) {
    toast.error('Houve um erro ao alterar encomenda, verifique os dados.');
    yield put(ordersFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setDataToUpdate),
  takeLatest('@orders/REGISTER', registerOrders),
  takeLatest('@orders/GET_DATA_TO_UPDATE', getDataToUpdate),
  takeLatest('@orders/UPDATE_REQUEST', updateOrders),
]);

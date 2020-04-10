import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { getDataSuccess, couriersFailure } from './actions';

export function* registerCouriers({ payload }) {
  try {
    yield call(api.post, '/deliveryman', payload);

    toast.success('Entregador cadastrado com sucesso!');

    history.push('/entregadores');
  } catch (err) {
    const { response } = err;

    const error =
      response.status === '500'
        ? 'Verifique sua conexão com a internet'
        : response.data.error;
    toast.error(error);
    yield put(couriersFailure());
  }
}

export function* getDataToUpdate({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliveryman/${id}`);
    yield put(getDataSuccess(response.data));

    history.push('/entregadores/editar');
  } catch (error) {
    toast.error('Erro ao puxar os dados do entregador tente novamente');
    yield put(couriersFailure());
  }
}

export function* setDataToUpdate({ payload }) {
  if (!payload) return;
  const { entregador } = payload.entregadores;
  yield put(getDataSuccess(entregador));
}

export function* updateCouriers({ payload }) {
  try {
    const { id, avatar_id, name, email } = payload;
    const data = {
      avatar_id,
      name,
      email,
    };

    const response = yield call(api.put, `/deliveryman/${id}`, data);

    console.tron.log(response);

    toast.success('Entregador alterado com sucesso!');

    history.push('/entregadores');
  } catch (error) {
    toast.error('Houve um erro ao alterar entregador, verifique os dados.');
    yield put(couriersFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setDataToUpdate),
  takeLatest('@couriers/REGISTER', registerCouriers),
  takeLatest('@couriers/GET_DATA_TO_UPDATE', getDataToUpdate),
  takeLatest('@couriers/UPDATE_REQUEST', updateCouriers),
]);

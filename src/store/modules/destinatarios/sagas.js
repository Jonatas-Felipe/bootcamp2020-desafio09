import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { getDataSuccess, recipientsFailure } from './actions';

export function* registerRecipients({ payload }) {
  try {
    yield call(api.post, '/recipient', payload);

    toast.success('Destinatário cadastrado com sucesso!');

    history.push('/destinatarios');
  } catch (err) {
    const { response } = err;

    const error =
      response.status === '500'
        ? 'Verifique sua conexão com a internet'
        : response.data.error;
    toast.error(error);
    yield put(recipientsFailure());
  }
}

export function* getDataToUpdate({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/recipient/${id}`);

    yield put(getDataSuccess(response.data));

    history.push('/destinatarios/editar');
  } catch (error) {
    toast.error('Erro ao puxar os dados do destinatário tente novamente');
    yield put(recipientsFailure());
  }
}

export function* setDataToUpdate({ payload }) {
  if (!payload) return;
  const { destinatario } = payload.destinatarios;
  yield put(getDataSuccess(destinatario));
}

export function* updateRecipients({ payload }) {
  try {
    const {
      id,
      recipient_name,
      street,
      number,
      complement,
      city,
      state,
      zipcode,
    } = payload;

    const data = {
      recipient_name,
      street,
      number,
      complement,
      city,
      state,
      zipcode,
    };

    yield call(api.put, `/recipient/${id}`, data);

    toast.success('Destinatário alterado com sucesso!');

    history.push('/destinatarios');
  } catch (error) {
    toast.error('Houve um erro ao alterar destinatário, verifique os dados.');
    yield put(recipientsFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setDataToUpdate),
  takeLatest('@recipients/REGISTER', registerRecipients),
  takeLatest('@recipients/GET_DATA_TO_UPDATE', getDataToUpdate),
  takeLatest('@recipients/UPDATE_REQUEST', updateRecipients),
]);

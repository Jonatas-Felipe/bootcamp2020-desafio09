export function registerCouriers(avatar_id, name, email) {
  return {
    type: '@couriers/REGISTER',
    payload: { avatar_id, name, email },
  };
}

export function getDataToUpdate(id) {
  return {
    type: '@couriers/GET_DATA_TO_UPDATE',
    payload: { id },
  };
}

export function getDataSuccess(entregador) {
  return {
    type: '@couriers/GET_DATA_SUCCESS',
    entregador,
  };
}

export function updateCouriers(id, id_avatar, name, email) {
  return {
    type: '@couriers/UPDATE_REQUEST',
    payload: { id, id_avatar, name, email },
  };
}

export function couriersFailure() {
  return {
    type: '@couriers/FAILURE',
  };
}

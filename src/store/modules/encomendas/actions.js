export function registerOrders(recipient_id, deliveryman_id, product) {
  return {
    type: '@orders/REGISTER',
    payload: { recipient_id, deliveryman_id, product },
  };
}

export function getDataToUpdate(id) {
  return {
    type: '@orders/GET_DATA_TO_UPDATE',
    payload: { id },
  };
}

export function getDataSuccess(encomenda) {
  return {
    type: '@orders/GET_DATA_SUCCESS',
    encomenda,
  };
}

export function updateOrders(id, recipient_id, deliveryman_id, product) {
  return {
    type: '@orders/UPDATE_REQUEST',
    payload: { id, recipient_id, deliveryman_id, product },
  };
}

export function ordersFailure() {
  return {
    type: '@orders/FAILURE',
  };
}

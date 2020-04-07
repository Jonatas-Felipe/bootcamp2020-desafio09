export function registerRecipients(
  recipient_name,
  street,
  number,
  complement,
  city,
  state,
  zipcode
) {
  return {
    type: '@recipients/REGISTER',
    payload: {
      recipient_name,
      street,
      number,
      complement,
      city,
      state,
      zipcode,
    },
  };
}

export function getDataToUpdate(id) {
  return {
    type: '@recipients/GET_DATA_TO_UPDATE',
    payload: { id },
  };
}

export function getDataSuccess(destinatario) {
  return {
    type: '@recipients/GET_DATA_SUCCESS',
    destinatario,
  };
}

export function updateRecipients(
  id,
  recipient_name,
  street,
  number,
  complement,
  city,
  state,
  zipcode
) {
  return {
    type: '@recipients/UPDATE_REQUEST',
    payload: {
      id,
      recipient_name,
      street,
      number,
      complement,
      city,
      state,
      zipcode,
    },
  };
}

export function recipientsFailure() {
  return {
    type: '@recipients/FAILURE',
  };
}

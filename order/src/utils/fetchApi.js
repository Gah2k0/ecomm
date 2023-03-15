export const fetchAccount = async (customerId) => {
  const fetchResponse = await fetch(`http://account:3001/api/accounts/${customerId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data);
  return fetchResponse;
};

export const fetchConfirmPayment = async (paymentId, payLoad, token) => {
  const fetchResponse = await fetch(`http://finance:3004/payments/${paymentId}/confirm`, {
    method: 'POST',
    body: JSON.stringify(payLoad),
    withCredentials: true,
    credentials: 'include',
    headers: {
      authorization: token,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => (response.status === 200 ? response.json() : false));

  return fetchResponse;
};

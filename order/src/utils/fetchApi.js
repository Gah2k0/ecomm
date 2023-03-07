const areWeTesting = process.env.JEST_WORKER_ID !== undefined;

const CONFIG = {
  accountHost: 'account',
  financeHost: 'finance',
};

if (areWeTesting) {
  CONFIG.accountHost = 'localhost';
  CONFIG.financeHost = 'localhost';
}

export const fetchAccount = async (customerId) => {
  const fetchResponse = await fetch(`http://${CONFIG.accountHost}:3001/api/accounts/${customerId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data);
  return fetchResponse;
};

export const fetchConfirmPayment = async (paymentId, payLoad) => {
  const fetchResponse = await fetch(`http://${CONFIG.financeHost}:3004/payments/${paymentId}/confirm`, {
    method: 'POST',
    body: JSON.stringify(payLoad),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => (response.status === 200 ? response.json() : false));
  return fetchResponse;
};

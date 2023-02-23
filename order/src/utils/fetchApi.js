const fetchAccount = async (customerId) => {
    const response = await fetch(`http://account:3001/api/accounts/${customerId}`, {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((data) => data)
    return response;
}

const fetchConfirmPayment = async(paymentId, payLoad) => {
        const response = await fetch(`http://finance:3004/payments/${paymentId}/confirm`, {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
                },
            })
        .then((response) => response.status === 200? response.json() : false)
        return response;
}
export { fetchAccount, fetchConfirmPayment };
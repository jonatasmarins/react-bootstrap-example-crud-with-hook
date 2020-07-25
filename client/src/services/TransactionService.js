import http from '../common/http-common';

const API_URL_METHODS = "/api/transaction";

const getTransactionById = (id) => {
    return http.get(`${API_URL_METHODS}/${id}`);
};

const getTransactionByPeriod = (period) => {
    return http.get(API_URL_METHODS, { params: { period } });
};

const getTransactionByDescription = (period, description) => {
    return http.get(
        `${API_URL_METHODS}/description`,
        {
            params:
            {
                period,
                description
            }
        }
    );
};

const getDashBoard = (period, description) => {
    return http.get(`${API_URL_METHODS}/dashboard`, {
        params: {
            period: period,
            description: description
        }
    });
};

const createTransaction = (transaction) => {
    return http.post(API_URL_METHODS, transaction);
};

const updateTransaction = (transaction) => {
    return http.put(API_URL_METHODS, transaction);
};

const deleteTransaction = (id) => {
    return http.delete(`${API_URL_METHODS}/${id}`);
};

export default {
    getTransactionById,
    getTransactionByPeriod,
    getTransactionByDescription,
    getDashBoard,
    deleteTransaction,
    createTransaction,
    updateTransaction
}
const service = require('../services/transactionService');
const express = require('express');
const transactionRouter = express.Router();

transactionRouter.get('/description', async (req, res) => {
    const date = req.query['period'];
    const description = req.query['description'];
    const result = await service.GetByDateAndDescription(date, description);
    res.send(result);
});

transactionRouter.get('/dashboard', async (req, res) => {    
    const date = req.query['period'];
    const description = req.query['description'];
    const result = await service.GetDashBoard(date, description);
    res.send(result);
});

transactionRouter.get('/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await service.GetById(id);
    res.send(result);
});

transactionRouter.get('/', async (req, res) => {
    const date = req.query['period'];
    const result = await service.GetByDate(date);
    res.send(result);
});

transactionRouter.delete('/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await service.Delete(id);
    res.send(result);
});

transactionRouter.post('/', async (req, res) => {
    const transcation = req.body;
    const result = await service.Create(transcation);
    res.send(result);
});

transactionRouter.put('/', async (req, res) => {
    const transcation = req.body;    
    const result = await service.Update(transcation);
    res.send(result);
});

module.exports = transactionRouter;

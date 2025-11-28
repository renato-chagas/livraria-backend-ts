const express = require('express');
const route = express.Router();

 route.get('/books', (req, res) => {
     res.send('Assets route');
 });

 route.post('/assests', (req, res) => {
    res.send('Create asset');
 });
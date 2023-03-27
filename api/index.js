import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.get('/packages', async (req, res) => {

    const { q, type } = req.query
    const endPoint = q ? `packages/${type}/${q}` : 'stats/packages'
    const api = `https://data.jsdelivr.com/v1/${endPoint}`
    const headers = {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    try {

        let response = await fetch(api, {headers});
        response = await response.json()
        res.json(response);

    } catch (error) {

        console.error(error);
        res.status(500).send('An error occurred');

    }
});

module.exports = {
    path: '/api',
    handler: app
};

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/config', (_, res) => {
    axios.post('https://api.demoleap.com/exercise').then((response) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        res.send(response.data);
    });
});

app.get('/config2', (_, res) => {
    res.send({
        bars: {
            'Jan.': 23,
            'Feb.': 22,
            'Mar.': 23,
            'Apr.': 38,
            May: 45,
            'Jun.': 12,
            'Jul.': 42,
            'Aug.': 47,
            'Sep.': 34,
            'Oct.': 17,
            'Nov.': 50,
            'Dec.': 12,
        },
        pie: {
            Data1: 35,
            Data2: 25,
            Data3: 40,
        },
    });
});

app.listen(1234, () => {
    console.log(`Server running on http://localhost:1234`);
});

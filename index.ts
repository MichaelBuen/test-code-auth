import express from 'express';
const app = express();

app.get('/api/v1/me', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));


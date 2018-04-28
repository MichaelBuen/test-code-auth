import express from 'express';

import { usePassportOnApp } from './configuration/authentication-configuration';
import { configureLoginRoutes } from './configuration/login-route-configuration';
import { useWebOnApp } from './configuration/web-configuration';

const app = express();

const environment          = app.get('env'); // NODE_ENV's value, if none is passed, value is 'development'
const isDevelopment        = environment === 'development';

app.get('/api/v1/me', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));


if (isDevelopment) {
    // tslint:disable no-var-requires
    require('dotenv').config();
}


useWebOnApp(app);
usePassportOnApp(app);
configureLoginRoutes(app);

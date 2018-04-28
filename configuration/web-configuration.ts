import express from 'express';
import path from 'path';

export function useWebOnApp(app: express.Express): void
{
    // Configure view engine to render EJS templates.
    app.set('views', path.resolve(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');

    // Use application-level middleware for common functionality, including
    // logging, parsing, and session handling.
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    // app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
}

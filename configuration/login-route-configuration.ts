import express from 'express';
import passport from 'passport';

import { UserEnum } from './_enum';

import jwt from 'jsonwebtoken';

import { ILoggedUserJwtPayload } from '../model/ILoggedUserJwtPayload';


export function configureLoginRoutes(app: express.Express): void
{
    // Define routes.
    app.get('/',
        passport.authenticate('jwt', {session: false, failureRedirect: '/server/login'}),
        (req, res) =>
        res.render('home', {user: req.user}));

    app.get('/server/login', (req, res) => res.render('login'));

    app.get('/server/profile',
        passport.authenticate('jwt', {session: false}),
        (req, res) => res.render('profile', {user: req.user}));

    app.get('/server/logout',
        (req, res) =>
        {
            // req.logout();
            //
            // req.logout() clears the passport data stored in session. it's emptied after req.logout call, i.e.,
            //     passport: { }


            // As we are using session-less service, it's useless to call req.logout()
            // to clear passport session data since there is no session data
            // kept at backend to begin with.
            // So we have to use res.clearCookie instead:
            res.clearCookie(UserEnum.UserInfo);

            res.redirect('/');
        });

    configureFacebookLoginRoutes(app);
    configureGoogleLoginRoutes(app);
}


function configureFacebookLoginRoutes(app: express.Express)
{
    app.get('/server/login/facebook', passport.authenticate('facebook', {session: false, scope: []}));

    app.get(
        '/server/login/facebook/return',

        passport.authenticate('facebook', {session: false, failureRedirect: '/server/login'}),

        (req, res) =>
        {
            const nowInTick = Date.now() / 1000;
            const duration  = nowInTick + (60 * 60 * 10); // 60 seconds in 60 minutes in 10 hours

            const expires = nowInTick + duration;

            const payload: ILoggedUserJwtPayload = {
                sub: {
                    source   : req.user && req.user.provider,
                    id       : req.user && req.user.id,
                    shownName: req.user && req.user.displayName

                },
                exp: expires
            };

            const token = jwt.sign(payload, process.env.JWT_SIGNING_KEY);

            // cookie does not expire, yet gets deleted when the browser is closed.
            res.cookie(UserEnum.UserInfo, token);

            res.redirect('/');
        }
    );
}

function configureGoogleLoginRoutes(app: express.Express)
{
    app.get('/server/login/google',
        passport.authenticate('google', {session: false, scope: ['profile']})
    );

    app.get(
        '/server/login/google/return',

        passport.authenticate('google', {session: false, failureRedirect: '/server/login'}),

        (req, res) =>
        {
            const nowInTick = Date.now() / 1000;
            const duration  = nowInTick + (60 * 60 * 10); // 60 seconds in 60 minutes in 10 hours

            const expires = nowInTick + duration;

            const payload: ILoggedUserJwtPayload = {
                sub: {
                    source   : req.user && req.user.provider,
                    id       : req.user && req.user.id,
                    shownName: req.user && req.user.displayName
                },
                exp: expires
            };

            const token = jwt.sign(payload, process.env.JWT_SIGNING_KEY);

            // cookie does not expire, yet gets deleted when the browser is closed.
            res.cookie(UserEnum.UserInfo, token);

            res.redirect('/');
        }
    );
}

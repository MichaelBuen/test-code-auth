// tslint:disable no-var-requires

import passport from 'passport';

import PassportFacebook from 'passport-facebook';

// @ts-ignore
import PassportGoogle from 'passport-google-oauth20';

import PassportJwt from 'passport-jwt';

import express from 'express';

import { UserEnum } from './_enum';

import { ILoggedUserJwtPayload } from '../model/ILoggedUserJwtPayload';


export function usePassportOnApp(app: express.Express)
{
    configureFacebook();
    configureGoogle();
    configureJwt();

    app.use(passport.initialize());
}


function configureFacebook(): void
{
    const strategyOption: PassportFacebook.StrategyOption = {
        clientID    : process.env.FACEBOOK_CLIENT_ID || '',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
        callbackURL : `http://localhost:3000/server/login/facebook/return`
    };

    const verifyFunction: PassportFacebook.VerifyFunction =
              (accessToken, refreshToken, profile, done) => done(null, profile);

    const strategy = new PassportFacebook.Strategy(strategyOption, verifyFunction);

    passport.use(strategy);
}

function configureGoogle(): void
{
    const strategyOption /* : PassportGoogle.StrategyOption */ = {
        clientID    : process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL : `http://localhost:3000/server/login/google/return`
    };

    const verifyFunction /* : PassportGoogle.VerifyFunction */ =
              (accessToken: any, refreshToken: any, profile: any, done: any) => done(null, profile);

    const strategy = new PassportGoogle.Strategy(strategyOption, verifyFunction);

    passport.use(strategy);
}


function configureJwt(): void
{
    const customExtractor: PassportJwt.JwtFromRequestFunction = req =>
    {
        const token: string = req && req.cookies && req.cookies[UserEnum.UserInfo];

        return token;
    };

    const strategyOptions: PassportJwt.StrategyOptions = {
        secretOrKey   : process.env.JWT_SIGNING_KEY,
        jwtFromRequest: PassportJwt.ExtractJwt.fromExtractors([customExtractor])
    };

    const verifyCallback: PassportJwt.VerifyCallback = (payload: ILoggedUserJwtPayload, done) => {
        return done(null, payload.sub);
    };

    const strategy = new PassportJwt.Strategy(strategyOptions, verifyCallback);

    passport.use(strategy);
}

// autocomplete for process.env.
declare global
{
    namespace NodeJS
    {
        // tslint:disable interface-name
        interface ProcessEnv
        {
            NODE_ENV?: string;
            FACEBOOK_CLIENT_ID: string;
            FACEBOOK_CLIENT_SECRET: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            JWT_SIGNING_KEY: string;
        }
    }
}

// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
export {};

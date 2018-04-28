import { ILoggedUser } from './ILoggedUser';

export interface ILoggedUserJwtPayload
{
    // subject
    sub: ILoggedUser;

    // expires
    exp: number;
}


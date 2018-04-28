export interface ILoggedUser
{
    source: string | undefined; // provider
    id: string | undefined; // id
    shownName: string | undefined; // displayName
}

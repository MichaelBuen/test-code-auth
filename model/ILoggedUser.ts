export interface ILoggedUser
{
    source: string | undefined; // provider, e.g., facebook, google
    id: string | undefined; // id
    shownName: string | undefined; // displayName
}

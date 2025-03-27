const userLog = 'UserLog'
const token = 'UserToken'

export const loggedApp = userLog // export de l'identifiant
export const TokenUser = token // export de l'identifiant
// recuperation du token de l'utilisateur dans le localstorage
export function getToken() {
    return localStorage.getItem(TokenUser)
}
export function getProfilStorage() {
    const user = localStorage.getItem(userLog)
    let profile = null
    if (user) profile = JSON.parse(user)

    return profile
}
export const Personrole = {
    1:"Admin",
    2:"Equipe technique",
    3:"Salarié"
}
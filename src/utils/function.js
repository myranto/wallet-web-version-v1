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
    1: "Admin",
    2: "Equipe technique",
    3: "Salarié"
}

export const roleItems = [
    { name: 'Administrateur', value: 'A' },
    { name: 'Client', value: 'C' },
]

export const typesItems = [
    { name: 'Courant', value: 'C' },
    { name: 'Epargne', value: 'E' },
]

export const getNameField = (value, data = roleItems) => {
    return data?.map((row) => row.value === value ? row.name : null)
}

export function convertDtoToItems(dto = null) {
    const result = []
    if (!dto)
        return typesItems

    dto?.map((row) =>
        result.push({
            name: row?.type ? row.type : row?.libelle,
            value: row?.id
        })
    )
    return result
}

export function getDatePart(date) {
    return date.split('T')[0];
}
export function formatDateForInput(isoString) {

    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
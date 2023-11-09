const baseURL = "https://m2-api-token.herokuapp.com";

let globalToken = ""

const loginAcesso = {
    name: "UserTest",
    email: "User@test.com",
    password: "12345678"
}

const receitaModelo = {
    name: "Bolo",
    ingredients: ["Ovo", "Açucar", "Farinha de trigo", "Leite", "Fermento", "Margarina"],
    description: "Bata tudo e deixe no forno por volta de meia hora",
}


export async function getPublic() {
    const recipes = await fetch(`${baseURL}/recipe`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .then((responseJson) => responseJson);
    console.log(recipes)
    return (recipes);
}


export async function getPrivate() {
    const recipes = await fetch(`${baseURL}/recipe/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${globalToken}`,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => responseJson);
    console.log(recipes);
    return recipes
}


export async function createUser(data) {
    const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error);

    console.log(response);
    return response
}


export async function login(data) {
    const tokenAPI = await fetch(
        "https://m2-api-token.herokuapp.com/auth/login",
        {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), 
        }
    )
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error);

    globalToken = tokenAPI;
    return globalToken;
}

export const createRecipe = async (data) => {
    const response = await fetch(`${baseURL}/recipe/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${globalToken}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error);
    return response;
}


export async function updateRecipe(idRecipe) {
    const response = await fetch(`${baseURL}/recipe/user/${idRecipe}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${globalToken}`,
        },
        body: JSON.stringify({
            name: "Bolo de farinha"
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error);
    return response;
}


export async function destroyRecipe(idRecipe) {
    const response = await fetch(`${baseURL}/recipe/user/${idRecipe}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${globalToken}`, 
        },
    })
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error);
    return response;
}



// getPublic();
// createUser(loginAcesso);

login(loginAcesso)
    .then(async () => {
        // await createRecipe(receitaModelo);
        // await updateRecipe(377);
        // await destroyRecipe(379);
        await getPrivate()
    });
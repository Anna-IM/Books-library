let baseUrl = 'http://localhost:3030/users';

function getAuthToken(){
    return localStorage.getItem('authToken');
}

function getUsername(){
    return localStorage.getItem('username');
}

function getUserId(){
    return localStorage.getItem('userId');
}

function isLoggedIn(){
    return localStorage.getItem('authToken') !== null;
}

async function register(user){
    let response = await fetch(`${baseUrl}/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify(user),
      });
    let result = await response.json();
      // console.log(result.accessToken);
    localStorage.setItem('authToken', result.accessToken);
    localStorage.setItem('userId', result._id);
    localStorage.setItem('email', result.email);
}

async function login(user){
    let response = await fetch(`${baseUrl}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify(user),
      });
    let result = await response.json();

    localStorage.setItem('authToken', result.accessToken);
    localStorage.setItem('userId', result._id);
    localStorage.setItem('email', result.email);
}

async function logout(){
    let response = await fetch(`${baseUrl}/logout`, {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": getAuthToken(),
        },
        method: "Get",
      });
    localStorage.clear();
    // localStorage.removeItem('authToken', result.accessToken);
}

export default {
    getAuthToken,
    getUsername,
    getUserId,
    isLoggedIn,
    register,
    login,
    logout
}
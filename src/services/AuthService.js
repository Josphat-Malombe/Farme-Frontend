import api from "./api";

/*
export async function registerUser(data) {
    return api.post('/register/',data)
}

*/


export const registerUser = (data) => {
  return api.post('/register/', data)
    .then(response => response)
    .catch(error => {
      console.error('Registration API error:', error.response || error);
      throw error; // Rethrow so the component can catch it
    });
};


export async function loginUser(data) {

    const res = await api.post('/login/',data);

    const {access, refresh} = res.data;

    localStorage.setItem('access',access)
    localStorage.setItem('refresh',refresh)
    
    return res;

}


export function logoutUser(){
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')

    localStorage.removeItem('user');

    window.location.href='/'
}
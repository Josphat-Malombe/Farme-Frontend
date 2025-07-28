import api from "./api";

export async function getProfile(){
    return await api.get('/profile/')

}


export async function updateProfile(profileData) {
    const formData= new FormData()
    for(const key in profileData){

        if(profileData[key]!==null && profileData[key]!==undefined){
            formData.append(key, profileData[key]);
        }

    }
    return await api.patch('/profile/', formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    })
}
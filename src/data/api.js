export const BASE_URL = 'http://192.168.18.14:3005/api/v1/';
// export const BASE_URL = 'http://192.168.1.30:3005/api/v1/';
// export const BASE_URL = 'http://192.168.43.253:3005/api/v1/';

import axios from "axios";
export const signUp = async  (data)=>{
    const res  = await fetch(`${BASE_URL}user`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    });
    const body = await res.json();
    return body;
}


export const login = async (data)=>{
    const res  = await fetch(`${BASE_URL}user/login`,{
        headers:{
            'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify(data)
    });

    const body = await res.json()
    return body;
}

export const addProduct = async (data)=>{

    const res  = await fetch(`${BASE_URL}product`,{
       
        method:"POST",
        body:data
    });

    const body =  await res.json();
    console.log(body)
    return body;




    try {
        const response = await axios.post(
          `${BASE_URL}product`,
          data,
          {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
            },
          }
        );
        console.log("Reseponse====",response.data);

        return response.data
      } catch (error) {
        console.log("error-----",error);
      }


    
}

export const getCategories = async (data)=>{
    const res  = await fetch(`${BASE_URL}category`,{
        headers:{
            'Content-Type':'application/json',
        }
    });

    const body = await res.json()

    return body;
    
}



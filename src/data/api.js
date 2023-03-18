// export const BASE_URL = 'http://192.168.1.25:3005/api/v1/';
// export const BASE_URL = 'http://192.168.1.102:3005/api/v1/';
export const BASE_URL = 'http://afrobuy.shop:3000/api/v1/';
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


export const getMyPost = async (token)=>{
	const config = {

		headers:{
            'Content-Type':"application/json",
            'Authorization':'Bearer ' + token}
	}
	const {data} = await axios.get(`${BASE_URL}product/user`,config)	
    console.log("===data==",data);

	return data;
}



export const getProducts = async (limit,skip)=>{
	const {data} = await axios.get(`${BASE_URL}product?limit=${limit}&skip=${skip}`)	
	return data;
}


export const getProductDetails = async (id)=>{
    
	const {data} = await axios.get(`${BASE_URL}product/${id}/info`)	

	return data;

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
	    headers:{
		"Authorization":"Bearer "+data.token
	    },
        method:"POST",
        body:data.data
    });
    const body =  await res.json();
    console.log(body)
    return body;
    
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

export const updateUser = async (data)=>{
    try{
        const res  = await fetch(`${BASE_URL}user`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+data.token
            },
            method:"PUT",
            body:JSON.stringify(data)
        });
    
        console.log("log data===",body)

        const body = await res.json()
        console.log("log data===",body)
        // alert(JSON.stringify(body))

        return body;

    }catch(err){
        return {msg:"failed"+err}
    }
}

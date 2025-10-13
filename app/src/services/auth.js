import axios from "axios"

const url = "/api/gettabledata.php"

const login = async (user) => {

    console.log(user)
    const result = await axios.post(url,user)
    const {data} = await result

    localStorage.setItem("user",JSON.stringify(user))
    localStorage.setItem("data",JSON.stringify(data))

    return data

}

export default {login}
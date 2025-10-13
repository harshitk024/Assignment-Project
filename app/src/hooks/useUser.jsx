import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"

export const useUser = () => {

    const {state,dispatch} = useAuth()
    const [isUserLoading,setIsUserLoading] = useState(false)

    useEffect(() => {

        const addedUser = localStorage.getItem("user")
        const parsedUser = JSON.parse(addedUser)
        console.log(parsedUser)
        if(parsedUser !== null){
            dispatch({type: "LOGIN", payload: {...parsedUser,isAuthenticated: true}})
            setIsUserLoading(false)
        }

    },[])

    return {
        state,
        dispatch,
        isUserLoading
    }


    

}
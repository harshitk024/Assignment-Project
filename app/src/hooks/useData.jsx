import { useEffect, useState } from "react"

export const useData = () => {

    const [data,setData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)


    useEffect(() => {

        const savedData = JSON.parse(localStorage.getItem("data"))
        console.log(savedData)

        if(savedData){
            setData(savedData.TABLE_DATA.data)
            setIsLoading(false)
        }
    },[])

    return{
        data,
        setData,
        isLoading
}
}
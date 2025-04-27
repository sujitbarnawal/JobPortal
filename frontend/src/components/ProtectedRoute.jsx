/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import usePortalStore from "@/store/portalStore"
import { useEffect } from "react"

const ProtectedRoute = ({children})=>{
    const {user}=usePortalStore()

    const navigate=useNavigate()

    useEffect(()=>{
        if(user===null || user.role!=='recruiter'){
            navigate('/')
        }
    },[ ])
    return(
        <>{children}</>
    )
}

export default ProtectedRoute;
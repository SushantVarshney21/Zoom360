import { onAuthStateChanged} from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utils/FirebaseConfig'
import { setUser } from '../app/slices/AuthSlice'

const useAuth = () => {
 const navigate = useNavigate()
 const dispatch = useDispatch()
//  const [mainUser, setMainUser]= useState({})

 useEffect(()=>{
    const unsubscribe = onAuthStateChanged(firebaseAuth,(currentUser)=>{
        // console.log(currentUser)
        if(!currentUser){
            navigate("/login")
        }else{
            dispatch(setUser({
              uid:currentUser.uid,
              name:currentUser.displayName,
              email:currentUser.email
          }))
        }
    })
    return ()=> unsubscribe()
 },[dispatch,navigate])
}

export default useAuth

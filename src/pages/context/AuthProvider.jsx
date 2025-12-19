import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';


const googleProvider  =new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user ,setUser]=useState(null)
    const [loading ,setLoading]=useState(true)
    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signInUser =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email ,password);
    }
    
    const signOutUser =()=>{
         setLoading(true)
        return signOut(auth);
    }

    const googleSigInUser =()=>{
        setLoading(true)
        return signInWithPopup(auth ,googleProvider);
    }

    const updateUserProfile =(profile)=>{
        return updateProfile(auth.currentUser,profile)
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth ,(currentUser)=>{
                setUser(currentUser)
                setLoading(false)
               
        })
        return ()=>{
            unSubscribe()
        }
    },[])
    const authInfo ={
        createUser,
        signInUser,
        signOutUser,
        googleSigInUser,
        updateUserProfile,
        user,
        setUser,
        loading,
        setLoading,
    }
    return (
      
        <AuthContext value ={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
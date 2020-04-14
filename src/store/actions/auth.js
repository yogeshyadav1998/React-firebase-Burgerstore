import * as actiontype from './actiontypes';
import axios from 'axios';

export const authstart = () =>{
    return{
        type: actiontype.AUTH_START
    }
}

export const authsuccess = (userdata) =>{
    return{
        type: actiontype.AUTH_SUCCESS,
        token: userdata.idToken,
        userid: userdata.localId
    }
}

export const logout = () => {
    return{
        type: actiontype.AUTH_LOGOUT
    }
}

export const checkexpiration = (expirationtime) =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, expirationtime *1000);
    }
}
 
export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authstart())
        const authdata = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFgfRhp0jyE5Iuk5FRZI4Uo1aNgxmj0NI'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFgfRhp0jyE5Iuk5FRZI4Uo1aNgxmj0NI' 
        }
        axios.post( url, authdata)
        .then(user =>{
            console.log(user)
            dispatch(authsuccess(user.data))
            dispatch(checkexpiration(user.data.expiresIn))
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
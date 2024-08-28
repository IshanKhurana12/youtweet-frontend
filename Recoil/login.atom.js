import { atom,useRecoilState,selector } from "recoil";


export const authState=atom({
    key:"auth",
    default: {
        isAuthenticated: false,
        user: null,
        accessToken:"",
        refreshToken:""
      }
})

export const logindetails=atom({
    key:"logindetails",
    default:{
        username:"",
        password:"",
        email:""
    }
})

export const logout=atom({
    key:"logout",
    default:{
        loggedout:false
    }
})

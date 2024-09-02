import { atom } from "recoil";

export const unsubscribed=atom({
    key:"unsub",
    default:{
        issubscribed:true,
        channelId:null,
    }
})
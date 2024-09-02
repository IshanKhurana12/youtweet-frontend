import { atom } from "recoil";

export const issubscribed=atom({
    key:"issub",
    default:{
        issubscribed:false,
        channelId:null,
    }
})
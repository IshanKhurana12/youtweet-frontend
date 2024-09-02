import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

// Create a persist configuration
const { persistAtom } = recoilPersist();

export const videoState=atom({
    key:"getallvideos",
    default:[],
    effects_UNSTABLE: [persistAtom],
})

export const deleteatom=atom({
    key:"delete",
    default:{
        deleted:false,
        videoId:null
    }
});
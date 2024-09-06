import { selector } from "recoil";

import axios from "axios";
import { authState } from "./login.atom";
import { unsubscribed } from "./unsubscribe.atom";

const baseUrl = 'https://youtweet.onrender.com';
export const unsubSelector=selector({
    key:"unsubornot",
    get:async ({ get }) =>{
           
            const {accessToken}=get(authState); //accesstoken
            const {channelId}=get(unsubscribed);//channel id  i will trigger on this 
            //subscribe logic
            if(channelId===null){
                console.log("enter id");
                return
            }
      try {
              const res=await axios.post(
                  `${baseUrl}/api/v1/sub/unsubscribe`,
                  {
                      channelId:channelId
                  }, // The body of the POST request (empty in this case)
                  {
                    headers: {
                      'Authorization': `Bearer ${accessToken}`
                    }
                  }
                );
                  return res;
      } catch (error) {
            console.log(error);
      }
    }

})
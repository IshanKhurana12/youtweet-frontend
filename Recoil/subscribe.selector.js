import { selector } from "recoil";
import { issubscribed } from "./subscribe.atom";
import axios from "axios";
import { authState } from "./login.atom";


export const subSelector=selector({
    key:"subornot",
    get:async ({ get }) =>{
           
            const {accessToken}=get(authState); //accesstoken
            const {channelId}=get(issubscribed);//channel id  i will trigger on this 
            //subscribe logic
            if(channelId===null){
                console.log("enter id");
                return
            }
      try {
              const res=await axios.post(
                  'http://localhost:3000/api/v1/sub/subscribe',
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
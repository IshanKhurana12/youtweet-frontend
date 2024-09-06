import { selector } from "recoil";
import { videoState } from "./video.atom";
import { authState } from "./login.atom";
import axios from "axios";
import { deleteatom } from "./video.atom";

export const getvideoselector=selector({
    key:"getvideos",
    get: async ({ get }) => {
        const {videos}=get(videoState);
      const { accessToken } =get(authState);
        


      try {
        // Correctly include headers in the third argument
        const response = await axios.get(
          'http://localhost:3000/api/v1/video/getallvideos',
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
  
     
        return response.data;
      } catch (error) {
        console.error("fetching videos failes:", error);
        throw error; // Rethrow to handle it in the component
      }
    }
})




export const deleteSelector=selector({
  key:"deleteselector",
  get:async({get})=>{
    const {videoId}=get(deleteatom);
    if(videoId===null){
      return;
    }
    const {accessToken}=get(authState);
    try {
      const result=await axios.delete(`http://localhost:3000/api/v1/video/delete/${videoId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })


      if(result){
        console.log("deleted");
      }
    } catch (error) {
      console.log(error);
    }





  }
})











import { selector } from "recoil";
import { videoState } from "./video.atom";
import { authState } from "./login.atom";
import axios from "axios";

export const getvideoselector=selector({
    key:"getvideos",
    get: async ({ get }) => {
        const {videos}=get(videoState);
      const { accessToken } =get(authState);
        
console.log("videoselector",accessToken);

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
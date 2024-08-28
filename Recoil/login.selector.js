import { selector, useRecoilValueLoadable } from "recoil";
import { authState, logindetails } from "./login.atom.js";
import axios from "axios";
import { logout } from "./login.atom.js";
const loginSelector = selector({
    key: "loginSelector",
    get: async ({ get }) => {
        const { username, email, password } = get(logindetails);

        // Validate the input fields
        if (!username && !email) {
            throw new Error("Username or email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }

        try {
            // Send a POST request to the login endpoint
            const response = await axios.post(
                "http://localhost:3000/api/v1/users/login",
                { username, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update the auth state with the response data
      

            // Return the response data
            return response.data;
        } catch (error) {
            // Handle and return error details
            console.error("Login failed:", error);
            throw error; // Rethrow to handle it in the component
        }
    }
});


 const logoutSelector = selector({
    key: 'logoutSelector',
    get: async ({ get }) => {
        const {loggedout}=get(logout);
      const { accessToken } =get(authState);
        
      console.log(accessToken);

      try {
        // Correctly include headers in the third argument
        const response = await axios.post(
          'http://localhost:3000/api/v1/users/logout',
          {}, // The body of the POST request (empty in this case)
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
  
     
        return response.data;
      } catch (error) {
        console.error("Logout failed:", error);
        throw error; // Rethrow to handle it in the component
      }
    },
  });

export {logoutSelector}
export default loginSelector;

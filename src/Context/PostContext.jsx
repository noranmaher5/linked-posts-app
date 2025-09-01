import axios from "axios";
import { createContext, useState } from "react";

export let PostContext = createContext();

export default function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
//     const token = localStorage.getItem("userToken");
//     console.log("token =>", token);
//     try {
//       return axios
//         .get("https://linked-posts.routemisr.com/posts?limit=50", {
//           headers: {
//             token: token,
//           },
//         })
//         .then((response) => {
//           console.log("Response from API:", response);
//           return response.data.posts; // <-- دي أهم سطر!
//         })
//         .catch((error) => {
//           console.error("Error from API:", error);
//           return [];
//         });
//     } catch (err) {
//       console.error("Error in getPosts function:", err);
//       return [];
//     }
   }

  return (
    <PostContext.Provider value={{ }}>
      {props.children}
    </PostContext.Provider>
  );
}

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const url = "http://127.0.0.1:8000/";

const BlogContextProvider = ({ children }) => {
  const { myKey } = useContext(AuthContext);

  const [currentBlogs, setCurrentBlogs] = useState();

  const mainBlogs = async () => {
    try {
      const res = await axios.get(`${url}blog/blog/`);
      console.log(res);
      // return res.data;
      setCurrentBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBlog = async ({
    author,
    title,
    content,
    get_comment_count,
    get_like_count,
    image,
    published_date,
  }) => {
    try {
      const res = await axios.post(
        `${url}blog/blog/`,
        {
          author: author,
          title: title,
          content: content,
          get_comment_count: get_comment_count,
          get_like_count: get_like_count,
          image: image,
          published_date: published_date,
        },
        {
          headers: {
            Authorization: `Token ${myKey}`,
          },
        }
      );
      return res.data;
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addBlog();
    mainBlogs();
  }, []);

  let value = {
    addBlog,
    currentBlogs,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;

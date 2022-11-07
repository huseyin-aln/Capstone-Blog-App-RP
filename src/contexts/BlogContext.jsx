import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/toastNotify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const url = "http://127.0.0.1:8000/";

const BlogContextProvider = ({ children }) => {
  const { myKey } = useContext(AuthContext);

  const [currentBlogs, setCurrentBlogs] = useState();

  const mainBlogs = async () => {
    try {
      const res = await axios.get(`${url}blog/blog/`);
      // console.log(res.data[0].id);
      if (res.status === 200) {
        setCurrentBlogs(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      toastErrorNotify("Something went wrong!");
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
      // return res.data;
      // console.log(res.data);
      if (res.status === 200) {
        setCurrentBlogs(...currentBlogs, res.data);
        toastSuccessNotify("Blog added successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOneBlog = (id) => {
    // try {
    //   const res = await axios.get(`${url}blog/blog/${id}/`, {
    //     headers: {
    //       Authorization: `Token ${myKey}`,
    //     },
    //   });
    //   console.log(res);

    //   if (res.status === 200) {
    //     // console.log(res.data);

    //     // return res.data;
    //     setBlogDetail(res.data);
    //   }
    // } catch (error) {
    //   console.log(error.response.data);
    // }

    // console.log(currentBlogs);

    const result = currentBlogs?.filter((item) => item.id == id);

    return result;
    // console.log(result);
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`${url}blog/blog/${id}/`, {
        headers: {
          Authorization: `Token ${myKey}`,
        },
      });
      if (res.status === 204) {
        toastSuccessNotify("Deleted successfully!");
      } else toastWarnNotify("Someting went wrong please try again!");
    } catch (error) {
      toastWarnNotify(error);
    }
  };

  const updateBlog = async (id, author, title, image, content) => {
    try {
      const res = await axios.patch(
        `${url}blog/blog/${id}/`,
        {
          author: author,
          title: title,
          content: content,
          image: image,
        },
        {
          headers: {
            Authorization: `Token ${myKey}`,
          },
        }
      );

      // var data = {
      //   id: 17,
      //   author: author,
      //   title: title,
      //   content: content,
      //   image: image,
      // };

      // var config = {
      //   method: "patch",
      //   url: "http://127.0.0.1:8000/blog/blog/17/",
      //   headers: {
      //     Authorization: "Token ebef53bc262fd0ea2b021214b965a7d8b2a6a540",
      //   },
      //   data: data,
      // };

      // const res = await axios(config);

      if (res.status === 200) {
        toastSuccessNotify("Updated successfully!");
      } else toastWarnNotify("Someting went wrong please try again!");
    } catch (error) {
      console.log(error.response);

      // toastWarnNotify(error);
    }
  };

  useEffect(() => {
    addBlog();
    mainBlogs();
  }, []);

  let value = {
    addBlog,
    currentBlogs,
    getOneBlog,
    deleteBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;

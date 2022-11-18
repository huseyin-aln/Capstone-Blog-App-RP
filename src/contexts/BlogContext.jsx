import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/toastNotify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

// const url = "http://127.0.0.1:8000/";
const url = "https://haln.pythonanywhere.com/";

const BlogContextProvider = ({ children }) => {
  const { myKey } = useContext(AuthContext);

  const [currentBlogs, setCurrentBlogs] = useState();

  const mainBlogs = async () => {
    try {
      const res = await axios.get(`${url}blog/blog/`);
      // console.log(res.data[0].id);
      if (res.status === 200) {
        setCurrentBlogs(res.data);
        console.log(res.data);
      }
    } catch (error) {
      toastErrorNotify("Something went wrong!");
    }
  };

  const addBlog = async ({
    author,
    title,
    content,
    comment_count,
    likes,
    image,
    publish_date,
  }) => {
    try {
      const res = await axios.post(
        `${url}blog/blog/`,
        {
          author: author,
          title: title,
          content: content,
          comment_count: comment_count,
          likes: likes,
          image: image,
          publish_date: publish_date,
        },
        {
          headers: {
            Authorization: `Token ${myKey}`,
          },
        }
      );
      if (res.status === 200) {
        setCurrentBlogs(...currentBlogs, res.data);
        toastSuccessNotify("Blog added successfully!");
      }
    } catch (error) {
      // console.log(error);
      toastWarnNotify(error);
    }
  };

  const getOneBlog = (id) => {
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

  const updateBlog = async (id, data, navigate) => {
    try {
      const res = await axios.patch(`${url}blog/blog/${id}/`, data, {
        headers: {
          Authorization: `Token ${myKey}`,
        },
      });
      if (res.status === 200) {
        toastSuccessNotify("Updated successfully!");
        navigate("/");
      } else toastWarnNotify("Someting went wrong please try again!");
    } catch (error) {
      // console.log(error.response);
      toastWarnNotify(error);
    }
  };

  const addLike = async (data, id) => {
    try {
      const res = await axios.post(`${url}blog/likes/${id}/`, data, {
        headers: {
          Authorization: `Token ${myKey}`,
        },
      });
      if (res.status === 200) {
        toastSuccessNotify("Like updated successfully!");
      }
    } catch (error) {
      // console.log(error.response);
      toastWarnNotify(error);
    }
  };

  const addComment = async (data, id) => {
    try {
      const res = await axios.post(`${url}blog/comments/${id}/`, data, {
        headers: {
          Authorization: `Token ${myKey}`,
        },
      });
      if (res.status === 200) {
        toastSuccessNotify("Comment added successfully!");
      }
    } catch (error) {
      // console.log(error.response);
      toastWarnNotify(error);
    }
  };

  useEffect(() => {
    mainBlogs();
  }, []);

  let value = {
    addBlog,
    currentBlogs,
    getOneBlog,
    deleteBlog,
    updateBlog,
    addLike,
    addComment,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;

import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { AddBlog } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import blogPng from "../assets/blok.png";
import Typography from "@mui/material/Typography";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";
import { BlogContext } from "../contexts/BlogContext";

export default function NewBlog() {
  const { currentUser } = useContext(AuthContext);

  const [newBlog, setNewBlog] = useState({
    author: currentUser.email,
    title: "",
    content: "",
    comment_count: 0,
    likes: 0,
    image: "",
    publish_date: Date.now(),
  });
  const { addBlog } = useContext(BlogContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addBlog(newBlog);
      // setInfo(initialValues);
      navigate("/");
      toastSuccessNotify("Blog added successfully!");
    } catch (error) {
      toastErrorNotify("Blog can not be added!");
    }
  };

  // const date = new Date().toString().split(" ").slice(0, 4);
  // console.log(date);

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   // setInfo({
  //   //   ...info,
  //   //   [name]: value,
  //   //   date: date,
  //   //   like: 0,
  //   //   comment: 0,
  //   //   // author: currentUser.email,
  //   // });
  // };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      marginTop="4rem"
    >
      <Avatar
        sx={{
          m: 1,
          bgcolor: "#232F3E",
          width: "200px",
          height: "200px",
        }}
      >
        <img src={blogPng} alt="blogPng" />
      </Avatar>

      <Typography
        variant="h4"
        sx={{ fontFamily: "Girassol", textAlign: "center", color: "#232F3E" }}
      >
        ─── New Blog ───
      </Typography>

      <TextField
        autoComplete="given-title"
        id="title-input"
        label="Title"
        type="text"
        name="title"
        value={newBlog.title}
        sx={{ width: "20rem" }}
        autoFocus
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
      />
      <TextField
        autoComplete="given-image"
        id="img-input"
        label="Image URL"
        type="text"
        name="image"
        value={newBlog.image}
        sx={{ width: "20rem" }}
        onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
      />

      <TextField
        autoComplete="given-content"
        id="content-input"
        label="Content"
        name="content"
        value={newBlog.content}
        multiline
        rows={6}
        sx={{ width: "20rem" }}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
      />
      <Button
        variant="contained"
        sx={{ width: "20rem", bgcolor: "#232F3E" }}
        onClick={handleSubmit}
      >
        Add New Blog
      </Button>
    </Box>
  );
}

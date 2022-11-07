import { useContext, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { UpdateBlogCard } from "../helpers/firebase";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import placeholder from "../assets/placeholder.png";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";
import { BlogContext } from "../contexts/BlogContext";

export default function UpdateBlog() {
  // const blogCard = useLocation();

  // const [updateBlog, setUpdateBlog] = useState(blogCard.state.state);
  // const [newBlogTitle, setNewBlogTitle] = useState(updateBlog.title);
  // const [newBlogImage, setNewBlogImage] = useState(updateBlog.image);
  // const [newBlogContent, setNewBlogContent] = useState(updateBlog.content);

  // const date = new Date().toString().split(" ").slice(0, 4);

  const { currentUser } = useContext(AuthContext);
  const { getOneBlog, updateBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    author: currentUser.email,
    title: "",
    content: "",
    image: "",
    // updated_date: Date.now(),
  });
  const { id } = useParams();

  const result = getOneBlog(id);

  const res = useMemo(() => {
    return result ? result[0] : { title: "", content: "", image: "" };
  }, [result]);
  console.log(res);

  useEffect(() => {
    setNewBlog(res);
  }, [res]);

  const updateBlogHandler = (e) => {
    e.preventDefault();
    updateBlog(res?.id, newBlog);
    navigate(`/`);
    console.log(newBlog);
  };

  // useEffect(() => {
  //   setUpdateBlog(blogCard.state.state)
  // }, [blogCard.state.state]);

  // const editBlog = (e) => {
  //   e.preventDefault();
  //   try {
  //     const info = {
  //       title: newBlogTitle,
  //       image: newBlogImage,
  //       content: newBlogContent,
  //       date: date,
  //       // author: currentUser.email,
  //       id: updateBlog.id,
  //     };
  //     // UpdateBlogCard(info);
  //     navigate("/");
  //     toastSuccessNotify("Blog updated successfully!");
  //   } catch (error) {
  //     toastErrorNotify("Blog can not be updated!");
  //   }
  // };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        marginTop="4rem"
      >
        <img
          src={res?.image || placeholder}
          alt="blok"
          style={{
            maxWidth: 300,
            height: 200,
            objectFit: "contain",
            display: "block",
            margin: "auto",
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontFamily: "Girassol", textAlign: "center", color: "#232F3E" }}
        >
          ─── Update Blog ───
        </Typography>

        <form
          component="form"
          onSubmit={updateBlogHandler}
          noValidate
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <TextField
            autoComplete="given-title"
            id="title-input"
            label="Title"
            type="text"
            name="title"
            defaultValue={res?.title}
            // value={title}
            sx={{ width: "20rem" }}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <TextField
            autoComplete="given-image"
            id="img-input"
            label="Image URL"
            type="text"
            name="image"
            defaultValue={res?.image}
            // value={image}
            sx={{ width: "20rem" }}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
          />

          <TextField
            autoComplete="given-content"
            id="content-input"
            label="Content"
            name="content"
            defaultValue={res?.content}
            // value={content}
            multiline
            rows={6}
            sx={{ width: "20rem" }}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "20rem", bgcolor: "#232F3E" }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
}

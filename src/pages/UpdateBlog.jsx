import { useContext, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import placeholder from "../assets/placeholder.png";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { BlogContext } from "../contexts/BlogContext";

export default function UpdateBlog() {
  const { currentUser } = useContext(AuthContext);
  const { getOneBlog, updateBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    id: "",
    author: currentUser.email,
    title: "",
    content: "",
    image: "",
  });
  const { id } = useParams();

  const result = getOneBlog(id);

  const res = useMemo(() => {
    return result ? result[0] : { title: "", content: "", image: "" };
  }, [result]);
  // console.log(res);

  useEffect(() => {
    setNewBlog(res);
  }, []);

  const updateBlogHandler = (e) => {
    e.preventDefault();
    updateBlog(
      res?.id,
      newBlog,
      // newBlog.author,
      // newBlog.title,
      // newBlog.content,
      // newBlog.image,
      navigate
    );
    // navigate(`/`);
    // console.log(newBlog);
  };

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
          alt="blog"
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
            sx={{ width: "20rem" }}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
          />

          <TextField
            autoComplete="given-content"
            id="content-input"
            label="Content"
            name="content"
            defaultValue={res?.content}
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

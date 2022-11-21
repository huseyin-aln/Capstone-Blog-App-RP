import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubble";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import placeholder from "../assets/placeholder.png";
import noData from "../assets/no-data.png";
import { BlogContext } from "../contexts/BlogContext";
import moment from "moment";
import loadingGif from "../assets/loading.gif";

const Details = () => {
  const { currentUser } = useContext(AuthContext);
  const { getOneBlog, deleteBlog, addLike, addComment } =
    useContext(BlogContext);

  const [newComment, setNewComment] = useState("");
  const [like, setLike] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const result = getOneBlog(id);

  const updateHandler = (id) => {
    navigate(`/updateBlog/${id}`);
  };

  const deleteHandler = (id) => {
    deleteBlog(id);
    navigate("/");
  };

  const handleLike = (e) => {
    const data = {
      post: like,
    };
    addLike(data, id);
    setLike("");
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    const data = {
      content: newComment,
    };
    addComment(data, id);
    setNewComment("");
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "4rem",
        width: "80%",
        height: "40vh",
        margin: "50px auto",
      }}
    >
      <Typography
        sx={{
          marginBottom: "4rem",
          fontFamily: "Girassol",
          textAlign: "center",
          color: "#232F3E",
        }}
        variant="h3"
        noWrap
      >
        ─── Details ───
      </Typography>

      {result?.length > 0 ? (
        result?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minWidth: 250,
                width: "75vw",
              }}
            >
              <CardMedia
                component="img"
                image={item.image || placeholder}
                alt="image"
                sx={{
                  maxWidth: 300,
                  height: 250,
                  objectFit: "contain",
                  display: "block",
                  margin: "auto",
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  color="#046582"
                  sx={{ fontFamily: "Girassol" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  sx={{ fontFamily: "Girassol" }}
                >
                  {moment(item.publish_date).format("MMM DD, YYYY")}
                </Typography>
                <Typography variant="body2">{item.content}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h6">{item.author}</Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={(e) => {
                    handleLike(e);
                  }}
                  data-id={item?.id}
                >
                  <FavoriteIcon
                    color={item.likes.length > 0 ? "error" : "disabled"}
                  />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {item?.likes?.length}
                </Typography>
                <IconButton aria-label="comment count">
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {item.comment_count}
                </Typography>
              </CardActions>

              {item.author === currentUser ? (
                <Box display="flex" justifyContent="center" gap={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateHandler(item.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteHandler(item.id)}
                  >
                    Delete
                  </Button>
                </Box>
              ) : null}
            </Card>
          </Box>
        ))
      ) : result === undefined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={loadingGif} alt="loading" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={noData} alt="no data" />
        </div>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="primary"
          sx={{ fontFamily: "Girassol" }}
        >
          Comments
        </Typography>

        {result[0]?.comments?.map((comment, id) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Girassol",
                marginTop: "1rem",
                border: "1px solid lightgrey",
              }}
              key={id}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontFamily: "Girassol", marginLeft: "1rem" }}
              >
                {comment.user} :
              </Typography>

              <Typography
                variant="body"
                color="primary"
                sx={{ fontFamily: "Girassol", marginLeft: "1rem" }}
              >
                {comment.content}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box component="form" onSubmit={handleSendComment} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="comment"
          name="comment"
          autoComplete="comment"
          value={newComment}
          autoFocus
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "#232F3E" }}
        >
          Add Comment
        </Button>
      </Box>
    </Container>
  );
};

export default Details;

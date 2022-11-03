import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Container from "@mui/material/Container";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { DeleteBlog, LikeBlog } from "../helpers/firebase";
import placeholder from "../assets/placeholder.png";
import { toastSuccessNotify } from "../helpers/toastNotify";
import noData from "../assets/no-data.png";

const Details = () => {
  const navigate = useNavigate();
  // const { currentUser } = useContext(AuthContext);

  // const blogCard = useLocation();

  // const deleteHandler = (id) => {
  //   DeleteBlog(id);
  //   navigate("/");
  //   toastSuccessNotify("Deleted successfully!");
  // };

  // const likeClicked = async() => {
  //   await LikeBlog();
  // }
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

      {/* {blogCard.state ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              image={blogCard.state.image || placeholder}
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
                {blogCard.state.title}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ fontFamily: "Girassol" }}
              >
                {blogCard.state.date[1] +
                  " " +
                  blogCard.state.date[2] +
                  ", " +
                  blogCard.state.date[3]}
              </Typography>
              <Typography variant="body2">{blogCard.state.content}</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6">{blogCard.state.author}</Typography>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={likeClicked}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="comment">
                <ChatBubbleIcon />
              </IconButton>
            </CardActions>

            {blogCard.state.author === currentUser?.email ? (
              <Box display="flex" justifyContent="center" gap={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/updateblog/${blogCard.state.id}`, {
                      state: blogCard,
                    })
                  }
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteHandler(blogCard.state.id)}
                >
                  Delete
                </Button>
              </Box>
            ) : null}
          </Card>
        </Box>
      ) : (
        <img src={noData} alt="no data" />
      )} */}
    </Container>
  );
};

export default Details;

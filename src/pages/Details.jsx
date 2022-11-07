import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Container from "@mui/material/Container";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { DeleteBlog, LikeBlog } from "../helpers/firebase";
import placeholder from "../assets/placeholder.png";
import { toastSuccessNotify } from "../helpers/toastNotify";
import noData from "../assets/no-data.png";
import { BlogContext } from "../contexts/BlogContext";
import moment from "moment";
import loadingGif from "../assets/loading.gif";

const Details = () => {
  const { currentUser } = useContext(AuthContext);
  const { getOneBlog, deleteBlog } = useContext(BlogContext);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const result = getOneBlog(id);
  // console.log(result);

  // const blogCard = useLocation();

  const updateHandler = (id) => {
    navigate(`/updateBlog/${id}`);
  };

  const deleteHandler = (id) => {
    // console.log("DeleteHandler", id);
    deleteBlog(id);
    navigate("/");
  };

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

      {result?.length > 0 ? (
        result?.map((item, index) => (
          <Box
            key={index}
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
                  {moment(item.published_date).format("MMM DD, YYYY")}
                </Typography>
                <Typography variant="body2">{item.content}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h6">{item.author}</Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  // onClick={likeClicked}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                  <ChatBubbleIcon />
                </IconButton>
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
    </Container>
  );
};

export default Details;

import { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubble";
import { AccountCircle } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CardActionArea, Container } from "@mui/material";
import { toastErrorNotify } from "../helpers/toastNotify";
import placeholder from "../assets/placeholder.png";
import moment from "moment/moment";

export default function BlogCard({ post }) {
  const {
    id,
    author,
    content,
    get_comment_count,
    get_like_count,
    image,
    published_date,
    title,
  } = post;
  // const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const openDetails = () => {
    !currentUser && toastErrorNotify("Please log in to see detail!");
    navigate(`/details/${id}`);
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 300, height: 500 }} >
        <CardActionArea onClick={openDetails}>
        <CardMedia
          component="img"
          image={image || placeholder}
          alt="image"
          sx={{
            maxWidth: 300,
            height: 200,
            objectFit: "contain",
            display: "block",
            margin: "auto",
          }}
        />
        <CardContent style={{ backgroundColor: "#efeefe", height: "150px" }}>
          <Typography
            variant="h5"
            component="h2"
            color="#046582"
            sx={{ fontFamily: "Girassol" }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontFamily: "Girassol" }}
          >
            {moment(published_date).format("MMM DD, YYYY")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {content}
          </Typography>
        </CardContent>
        </CardActionArea>
        




        <CardActions>
          <AccountCircle
            style={{ marginBottom: "0.35em", marginRight: "0.35em" }}
          />
          <Typography gutterBottom variant="h6" component="h2">
            {author}
          </Typography>
        </CardActions>

        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={get_like_count > 0 ? "error" : "disabled"} />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {get_like_count}
          </Typography>
          <IconButton aria-label="comment count">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {get_comment_count}
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
}

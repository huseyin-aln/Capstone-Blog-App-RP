import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import webDevelopment from "../assets/web-development.jpg";

export default function About() {
  return (
    <div
      style={{
        marginTop: "4rem",
      }}
    >
      <Card sx={{ maxWidth: 345, margin: "auto" }}>
        <CardMedia
          component="img"
          height="140"
          image={webDevelopment}
          alt="img"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontFamily: "Girassol",
              textAlign: "center",
              color: "#232F3E",
            }}
          >
            {"<H-ALN/> blog"}
          </Typography>
          <Typography variant="body2" color="text.secondary"sx={{
              fontFamily: "Times New Roman",
              textAlign: "center"
            }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quas
            officia aperiam reprehenderit laboriosam cumque! Nisi, aut
            obcaecati. Nesciunt qui optio nemo molestiae repellat ad earum
            dolores minus repellendus doloribus quos, quam deleniti id aliquam
            voluptas architecto nobis fugit eius ipsam ab adipisci accusamus
            reiciendis soluta blanditiis? Culpa, obcaecati atque.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

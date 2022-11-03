import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import loadingGif from "../assets/loading.gif";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import { useFetch } from "../helpers/firebase";
// import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  // const { currentUser } = useContext(AuthContext);
  // const { isLoading, blogList } = useFetch();

  // useEffect(() => {
  //   // console.log(currentUser);
  //   console.log(blogList);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <Typography
        sx={{ fontFamily: "Girassol", textAlign: "center", color: "#232F3E" }}
        variant="h3"
        noWrap
      >
        ─── Dashboard ───
      </Typography>
      {/* {isLoading && ( */}
        <Box
          component="img"
          sx={{
            width: 40,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            cursor: "pointer",
          }}
          alt="cw"
          src={loadingGif}
        />
      )}

      {/* {!isLoading && ( */}
        <>
          <Container sx={{ marginTop: "4rem" }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{ paddingTop: "2rem" }}
            >
              {/* {blogList?.map((blogCard) => (
                <Grid item xs={12} sm={6} md={4} spacing={2} key={blogCard.id}>
                  <BlogCard blogCard={blogCard} />
                </Grid>
              ))} */}
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default Dashboard;

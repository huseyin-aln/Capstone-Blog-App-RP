import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import blogPng from "../assets/blok.png";
import { AuthContext } from "../contexts/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        {" <h-aln/> "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(email, password, firstName, lastName, userName, navigate);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          container
          justifyContent="center"
          style={{
            backgroundImage: "url(https://picsum.photos/1600/900)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "grey",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            paddingTop: "40px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{ height: "fit-content", borderRadius: "10px" }}
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
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
                component="h1"
                variant="h5"
                style={{ fontFamily: "Girassol", color: "#232F3E" }}
              >
                ─── Register ───
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3, p: 5 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="userName"
                      id="userName"
                      label="User Name"
                      type="text"
                      value={userName}
                      autoFocus
                      fullWidth
                      required
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      id="firstName"
                      label="First Name"
                      type="text"
                      value={firstName}
                      autoFocus
                      fullWidth
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      type="text"
                      value={lastName}
                      required
                      fullWidth
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={email}
                      required
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      required
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#232F3E" }}
                >
                  Register
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      variant="body2"
                      onClick={() => navigate("/login")}
                      sx={{ cursor: "pointer" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

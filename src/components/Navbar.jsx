import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import { logOut } from "../helpers/firebase";


export default function Navbar() {
  
  const [anchorEl, setAnchorEl] = useState(null);

  const { currentUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#232F3E" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to={"/"}>
              <lord-icon
                src="https://cdn.lordicon.com/oqhlhtfq.json"
                trigger="click"
                state="hover-1"
                style={{ width: "50px", height: "50px", color: "primary" }}
              ></lord-icon>
            </Link>
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1, fontFamily: "Girassol" }}
            onClick={() => navigate("/")}
          >
            ───<span> {"<H-ALN/>"} </span> blog ───
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: "40px" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {currentUser ? (
                <Box>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                  <MenuItem onClick={() => navigate("/newblog")}>
                    New Blog
                  </MenuItem>
                  <MenuItem onClick={() => logOut(navigate)}>Logout</MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                  <MenuItem onClick={() => navigate("/register")}>
                    Register
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

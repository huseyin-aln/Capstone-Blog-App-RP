import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
import avatar from "../assets/avatar3.png"


export default function SimpleCard() {
  
  // const { currentUser } = useContext(AuthContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
        marginTop: 50,
      }}
    >
      <Card
        style={{
          minWidth: 275,
          maxWidth: 500,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 25,
          backgroundColor:"#ebe4e4"
        }}
      >
        <img
          // src={currentUser?.photoURL || avatar }
          alt="profile"
          style={{ borderRadius: "50%", width: "100px" }}
        />

        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Display Name
          </Typography>
          <Typography variant="h5" component="h2">
            {/* {currentUser?.displayName || "Not Found!"} */}
          </Typography>
          <Typography color="textSecondary" style={{marginBottom: 12}}>Email</Typography>
          <Typography variant="body2" component="p">
            {/* {currentUser?.email || "Not Found!"} */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

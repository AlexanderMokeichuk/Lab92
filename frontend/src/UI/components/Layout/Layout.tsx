import React from "react";
import {Avatar, Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import AppToolbar from "../AppToolbar/AppToolbar";
import chat from "../../../../public/chat-logo@logotyp.us.svg";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Container>
          <Grid container alignItems={"center"} justifyContent={"space-between"}>
            <Link to={"/"} style={{
              textDecoration: "none",
              fontSize: 20,
              fontWeight: 600,
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
            >
              <div style={{color: "green"}}>
                <span>
                  Chat
                </span>
              </div>
              <Avatar alt="Remy Sharp" src={`${chat}`} />
            </Link>

            <AppToolbar />
          </Grid>
        </Container>
      </header>
      <Grid
        container
        minHeight={"100vh"}
        direction={"column"}
      >
        <Container>
          {children}
        </Container>
      </Grid>
    </>
  );
};

export default Layout;
import React, {PropsWithChildren, useEffect} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../Users/usersSlice";
import {useNavigate} from "react-router-dom";
import {Grid, Typography} from "@mui/material";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, []);

  const styleForChat = {
    border: 2,
    borderColor: "green",
    borderRadius: 6,
    height: "100%"
  };

  const CustomTypography: React.FC<PropsWithChildren> = ({children}) => {
    return (
      <Typography
        variant={"h6"}
        fontWeight={600}
        color={"green"}
        bgcolor={"white"}
        sx={{
          position: "absolute",
          top: -27,
          left: 30,
          padding: 1,
        }}
      >
        {children}
      </Typography>
    );
  };


  return (
    <Grid
      container
      justifyContent={"space-between"}
      height={700}
      mt={4}
    >
      <Grid
        item
        xs={3.8}
        sx={styleForChat}
        position={"relative"}

      >
        <CustomTypography>
          Online users
        </CustomTypography>
      </Grid>
      <Grid
        item
        xs={8}
        sx={styleForChat}
        position={"relative"}
      >
        <CustomTypography>
          Chat room
        </CustomTypography>
      </Grid>
    </Grid>
  );
};

export default Chat;
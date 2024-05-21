import React from "react";
import {OnlineUser} from "../../../../type";
import {Alert, Grid} from "@mui/material";
import {API_URL} from "../../../../constants";

interface Props {
  user: OnlineUser;
}


const UserOnlineCard: React.FC<Props> = ({user}) => {
  let avatarImage = API_URL + "/" + user.avatar;
  if (user.googleID) {
    if (user.avatar) {
      avatarImage = user.avatar;
    }
  }

  return (
    <Alert
      icon={false}
      sx={{
        borderRadius: 4,
      }}
    >
      <Grid container alignItems={"center"} gap={2}>
        <img
          width={25}
          height={25}
          src={avatarImage}
          alt={"№"}
          style={{
            borderRadius: 8,
          }}
        />
        <div>
          {user.displayName}
        </div>
      </Grid>
    </Alert>
  );
};

export default UserOnlineCard;
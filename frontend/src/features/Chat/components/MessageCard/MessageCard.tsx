import React from "react";
import {MessageApi} from "../../../../type";
import {Alert, Grid} from "@mui/material";
import {API_URL} from "../../../../constants";
import dayjs from "dayjs";

interface Props {
  message: MessageApi;
}

const MessageCard: React.FC<Props> = ({message}) => {
  let avatarImage = API_URL + "/" + message.userId.avatar;
  if (message.userId.googleID) {
    if (message.userId.avatar) {
      avatarImage = message.userId.avatar;
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
          {message.userId.displayName}
        </div>
        <div>
          {dayjs(message.datetime).format("DD/MM/YYYY HH:mm")}
        </div>
        <div style={{width: "100%"}}>
          {message.message}
        </div>
      </Grid>
    </Alert>
  );
};

export default MessageCard;
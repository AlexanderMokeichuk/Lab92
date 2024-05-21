import React, {ChangeEvent, FormEvent, PropsWithChildren, useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../Users/usersSlice";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {IncomingMessage, MessageApi, OnlineUser} from "../../type";
import UserOnlineCard from "./components/UserOnlineCard/UserOnlineCard";
import SendIcon from "@mui/icons-material/Send";
import MessageCard from "./components/MessageCard/MessageCard";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageApi[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (!user) {
      navigate("/register");
    } else {
      ws.current = new WebSocket("ws://localhost:8000/chat");

      ws.current?.addEventListener("message", (event) => {
        const decodedMessage = JSON.parse(event.data) as IncomingMessage;

        if (decodedMessage.type === "WELCOME") {
          setMessages(decodedMessage.payload);

          if (ws.current) {
            ws.current.send(JSON.stringify({
              type: "NEW_USER",
              id: user?._id
            }));
          }
        }
        if (decodedMessage.type === "SET_ONLINE_USERS") {
          setOnlineUsers(decodedMessage.payload);
        }

        if (decodedMessage.type === "NEW_MESSAGE") {
          setMessages(prevState => [...prevState, decodedMessage.payload]);
        }
      });
      return () => {
        if (ws.current) ws.current?.close();
      };
    }
  }, [user, navigate]);

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
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        {children}
      </Typography>
    );
  };

  const changeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      setMessage("");

      ws.current?.send(JSON.stringify({
        type: "NEW_MESSAGE",
        payload: {
          userId: user._id,
          message: message,
        },
      }));
    }
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
        padding={2}
      >
        <CustomTypography>
          Online users
        </CustomTypography>
        {onlineUsers.map((item) => {
          return <UserOnlineCard key={item._id} user={item}/>;
        })}
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

        <Grid item sx={{
          overflow: "auto",
          width: "100%",
          height: "85%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          {messages.map((item) => {
            return <MessageCard key={item._id} message={item}/>;
          })}
        </Grid>

        <Grid item>
          <form onSubmit={sendMessage}>
            <Grid
              container
              direction={"row"}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: 2,
                  width: "85%",
                }}>
                <TextField
                  name={"message"}
                  color="success"
                  label="Message"
                  variant="standard"
                  required

                  value={message}
                  onChange={changeMessage}
                />
              </Box>


              <Button
                variant="contained"
                color="success"
                aria-label="Basic button group"
                type={"submit"}
                sx={{
                  display: "flex",
                  width: 30,
                  height: 40,
                  marginLeft: "auto"
                }}
              >
                <SendIcon/>
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chat;
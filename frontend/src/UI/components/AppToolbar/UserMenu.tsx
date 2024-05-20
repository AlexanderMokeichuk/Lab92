import React from "react";
import List from "@mui/material/List";
import {Avatar, Box, Button, IconButton, SwipeableDrawer} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/Users/usersThunks";
import {Link as NavLink} from "react-router-dom";
import {User} from "../../../type";
import {API_URL} from "../../../constants";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  let avatarImage = API_URL + "/" + user.avatar;
  if (user.googleID) {
    if (user.avatar) {
      avatarImage = user.avatar;
    }
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handelLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout());
    }
  };


  const DrawerList = (
    <Box
      sx={{
        border: 2,
        width: 250,
        padding: 2,
        height: "100%",
        paddingLeft: 2,
        display: "flex",
        flexDirection: "column"
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "auto",
        padding: 2
      }}
      >
        <Button
          component={NavLink}
          to="/login"
          color="inherit"
        >
          Change account
        </Button>

        <Button
          color="warning"
          onClick={handelLogout}
        >
          Logout
        </Button>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <span style={{fontSize: 14, marginRight: 5,}}>{user.displayName}</span>
        <Avatar
          sx={{
            width: 24,
            height: 24,
          }}
          src={`${avatarImage}`}
        />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
};

export default UserMenu;

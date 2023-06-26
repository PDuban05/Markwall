import React from "react";
import { AiOutlineUsers } from "./Icons";
import styled from "styled-components";
import { Text5 } from "./Text";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { BsPersonAdd } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";

const ContainerUser = styled.div`
  && {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    cursor: pointer;
    padding: 0 5px;

    :hover {
      background-color: #ffffff37;
    }
  }
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledText5 = styled(Text5)`
  font-size: 14px;
  @media (max-width: 767px) {
    font-size: 12px;
    display: none;
  }
`;

const Container = styled.div`
  display: ${(props) => (props.dataUser ? "flex" : "none")};
`;

const UserNav = ({ dataUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSesion = () => {
    localStorage.removeItem("DataUser");
    localStorage.removeItem("remember");
    location.reload();
  };

  return (
    <Container dataUser={dataUser}>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {dataUser !== null ? (
              <ContainerUser>
                <StyledText5>
                  {dataUser.displayName.split(" ").slice(0, 2).join(" ")}
                </StyledText5>
                {dataUser.photoURL == "" || dataUser.photoURL == null ? (
                  <AiOutlineUsers />
                ) : (
                  <ImageContainer>
                    <StyledImage src={dataUser?.photoURL} />
                  </ImageContainer>
                )}
              </ContainerUser>
            ) : null}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BsPersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FcSettings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleCloseSesion}>
          <ListItemIcon>
            <BiLogOut fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default UserNav;

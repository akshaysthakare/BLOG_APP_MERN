import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        position: "sticky",
        top: 0,
        padding: "20px",
        zIndex: 1000,
        background: "#fff",
      }}
    >
      <Link to="/">
        <Typography
          variant="span"
          fontWeight="600"
          color="#000"
          fontSize="24px"
          sx={{ cursor: "poninter" }}
        >
          Blog
        </Typography>
      </Link>

      <Box>
        {user ? (
          <Stack direction="row" alignItems="center" gap="20px">
            <Link to="/blog">
              <Typography
                variant="span"
                fontWeight="500"
                color="#000"
                fontSize="17px"
                sx={{ cursor: "poninter" }}
              >
                Create Blog
              </Typography>
            </Link>
            <Typography sx={{ fontWeight: 600 }}>{user.username}</Typography>
            <Button onClick={logOut} variant="outlined">
              Log out
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" gap="20px">
            <Button onClick={() => navigate("/login")} variant="contained">
              Login
            </Button>
            <Button onClick={() => navigate("/signUp")} variant="outlined">
              Sign Up
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
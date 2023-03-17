import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { login, reset } from "../redux/reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let path = "/";
  if (location.state) {
    path = location.state.path;
  }

  useEffect(() => {
    if (isError) {
      alert("Something went wrong");
    }

    if (isSuccess || user) {
      navigate(path);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, path]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  
  };

  const onSave = formData.email && formData.password;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "8rem",
        padding: "20px",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          width: "100%",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          background: "#f4f4f4",
          borderRadius: "10px",
          gap: "30px",
        }}
      >
        <Typography
          variant="p"
          fontSize="30px"
          fontWeight="600"
          textAlign="center"
        >
          Login
        </Typography>
        <TextField
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <TextField
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <Button
          disabled={!onSave}
          variant="contained"
          type="submit"
          sx={{
            padding: "10px",
            cursor: "pointer",
            textTransform: "capitalize",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "center",
            color: "white",
          }}
        >
          {isLoading ? <CircularProgress /> : "Log In"}
        </Button>
        <Typography variant="p" textAlign="center">
          Create a new Account?{" "}
          <Link to="/signUp" style={{ color: "red" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
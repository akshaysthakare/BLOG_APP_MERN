import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../redux/reducers/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    dispatch(register(userData));
    alert("User registerted successfully");
  };

  const onSave = formData.username && formData.email && formData.password;
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
          Sign Up
        </Typography>
        <TextField
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
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
            color: "white"
          }}
        >
          {isLoading ? <CircularProgress /> : "Sign Up"}
        </Button>
        <Typography variant="p" textAlign="center">
          Already have an account.{" "}
          <Link to="/login" style={{ color: "red" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
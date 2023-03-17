import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../redux/reducers/blogSlice";

const CreateBlog = () => {
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const uploadOnChange = (event) => {
    if (event.target.name === "image") {
      setImage(event.target.files[0]);
    }
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = function () {
    //     setImage(reader.result);
    // };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const blogData = {
      title,
      description,
      image,
    };

    dispatch(createPost(blogData));

    setTimeout(() => {
      document.location.reload();
    }, 2000);
  };

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
          Create a Blog
        </Typography>
        <TextField
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Blog Title"
        />
        <TextField
          type="file"
          id="image"
          name="image"
          onChange={uploadOnChange}
        />

        <textarea
          type="text"
          id="description"
          name="description"
          rows="8"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Write blog description"
          style={{
            padding: "10px",
            outline: "none",
            border: "1px solid #999",
            borderRadius: "6px",
            background: "transparent",
            fontSize: "16px",
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            padding: "10px",
            cursor: "pointer",
            textTransform: "capitalize",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateBlog;
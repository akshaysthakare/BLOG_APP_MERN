import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getComment, updateComment } from "../redux/reducers/commentSlice";

const UpdateBlogComment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { comment, isLoading } = useSelector((state) => state.comments);
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getComment(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (comment) {
      setContent(comment?.content);
    } else {
      setContent("");
    }
  }, [comment, setContent]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentId = id;


    dispatch(updateComment({ commentId, content }));
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
          Update your comment
        </Typography>
        <TextField
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your text"
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
            textAlign: "center",
            color: "white",
          }}
        >
          {isLoading ? <CircularProgress /> : "Update"}
        </Button>
      </Paper>
    </Box>
  );
};

export default UpdateBlogComment;
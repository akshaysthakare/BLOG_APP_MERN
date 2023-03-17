import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getComments } from "../redux/reducers/commentSlice";
import { useNavigate } from "react-router-dom";

const Comments = ({comments}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const deleteYourComment = (id) => {
    dispatch(deleteComment(id));
    setTimeout(() => {
      document.location.reload();
    }, 2000);
  };

  return (
    <>
      {comments &&
        comments?.map((comment) => {
          return (
            <Box
              sx={{
                background: "#f4f4f4",
                padding: "10px 12px",
                borderRadius: "10px",
              }}
              key={comment?._id}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontSize="18px" fontWeight="600">
                  {comment?.user.username}
                </Typography>
                <Typography fontSize="14px" sx={{ opacity: "0.6" }}>
                  {new Date(comment?.createdAt).toLocaleString("en-In")}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "monospace",
                  marginTop: "10px",
                }}
              >
                {comment?.content}
              </Typography>

              <Box
                marginTop="10px"
                sx={{
                  textAlign: "right",
                }}
              >
                <EditIcon
                  onClick={() => navigate(`/blog/${comment?._id}/update`)}
                  sx={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
                />
                <DeleteIcon
                  onClick={() => deleteYourComment(comment?._id)}
                  sx={{ color: "red", cursor: "pointer" }}
                />
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default Comments;

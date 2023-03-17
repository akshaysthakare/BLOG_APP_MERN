import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import MessageIcon from "@mui/icons-material/Message";

import Comments from "../components/Comments";
import { getBlog } from "../redux/reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../components/Comment";

const Blog = () => {
  // const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  );


  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "14px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          width: "100%",
          margin: "8rem auto 5rem",
        }}
      >
        <img
          src={blog?.image}
          alt={blog?.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        />

        <Stack padding="20px 10px">
          <Typography variant="p">{blog?.title}</Typography>
          <Typography variant="p">{blog?.description}</Typography>
        </Stack>

        {/* <Box>
          <Button
            onClick={(event) => {
              event.stopPropagation()
              setIsCommentOpen((prev) => !prev)
            }}
            sx={{
              color: "#333",
              cursor: "pointer",
              padding: "10px 12px",
              marginLeft: "20px",
              marginBottom: "10px",
              textTransform: "capitalize",
              background: "#d1cfcf",
              transition: "all 0.2s",

              "&:hover": {
                background: "#999",
                color: "#fff",
              },
            }}
          >
            <MessageIcon />
            <Typography
              fontSize="16px"
              marginLeft="4px"
              fontWeight="600"
              variant="span"
            >
              Comment
            </Typography>
          </Button>
        </Box> */}

        {/* {isCommentOpen && (
          <> */}
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Comment postId={id} />
        </Box>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Comments comments={blog?.comments} />
        </Box>
        {/* </>
        )} */}
      </Box>
    </Box>
  );
};

export default Blog;
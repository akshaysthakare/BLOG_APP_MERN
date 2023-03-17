import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogs, reset } from "../redux/reducers/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(getBlogs());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { lg: "repeat(4, 1fr)", md: "repeat(2, 1fr)" },
        gap: "20px",
      }}
    >
      {blogs &&
        blogs?.map((blog) => {
          return (
            <Box
              key={blog?._id}
              sx={{
                borderRadius: "14px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to={`/blog/${blog?._id}`}>
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                  }}
                />
              </Link>

              <Stack padding="20px 10px">
                <Typography variant="p" fontSize="22px" fontWeight={600}>
                  {blog?.title}
                </Typography>
                <Typography
                  variant="p"
                  sx={{ opacity: "0.85", lineHeight: "24px" }}
                >
                  {blog?.description.substring(0,200) + "..."}
                </Typography>
              </Stack>
            </Box>
          );
        })}
    </Box>
  );
};

export default Blogs;
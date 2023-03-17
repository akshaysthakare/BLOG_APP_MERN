import { Box } from "@mui/material";
import React from "react";
import Blogs from "../components/Blogs";

const Home = () => {
  return (
    <Box sx={{ margin: "5rem 0" }}>
      <Box
        sx={{
          padding: { sm: "40px" },
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "80%",
        }}
      >
        <Blogs />
      </Box>
    </Box>
  );
};

export default Home;
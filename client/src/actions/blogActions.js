import { GET_ALL_BLOG_POSTS, BLOG_POSTS_LOADING } from "./types";

import axios from "axios";

export const getAllPosts = () => dispatch => {
  dispatch(setBlogPostsLoading());
  axios.get("/blog").then(res => {
    dispatch({
      type: GET_ALL_BLOG_POSTS,
      payload: res.data
    });
  });
};

export const setBlogPostsLoading = () => {
  return {
    type: BLOG_POSTS_LOADING
  };
};

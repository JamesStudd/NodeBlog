import { GET_ALL_BLOG_POSTS, BLOG_POSTS_LOADING } from "./../actions/types";

const initialState = { blogPosts: [], loading: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BLOG_POSTS:
      console.log(action);
      return {
        ...state,
        loading: false,
        blogPosts: action.payload
      };
    case BLOG_POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

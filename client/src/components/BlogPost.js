import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "./../actions/blogActions";
import PropTypes from "prop-types";

class BlogPost extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  static propTypes = {
    getAllPosts: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <p> Loading </p>
        ) : (
          <div>
            {this.props.blogPosts.map((blogPost, index) => (
              <p key={blogPost.title}>{blogPost.title}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blogPosts: state.blog.blogPosts,
  loading: state.blog.loading
});

export default connect(mapStateToProps, { getAllPosts })(BlogPost);

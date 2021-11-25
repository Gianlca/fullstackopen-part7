import blogService from '../services/blogs'

const BloglistReducer = (state = [], action) => {
  switch (action.type) {
    case 'GETALL':
      return action.data
    case 'CREATEBLOG':
      return [...state, action.data]
    case 'LIKEDBLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog) 
    case 'DELETEBLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'COMMENTING':
      const blog = state.find(blog => blog.id === action.data.id)
      const newComment = {
        ...blog,
        comments: action.data.comments
      }
      return state.map(blog => blog.id !== action.data.id ? blog : newComment)
    default:
     return state
  }
}

export const Getall = (token) => {
  return async dispatch => {
    const blogs = await blogService.getAll(token)
    dispatch({
      type: 'GETALL',
      data: blogs
    })
  }
}

export const CreateBlog = (blog) => {
  return async dispatch => {
    const createdblog = await blogService.createBlog(blog)
    dispatch({
      type: 'CREATEBLOG',
      data: createdblog
    })
  }
}

export const AddLikeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.likedBlog(blog)
    dispatch({
      type: 'LIKEDBLOG',
      data: likedBlog
    })
  }
}

export const DeleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETEBLOG',
      data: blog
    })
  }
}

export const Commenting = (blog) => {
  return async dispatch => {
    const commentedblog = await blogService.addComment(blog)
    dispatch({
      type: 'COMMENTING',
      data: commentedblog
    })
  }
}

export default BloglistReducer
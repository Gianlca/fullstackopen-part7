import axios from 'axios'
import {authHeader} from '../utils/auth_util'

const baseUrl = '/api/blogs'

const getAll = async(token) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async(blog) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likedBlog = async(blog) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async(blog) => {
  const config = {
    headers: authHeader()
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const addComment = async(blog) => {
  const config= {
    headers: authHeader()
  }
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, blog, config)
  return response.data
}

export default { getAll, createBlog, likedBlog, deleteBlog, addComment }
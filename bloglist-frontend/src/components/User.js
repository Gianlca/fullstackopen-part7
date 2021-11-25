import React from 'react'
import {useParams} from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
const User = ({users}) => {
  const id = useParams().id
  const user = users.find(user => user._id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h3>{user.username}</h3>
      <h4>added blogs</h4>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            {blog.title}
            {blog.likes}
            {blog.url}
          </ListGroup.Item>
        ))}
    </div>
  );
}

export default User

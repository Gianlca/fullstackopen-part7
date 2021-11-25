import React from 'react'
import { useDispatch } from 'react-redux'
import { AddLikeBlog, Commenting, DeleteBlog } from '../reducers/bloglistReducer'
import {useParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const BlogDetail = ({blogs}) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const navigate = useNavigate ()
  const handleVote = () => {
    console.log(blog)
    const addVoteToBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(AddLikeBlog(addVoteToBlog))
  }
  const handleDelete = () => {
    dispatch(DeleteBlog(blog))
    navigate('/')
  }  
  const handleComments = (event) => {
    event.preventDefault()
    const blogWithcomment = {
      ...blog,
      comments: event.target[0].value
    } 
    dispatch(Commenting(blogWithcomment))
    event.target[0].value = ''
  }
  if (!blog) {
    return null
  }
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            {blog.url}
          </Card.Text>
          {
            blog.user !== null ? 
          <Card.Text>
          added by {blog.user.username}
          </Card.Text> : null         
          }

          <Card.Text>
          {blog.likes}likes
          <Button onClick={handleVote} variant="primary" size="sm" className="m-2">
          like
        </Button>          
          </Card.Text> 
          <Button onClick={handleDelete} variant="primary">
          delete
        </Button>                   
        </Card.Body>
      </Card>      
      <div>
        <h3>Comments</h3>
        <div>
          <Form onSubmit={handleComments}>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Group className="mb-3">
                  <Form.Control id="comment" placeholder="comment" />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="outline-primary" size="sm" className="mb-3">
                  add comment
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <ul>
          <div>
            {blog.comments.map((el) => (
              <li key={el._id}>{el.comment}</li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default BlogDetail

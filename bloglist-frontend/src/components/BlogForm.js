import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CreateBlog } from '../reducers/bloglistReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const handleCreation = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    dispatch(CreateBlog(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const changeTitle = ({target}) => setTitle(target.value)
  const changeAuthor = ({target}) => setAuthor(target.value)
  const changeUrl = ({target}) => setUrl(target.value)
  return (
   
      <Form onSubmit={handleCreation}>
        <Row className="align-items-center">
        <Col xs="auto">
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>title</Form.Label>
          <Form.Control
            id="title"
            placeholder="title"
            value={title}
            onChange={changeTitle}
          />
        </Form.Group>
        </Col>
        <Col xs="auto">
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>author</Form.Label>
          <Form.Control
            id="author"
            placeholder="author"
            value={author}
            onChange={changeAuthor}
          />
        </Form.Group>
        </Col>
        <Col xs="auto">
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>url</Form.Label>
          <Form.Control
            id="url"
            placeholder="url"
            value={url}
            onChange={changeUrl}
          />
        </Form.Group>
        </Col>
        <Col xs="auto">
        <Button type="submit" className="mb-3">Create a blog</Button>
        </Col>
        </Row>        
      </Form>
  
  );
}

export default BlogForm
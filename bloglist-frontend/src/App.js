import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Table,
  Form,
  Button,
  Alert,
  Nav,
  Navbar,
  Container,
  ListGroup,
} from "react-bootstrap";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Notification from "./components/Notification";
import { Getall } from "./reducers/bloglistReducer";
import { SetUser } from "./reducers/loginReducer";
import { GettingAllUsers } from "./reducers/usersReducer";
import User from "./components/User";
import BlogDetail from "./components/BlogDetail";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogLists }) => blogLists);
  const user = useSelector(({ loginReducer }) => loginReducer);
  const users = useSelector(({ users }) => users);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(SetUser(null));
  };
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(SetUser(user));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(Getall());
      dispatch(GettingAllUsers());
    }
  }, [user]);

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/" as="span">
                <Link to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>
            </Nav>
            {user !== null ? (
              <Navbar.Text
                className="justify-content-end"
                style={{ marginLeft: "auto" }}
              >
                {user.username}{" "}
                <Button variant="primary" onClick={handleLogout}>
                  logout
                </Button>
              </Navbar.Text>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Notification />
      <div className="container">
        <h2>Blog APP</h2>
        <Routes>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} />} />
          <Route
            path="/"
            element={
              <div>
                {user === null ? (
                  <LoginForm />
                ) : (
                  <>
                    <BlogForm />
                    <ListGroup>
                      <h3>All Blogs created</h3>
                      {blogs.map((blog) => (
                        <ListGroup.Item key={blog.id}>
                          <Blog blog={blog} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

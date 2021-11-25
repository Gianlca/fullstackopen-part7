import { Link } from 'react-router-dom' 
const Users = ({users}) => {
  return (
    <div>

      {users.map((user) => (
        <div key={user._id}>
          <div>
          <Link to={`/users/${user._id}`}>
            <h3>{user.username}</h3>
          </Link>
          </div>
          <div>blogs created: {user.blogs.length} </div>
        </div>
      ))}
    </div>
  );
}

export default Users

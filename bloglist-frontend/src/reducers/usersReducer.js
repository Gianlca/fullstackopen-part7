import usersService from '../services/users'

const UsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GETALLUSERS':
      return action.data
  
    default:
      return state
  }
}

export const GettingAllUsers = () => {
  return async dispatch => {
   const response = await usersService.getAllUsers()
    dispatch ({
      type: 'GETALLUSERS',
      data: response
  })
  }
}

export default UsersReducer
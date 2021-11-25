
const LoginReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER':
      return action.data  
    default:
      return state
  }
}

export const SetUser = (user) => {
  return {
    type: 'USER',
    data: user
  }
}

export default LoginReducer
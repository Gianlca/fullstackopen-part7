
const NotificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEWNOTIFICATION':
      return action.data  
    default:
      return state
  }
}

export const NOTIFING = (message) => {
  return {
    type: 'NEWNOTIFICATION',
    data: message
  }
}

export default NotificationReducer
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',  
  reducers: {
    setNotification(state, action) {
      return action.payload  
    },
    clearNotification() {
      return ''  
    },
    setNotificationWithTimeout(state, action) {
        return action.payload.message
    }
  }
})

export const { setNotification, clearNotification, setNotificationWithTimeout } = notificationSlice.actions

export const setNotificationWithTimeoutAsync = (message, timeoutInSeconds) => {
  return async dispatch => {
    dispatch(setNotificationWithTimeout({ message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutInSeconds * 1000) 
  }
}

export default notificationSlice.reducer

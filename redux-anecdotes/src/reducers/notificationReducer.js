import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',  // Alussa ei ole viestiä
  reducers: {
    setNotification(state, action) {
      return action.payload  // Asettaa notifikaation tilaksi uuden viestin
    },
    clearNotification() {
      return ''  // Tyhjentää notifikaation tilan
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

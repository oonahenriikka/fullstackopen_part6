import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload) 
    },
    setAnecdotes(state, action) {
      return action.payload 
    },
    updateAnecdote(state, action) {
      const changed = action.payload
      return state.map(a => a.id !== changed.id ? a : changed) 
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const anecdotes = await anecdoteService.getAll() 
      dispatch(setAnecdotes(anecdotes)) 
    } catch (error) {
      console.error('Anecdote initialization failed:', error)
    }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    try {
      
      const newAnecdote = await anecdoteService.createNew(content)
      
      
      dispatch(appendAnecdote(newAnecdote))

      
      console.log('New anecdote created:', newAnecdote)
    } catch (error) {
      console.error('Error creating anecdote:', error) 
    }
  }
}


export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    try {
      
      const anecdote = getState().anecdotes.find(a => a.id === id)
      
      const updated = { ...anecdote, votes: anecdote.votes + 1 }

      const returned = await anecdoteService.update(id, updated)

      dispatch(updateAnecdote(returned))

      console.log('Anecdote updated with new vote:', returned)
    } catch (error) {
      console.error('Error voting for anecdote:', error) 
    }
  }
}


export default anecdoteSlice.reducer

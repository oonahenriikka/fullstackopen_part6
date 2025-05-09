import { useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import { createAnecdote } from './reducers/anecdoteReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    console.log("dispatching vote for", anecdote.content) // Debuggaus
    dispatch(voteAnecdote(anecdote.id))
    const voteMessage = `you voted '${anecdote.content}'`
    console.log("dispatching notification: ", voteMessage) // Debuggaus
    dispatch(setNotification(voteMessage))

    setTimeout(() => {
      console.log("dispatching clearNotification") // Debuggaus
      dispatch(clearNotification())
    }, 5000)
  }

  const handleCreate = (content) => {
    console.log("dispatching create for", content) // Debuggaus
    dispatch(createAnecdote(content))
    const createMessage = `you created '${content}'`
    console.log("dispatching notification: ", createMessage) // Debuggaus
    dispatch(setNotification(createMessage))

    setTimeout(() => {
      console.log("dispatching clearNotification") // Debuggaus
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm createAnecdote={handleCreate} />
      <AnecdoteList vote={handleVote} />
    </div>
  )
}

export default App

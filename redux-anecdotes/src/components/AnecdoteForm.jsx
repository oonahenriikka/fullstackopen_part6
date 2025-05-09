import PropTypes from 'prop-types'

const AnecdoteForm = ({ createAnecdote }) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content) // ✅ Kutsutaan nyt propsina saatua funktiota
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

// 🔧 Lisätään prop validation
AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired
}

export default AnecdoteForm

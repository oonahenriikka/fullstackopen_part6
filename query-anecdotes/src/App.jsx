import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Notification from './components/Notification';
import { useNotification } from './NotificationContext';

const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes');
  return response.data;
};

const createAnecdote = async (content) => {
  const response = await axios.post('http://localhost:3001/anecdotes', { content, votes: 0 });
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

const App = () => {
  const queryClient = useQueryClient();
  const [_, dispatch] = useNotification();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch({ type: 'SET', payload: `anecdote '${newAnecdote.content}' created` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);
    },
    onError: (error) => {
      dispatch({ type: 'SET', payload: 'too short anecdote, must have length 5 or more' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);
    },
  });

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch({ type: 'SET', payload: `you voted '${updatedAnecdote.content}'` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);
    },
  });

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length >= 5) {
      createMutation.mutate(content);
      event.target.anecdote.value = '';
    } else {
      dispatch({ type: 'SET', payload: 'too short anecdote, must have length 5 or more' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);
    }
  };

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Anecdote service not available due to problems in server</div>;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <h3>Create new</h3>
      <form onSubmit={handleCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
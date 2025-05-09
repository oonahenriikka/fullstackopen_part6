import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.jsx'

// Haetaan root-elementti HTML:stä
const root = ReactDOM.createRoot(document.getElementById('root'))

// Renderöidään sovellus ja kiedotaan se Provider-komponenttiin
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

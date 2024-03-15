import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './contexts/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
)

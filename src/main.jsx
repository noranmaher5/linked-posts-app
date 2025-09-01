import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import PostContextProvider from './Context/PostContext' // import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostContextProvider>
      <App />
    </PostContextProvider>
  </StrictMode>
)

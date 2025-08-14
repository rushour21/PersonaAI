import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Your pages/components
import App from './App.jsx'
import ChatComponent from './component/chatsection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chaton" element={<ChatComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


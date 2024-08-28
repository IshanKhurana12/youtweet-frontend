import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import AuthMiddleware from './AuthMiddleware.jsx'
createRoot(document.getElementById('root')).render(

  <RecoilRoot>

  <App />


  </RecoilRoot>

)

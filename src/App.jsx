import { useState } from 'react'
import Login from './Login'
import {RecoilRoot} from "recoil";
import UserChannelReport from './UserChannelReport';
import Nav from './Nav';
import AuthMiddleware from './AuthMiddleware';
import { Analytics } from "@vercel/analytics/react"
function App() {
return(
  <>

  <Nav />
  <Analytics />

  </>
)
}

export default App

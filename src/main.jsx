import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Test1 from './Test1.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
<Test1/>
  </StrictMode>,
)

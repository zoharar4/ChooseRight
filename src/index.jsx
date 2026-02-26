// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import "./assets/styles/main.css"

import { RootCmp } from './RootCmp'

createRoot(document.getElementById('root')).render(
    <Router basename='/ChooseRight/'>
        <RootCmp />
    </Router>
)

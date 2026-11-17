import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// App-level layout and sidebar styles.
import './App.css'
import { RouterProvider } from "react-router/dom";
import { router } from "@/router";
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
  </StrictMode>,
)

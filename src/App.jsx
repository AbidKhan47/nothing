import { useState } from 'react'
import './App.css'
import Sidebar from './sidebar'
import Homepage from './homepage'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Sidebar></Sidebar>
    </>
  )
}

export default App

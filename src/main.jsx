import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './homepage'
import Create from './create'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Gallery from './gallery'
import Among from './pictures'
const api_key = import.meta.env.VITE_API_KEY
const supabaseurl = import.meta.env.VITE_URL


import { createClient } from '@supabase/supabase-js'
import Update from './update'

const supabase = createClient( supabaseurl, api_key)

const among = {
  red: Among.red,
  blue: Among.blue,
  green: Among.green,
  yellow: Among.yellow,
  purple: Among.purple,
  orange: Among.orange,
  pink: Among.pink
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
      <App/>
        <Routes>
          <Route path='/' element = {<Homepage supabase = {supabase}/>}/>
          <Route path="/home" element = {<Homepage supabase = {supabase}/>}/>
          <Route path='/create' element = {<Create supabase = {supabase} among = {among}/>}/>
          <Route path='/gallery' element = {<Gallery supabase = {supabase} among = {among}/>}/>
          <Route path='/update/:id' element = {<Update supabase = {supabase} among = {among}/>}/>
          
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)


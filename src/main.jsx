import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './homepage'
import Create from './create'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Gallery from './gallery'
const api_key = process.env.VITE_APP_ANON_KEY
const supabaseurl = process.env.VITE_APP_URL
console.log('API Key:', api_key);
console.log('Supabase URL:', supabaseurl);


import { createClient } from '@supabase/supabase-js'
import Update from './update'

const supabase = createClient( supabaseurl, api_key)

const among = {
  red: "src/sus/61d183263a856e0004c6334a.png",
  blue: "src/sus/among_us_player_blue_icon_156941.png",
  green: "src/sus/61d183753a856e0004c6334c.png",
  yellow: "src/sus/Yellow.webp",
  purple: "src/sus/9kvk25sh2sn51.png",
  orange: "src/sus/ee0b8322db7fb7939469a67e889318d4.png",
  pink: "src/sus/e51f80397c0915b1a688a25d52e82648.png"
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


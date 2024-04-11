import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import CurrencySelector from './components/CurrencySelector'

function App() {

  return (
    <>
      <Header/>
      <CurrencySelector/>
      <CurrencySelector/>
    </>
  )
}

export default App

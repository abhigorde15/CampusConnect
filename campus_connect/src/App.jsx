
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import NotesPage from './pages/NotesPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  

  return (
    <BrowserRouter className='font-sans '>
      <Navbar />
      <Routes>
       <Route path='/' element={ <HomePage />} />
       <Route path='/notes' element={ <NotesPage />} />
      </Routes>
    
     <Footer />
    </BrowserRouter>
  )
}

export default App

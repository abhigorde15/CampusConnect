
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import NotesPage from './pages/NotesPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/RegisterPage'
import ChatGroupPage from './pages/ChatGroupPage'
import ChatPage from './components/ChatPage'
import AdminProfilePage from './pages/AdminProfilePage'
import UserProfilePage from './pages/UserProfilePage'
function App() {
  

  return (
    <BrowserRouter className='font-sans '>
      <Navbar />
      <Routes>
       <Route path='/' element={ <HomePage />} />
       <Route path='/notes' element={ <NotesPage />} />
       <Route path='/auth' element={ <LoginPage />} />
        <Route path='/signup' element={ <SignUpPage />} />
        <Route path='/chat_groups' element={ <ChatGroupPage/>} />
        {/* <Route path='/chat/cse' element={ <JoinCreateChat/>} /> */}
         <Route path='/chat/cse' element={ <ChatPage/>} /> 
         <Route path='/admin/profile' element={<AdminProfilePage/>} /> 
          <Route path='/user/profile' element={ <UserProfilePage />} /> 
      </Routes>
    
     <Footer />
    </BrowserRouter>
  )
}

export default App

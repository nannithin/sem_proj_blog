
import './App.css'
import Nav from './components/nav'
import Login from './pages/login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './pages/signup'
import Home from './pages/home'
import Blog from './pages/blog'
import Profile from './pages/profile'
import Create from './pages/create'
import Private from './components/private'
import { createContext, useEffect, useState } from 'react'
export const UserContext = createContext({})

function App() {
  const [userAuth,setUserAuth] = useState({});
  useEffect(() => {

        let userInSession = localStorage.getItem("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth(null)
    
    }, [])

  
  return (
    <>
      
        <UserContext.Provider value={{userAuth,setUserAuth}}>
        <div>
        <Routes>
          
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
          <Route element={<Private />}>
            <Route path='/' element={<Home />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/pfp' element={<Profile />} />
            <Route path='/create' element={<Create />} />
          </Route>
        </Routes>  
        </div>
        </UserContext.Provider>

      

    </>
  )
}

export default App

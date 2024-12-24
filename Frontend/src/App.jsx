import React, { useEffect } from 'react'
import Home from './pages/Home'
import AllTasks from './pages/Alltasks'
import ImpTasks from './pages/Imptasks'
import IncompTask from './pages/IncompTask'
import { Routes , Route, useNavigate  } from 'react-router'
import Completetask from './pages/Completetask'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(localStorage.getItem('id') && localStorage.getItem('token')){
      dispatch(authActions.login())
    }else if(isLoggedIn === false){
      navigate('/signup')
    }
  },[])
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      
        <Routes>
          <Route exact path='/' element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path='/importantTasks' element={<ImpTasks />} />
          <Route path='/completeTasks' element={<Completetask />} />
          <Route path='/incompleteTasks' element={<IncompTask />} />
          </Route>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
    </div>
  )
}

export default App

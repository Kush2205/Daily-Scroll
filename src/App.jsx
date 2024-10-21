import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { login,logout } from './store/authSlice';
import { useDispatch , useSelector } from 'react-redux';

import Login from './components/Login'
import SignupForm from './components/Signup'
import Layout from './Layout'
import Dashboard from './components/Dashboard'
import Header from './components/Header';
import RTE from './components/RTE';
function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  if(status){
    return (
      <>
     
       <Router>
       <Header />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element ={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addpost" element={<RTE />} />
        </Routes>
       </Router>
      </>
    )
  }
  else{
    return (
      <>
      
       <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element ={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        
        </Routes>
       </Router>
      </>
    )
  }
  
}

export default App

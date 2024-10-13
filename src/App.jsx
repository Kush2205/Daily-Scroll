import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Login from './components/Login'
import SignupForm from './components/Signup'
import Layout from './Layout';
function App() {
  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element ={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
     </Router>
    </>
  )
}

export default App

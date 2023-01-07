import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import PageNotFound from "./pages/PageNotFound";
import Profile from './pages/Profile';

function App() {

  const [authState, setAuthState] = useState({username: "", id: 0, status: false});

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem("accessToken")
    }}). then((res) => {
      if (res.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({username: res.data.username, id: res.data.id, status: true});
      }
    }
  )}, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className='navbar'>

          { !authState.status ? (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/registration"> Registration </Link>
          </>
          ): (
            <>
              <Link to="/">Home page</Link>
              <Link to="/createPost"> Create A Post</Link>
              <button onClick={logout}>Logout</button>
            </>
          )} 
          <h1>{authState.username}</h1>
        </div>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/createPost" exact element={<CreatePost/>} />
          <Route path="/post/:id" exact element={<Post/>} />
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="*" exact element={<PageNotFound />}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState("");

  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login setJwt={setJwt} setUser={setUser} jwt={jwt} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

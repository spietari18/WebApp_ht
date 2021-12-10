import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  return (
    <Router>
      <div className="App">
        <Menu user={user} jwt={jwt} />
        <Routes>
          <Route path="/" element={<Posts user={user} jwt={jwt} />} />
          <Route path="/post/:id" element={<Post user={user} jwt={jwt} />} />
          <Route path="/login" element={<Login setJwt={setJwt} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

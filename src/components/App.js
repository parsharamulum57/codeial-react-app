import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login, Settings, Signup } from '../pages';
import { Navbar, Loader } from './';

const giveComponent = (user, comp) => {
  if (user) {
    return comp;
  }
  return <Navigate to="/login"></Navigate>;
};
function App() {
  const auth = useAuth();
  console.log('in APP auth ', auth);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/settings"
          element={giveComponent(auth.user, <Settings />)}
        />
      </Routes>
    </div>
  );
}

export default App;

import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { authActions } from './app/slices/authSlice';
import decode from 'jwt-decode';

import Home from './components/Home/Home';
import Login from './pages/Login/Login';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const logout = useCallback(() => {
    dispatch(authActions.LOGOUT());
    navigate('/');
  }, [navigate, dispatch]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [user, logout]);

  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

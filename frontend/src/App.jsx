import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/Error';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setChatHistory } from './store/slices/user';
import axiosInstance from './lib/axios';
import Chat from './components/Chat';
import NewChat from './components/NewChat';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/');
        dispatch(setUser(res.data.data));
        dispatch(setChatHistory(res.data.data.chatHistory))
      } catch (error) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          navigate('/login');
        } else if (status >= 500) {
          navigate('/error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route path="/" element={data ? <Home /> : <Landing />}>
        <Route index element={<NewChat />} />
        <Route path=":id" element={<Chat />} />
      </Route>
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={data ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={data ? <Navigate to="/" /> : <Signup />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;

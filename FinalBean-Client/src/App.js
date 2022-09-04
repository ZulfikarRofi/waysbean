import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

//pages here!
import Landing from "./pages/Landing";
import Detail from "./pages/Detail";
import ListProduct from "./pages/ListProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import AdminPage from "./pages/AdminPage";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/userContext";


//init token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {

  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.level === 'admin') {
        navigate('/admin');
      } else if (state.user.level === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')

      //if the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      //Get user data
      let payload = response.data.data;

      //get token from local storage
      payload.token = localStorage.token;

      //send to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   checkUser();
  // }, [])


  return (
    <Routes>
      <Route exact path="/" element={ <Landing /> } />
      <Route exact path="/detail/:id" element={ <Detail /> } />
      <Route exact path="/list-product" element={ <ListProduct /> } />
      <Route exact path="/profile" element={ <Profile /> } />
      <Route exact path="/cart" element={ <Cart /> } />
      <Route exact path="/add-product" element={ <AddProduct /> } />
      <Route exact path="/admin" element={ <AdminPage /> } />
    </Routes>
  );
}

export default App;

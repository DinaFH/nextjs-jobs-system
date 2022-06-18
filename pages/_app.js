import Layout from '../components/Layout';
import '../styles/globals.css' ;

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createContext, useEffect, useLayoutEffect, useState} from "react";
import {isLoggedIn} from "../helpers/functions";
import api from "../config/api";
import {useRouter} from "next/router";
export const AppContext = createContext({
  isAuth: false,
  setIsAuth: (value) => {},
  logout: () => {},
  getLoginData: () => {},
  userRole: '',
  userId: 0,
})
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({
    userRole: '',
    userId: 0
  });
  const logout = () => {
    setIsAuth(false);
    setUserData({
      userRole: '',
      userId: 0
    });
  }
  const getLoginData = () => {
    setIsAuth(isLoggedIn());
    if (isLoggedIn()) {
      api(`/api/v1/account/profile`).then(response => {
        setUserData({userRole: response.type, userId: response.id});
      });
    }
  }
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      getLoginData();
    }
  }, []);
  useLayoutEffect(() => {
    if (router.pathname !== '/login' && router.pathname !== '/signup' && router.pathname !== '/' && !isAuth) {
      location.href = '/'
    }
  }, [router.pathname]);
  return (
    <AppContext.Provider value={{isAuth, setIsAuth, ...userData, getLoginData, logout}}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp

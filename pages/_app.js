import Layout from '../components/Layout';
import '../styles/globals.css' ;

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createContext, useEffect, useState} from "react";
import {isLoggedIn} from "../helpers/functions";
import api from "../config/api";
export const AppContext = createContext({
  isAuth: false,
  setIsAuth: (value) => {}
})
function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setIsAuth(isLoggedIn());
      if (isLoggedIn()) {
        api(`/api/v1/account/profile`).then(response => {
          setUserRole(response.type);
        });
      }
    }
  }, []);
  return (
    <AppContext.Provider value={{isAuth, setIsAuth, userRole}}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp

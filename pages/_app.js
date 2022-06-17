import Layout from '../components/Layout';
import '../styles/globals.css' ;

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createContext, useEffect, useState} from "react";
import {isLoggedIn} from "../helpers/functions";
export const AppContext = createContext({
  isAuth: false,
  setIsAuth: (value) => {}
})
function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setIsAuth(isLoggedIn());
    }
  }, []);
  return (
    <AppContext.Provider value={{isAuth, setIsAuth}}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp

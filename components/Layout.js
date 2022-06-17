
import Header from './Header';
import Footer from './Footer';

function Layout({children}) {
  return (
    <div className="content">
      <Header/>
      {children}
      {/*<Footer/>*/}
    </div>
  );
}

export default Layout;

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Sepet from './pages/Sepet/Sepet';
import {AdminPanel} from './pages/Admin'; //bu şekilde kullanılabilir index.js ekleyerek
import { useSelector } from 'react-redux';


function App() {
  /**
 * Slice'lar içinde bulunan state bilgilerine ulaşmak için useSelector kullanacağız ve
 * bu bilgiler doğrultusunda sayfaların render olmassını sağlayacağız. islogin false için
 * adminpanele girilmeyecek true ise girilecek
 * Bu durum aşağıdaki değişken ile takip edilecek ve route kısmınfda koşul ile yönlendirme yapılacak
 */

   const isLogin = useSelector(state => state.personel.isLogin);


  return (
    <BrowserRouter>
      <Routes>
           <Route path='/' element={<Home />}/>
           <Route path='/register' element={<Register />}/>
           <Route path='/login' element={<Login />}/>
           <Route path='/sepet' element={<Sepet />}/>
           <Route path='/admin-panel' element={isLogin ? <AdminPanel /> : <Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

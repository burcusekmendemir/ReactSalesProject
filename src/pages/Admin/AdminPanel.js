import {  useDispatch, useSelector } from "react-redux"; //useDispatch reduxın fetch işlemlerini tetiklemek için ve reducer methodlarnı tetikelmek için kullanılır
import UserProfile from "../../components/molecule/UserProfile";
import { useEffect, useState} from "react";
import {  fetchUrunListele } from "../../store/features/urunSlice";
import { fetchMenuListele } from "../../store/features/menuSlice";
import Menu from "../../components/molecule/Menu";
import UrunEkleme from "../../components/organism/UrunEkleme";
import PersonelEkleme from "../../components/organism/PersonelEkleme";

function AdminPanel(){
    const dispatch =useDispatch();
   // const [menuId, setMenuId] = useState();
   const menuId =useSelector(state => state.menu.activeMenuId);
   

    useEffect(() => {
        dispatch(fetchUrunListele());
        dispatch(fetchMenuListele());
    }, [dispatch]);

    let OrtaAlan = () => {
        if(menuId===1)
             return <UrunEkleme />
        else if(menuId ===3)
             return <PersonelEkleme />
        else   
           return null;
           
     }
     console.log('admin panel render oldu.')

   
    /**
     * useselecetor redux içinde bizim stateimizi seçiyor, state index.jsdeki store onun da içindeki reducer personel, 
     * admin paneldeki state.personel.data, personel bilgisi personelslicedean geliyor o da personelslicedeki createslice ile yaratılıyor.
     * Bağlaya bağlaya bütün sisteme enjekte edilip istenilen her eyrden erişim sağlanıyor.
     */

    return(

      <div className="container">
           <div className="row mt-5 p-3 border border-primary arround-1">
               <div className="col-10"></div>
               <div className="col-2 p-3 border border-danger">  <UserProfile />  </div>
           </div>

           <div className="row mt-1 p-3 border border-success">
              <div className="col-3 ">   
              {
                /**
                 *  <Menu secimYapildi={(secim) => {
                console.log('admin panel secilen...: ', secim);
                setMenuId(secim);
                />  
               }}
                 */
              }
              
              <Menu />
              </div>
              <div className="col-9"> 
                {
                  <OrtaAlan />
                }
              </div>
           </div>
      </div>
      ); 
}

export default AdminPanel;
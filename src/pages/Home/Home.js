
import { useDispatch, useSelector } from "react-redux";
import UrunListesi from "../../components/organism/UrunListesi";
import { useEffect,useState } from "react";
import { fetchUrunListele } from "../../store/features/urunSlice";
import { sepeteEkle, sepettenÇıkart } from "../../store/features/sepetSlice";
import { useNavigate } from "react-router-dom";



function Home(){
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const urunList= useSelector((state) =>state.urun.urunList); //urunlistesini selector ile çekiyoruz, anasayfa global state içindeki urunlsitesini takibe alacakv e değiştiğinde kendisni render alacak

    useEffect(()=>{
        dispatch(fetchUrunListele());
    },[]); //bir cosntructor gibi kullanıyrouz sayfa açıdığında şunu yap diyoruz, şunu tetile diyoruz 

    const [isActive, setIsActive] =useState(false);
    const sepetAdedi = useSelector((state) => state.urun.sepetAdedi);
    const buttonClick= () => {
        navigate.call(null, '/sepet');
    }
    

    return(

     <>
        <div className="container-fluit">
            <div className="row mt-3"> 
              <div className="col-9"></div>

              <div className="col-3">
                  <button onClick={buttonClick} type="button" class="btn btn-primary position-relative">
                          <i class="fa-solid fa-cart-shopping"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {sepetAdedi}  
                        <span class="visually-hidden">unread messages</span>
                        </span>
                  </button>
              </div>
            </div>  
        </div>

        <div className="container mt-5">
            <UrunListesi urunListesi={urunList} />
        </div>

        </>
        
    )

};

export default Home;
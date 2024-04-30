import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSepeteEkle, sepeteEkle, sepettenCikart } from "../../store/features/sepetSlice";


function UrunKarti(props){
    const dispatch=useDispatch(); //seeptadedi tetikleyecek
    const urun=props.urun; //dışarıdan porps ile urun veriyoruz. Bunu kullanarak resima ad vs yazacağız
    const [isActive, setIsActive] =useState(false);
    const sepetAdedi =useSelector ((state) => state.sepet.sepetAdedi); //sepetadedini takip edecek, 3 üzerindeyse artık eklee çıkartma yapamayız
    const buttonClick = () => {
        if(isActive){ //true ise sepetten çıkart
            dispatch(sepettenCikart(urun));
        }else{ //false ise sepete ekle
            dispatch(sepeteEkle(urun));
            dispatch(fetchSepeteEkle({
                userId: 1,
                urunId: urun.id,
                adet: 1,
                fiyat: urun.fiyat
            }));
        }
        setIsActive(!isActive); //eğer aktifse pasife, pasifse aktife geçir demek.
    }

    return(

        <div className="col-3 m-3 border-success ">
            <div className="row justify-content-center align-items-center">
                <img alt="" src={urun.resim} style={{height: '70%', width:'70%', marginTop: 10, borderRadius: '20px'}}></img>
            </div>
            <div className="row p-2">
                <h3>{urun.ad}</h3>
            </div>
            <div className="row p-2">
                <p>{urun.aciklama}</p>
            </div>
            <div className="row p-2">
                <p>{urun.fiyat}</p>
            </div>
            <div className="row p-2">
                {
                    sepetAdedi < 3 || isActive //3ün altındaysa alttaki butonlar değilse null olsun. isactive ise görünecek
                    ?
                      isActive
                      ?  <button onClick={buttonClick} className="btn btn-danger">Sepetten Çıkart</button> 
                      :  <button onClick={buttonClick} className="btn btn-info">Sepete Ekle</button>
                    : null
                }
               
            </div>
        </div>

    )

};

export default UrunKarti;
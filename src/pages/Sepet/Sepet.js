import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSepetListele } from "../../store/features/sepetSlice";


function Sepet(){
    const dispatch= useDispatch();

    const [toplamFiyat, setToplamFiyat] =useState(hesaplaToplamFiyat(sunucuSepetListesi));

    const sepetListesi=useSelector((state) => state.sepet.sepetList);
    const sunucuSepetListesi=useSelector(state => state.sepet.userSepetList);


    const hesaplaToplamFiyat = (list) => {
        let toplam = 0;
        list.forEach((data) => {
            toplam += data.toplamFiyat;
        });
        return toplam;
    };

   useEffect(() => {
       dispatch(fetchSepetListele(1)); //token göndereceğiz.
    }, []);

    return(

        <div className="container">

            <div className="row mt-5 p-3 arround-1 ">
                <h1>Sepet</h1>

            </div>
            <div className="row mt-5 p-3   arround-1">

                <div className="col-3"></div>
                <div className="col-6 border border-success">
                {
                sepetListesi.map((data,index) => {

                    return (
                        <div className="row border " key={index}> 
                      <div className="col-3 p-2 ms-5 ">
                          <img src={data.resim} alt="" height={80} width={80} />
                      </div>

                      <div className="col-3 p-2">
                          <p>{data.ad}</p>
                      </div>

                      <div className="col-3 p-2">
                         <p>{data.fiyat} ₺ </p>
                       </div>
                       <div className="col-3 p-2">
                         <p>{data.toplamFiyat} ₺ </p>
                       </div>
                     </div>
                     ) 
                })
                }

                <div className="row p-3 ">
                 <div className="col-12 ms-4">
                     <p>Toplam Fiyat: {toplamFiyat}</p>
                 </div>
                </div>

                <div className="row-p-3">
                    <div className="ms-4" >
                        <button style={{backgroundColor: '#0d6efd', color: 'white', border: '1px solid #0d6efd', 
                        padding: '8px 16px', borderRadius: '4px'}}>Sepeti Onayla</button>
                    </div>
                    

                </div>
                </div>


            </div>


            
                

            
            <div className="row"></div>

        </div>

    )

};

export default Sepet;
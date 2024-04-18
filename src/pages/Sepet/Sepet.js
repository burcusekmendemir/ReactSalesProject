import { useState,useEffect } from "react";
import { useSelector } from "react-redux";


function Sepet(){

    const [toplamFiyat, setToplamFiyat] =useState(0);

    const sepetListesi=useSelector((state) => state.sepet.sepetList);
    console.log(sepetListesi);


    const hesaplaToplamFiyat = () => {
        let toplam = 0;
        sepetListesi.forEach((data) => {
            toplam += data.fiyat;
        });
        return toplam;
    };

   useEffect(() => {
        setToplamFiyat(hesaplaToplamFiyat());
    }, [sepetListesi]);

    return(

        <div className="container">

            <div className="row mt-5 p-3 border border-primary arround-1">
                <h1>Sepet</h1>

            </div>
            <div className="row mt-5 p-3 border border-primary arround-1">

                {

                sepetListesi.map((data,index) => {

                    return (
                        <div className="row" key={index}> 
                      <div className="col-3">
                          <img src={data.resim} alt="" height={80} width={80} />
                      </div>

                      <div className="col-3">
                          <p>{data.ad}</p>
                      </div>

                      <div className="col-3">
                         <p>{data.fiyat}</p>
                       </div>
                     </div>

                     ) 
                
                    
                })
                }

                <div className="row">
                 <div className="col-12">
                     <p>Toplam Fiyat: {toplamFiyat}</p>
                 </div>
                </div>

            </div>


            
                

            
            <div className="row"></div>

        </div>

    )

};

export default Sepet;
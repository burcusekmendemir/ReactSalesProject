import UrunKarti from "../molecule/UrunKarti";

function UrunListesi(props){
    const urunListesi=props.urunListesi; //props ile urunlistesi talep ediyoruz çünnkü farklı ürünlisteleri talep edilebilir

    return(
        <div className="row">

            {
                urunListesi.map((urun,index) =>{
                    return <UrunKarti key={index} urun={urun} />
                })
            }
            
        

        </div>

    )
};

export default UrunListesi;
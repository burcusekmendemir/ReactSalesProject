import  restApi  from './RestApis';

const urunUrl ={
    urunEkle: restApi.urunUrl + '/ekle', //burası javadaki method mappingindden alındı
    urunListele: restApi.urunUrl + '/get-all',
};

export default urunUrl;
import  restApi  from './RestApis';

const menuUrl={
    menuEkle: restApi.menuUrl + '/add-menu',
    menuListele: restApi.menuUrl + '/get-menu',
};

export default menuUrl;
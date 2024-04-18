//slice içindeki parametreleri takipe dicez, token var ı yok mu kişi login olmuş mu olmamış mı gibi..
//biri fetch işlemini takip eden dieğri de setleyeceğimiz işlemleri takip etmek için.

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userController from '../../config/UserController';

const personelInitialState= {
    token: '',
    data: {},
    isLogin: false,
    isLoadingFetchLogin: false,
    isLoadingFetchRegister: false
};

/**
 * Burada 2 farklı işlemimiz olacak
 *   1- fetch işlemlerini yöneteceğimiz kısım.
 *   2- state bilgilerini güncellediğimiz kısım.
 *   state bilgileri fetch işlemlerinin sonuçlarına göre takip edilerek setlenebilirler.
 */

/**
 * DİKKAT!!!
 * Burada asyncThunk'lara verdiğibiz isimler benzersiz olmalıdır. Kopyala
 * yapıştır ile işlem yapılırken genellikle isimler değiştirilmeden işlem 
 * yapılmaya çalışılır bu nedenle snuçlar hatalı çalışır.
 */

/**
 * burada mantık şöyle: bir arrow function yazıyoruz bu fonskiyon çalıaşcak ve çalıştıtkan 
 * sonra bir sonuç dönecek bu sonuçla biz de bir işlem yapacağız.
 * Payload -> bu method kullanmak isteyen birisi methoda parametre girmek istiyor ise bunu
 * kullanıe. Yani bu methoda girilen tüm değişkenler bu payload değişkenine atanır.
 * fetchLogin({username,password}) -> username,password =payload
 * 
 * Daha sonra, bir fetch işlemi yapılacak fetch işlemi sonunda dönen değerin hepsi response olarak dönülür.
 * bunu jsona çevirip then ile data return edilir. return nasıl edilecek? bunun için const result değişkenine 
 * fetch işlemini atıyoruz ve bure resulta dönyoruz
 * 
 * public String getName(){
 * return "ali";}
 * 
 * DİKKAT!!!!
 * async işlemler zaman alan işlemlerdir ve kendileri tetiklendikten sonra diğer kodların çalışmasına izin verirler.
 * Ancak eğer bu işlemin neticesi bekelencek ise o zaman asenkron işlemin bitişinini bekletilebilmesi için method
 * önüne "await" eklenir.
 * 
 * Dışarıdan erişilebilmesi için başlarına export ekledik.
 * 
 */
export const fetchLogin = createAsyncThunk(
    'personel/fetchLogin',
     async (payload) => {

        try{ 
            
        const result= await fetch(userController.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data =>data.json())
        .then(data =>data);
        console.log('Login sonuç..: ', result);
        return result;

        } catch(error){
            console.log('ERROR: personel/fetchLogin...: ', error);
        }
       
     }
);

export const fetchRegister = createAsyncThunk(

    'personel/fetchRegister',
    async(payload) => {
        try{
            const result = await fetch (userController.register,{
            method: 'POST',
            headers: { 'Content-Type': 'applicaiton/json'},
            body: JSON.stringify(payload)
        }).then(data => data.json())
        .then(data => data);
        return result;
        }catch(error){
            console.log('ERROR: personel/fetchRegister...: ', error);
        }  
    }
);

const personelSlice =createSlice({
    name: 'personel',
    initialState: personelInitialState,
    /**
     * default değerleri aşmak ve yönetmek için kullanıyoruz. Çünkü slice içinde
     * bu değerleri sunucudan gelen değerler ile setlememiz gerekiyor. Bu işlemleri
     * yapmak için kullanıyoruz.
     */

    reducers: {}, //default bilgileri setlemek için burda kullanıyoruz, yukardaki token islogin gibi şeyleri
    extraReducers: (build) => {
        /**
         * Bir sunucu request işlemi 3 aşamada takip edilir.
         * 1- işlemin başladığı an,
         * 2- işlemin başarı ile tamamlandığı an,
         * 3- işlemin başarısız olduğu an
         * bunların hepsi için burada bir aksiyon yazmamız gerekecektir.
         * Mesela işlem başladığında bunu belirten bir loading ikonu çıkartmak 
         * işlem bittiğinde bunu kapatmak gibi işlemler burada yapılır. Sunucudan
         * gelen veriler state ler içine aktarılır ya da bir hata olduğunda hata kullanıcıya iletilir.
         */

        build.addCase(fetchLogin.pending,(state) => {
            state.isLoadingFetchLogin =true;
        }); //işlemin devam ettiği an

        build.addCase(fetchLogin.fulfilled,(state,action) => {
            state.isLoadingFetchLogin =false;
            if(action.payload.status===null || action.payload.status!==200){
                alert('hata....: '+ action.payload.message);
            }else{
                console.log("gelen data...: ", action.payload);
                state.data=action.payload.data; //statemdeki dataya payloaddaki datayı setliyoruz.
                state.isLogin=true;
                // sessionStorage.setItem("token", action.payload.data);
            }
        }); //işlem tamamlandı

        build.addCase(fetchLogin.rejected,(state) => {
            state.isLoadingFetchLogin =false;
        }); //işlem iptal oldu
        build.addCase(fetchRegister.pending,(state) => {
            state.isLoadingFetchRegister =true;
        })
        build.addCase(fetchRegister.fulfilled,(state,action) => {
            state.isLoadingFetchRegister=false;
            console.log(action.payload);
        });
        build.addCase(fetchRegister.rejected,(state) => {
            state.isLoadingFetchRegister=false;
        })

    }

});

export default personelSlice.reducer; //bu yapının tamamını
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {sepetUrl} from '../../config/SepetController';



const initSepetState = {
    sepetList: [],
    isLoading: false,  
    sepetAdedi: 0, //3 ürün eklemek istediğimiz için bunu takip edeceğiz.
    userSepetList: [], //sunucudan gelen liste
    userSepetAdedi: 0
}

/**
 * fetch işlemleri
 */

export const fetchSepeteEkle= createAsyncThunk(
    'sepet/fetchSepeteEkle',
    async(payload) => {
        const response = await fetch(sepetUrl.ekle,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data =>data.json()).then(data=>data);
        return response;
    }
);

export const fetchSepetListele =createAsyncThunk(
    'sepet/fetchSepetListele',
    async(payload) =>{
        const response =await fetch(sepetUrl.listele+'?userId=' +payload) //getallda userıd verilmesi gerekiyor
        .then(data=>data.json()).then(data=>data);
        return response;
    }
);

const sepetSlice=createSlice({
    name: 'sepet',
    initialState: initSepetState,
    reducers: {
        sepeteEkle(state, action) { //dispatch(sepeteEkel(urun)); tetiklenecek
            //aşağıda bunları export ettik kullanabilmek için. bu kullanımlar redux kullanımı
            if(state.sepetAdedi<3) //sepet adedi 3ten küçükse ürün ekle yoksa ekleme.
               state.sepetAdedi = state.sepetAdedi + 1;
            state.sepetList.push(action.payload); //sepetin içine bu payloadı ekler.
        },

        sepettenCikart(state,action){ //dispatch(sepettenCikart(urun));
            if(state.sepetAdedi>0) //sepetten ürün çıkartmak için kullanırız.
              state.sepetAdedi = state.sepetAdedi - 1 ;
            state.sepetList=state.sepetList.filter(u => u.id!==action.payload.id);
        }
        
    },

    extraReducers: (builder)=>{
        builder.addCase(fetchSepetListele.pending, (state) => {})
        builder.addCase(fetchSepetListele.fulfilled, (state,action) => {
            state.userSepetList=action.payload.data;
            state.userSepetAdedi = state.userSepetList.length;

        })
        builder.addCase(fetchSepetListele.rejected, (state) => {})

        builder.addCase(fetchSepeteEkle.pending, (state) => {})
        builder.addCase(fetchSepeteEkle.fulfilled, (state,action) => {
            console.log(action.payload);
        })
        builder.addCase(fetchSepeteEkle.rejected, (state) => {})


    }
});

export const {sepeteEkle,sepettenCikart} =sepetSlice.actions;

export default sepetSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import urunUrl from "../../config/UrunController";


const initUrunState ={
    urunList: [],
    isLoadingAdd: false,
    isLoadingGetAll: false
   
}

export const fetchUrunEkleme = createAsyncThunk(
    'urun/fetchUrunEkleme', //nereye istek atılacak ve veriler ne, bunun sonunda da then diyip jsona çevirip dönmek gerekiyor
    async (payload) => {
        try {
            const result = await fetch(urunUrl.urunEkle,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) //{ad,aciklama,fiyat,resim}
            }).then(data => data.json()) //string
            .then(data =>data);
            return result;
            
        } catch (error) {
            console.log('HATA fetchUrunEkleme....: ', error);
            
        }
    });

export const fetchUrunListele= createAsyncThunk(
    'urun/fetchUrunListeleme', //bir parametre java tarafıbda almadığı için payload yazmaya gerek yok
     async () => {
         const result=  await fetch(urunUrl.urunListele,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data =>data.json())
        .then(data => data);
        return result;
     });

const urunSlice =createSlice({
    name: 'urun',
    initialState: initUrunState,
    reducers: {}, //urunlistin stateini setleyebilriz değer ata boşalt sıfırla gibi
    extraReducers: (build) => {
        build.addCase(fetchUrunEkleme.pending, (state) => {state.isLoadingAdd= true;});
        build.addCase(fetchUrunEkleme.fulfilled, (state,action) => {
            state.isLoadingAdd=false;
            if(action.payload.data){ //javada boolean dönüş vardı, true geldiyse böyle bir alert verdik
                alert("Ürün Başarı ile Eklendi.")
            }
        });
        build.addCase(fetchUrunEkleme.rejected, (state) => {state.isLoadingAdd=false;});


        build.addCase(fetchUrunListele.pending,(state) => {state.isLoadingGetAll=true;});
        build.addCase(fetchUrunListele.fulfilled,(state,action) => {
            state.isLoadingGetAll=false;
            if(action.payload.status===200){
                state.urunList=action.payload.data;
            }
        });
        build.addCase(fetchUrunListele.rejected,(state) => {state.isLoadingGetAll=false;});

    }

});


export default urunSlice.reducer;
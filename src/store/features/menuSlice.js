import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import menuUrl from "../../config/MenuController";

const initMenuState ={
    menuList: [],
    isLoadingGetAll: false,
    activeMenuId: 0 //he menude hem adminpanede kullanılacak
}


export const fetchMenuEkle= createAsyncThunk (
    'menu/fetchMenuEkle',
    async(payload) =>  {
        try {
            const result = await fetch(menuUrl.menuEkle,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(data => data.json())
            .then(data =>data);
            return result;
            
        } catch (error) {
            console.log('Hata fetchMenuEkleme...: ', error);
        }
    });

export const fetchMenuListele =createAsyncThunk(
    'menu/fetchMenuListele',
    async() => {
        const result= await fetch(menuUrl.menuListele,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
        .then(data => data);
        return result;
    });

const menuSlice= createSlice({
    name: 'menu',
    initialState: initMenuState,
    reducers: {

        /**
         * 
         * @param {*} state  -> burada yeralan tanımlı değerler
         * @param {*} action  -> dispatch edilirken iletilen değerler
         */
        setActiveMenuId(state,action) {
           state.activeMenuId=action.payload;
        }

    },
    extraReducers: (build) => {
        build.addCase(fetchMenuEkle.pending, () => {});
        build.addCase(fetchMenuEkle.fulfilled, () => {});
        build.addCase(fetchMenuEkle.rejected, () => {});

        build.addCase(fetchMenuListele.pending, (state) => {state.isLoadingGetAll=true;});
        build.addCase(fetchMenuListele.fulfilled, (state,action) => {
            state.isLoadingGetAll=false;
            state.menuList=action.payload.data;

        });
        build.addCase(fetchMenuListele.rejected, (state) => {state.isLoadingGetAll=false;});
    }

});

export const {setActiveMenuId} = menuSlice.actions; //bunlara erişilmesi için menu.js içinden export edildi bruada.
export default menuSlice.reducer;
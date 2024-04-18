import { createSlice } from '@reduxjs/toolkit';


const initSepetState = {
    sepetList: [],
    isLoading: false,  
}

const sepetSlice=createSlice({
    name: 'sepet',
    initialState: initSepetState,
    reducers: {
        sepeteEkle(state,action){
            state.sepetList.push(action.payload);
            state.isLoading = true;
        },

        sepettenCikart(state,action){
            const productId= action.payload; 
            state.sepetList = state.sepetList.filter(item => item.id !== productId);
            state.isLoading = true;
        }

    }

});

export const {sepeteEkle,sepettenCikart} = sepetSlice.actions;
export default sepetSlice.reducer;
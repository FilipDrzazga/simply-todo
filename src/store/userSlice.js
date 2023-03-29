import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isNewUser: '',
};

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {}
});

export default userSlice.reducer;
const { createSlice } = require('@reduxjs/toolkit')

const AddressSlice = createSlice({
    name: 'address',
    initialState: {
        data: {},
    },
    reducers: {
        addAddress(state, action) {
            state.data = action.payload;
        }
    },
});
export const { addAddress } = AddressSlice.actions;
export default AddressSlice.reducer;
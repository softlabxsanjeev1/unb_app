const { createSlice } = require('@reduxjs/toolkit')

const AddressSlice = createSlice({
    name: 'address',
    initialState: {
        data: [],
    },
    reducers: {
        addAddress(state, action) {
            let tempData = state.data;
            let isItemExist = false;
            tempData.map(item => {
                if (item.id == action.payload.id) {
                    isItemExist = true;
                    tempData = state.data;
                }
            });
            if (!isItemExist) {
                tempData.push(action.payload);
            }
            state.data = tempData;
        },

    },
});
export const { addAddress } = AddressSlice.actions;
export default AddressSlice.reducer;
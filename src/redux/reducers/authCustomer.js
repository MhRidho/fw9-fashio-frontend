import { createSlice } from '@reduxjs/toolkit'
import { getAddresById, getAllAddress, loginCustomer, registerCustomer } from '../asyncActions/authCustomer'

const initialState = {
  token: localStorage.getItem('token') || null,
  errorMsg: null,
  successMsg: null,
  email: null,
  dataAddress: [],
  addressChoice: null
}

const authCustomer = createSlice({
  name: 'authCustomer',
  initialState,
  reducers: {
    logoutCustomer: (state, action) => {
      localStorage.removeItem('token')
      action.payload()
      return initialState
    },
    setEmailCustomer: (state, action)=> {
      state.email = action.payload
    },
    deleteEmailCustomer: (state, action) => {
      state.email = null
    }
  },
  extraReducers: (build) => {
    build.addCase(loginCustomer.pending, (state) => {
      state.errorMsg = null
      state.successMsg = null
    })
    build.addCase(loginCustomer.fulfilled, (state, action)=> {
      const token = action.payload?.token
      if (token) {
        state.token = token
        localStorage.setItem('token', token)
      } else {
        state.errorMsg = action.payload?.errorMsg
        state.successMsg = action.payload?.successMsg
      }
    })

    build.addCase(registerCustomer.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    })
    build.addCase(registerCustomer.fulfilled, (state, action) => {
      state.errorMsg = action.payload?.errorMsg;
      state.successMsg = action.payload?.successMsg;
    })

    build.addCase(getAllAddress.fulfilled, (state, action) => {
      state.dataAddress = action.payload.result
    })

    build.addCase(getAddresById.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    })
    build.addCase(getAddresById.fulfilled, (state,action) => {
      state.addressChoice = action.payload.result
    })
  }
})

export { loginCustomer, registerCustomer, getAllAddress }
export const { logoutCustomer, setEmailCustomer, deleteEmailCustomer } = authCustomer.actions
export default authCustomer.reducer
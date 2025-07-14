"use client"

import { ToastContainer } from "react-toastify"

const Toaster = () => {

  return (
   <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
  )
}

export { Toaster }

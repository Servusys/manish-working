// import React, { useEffect, useState } from 'react'
// function Preloader() {
//     const [showLoader, setShowLoader] = useState(true);
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setShowLoader(false);
//         }, 1000); 
//         return () => clearInterval(intervalId);
//     }, []);

//     return (
//         <>
//             {showLoader && (
//                 <div className="page-loader-wrapper text-center">
//                     <div className="loader">
//                         <img src='logo.png' alt='iSleep Logo' className='d-block m-auto tw-h-[50px]' />
//                         <div className="h5 fw-light mt-3">Please wait</div>
//                     </div>
//                 </div >
//             )}
//         </>
//     )
// }

// export default Preloader
import React from 'react'

export default function Preloader() {
  return (
    <div></div>
  )
}

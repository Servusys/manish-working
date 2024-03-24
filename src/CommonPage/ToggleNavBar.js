import React from 'react'
import $ from 'jquery'

function ToggleNavBar() {
    const btntogglefullwidth = () => {
        $("body").toggleClass("layout-fullwidth");
         $(".btntogglefullwidth .fa").toggleClass("fa-arrow-left fa-arrow-right");
    }
  return (
      <>
          <a href="#" className="btn btn-sm btn-link ps-0 btntogglefullwidth" onClick={btntogglefullwidth}><i className="fa fa-arrow-left"></i></a>
      </>
  )
}

export default ToggleNavBar
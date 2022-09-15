import React, { useState } from 'react';

export const appContext = React.createContext(null);

export const ContextWrapper = (props) => {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    const [basket,setBasket]=useState(
        getCookie("basket")!=="" ? JSON.parse(getCookie("basket")): []
    )
    const [isBasket,setIsBasket]=useState(false)
    const [acceptCookie,setAcceptCookie]=useState(getCookie("acceptCookie")!==""?JSON.parse(getCookie("acceptCookie")):false)
    return (
        <appContext.Provider value={{ acceptCookie,setAcceptCookie,basket,setBasket,isBasket,setIsBasket}}>
            {props.children}
        </appContext.Provider>
    );
}
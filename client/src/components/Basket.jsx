import { useContext,useEffect } from "react";
import { appContext } from "./ContextWrapper";
import { FaTimes, FaTrash,FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
const Basket = () => {
  const context = useContext(appContext);
  
  
  let grandTotal = 0;
  useEffect(() => {
    document.cookie =
      context.basket !== []
        ? `basket=${JSON.stringify(context.basket)}`
        : `basket=[]`;
  }, [context]);
  return (
    <aside
      className={`z-50 flex flex-col px-5 pb-24 overflow-y-scroll bg-black/50 backdrop-blur-sm h-full fixed md:top-20 top-0 md:right-0 scroll-smooth ${
        context.isBasket ? `md:w-1/3 w-full opacity-100 visible` : `w-0 opacity-0 invisible`
      } transition-all`}
    >
      <div className="flex flex-row justify-between gap-20 m-5">
        <h1 className="section-title !text-6xl">Basket</h1>
        <button
          className="text-white hover:text-white/30 active:text-red-500"
          onClick={() => context.setIsBasket(!context.isBasket)}
        >
          <FaTimes />
        </button>

      </div>
      {context.basket.length > 0 &&
        context.basket.map((item) => {
          return (
            <div key={item._id} className="md:border-none md:rounded-none border border-white rounded-lg md:p-0 p-5 m-5 flex md:flex-row flex-col gap-5">
              <img
                src={item.meal_img}
                alt=""
                className="h-28 w-28 rounded-lg shadow shadow-black/30"
              />
              <div className="md:w-2/3 border-b border-white flex flex-col justify-between font-sans font-extralight text-white text-shadow-3xl text-2xl">
                <h1>{`${item.qty} ${item.meal_name}(s)`}</h1>
                <h1>Unit Price: {item.meal_price} AED</h1>
                <h1>Total: {item.qty * item.meal_price} AED</h1>
                <h1 className="hidden">
                  {(grandTotal += item.qty * item.meal_price)}
                </h1>
              </div>
              <button
                className="flex md:items-center justify-center text-white hover:text-white/30 active:text-red-500 md:w-auto w-full"
                onClick={() => {
                  context.setBasket(
                    context.basket.filter((record) => record._id !== item._id)
                  );
                }}
              >
                <FaTrash />
              </button>
            </div>
          );
        })}
      {context.basket.length > 0 && <h1 className="font-sans text-white text-2xl m-5 border-b border-white">
        Grand Total: {grandTotal} AED
      </h1>}
      
      {context.basket.length > 0 && <div className="flex flex-col-reverse gap-5" id="checkout-btns">
        <button className="secondary-btn" onClick={() => context.setBasket([])}>
            Empty Basket
          </button>
        <Link className="w-full" to={"/checkout"}>
          <button className="btn" onClick={() => context.setIsBasket(false)}>
            Proceed to Checkout
          </button>
        </Link>


      </div>}
      {context.basket.length === 0 &&
      <div className="self-center justify-self-center flex flex-col items-center justify-center h-full">
          <h1 className=" font-sans font-extralight text-white text-2xl m-5">
            Basket is empty
          </h1>
          <Link className="w-full" to={"/meals"}>
          <button className="btn" onClick={() => context.setIsBasket(false)}>
            Start Buying
          </button>
        </Link>
    </div>}
    </aside>
  );
};

export default Basket;

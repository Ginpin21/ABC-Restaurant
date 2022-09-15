import { useEffect, useState, useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { appContext } from "./ContextWrapper";
const Meals = () => {
  const context = useContext(appContext);
  const [records, setRecords] = useState([]);
  const [sort, setSort] = useState("");
  const [ascending, setAscending] = useState(1);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response =
        sort !== ""
          ? await fetch(
              `http://localhost:5000/record/meals/${sort}?ascending=${ascending}`
            )
          : await fetch(`http://localhost:5000/record/meals`);
      if (!response.ok) {
        alert(response.statusText);
        return;
      }
      const data = await response.json();
      setRecords(data); 
    };
    const newOrder = () => {
      if (order.length === 2) {
        records.forEach(record => {
          if (record._id === order[0]) {
            if(context.basket.filter(row=>row._id===record._id).length > 0 ){
              context.setBasket(context.basket.map((item)=>{
                return item._id===order[0] && (item.qty < 20 && item.qty+order[1] <= 20) ? {...item,qty:item.qty+order[1]}:item
              }));
            }
            else{
              context.setBasket([
                { ...record, qty: parseInt(order[1]) },
                ...context.basket,
              ]);
            }
            setOrder([]);
             
        }
      });
      }
      document.cookie = `basket=${JSON.stringify(context.basket)}`
    };
    fetchData();
    newOrder();
  }, [sort, ascending, order, context, records, setOrder, setRecords]);

  return (
    <article className="min-h-full py-5">
      <h1 className="section-title">Food Menu</h1>
      <div className="flex md:justify-start md:px-24 justify-center font-sans font-light gap-10 w-full my-5 text-white">
        <div className="flex ">
          <label htmlFor="Sort">Sort By:</label>
          <select
            name="Sort"
            id="sort"
            className="bg-transparent"
            onChange={(e) => setSort(e.currentTarget.value)}
          >
            <option value="" className="backdrop-blur-sm text-black">
              None
            </option>
            <option value="meal_name" className="backdrop-blur-sm text-black">
              Name
            </option>
            <option value="meal_price" className="backdrop-blur-sm text-black">
              Price
            </option>
          </select>
        </div>
        <div className="flex ">
          <label htmlFor="Ascending">Order:</label>
          <select
            name="Ascending"
            className="bg-transparent focus-within:outline-1 focus rounded-lg"
            id="Ascending"
            onChange={(e) => setAscending(e.currentTarget.value)}
          >
            <option value="1" className="text-black">
              Ascending
            </option>
            <option value="-1" className="text-black">
              Descending
            </option>
          </select>
        </div>
      </div>
      <span className="font-normal text-white text-center text-shadow-md px-24 py-5">
          Only maximum of 20 allowed per item*
        </span>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-flow-row auto-rows-auto place-items-center gap-10 px-5 pb-10 my-5 w-full">
        {records !== [] &&
          records.map((record) => {
            return (
              <div
                key={record._id}
                className="flex flex-col items-stretch font-sans font-extralight md:w-96 w-80  bg-gradient-to-b from-slate-100/10 drop-shadow-md  shadow-md shadow-black/30 p-2 rounded-lg text-white text-shadow-lg text-center"
              >
                <img
                  src={record.meal_img}
                  alt={record.meal_name+" image"}
                  className="md:h-96 md:w-96 h-80 w-80 rounded-lg"
                />
                <div className="flex flex-row justify-between items-center text-2xl">
                  <h1 className="">{record.meal_name}</h1>
                  <h1 className="">{record.meal_price} AED</h1>
                </div>
                <div className="flex justify-between items-stretch mt-5 text-black h-10 bg-white rounded-xl">
                  <button
                    onClick={(e) => {e.currentTarget.nextSibling.value < 20 &&
                      e.currentTarget.nextSibling.value++}}
                    className="qty-btn rounded-l-lg"
                  >
                    <FaPlus />
                  </button>
                  <input
                    type="number"
                    className="text-center text-2xl w-3/4"
                    name={record._id}
                    disabled
                    min={1}
                    defaultValue={1}
                  />
                  <button
                    onClick={(e) =>
                      e.currentTarget.previousSibling.value > 1 &&
                      e.currentTarget.previousSibling.value--
                    }
                    className="qty-btn rounded-r-lg"
                  >
                    <FaMinus />
                  </button>
                </div>
                <button
                  className="btn mt-5"
                  onClick={() =>{
                    setOrder([
                      record._id,
                      parseInt(document.querySelector(`[name="${record._id}"]`).value),
                    ])
                    document.querySelector(`[name="${record._id}"]`).value=1
                    context.setIsBasket(true)
                  }
                  }
                >
                  Add to Basket
                </button>
              </div>
            );
          })}
      </div>
    </article>
  );
};

export default Meals;

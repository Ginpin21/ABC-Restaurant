import { useState,useContext,useEffect } from 'react';
import { appContext } from './ContextWrapper';
import {FaArrowDown} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";


const Checkout = () => {
  const pdf = new jsPDF("p", "px", "a4");
  const context = useContext(appContext)
  const navigate = useNavigate()

  // States

  const [infoForm,setInfoForm]=useState({
    name:"",
    phone:"",
    location:""
  })
  const [step,setStep]=useState({stepNumber:1,stepName:"Delivery Information"})
  const[progress,setProgress]=useState(parseInt(33))
  const[orderId,setOrderId]=useState("")
  const[orderData,setOrderData]=useState("")
  // Submit Functions
  const submitInfo = (e)=>{
    e.preventDefault()
    if(infoForm.name !=="" && infoForm.phone!=="" && infoForm.location!==""){
      setProgress(progress+33)
      setStep({...step,stepNumber:2,stepName:"Place Order"})
    }
    else{
      alert('Please fill all the fields')
    }
  }
  const submitData = async (e)=>{
    e.preventDefault()
    e.target.method="POST"
    const response = await fetch("http://localhost:5000/record/orders",{
      headers:{"Content-Type":"application/json"},
      method:"post",
      body:JSON.stringify({...infoForm,basket:context.basket,grand_total:grandTotal})
    })
    if(!response.ok){
      alert(response.statusText)
      return
    }
    const data= await response.json()
    setOrderId(data.insertedId)
    setStep({...step,stepNumber:3,stepName:"Enjoy Your Order!"})
    setProgress(progress+34)
  }
  let grandTotal=0

  useEffect(()=>{
    const fetchOrder = async()=>{
      const response = await fetch(`http://localhost:5000/record/orders/${orderId}`,{headers:{"Content-Type":"application/json"},method:"get"})
      if(!response.ok){
        alert(response.statusText)
      }
      const data = await response.json()
      setOrderData(data)
    }
    if(orderId!==""){
      fetchOrder()
    }
    
  },[orderId])
  
  return (
    <>
    { context.basket.length > 0 ? <article className="h-full p-5 font-sans font-extralight flex flex-col items-center justify-center">
      <h1 className="section-title">Place Order</h1>
      <div className=' md:w-full w-full flex md:flex-row flex-col my-5 md:gap-10 justify-evenly items-center text-white text-shadow-3xl text-xl '>
        <p className=' md:w-1/3 md:text-right text-center'>Step {step.stepNumber} of 3</p>
        <progress id="file" max="100" value={progress} className='md:w-1/2 bg-red-500'></progress>
        <p className=' md:w-1/3 md:text-left text-center'>{step.stepName}</p>
      </div>
      { step.stepNumber===1 &&
       <form onSubmit={submitInfo} className="input-container">
          <h1 className='text-4xl font-sans text-slate-800 text-center my-5'>Delivery Information Form</h1>
          <h1 className='text-2xl font-sans text-red-500 text-center my-5'>Please do not enter any personal information</h1>
          <fieldset className="">
            <input type="text" value={infoForm.name} onChange={(e)=>setInfoForm({...infoForm,name:e.currentTarget.value})} name="Name" id="" placeholder="Name..." className="text-field"/>
          </fieldset>
          <fieldset className="">
            <input type="tel" value={infoForm.phone} onChange={(e)=>setInfoForm({...infoForm,phone:e.currentTarget.value})} name="Phone" id="" placeholder="Phone no..." className="text-field"/>
          </fieldset>
          <fieldset className="">
            <input type="text" value={infoForm.location} onChange={(e)=>setInfoForm({...infoForm,location:e.currentTarget.value})} name="Location" id="" placeholder="Location..." className="text-field"/>
          </fieldset>
          <button type="submit" className='my-5 btn'>Next</button>
      </form>}
     
      { step.stepNumber===2 && <section className=' grid grid-cols-1 md:grid-cols-2 gap-10 justify-around items-stretch w-full text-white text-shadow-3xl text-2xl'>
        <div className='flex flex-col gap-1 md:border-r '>
          <strong className='text-center text-3xl my-5'>Customer Details</strong>
          <h1>Customer Name: <strong>{infoForm.name}</strong></h1>
          <h1>Phone Number: <strong>{infoForm.phone}</strong></h1>
          <h1>Delivery Location: <strong>{infoForm.location}</strong></h1>
        </div>
        <div className='flex flex-col md:h-screen md:overflow-y-scroll'>
        <strong className='text-center text-3xl my-5'>Food Items</strong>
          {context.basket.map(item=>{
            return(
              <div key={item._id} className="md:border-none md:rounded-none border border-white rounded-lg md:p-0 p-5 my-5 flex md:flex-row flex-col gap-5">
                <img
                  src={item.meal_img}
                  alt=""
                  className="h-28 w-28 rounded-lg shadow shadow-black/30"
                />
                <div className="md:w-2/3 border-b border-white flex flex-col justify-between">
                  <h1>{`${item.qty} ${item.meal_name}(s)`}</h1>
                  <h1>Unit Price: {item.meal_price} AED</h1>
                  <h1>Total: {item.qty * item.meal_price} AED</h1>
                  <h1 className="hidden">
                    {(grandTotal += item.qty * item.meal_price)}
                  </h1>
                 </div>
              </div>
            )
          })}
          </div>
          <strong className='border-b md:col-start-2'>Grand Total: {grandTotal} AED</strong>
          <div id='btns' className='w-full flex flex-col col-span-full gap-5 mb-5'>
            <button type="submit" className='btn' onClick={submitData}>Place Order</button>
            <button type="submit" className='secondary-btn' onClick={(e)=>{
              e.preventDefault()
              navigate('/')
            }}>Cancel Order</button>
          </div>

        </section>
      }
      { step.stepNumber===3 && <section className='w'>
          <h1 className='md:text-5xl text-3xl text-center text-white mb-10 text-shadow-lg'>Your Delivery is on the way</h1>
          <div className='border border-black p-5 text-md md:text-3xl text-white flex flex-col gap-5 items-start justify-center mb-10' id='bill'>
            <h1 className='text-lg md:text-4xl'>ABC Restaurant</h1>
            <div className=' flex flex-col'>
              <h1>Order Id: {orderId}</h1>
              <h1>Order Date: {new Date(orderData.timeStamp).toLocaleDateString('en-GB') }</h1>
              <h1>Name: {infoForm.name}</h1>
              <h1>Location: {infoForm.location}</h1>
              <h1> Phone: {infoForm.phone}</h1>
            </div>
            <table className=''>
              <tr className='border-y border-black'>
                <th className='px-5 py-2'>Food Item</th>
                <th className='px-5 py-2'>Unit Price</th>
                <th className='px-5 py-2'>Quantity</th>
                <th className='px-5 py-2'>Total Price</th>
              </tr>
              {orderData!=="" && orderData.basket.map((item)=>{
                return <tr key={item._id} className="border-b border-black  text-center">
                  <td className='py-2 '>{item.meal_name}</td>
                  <td className='py-2'>{item.meal_price} AED </td>
                  <td className='py-2'>{item.qty}</td>
                  <td className='py-2'>{item.qty * item.meal_price} AED</td>
                </tr>
              })
              }
            </table>
            {
                orderData!=="" && <div className=''>
                  <h1>Grand Total: {orderData.grand_total} AED</h1>
                </div>
              }
          </div>
          <div className='flex gap-10 my-5'>
          <button className="btn flex flex-row items-center justify-center gap-5 " onClick={()=>{
            const bill = document.querySelector("#bill")
            bill.className="text-sm text-black flex flex-col px-3  gap-5 items-start justify-center border border-black m-5"
            pdf.html(bill,{callback:()=>{
              pdf.save("bill")
              bill.className="text-md md:text-3xl text-white flex flex-col gap-5 items-start justify-center border border-black p-5"
              navigate("/")
              context.setBasket([])
            }})
          }}>Download Bill <FaArrowDown /></button>
          </div>
          <button className="secondary-btn" onClick={()=>{
            navigate("/")
            context.setBasket([])
          }}>Back to Home</button>
        </section>
      }
      </article>:
      navigate("/")}
    </>
  )
}

export default Checkout

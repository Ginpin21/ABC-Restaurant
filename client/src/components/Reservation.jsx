import React from 'react'
import {FaMinus,FaPlus} from 'react-icons/fa'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Reservation = () => {
  let today=new Date()
  today.setDate(today.getDate() + 1 )
  today = today.toLocaleDateString("sv-SE").replaceAll("/","-")
  const navigate=useNavigate()
  const[reservationId,setReservationId]=useState("")
  const[reservationData,setReservationData]=useState("")
  const [formData,setFormData]=useState({
    name:"",
    phone:"",
    date:today,
    time:"10:00",
    tables:parseInt(1),
    grand_total:parseInt(30)
  })
  const [step,setStep]=useState({stepNumber:1,stepName:"Reservee Information"})
  const[progress,setProgress]=useState(parseInt(33))

  useEffect(()=>{
    const fetchReservation = async()=>{
      const response = await fetch(`http://localhost:5000/record/reservations/${reservationId}`,{headers:{"Content-Type":"application/json"},method:"get"})
      if(!response.ok){
        alert(response.statusText)
      }
      const data = await response.json()
      setReservationData(data)
    }
    if(reservationId!==""){
      fetchReservation()
    }
    
  },[reservationId])
  const onSubmit = async(e)=>{
    e.preventDefault()
    e.target.method="POST"
    const response = await fetch(`http://localhost:5000/record/reservations`,{
      headers:{"Content-Type":"application/json"},
      method:"post",
      body: JSON.stringify(formData)
    })
    if(!response.ok){
      alert(response.statusText)
      return
    }
    const data = await response.json()
    setReservationId(data.insertedId)
    setStep({...step,stepNumber:3,stepName:"Enjoy Your Visit!"})
    setProgress(progress+34)

  }
  const submitInfo = (e)=>{
    e.preventDefault()
    if(formData.name !=="" && formData.phone!==""){
      setProgress(progress+33)
      setStep({...step,stepNumber:2,stepName:"Make Reservation"})
    }
    else{
      alert('Please fill all the fields')
    }
  }
  return (
    <article className="flex flex-col items-center justify-center font-extralight p-5">
      <h1 className="section-title">Make a Reservation</h1>
      <div className=' md:w-full w-full flex md:flex-row flex-col my-5 md:gap-10 justify-evenly items-center text-white text-shadow-3xl text-xl '>
        <p className=' md:w-1/3 md:text-right text-center'>Step {step.stepNumber} of 3</p>
        <progress id="file" max="100" value={progress} className='md:w-1/2 bg-red-500'></progress>
        <p className=' md:w-1/3 md:text-left text-center'>{step.stepName}</p>
      </div>

      {step.stepNumber === 1 && <form action="" className="input-container" onSubmit={submitInfo}>
        <h1 className="text-4xl font-sans text-slate-800 text-center my-5">
          Reservation Form
        </h1>
        <h1 className="text-2xl font-sans text-red-500 text-center my-5">
          Please do not enter any personal information
        </h1>
        <fieldset className="">
          <label htmlFor="Name">Reservee Name</label>
          <input
            type="text"
            name="Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.currentTarget.value });
            }}
            id=""
            placeholder="Reservee Name..."
            className="text-field"
            required
          />
          <label htmlFor="Phone">Phone Number</label>
          <input
            type="text"
            name="Phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.currentTarget.value });
            }}
            id=""
            placeholder="Phone No..."
            className="text-field"
            required
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="Date">Reservation Date</label>
          <input
            type="date"
            name="Date"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.currentTarget.value });
            }}
            id=""
            className="text-field"
            min={today}
            required
          />
          <label htmlFor="Time">
            Reservation Time{" "}
            <span className="text-red-500">
              (Open hours are from 10:00 AM to 10:00 PM)
            </span>
          </label>
          <input
            type="time"
            name="Time"
            value={formData.time}
            onChange={(e) => {
              setFormData({ ...formData, time: e.currentTarget.value });
            }}
            id=""
            placeholder="Time..."
            className="text-field"
            min={"10:00"}
            max={"22:00"}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">Tables to Reserve <span className="text-red-500">
              (30 AED per Table which seats 4 people, upto 3 tables only)
            </span> </label>
          <div className="flex justify-between items-stretch mt-5 text-black h-10 bg-white rounded-xl">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.currentTarget.nextSibling.value < 3 &&
                setFormData({...formData,tables:formData.tables+1})
              }}
              className="qty-btn rounded-l-lg"
            >
              <FaPlus />
            </button>
            <input
              type="number"
              className="text-center text-2xl w-3/4"
              disabled
              value={formData.tables}
              onChange={()=>console.log("HI")}
            />
            <button
              onClick={(e) =>{e.preventDefault()
                e.currentTarget.previousSibling.value > 1 &&
                setFormData({...formData,tables:formData.tables-1})}
                
              }
              className="qty-btn rounded-r-lg"
            >
              <FaMinus />
            </button>
          </div>
          <h1 className='text-xl mt-5 font-normal'>Grand Total: {formData.grand_total=formData.tables*30} AED</h1>
        </fieldset>
        <button type="submit" className="my-5 btn">
          Next
        </button>
      </form>}
      {
        step.stepNumber===2 && <section className='border md:text-left text-center p-5 flex flex-col gap-5 justify-around md:items-start items-center w-full text-white text-shadow-3xl text-2xl'>
          <strong className='text-center text-3xl my-5'>Reservee Details</strong>
          <h1>Reservee Name: <strong>{formData.name}</strong></h1>
          <h1>Reservee Phone: <strong>{formData.phone}</strong></h1>
          <h1>Reservation Date: <strong>{new Date(formData.date).toLocaleDateString("en-GB")}</strong></h1>
          <h1>Reservation Time: <strong>{new Date(`${formData.date}T${formData.time}`).toLocaleTimeString()}</strong></h1>
          <h1>Reserved tables: <strong>{formData.tables}</strong></h1>
          <strong className='border-t w-full'>Total Amount: {formData.grand_total} AED</strong>
          <div id='btns' className='w-full flex flex-col col-span-full gap-5 mb-5'>

            <button type="submit" className='btn' onClick={onSubmit}>Make Reservation</button>
            <button type="submit" className='secondary-btn' onClick={(e)=>{
              e.preventDefault()
              setStep({stepNumber:1,stepName:"Reservee Information"})
              setProgress(progress-33)
            }}>Back</button>
          </div>
        </section>
      }
      {
        step.stepNumber===3 && <section className='border md:text-left text-center p-5 flex flex-col gap-5 justify-around md:items-start items-center w-full text-white text-shadow-3xl text-2xl'>
          <strong className='text-center text-5xl my-5'>Your Reservation has been made</strong>
          <h1>Reservation ID: <strong>{reservationData._id}</strong></h1>
          <h1>Reservee Name: <strong>{reservationData.name}</strong></h1>
          <h1>Reservee Phone: <strong>{reservationData.phone}</strong></h1>
          <h1>Reservation Date: <strong>{new Date(reservationData.date).toLocaleDateString("en-GB")}</strong></h1>
          <h1>Reservation Time: <strong>{new Date(reservationData.date).toLocaleTimeString()}</strong></h1>
          <h1>Reserved tables: <strong>{reservationData.tables}</strong></h1>
          <strong className='border-t w-full'>Total Amount: {reservationData.grand_total} AED</strong>
          <button className="btn" onClick={()=>{
            navigate("/")
          }}>Back to Home</button>
          </section>
      }
    </article>
  );
}

export default Reservation

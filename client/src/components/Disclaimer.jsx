import { useContext } from "react"
import { appContext } from "./ContextWrapper"
const Disclaimer = () => {
  const context = useContext(appContext)
  const onClick = ()=>{
    context.setAcceptCookie(true) 
    document.cookie=`acceptCookie=true;expires=Thu, 18 Dec 2030 12:00:00 UTC`
  }
  return (
    <footer className="flex flex-col items-center w-full bg-black/50 backdrop-blur-sm fixed bottom-0 z-50 text-white font-extralight p-5 text-2xl">
        <h1 className="text-yellow-500 font-medium">Disclaimer:</h1>
        <p className="text-center">This website uses cookies to store the items you have added to the basket.</p>
        <button className="btn !w-1/2" onClick={onClick}>Yes, I understand</button>
    </footer>
  )
}

export default Disclaimer

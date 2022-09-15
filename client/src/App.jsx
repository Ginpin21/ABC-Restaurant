import {About,Basket,Header,Home,Order,Checkout,Meals,Reservation,Disclaimer} from './components/Comps'
import { appContext } from './components/ContextWrapper';
import {Route,Routes} from 'react-router-dom';
import { useContext } from 'react';
// import { useContext } from 'react';

function App() {
  const context = useContext(appContext)
  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-500 via-pink-600 to-red-500">
      <Header/>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/order/:id' element={<Order />}/>
          <Route path='/meals' element={<Meals/>}/>
          <Route path='/checkout'element={<Checkout/> }/>
          <Route path='/reservation'element={<Reservation/> }/>
      </Routes>
      <Basket />
      {!context.acceptCookie && <Disclaimer />}
    </section>
  );
}

export default App;

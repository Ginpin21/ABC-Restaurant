import { FaStar,FaPhoneAlt,FaEnvelope,FaLinkedin,FaInstagram,FaFacebook} from "react-icons/fa";
import{ SiUpwork } from "react-icons/si";
const About = () => {
  return (
    <article className="pt-5">
      <h1 className="section-title">About Us</h1>
      <section className="section drop-shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Restaurant "
          className="md:w-1/2 rounded-lg object-cover shadow-md shadow-black/30"
        />
        <div className="section-content">
          <h1 className="font-normal md:text-5xl text-3xl text-black">
            Best Restaurant in Town
          </h1>
          <p className="md:text-4xl md:leading-normal text-center text-2xl">
            Open day by day for lunch and dinner, ABC Restaurant offers a choice of naturally arranged things utilizing just the best fixings accessible.
            <br />
            Top picks include the critically acclaimed <strong>Steak</strong>, the delicious <strong>Spaghetti</strong>, the mouth chilling <strong>Chocolate Milkshake</strong> & more.
          </p>
        </div>
      </section>
      <section className="section md:!flex-row-reverse bg-gradient-to-bl from-yellow-500 via-pink-600 to-red-500 dropshadow-xl">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Chef "
          className="md:w-1/2 rounded-lg object-cover shadow-md shadow-black/30"
        />
        <div className="section-content">
          <h1 className="font-normal md:text-5xl text-3xl text-black">
            Best Chefs in Town
          </h1>
          <p className="md:text-4xl text-2xl md:leading-normal text-center">
            Exquisite food prepared by the best of the best <strong>Michelin Star Chefs</strong>.
            <br /> 
            Fresh and nutritious ingredients sourced from local businesses to support the prospering local community. 
          </p>
        </div>
      </section>
      <section className="font-sans font-extralight bg-gradient-to-b  from-pink-600 to-red-500 flex flex-col items-center gap-10 px-5 py-10">
        <h1 className="font-normal md:text-5xl text-3xl text-black">
          What the critics say
        </h1>
        <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
          <div className="bg-slate-200/20 rounded-lg p-5 shadow-md shadow-black/30 md:w-1/3 flex flex-col items-center text-white justify-between">
            <div className="text-2xl text-center text-shadow-xl mb-5">
              <q className="border-b border-black block">Simply the best in town</q>
              <blockquote className="italic">
                Absolutely incredible food and excellent staff.
              </blockquote>
              -Michael
            </div>
            <ul className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </ul>
          </div>
          <div className="bg-slate-200/20 rounded-lg p-5 shadow-md shadow-black/30 md:w-1/3 flex flex-col items-center text-white justify-between">
            <div className="text-2xl text-center text-shadow-xl mb-5">
              <q className="border-b border-black block">Best Steak Ever</q>
              <blockquote className="italic">
                Whatever you do, the steak is a must eat and unlike any other.
              </blockquote>
              -Sarah
            </div>
            <ul className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </ul>
          </div>
          <div className="bg-slate-200/20 rounded-lg p-5 shadow-md shadow-black/30 md:w-1/3 flex flex-col items-center text-white justify-between">
            <div className="text-2xl text-center text-shadow-xl mb-5">
              <q className="border-b border-black block">Underrated</q>
              <blockquote className="italic">
                Deserves more recognition, the food and the staff are top tier.
              </blockquote>
              -Joe
            </div>
            <ul className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-yellow-800"/>
            </ul>
          </div>
        </div>
      </section>
      <footer className="font-sans font-extralight shadow-black/30 shadow-inner bg-gradient-to-t  from-pink-600 to-red-500 flex flex-col items-center gap-10 px-5 py-10 text-white">
        <h1 className="font-normal md:text-5xl text-3xl text-black">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-10 h-full border-b border-white w-full pb-5">
          <ul className="text-white text-2xl flex flex-col md:flex-row items-center md:items-start justify-evenly gap-5  w-full">
            <li className="contact-link"><FaPhoneAlt /> <a href="#">06 1234567</a></li>
            <li className="contact-link"><FaEnvelope /> <a href="#">abcrestaurant@mail.com</a></li>
            <li className="contact-link"><FaInstagram /> <a href="#">@ABCRestaurant</a></li>
            <li className="contact-link"><FaFacebook /> <a href="#">@ABCRestaurant</a></li>
          </ul>
        </div>

        <ul className="flex flex-col md:flex-row gap-5 my-0">
          <li>Website created by Iftakhar Ahmed</li>
          <li className="contact-link !gap-2"><FaEnvelope /><a target={"_blank"} href="mailto:iftekharahmed2003@gmail.com">iftekharahmed2003@gmail.com</a> </li>   
          <li className="contact-link !gap-2"><FaLinkedin /> <a target={"_blank"} href="https://www.linkedin.com/in/iftekhar-ahmed-b07b8a22a/">Iftekhar Ahmed</a></li>
          <li className="contact-link !gap-2"><SiUpwork /><a  target={"_blank"}href="https://www.upwork.com/freelancers/~0194553f0be46b37e0">Iftekhar A.</a></li>
        </ul>
      </footer>
    </article>
  );
};

export default About;

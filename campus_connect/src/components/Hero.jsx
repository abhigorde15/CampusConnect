
import { toast } from 'react-hot-toast';
import hero from '../assets/hero_1.svg'
const Hero = () => (
  <section className="text-center px-4  min-h-screen  \ mb-3  bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100  flex flex-col justify-center">
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-2/3 p-10 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 lg:leading-16 tracking-wide">
          Helping KK Wagh Students Stay  <p className='text-blue-500 inline'>Connected, Learn, and Grow!</p> 
        </h1>
        <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
          A one-stop platform for all your academic and social needs.
        </p>
        <div className="md:flex justify-center lg:justify-center space-x-4 ">
          <button
            onClick={() => toast.success('Redirecting to signup...')}
            className="bg-blue-600 text-white w-[100%] md:w-auto px-6 py-3 rounded-xl hover:bg-blue-700 transition  mb-3 md:mb-0"
          >
            Join Now
          </button>
          <button
            onClick={() => toast.error('Login required to upload notes')}
            className="bg-gray-200  w-[100%]  md:w-auto  px-6 py-3  rounded-xl hover:bg-gray-300 transition"
          >
            Upload Notes
          </button>
        </div>
      </div>

      <img
        src={hero}
        alt="Hero illustration"
        className="w-screen  max-w-lg mx-auto md:mx-0 h-100 hidden lg:block mb-20"
      />
    </div>
  </section>
);
export default  Hero;
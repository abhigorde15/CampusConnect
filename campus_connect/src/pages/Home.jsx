
import { Toaster } from 'react-hot-toast';

import Navbar from '../components/Navbar';

import Hero from '../components/Hero'
import Features from '../components/Feature';


export default function HomePage() {
  return (
    <div className="font-sans">
      <Toaster position="top-right" reverseOrder={false} />
   
      <Hero />
      <Features />
      {/* <Footer /> */}
    </div>
  );
}

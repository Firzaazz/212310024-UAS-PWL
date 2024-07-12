import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const text = "Welcome to WorkGuildHub. ";
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here (ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero" id='hero' style={{ marginTop: -50, paddingTop: 0, marginLeft: -70, marginRight: -70 }}>
      <div className="m-auto overflow-hidden mx-4 mt-0 lg:mt-0 p-2 md:p-12 h-full" data-aos="zoom-in">
        <div id='hero' className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left" style={{ background: 'linear-gradient(90deg, #222831 100%, transparent 50%)', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '130px', borderBottomRightRadius: '130px', marginTop: 0 }}>
          <div className="lg:w-1/2 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
            <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900" style={{ marginLeft: '50px', marginTop: '40px' }}>
              {typedText}
            </h1>

            {/* New Box with Button */}
            <div className="p-6" style={{ backgroundColor: '#76ABAE', borderRadius: '10px', margin: '60px' }}>
              <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500" style={{ marginRight: '300px' }}>
                Anda hampir siap untuk mulai menghasilkan uang sebagai freelancer, cukup selesaikan langkah-langkah berikut:
              </div>
            </div>
          </div>

          {/* Adjusted Image Container */}
          <div className="flex lg:justify-end w-full lg:w-1/2 mt-0 lg:mt-0" data-aos="fade-up" data-aos-delay="700">
            {/* <img alt="card img" className="rounded-t float-right duration-1000 w-3/4 lg:w-2/3" src={heroImg} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

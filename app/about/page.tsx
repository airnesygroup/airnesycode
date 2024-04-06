import React from "react";
import NoNavbarLayout from "../nonavbarlayout";
import Heading from "@/components/Heading";
import Image from 'next/image';
import Link from 'next/link'; 





const AboutPage = () => {
  return (
    <NoNavbarLayout>
      
      <section className="main-container4 text-center items-center ">
        <Heading
          title=""
          backBtn={false}
          
        />
        <div className="mt-6">
          <p className="textlg mb-6"> <b>
          airnesy.com
          </b>
          
          </p>
          <div  className=" div17  "><p className="textlg1 mb-4 pb-8 "> <b>  Making your dream home come true every day </b>   </p> </div>
          
         
         
          

          <div className="pt-8 pb-8">
          <Image className="gif rounded-xl "
              src="/images/gif.gif" // Replace this with the actual path to your image
              alt="Description of the image"
            
            />
          </div>


          <div className="div17 pt-8 text-left">
          <p className="textlg pb-2 pt-8 "> <b>
          About us
          </b> </p>

          <p className="pt-2">
               Airnesy is the leading real estate marketplace globally. airnesy’s ecosystem of 
               products and services is designed to provide a seamless, end-to-end property listing and searching
                experience, helping renters, shoppers,buyers and sellers with every step of their journey to finding their dream property.
                </p>  
              
              
                <p className="pt-3">
                Airnesy is synonymous with real estate.
                </p>
            <p className="pt-3">

            As the most visited, most trusted1 name in the industry, “airnesy
              is searched more often than “real estate.”
            </p>
          

            <div className="pt-6 pb-8 flex ">
              <div>
              <Link href="/#">
                <a className="buttonn">Learn more</a>
              </Link>
            </div>

            <div className="pl-4">
            <Link href="/#">
                <a className="buttonn ">In the news</a>
              </Link>

              </div>
            </div>

          </div>

          {/* Add more content as needed */}
        </div>
      </section>

 

      <section className="pt-10">
  <div className="pt-10">
    <div className="section2 pt-10 pb-10">
      <div className="flex justify-between main-container4">
        {/* Left Column */}
        <div className="flex justify-center items-center">
          <Image
            className="rounded-xl"
            src="/images/d.jpg"
            alt="Left Image"
            width={310}
          />
        </div>

        {/* Center Column */}
        <div className="flex flex-col justify-center items-center mb-4">
          <Image
            className="rounded-xl mb-4"
            src="/images/g.jpg"
            alt="Center Top Image"
            width={340}
          />
          <Image
            className="rounded-xl"
            src="/images/h.jpg"
            alt="Center Bottom Image"
            width={340}
          />
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center">
          <Image
            className="rounded-xl"
            src="/images/a.png"
            alt="Right Image"
            width={310}
          />
        </div>
      </div>
    </div>
  </div>

  {/* CSS for Mobile Layout */}
  
</section>


     



          <div className="div17 pt-10 pb-10 text-left">
          <p className="textlg pb-2 pt-10 "> <b>
          The Founders
          </b> </p>


          <p className="pt-2">
                Alexander Mbelenzi is the Founder and CEO of airnesy Group .
                </p>

          <p className="pt-3">
             He is student at Zetech University pursuing software engineering and an expert across different domains.
             Prior to airnesy, he led the development of Farmazon, a farmers platform that offers credit, loans, farmer education,
              weather info and an agricultural marketplace at the heart of Africa.

                </p>  
              
              
                <p className="pt-3">

                Alexander was fascinated with the way software would help brigde the gap in the real easte industry. 
                By helping save on time and the hustle and bustle of house hunting, He followed his passion and geared the development of airnesy,
                 the only name in real-easte. 
               
              
              </p>


               
            <p className="pt-3">

            He is committed to pushing the capabilities of technology in real estate for the benefit of every person.
            </p>
          

            <div className="pt-6 flex ">
              <div>
              <Link href="/#">
                <a className="buttonn">Join us</a>
              </Link>
            </div>

         

            
            </div>

          </div>






    </NoNavbarLayout>
  );
};

export default AboutPage;

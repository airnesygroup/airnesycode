 import React from 'react';

 import Link from 'next/link';

// Import social media icons (you may need to adjust the paths)
import { FaInstagram, FaTwitter, FaTiktok, FaFacebookF, FaYoutube, FaReddit, FaDiscord } from 'react-icons/fa';


                       const Footer: React.FC = () => {
                         return (
                          <div>
                           <div className='pt-60 pb-60 bg-[#f0f0f0] text-center items-center  '>
                            <p className="textlg2 font-bold pb-3 ">join our community</p>

                            <div className="flex items-center justify-center  pl-5 pr-5  space-x-2">
    <div className="icon-circle"><a href=" https://www.instagram.com/airnesy/ " className="hover:text-gray-400"><FaInstagram /></a></div>
    <div className="icon-circle"><a href="https://x.com/,m" className="hover:text-gray-400"><FaTwitter /></a></div>
    <div className="icon-circle"><a href="https://www.tiktok.com/@airnesy.com" className="hover:text-gray-400"><FaTiktok /></a></div>
    <div className="icon-circle"><a href="https://facebook.com/" className="hover:text-gray-400"><FaFacebookF /></a></div>
    <div className="icon-circle"><a href=" https://youtube.com/@Airnesy?si=Xpa2bHvJzqI2R43f  " className="hover:text-gray-400"><FaYoutube /></a></div>
    <div className="icon-circle"><a href=" https://www.reddit.com/user/airnesy/  " className="hover:text-gray-400"><FaReddit /></a></div>
    <div className="icon-circle"><a href="#" className="hover:text-gray-400"><FaDiscord /></a></div>
</div>

                  
    </div>               
            <footer className="bg-[#ffffff] text-black py-6  pt-20 pb-40">
                             <div className="container mx-auto flex flex-col md:flex-row  justify-between px-4">


     

                             <div>
                           <h1 className=" pt-3 textlg2 font-bold">airnesy.com</h1>
                                 <p>&copy; {new Date().getFullYear()} Airnesy Group. All rights reserved.</p>
                               </div>

                               <div className="mb-4 md:mb-0">
                               <h1 className="text-lg font-bold">Company</h1>
                                 
                                   <p>

                                   <Link href="https://www.airnesy.com/about" className="hover:text-gray-400" >
                                     <a>About</a>
                                   </Link>
                                   </p>
                                   <p>
                                     <a href="#" className="hover:text-gray-400">careers</a>
                                   </p>
                                   <p>
                                     <a href="#" className="hover:text-gray-400">news</a>
                                   </p>
                                   <p>
                                     <a href="#" className="hover:text-gray-400">press</a>
                                   </p>

                                 
                               </div>


                               <div className="mb-4 md:mb-0">
                               <h1 className="text-lg font-bold">Product</h1>
                                
                                   <p>
                                     <a href="#" className="hover:text-gray-400">Web App</a>
                                   </p>
                                   <p>
                                     <a href="#" className="hover:text-gray-400">iphone App</a>
                                   </p>
                                   <p>
                                     <a href="#" className="hover:text-gray-400">Android App</a>
                                   </p>
                                 
                               </div>

                               <div className="mb-4 md:mb-0">
                                 <h1 className="text-lg font-bold">Contact </h1>
                                 <p className="mt-2">Waiyaki way, NRB, Kenya</p>
                                 <p>Email: airnesy.info@gmail.com</p>
                                 <p> 
                                 Support
                                  </p>
                                 <p> 
                                 Privacy Policy
                                  </p>

<                                   p> 
                                 terms of Service  
                                  </p>
                               </div>
                              
                             </div>
                           </footer>
                           <hr />
                           </div>
                         );
                       };
                       
                       export default Footer;
                       
                       
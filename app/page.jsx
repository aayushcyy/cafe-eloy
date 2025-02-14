import Image from "next/image";
import Navbar from "./Components/Navbar";
import Button from "./Components/Button";
import pasta from "../public/eatIllustration.png";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col md:px-28 px-0 bg-[#E6E0E0] text-primaryText font-montserrat">
      <Navbar />
      <div className="flex w-full md:h-[80vh] h-[90vh] md:px-5 px-5 md:justify-between">
        <div className="md:w-[50%]  md:pt-[24vh] flex flex-col gap-10">
          <div className="w-[100%] font-tannimbus font-semibold italic">
            <p className="md:text-[5.5vw] text-start text-5xl">
              It's not about Food, it's about an Experience.
            </p>
          </div>
          <div className="flex md:gap-5 gap-8 w-full">
            <Button
              to="/book"
              animation={true}
              classname="bg-primaryRed text-white md:text-sm text-[13px] px-3.5 py-2.5 rounded-full font-montserrat font-medium"
            >
              Book Cabin!
            </Button>
            <Button
              to="/menu"
              animation={true}
              classname="bg-white text-primaryText md:text-sm text-[13px] px-3.5 py-2.5 rounded-full font-montserrat font-medium"
            >
              View Menu!
            </Button>
          </div>
          <div className="flex flex-col gap-3 md:mt-16">
            <p className="font-semibold md:text-sm text-[14px]">Reviews</p>
            <Button to={`${"/"}`}>
              <div className="flex">
                <div className="bg-[url('https://img.freepik.com/free-photo/photo-handsome-unshaven-guy-looks-with-pleasant-expression-directly-camera_176532-8164.jpg?t=st=1737898418~exp=1737902018~hmac=84530b1d35129013de788eb4c31c49f102edae0834fd3c848e25704c86dbbddd&w=996')] md:w-8 md:h-8 w-8 h-8 rounded-[100%] bg-cover bg-center"></div>
                <div className="bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] md:w-8 md:h-8 w-8 h-8 rounded-[100%] bg-cover bg-center -ml-3"></div>
                <div className="bg-[url('https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] md:w-8 md:h-8 w-8 h-8 rounded-[100%] bg-cover bg-center -ml-3"></div>
                <div className="bg-[#251515] md:w-8 md:h-8 w-8 h-8 rounded-[100%] flex items-center text-center justify-center text-[9px] text-[#ffffffd3] font-medium -ml-3">
                  45+
                </div>
              </div>
            </Button>
            <div className="md:text-sm text-xs">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
        <div className="md:flex md:w-[45%] items-center justify-center w-1/2 relative hidden">
          <Image
            src={pasta} // The imported image
            alt="Pasta Dish" // Important for accessibility
            width={100}
            height={100}
            objectFit="cover"
            className="absolute z-20 md:w-[50vw]"
          />
        </div>
      </div>
    </div>
  );
}

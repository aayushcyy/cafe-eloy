import Image from "next/image";
import Navbar from "./Components/Navbar";
import Button from "./Components/Button";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col px-36 bg-[#E6E0E0] text-primaryText font-montserrat">
      <Navbar />
      <div className="flex w-full h-[80vh] px-3">
        <div className="w-[45%] flex flex-col gap-11 justify-center pt-16">
          <div className="w-[80%] font-tannimbus font-semibold italic">
            <p className="text-6xl">
              it's not about Food, it's about an Experience.
            </p>
          </div>
          <div className="flex gap-5">
            <Button
              to="/"
              animation={true}
              classname="bg-primaryRed text-white text-sm px-5 py-3 rounded-full font-montserrat font-medium"
            >
              Book Cabin!
            </Button>
            <Button
              to="/menu"
              animation={true}
              classname="bg-white text-primaryText text-sm px-5 py-3 rounded-full font-montserrat font-medium"
            >
              View Menu!
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm">Reviews</p>
            <Button to={`${"/"}`}>
              <div className="flex">
                <div className="bg-[url('https://img.freepik.com/free-photo/photo-handsome-unshaven-guy-looks-with-pleasant-expression-directly-camera_176532-8164.jpg?t=st=1737898418~exp=1737902018~hmac=84530b1d35129013de788eb4c31c49f102edae0834fd3c848e25704c86dbbddd&w=996')] w-10 h-10 rounded-[100%] bg-cover bg-center"></div>
                <div className="bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-10 h-10 rounded-[100%] bg-cover bg-center -ml-3"></div>
                <div className="bg-[url('https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-10 h-10 rounded-[100%] bg-cover bg-center -ml-3"></div>
                <div className="bg-[#251515] w-10 h-10 rounded-[100%] flex items-center text-center justify-center text-sm text-[#ffffffd3] font-medium -ml-3">
                  45+
                </div>
              </div>
            </Button>
            <div className="">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
        <div className="bg-green-300 w-1/2">
          <Image
            src={
              "https://png.pngtree.com/png-clipart/20230927/original/pngtree-penne-with-white-sauce-png-image_13146509.png"
            }
            alt=""
            width={100}
            height={100}
            className="w-56"
          />
        </div>
      </div>
    </div>
  );
}

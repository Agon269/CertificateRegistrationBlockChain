import React from "react";
import Image from "next/image";
import Logo from "../public/metamask.svg";
import NavBar from "../components/NavBar";
function Auth() {
  return (
    <>
      <NavBar />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Authenticate
            </h1>
          </div>
          <div className="mt-8 space-y-6 mx-auto">
            <button className="mt-6 text-center text-1xl text-gray-900 border-2  ">
              <Image src={Logo} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;

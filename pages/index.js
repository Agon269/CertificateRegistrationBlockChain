import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Steps from "../components/Steps";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signIn } from "../features/user/userslice";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      if (userData != null) {
        dispatch(signIn(userData));
      }
    }
    checkConnectedWallet();
  }, []);
  return (
    <>
      <NavBar />
      <div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to dive in?</span>
                  <span className="block">Start your free trial today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-200">
                  Ac euismod vel sit maecenas id pellentesque eu sed
                  consectetur. Malesuada adipiscing sagittis vel nulla nec.
                </p>
                <span className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-red-600 hover:bg-red-50">
                  {user.connected ? (
                    <Link href="/createtemplate" passHref>
                      Register Certificate
                    </Link>
                  ) : (
                    <Link href="/Auth" passHref>
                      Sign up for free
                    </Link>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-48">
        <h1 className="text-4xl font-bold mb-4">How it works</h1>
        <Steps />
      </div>
    </>
  );
}

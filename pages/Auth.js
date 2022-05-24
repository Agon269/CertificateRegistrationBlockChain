import { Fragment, useState } from "react";
import Image from "next/image";
import Logo from "../public/metamask.svg";
import NavBar from "../components/NavBar";
import { authUser } from "../features/user/userslice";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/outline";
import jazzicon from "@metamask/jazzicon";

function Auth() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    institution: "",
  });
  const dispatchAuthUser = (e) => {
    e.preventDefault();
    let image = Math.round(Math.random() * 10000000);
    formData.image = image;
    dispatch(authUser(formData));
    setOpen(false);
  };
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
            <button
              className="mt-6 text-center text-1xl text-gray-900 border-2  "
              onClick={() => setOpen(true)}
            >
              <Image src={Logo} />
            </button>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Sign In
                    </h2>
                    <form
                      className="mt-8 space-y-6"
                      onSubmit={(e) => dispatchAuthUser(e)}
                    >
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Institution Name
                          </label>
                          <input
                            id="institution"
                            name="institution"
                            type="institution"
                            autoComplete="institution"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Institution"
                            onChange={(e) => {
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  [e.target.name]: e.target.value,
                                };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon
                              className="h-5 w-5 text-red-500 group-hover:text-red-400"
                              aria-hidden="true"
                            />
                          </span>
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Auth;

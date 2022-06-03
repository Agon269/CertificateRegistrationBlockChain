import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { registerCertificate, selectUser } from "../features/user/userslice";

function createTemplate() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    remark: "",
    awarder: "",
    awardee: "",
    level: "",
  });
  const createCert = async (e) => {
    e.preventDefault();
    formData.institution = user.institution;
    await dispatch(registerCertificate(formData));

    router.push(`/cert/${user.currentCert.id}`);
  };
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <>
      <NavBar />
      <div className=" p-8 mx-auto  min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form className="space-y-8 " onSubmit={(e) => createCert(e)}>
          <div className="space-y-8 ">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create a certificate template
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Name of certificate
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="first-name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md  p-2"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descriptsion of the certificate
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="desc"
                      rows={3}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      defaultValue={""}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Special remarks for certificate
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="remark"
                      rows={3}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      defaultValue={""}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Certificate awarder
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="awarder"
                    id="first-name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md  p-2"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Certificate awardee
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="awardee"
                    id="first-name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md  p-2"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Level
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="level"
                    min={1}
                    max={3}
                    id="first-name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md  p-2"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default createTemplate;

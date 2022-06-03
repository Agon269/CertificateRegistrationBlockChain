import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { searchCert, selectUser } from "../features/user/userslice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

function validatecert() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(searchCert(searchTerm));
  };
  const { searchResult } = useSelector(selectUser);
  console.log(searchResult);
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="font-bold text-3xl bg-red-500 text-white p-4 rounded-b-xl">
                  <Link href="/" passHref>
                    Cert Reg
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Validate Certificate
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder="Enter Validation address"
                      type="search"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-9">
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {" "}
          {searchResult.length > 0
            ? searchResult.map((certifcate) => (
                <li
                  key={certifcate.awardee}
                  className="col-span-1 flex flex-col text-center bg-gray-200 rounded-lg shadow divide-y divide-gray-200 hover:cursor-pointer hover:shadow-lg"
                >
                  <Link href={`/cert/${certifcate.id}`} passHref>
                    <div className="flex-1 flex flex-col p-8">
                      <h3 className="mt-6 text-gray-900 text-sm font-medium">
                        {certifcate.certName}
                      </h3>
                      <dl className="mt-1 flex-grow flex flex-col justify-between">
                        <dt className="sr-only">
                          {certifcate.awardee} {certifcate.certName}
                        </dt>
                        <dd className="text-gray-500 text-sm">
                          {certifcate.description}
                        </dd>{" "}
                        <dd className="text-gray-500 text-sm">
                          {certifcate.institution}
                        </dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="mt-3">
                          <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                            {certifcate.awardee}
                          </span>
                        </dd>
                      </dl>
                    </div>
                  </Link>
                </li>
              ))
            : searchResult === ""
            ? "No Certificates"
            : ""}
        </ul>
      </div>
    </div>
  );
}

export default validatecert;

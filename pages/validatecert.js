import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
function validatecert() {
  return (
    <div>
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <a href="#">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=red&shade=600"
                  alt="Workflow"
                />
              </a>
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
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="Enter Validation address"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default validatecert;
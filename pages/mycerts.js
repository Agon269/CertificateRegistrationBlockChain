import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserCertificates, selectUser } from "../features/user/userslice";

function mycontracts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCertificates());
  }, []);
  const { certificates } = useSelector(selectUser);

  return (
    <>
      <NavBar />
      <div className="mt-12 mx-9">
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certificates
            ? certificates.map((certifcate) => (
                <li
                  key={certifcate.awardee}
                  className="col-span-1 flex shadow-sm rounded-md"
                >
                  <div
                    className={
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-pink-600"
                    }
                  >
                    {certifcate.awardee}
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      {certifcate.certName}

                      <p className="text-gray-500">
                        {certifcate.institution} Level
                      </p>
                    </div>
                  </div>
                </li>
              ))
            : "No Certificates"}
        </ul>
      </div>
    </>
  );
}

export default mycontracts;

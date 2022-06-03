import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserCertificates, selectUser } from "../features/user/userslice";
import Link from "next/link";

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
                  className="col-span-1 flex flex-col text-center bg-gray-200 rounded-lg shadow divide-y divide-gray-200 hover:cursor-pointer hover:shadow-lg"
                >
                  <Link href={`/cert${certifcate.certName}`} passHref>
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
            : "No Certificates"}
        </ul>
      </div>
    </>
  );
}

export default mycontracts;

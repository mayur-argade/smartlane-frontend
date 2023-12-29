import React from "react";
import './Home1.css'

const Card = () => {
  return (
    <div  className="mt-10 bg-white text-black flex flex-col justify-center rounded-3xl p-4 ">
      <h2 className="text-center text-black font-bold text-2xl my-2" style={{fontFamily:'sans-serif'}}>
        Join Our Newsletter
      </h2>
      <div className="md:md:mx-14 selection">
        <span className="ml-0 text-lg font-semibold">
          Select all that apply
        </span>
        <div className="lg:flex justify-between my-3 lg:space-x-4">
          <div className="flex items-center mb-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-yellow-400 mt-1 bg-gray-100 border-gray-300 rounded"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm text-gray-900"
            >
          `I&rsquo;m prospective investor`

            </label>{" "}
          </div>
          <div className="flex items-center mb-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-yellow-400 mt-1 bg-gray-100 border-gray-300 rounded-md "
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm text-gray-900"
            >
              I&rsquo;m a landlord and want to use Propell
            </label>
          </div>
          <div className="fle x items-center mb-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-yellow-400 mt-1 bg-gray-100 border-gray-300 rounded-md "
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm text-gray-900"
            >
              I just want to be in the loop
            </label>
          </div>
        </div>
      </div>
      <div className="md:mx-14 form ">
        <div className="md:flex space-y-2 md:space-y-0 md:space-x-2 ">
          <div className="flex flex-col bg-white pl-2 pr-2 rounded-lg border focus:border-[#F9D75D] w-full h-14">
            <label className="text-sm mt-1" htmlFor="first name">
              First name
            </label>
            <input
              type="text"
              className="border bg-transparent border-white focus:border-white focus:ring-white outline-0 text-sm font-medium text-black "
              // onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col bg-white pl-2 pr-2 rounded-lg border focus:border-[#F9D75D] w-full h-14">
            <label className="text-sm mt-1" htmlFor="first name">
              Last name
            </label>
            <input
              type="text"
              className="border bg-transparent border-white focus:border-white focus:ring-white outline-0 text-sm font-medium text-black "
              // onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col bg-white pl-2 pr-2 rounded-lg border focus:border-[#F9D75D] w-full h-14">
          <label className="text-sm mt-1" htmlFor="first name">
            Email
          </label>
          <input
            type="text"
            className="border bg-transparent border-white focus:border-white focus:ring-white outline-0 text-sm font-medium text-black "
            // onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <button className="rounded bg-[#F9D75D] w-full h-14 my-3">
          <span className="ml-0 text-2xl font-bold"> Sign Me up!</span>
        </button>
      </div>
    </div>
  );
};

export default Card;

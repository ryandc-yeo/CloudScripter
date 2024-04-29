import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="m-14">
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="flex gap-3">
              <label
                htmlFor="first_name"
                className="w-20 mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white"
              >
                Text Input:
              </label>
              <input
                type="text"
                id="first_name"
                className="block w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="flex gap-3">
            <label
              className="w-20 mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file:
            </label>
            <input
              className="block w-72 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;

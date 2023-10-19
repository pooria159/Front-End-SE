const ResetPassword = () => {
    return(
        <div className="mt-10 h-[22.5rem] sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mb-5  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
        </h2>
        <form className="space-y-6 mt-10" action="#" method="POST">
            <div class="w-full px-3 mb-6 md:mb-0">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                </label>
                
                <div className="">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    required
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm New Password
                </label>
                
                <div className="">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
              </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
}

export default ResetPassword;
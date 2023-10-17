const ForgetPassword = () => {
    return(
        <div className="mt-5 h-[22.5rem] sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mb-5  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your password?
        </h2>
        <form className="space-y-6" action="#" method="POST">
        <div class="flex flex-wrap -mx-3 mb-6">
        </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address
            </label>
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="on"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get link
            </button>
          </div>
          <p className="mt-5 mb-5 text-center text-sm text-gray-500">
          Enter your account email to take reset password link
        </p>
        </form>
      </div>
    );
}

export default ForgetPassword;
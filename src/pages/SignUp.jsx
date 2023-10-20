import SignupForm from "../components/Signupform";


const SignupPage = () => {
    return(
    <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
      
      <div className="flex flex-col items-center justify-center min-h-screen  ">
        <h2 className="mb-5  sm:mb-0 sm:text-[2rem] text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            TrekDestiny
        </h2>
        <div className="flex items-center justify-center  h-[35.5rem] lg:w-4/6 md:w-full rounded-3xl">

          <div className="w-1/2 h-full 2xl:block hidden rounded-l-lg bg-signupimage object-cover bg-cover bg-center"></div>

          <div className="bg-white  h-[35.5rem]  2xl:w-1/2 xl:w-4/6 md:w-4/6 sm:w-[25rem] lg:w-5/6 rounded-r-lg">
              <SignupForm/>
          </div>

        </div>
      </div>
    </div>
    );
}



export default SignupPage
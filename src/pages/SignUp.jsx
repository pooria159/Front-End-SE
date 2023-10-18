import SignupForm from "../components/Signupform";


const SignupPage = () => {
    return(
    <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
      
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h2 className="mb-5 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            TrekDestiny
        </h2>
        <div className="flex items-center justify-center  h-[35.5rem] lg:w-4/6 rounded-3xl">

          <div className="w-1/2 h-full xl:block hidden rounded-l-lg bg-signupimage object-cover bg-cover bg-center"></div>

          <div className="bg-white xl:w-1/2 h-[35.5rem] rounded-r-lg">
              <SignupForm/>
          </div>

        </div>
      </div>
    </div>
    );
}



export default SignupPage
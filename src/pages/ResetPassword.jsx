import ResetPassword from "../components/ResetPasswordForm";


const ResetPasswordPage = () => {
    return(
    <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
      
      <div className="flex flex-col items-center justify-center min-h-screen ">
        {/* <h2 className="mb-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
              TrekDestiny
          </h2> */}
        <div className="flex items-center justify-center  h-[25rem] lg:w-4/6 rounded-3xl">

          {/* <div className="w-1/2 h-full xl:block hidden rounded-l-lg bg-loginimage object-cover bg-cover bg-center"></div> */}
          <div className="bg-white xl:w-1/2 rounded-lg">
              <ResetPassword/>
          </div>
        </div>
      </div>
    </div>
    );
}



export default ResetPasswordPage
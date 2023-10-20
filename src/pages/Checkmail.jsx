import { useNavigate } from 'react-router-dom';


const Checkmail = () => {
    const navigate = useNavigate();

    const handleDirect = () => {
        navigate("/login")
    }

    return (
      <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white xl:w-30% rounded-lg p-4">
            <div className="w-full mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2"  >
                <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Please check your mailbox to verify your account.
                </h2>
                <div className="flex items-center justify-center">
                <button
                    type="button"
                    className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleDirect}
                >
                    Sign in
                </button>
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Checkmail
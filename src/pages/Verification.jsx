import Verification from "../components/Verification";

const VerificationPage = () => {
    return (
      <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white xl:w-30% rounded-lg p-4">
            <Verification />
          </div>
        </div>
      </div>
    );
  };
  
  export default VerificationPage
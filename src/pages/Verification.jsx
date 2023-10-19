import Verification from "../components/Verification";
const VerificationPage = () => {
    return(
    <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
      
      <div className="flex flex-col items-center justify-center min-h-screen ">

          <div className="bg-white xl:w-1/2 rounded-lg">
              <Verification/>
          </div>

      </div>
    </div>
    );
}



export default VerificationPage
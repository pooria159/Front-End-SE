import CreateCardForm from "../components/ CreateCardForm";


const CreateCardPage = () => {
    return(
    // <div className="fixed w-full h-full items-center justify-center bg-slate-200 bg-cover">
      
      <div className="flex flex-col items-center justify-center min-h-screen  ">
        <div className="flex items-center justify-center  h-[35.5rem] lg:w-4/6 md:w-full rounded-3xl">

          <div className="bg-white p-0 h-[35.5rem] m-0 2xl:w-1/2 xl:w-4/6 md:w-5/6 sm:w-[25rem] lg:w-5/6 rounded-r-lg">
              <CreateCardForm/>
          </div>

        </div>
      {/* </div> */}
    </div>
    );
}



export default CreateCardPage
import ChatRoom from "../components/Chat/ChatRoom";

const ChatRoomPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen h-full">
      <div className="flex items-center justify-center lg:w-3/6 md:w-full rounded-3xl h-full">
        <div className="bg-white p-0 h-full m-0 2xl:w-2/3 xl:w-4/6 md:w-5/6 sm:w-[25rem] lg:w-5/6 rounded-r-lg h-full">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;

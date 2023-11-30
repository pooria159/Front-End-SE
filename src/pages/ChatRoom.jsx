import ChatRoom from "../components/Chat/ChatRoom";

const ChatRoomPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center h-[40rem] lg:w-3/6 md:w-full rounded-3xl">
        <div className="bg-white p-0 h-[25rem] m-0 2xl:w-2/3 xl:w-4/6 md:w-5/6 sm:w-[25rem] lg:w-5/6 rounded-r-lg">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;

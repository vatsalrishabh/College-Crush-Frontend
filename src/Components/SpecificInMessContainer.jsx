import React from "react";
import SendIcon from '@mui/icons-material/Send';
import { Link, useParams } from "react-router-dom";
import MessSpeedDial from "./MessSpeedDial";
import MessageArea from "./MessageArea";
import MessageTopNav from "./MessageTopNav";
// import Badge from '@mui/material/Badge';
// import Stack from '@mui/material/Stack';
// import UserInMessage from './UserInMessage';

const SpecificInMessContainer = () => {
  const { email } = useParams();

  const fetchUser = async () => {};

  return (
    <div className="Container h-full  overflow-y-auto">
      {/* Message Navbar starts */}
      {/* <div className="Message-Navbar flex">
            <Stack spacing={2} direction="row" sx={{ color: 'action.active' }}>

            <Link to="/matches">
                <div className="Matches text-white font-semibold text-xl p-2 ml-2">
                <Badge color="secondary" badgeContent={100} max={5}>
                Matches
                </Badge>
                </div>
</Link>

<Link to="/message">
                <div className="Messages text-white font-semibold text-xl p-2 border-b-4 border-[#fe2c73] inline-block">
                <Badge color="secondary" badgeContent={1000} max={999}>
                Messages
                </Badge>
                </div>
</Link>

                </Stack>
            </div> */}
      {/* Message Navbar ends */}

    

      <div className="chatbox">
        <div className="Profile and backward button h-[10vh]">
            <MessageTopNav/>
        {/* <div className="text-white text-4xl">hello :- {email}</div> */}
        </div>

{/* Message area only */}
        <div className="messageArea h-[78vh]">
        <MessageArea/>

        </div>
{/* Message area only  */}

        {/* send message area starts */}
        <div className="sendMessage h-[8vh]">
          <div className="p-5">
            <form>
              <div class="flex">
             
                <div class="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Type your message..."
                    required
                  />
                  <button
                    type="submit"
                    class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
<SendIcon/>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/*   */}
      </div>
      {/* <MessSpeedDial/> */}
    </div>
  );
};

export default SpecificInMessContainer;

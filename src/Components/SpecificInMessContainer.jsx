import React, { useEffect, useState } from "react";
import { BaseUrl } from "./BaseUrl";
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from "../context/loginContext";
import { useParams } from "react-router-dom";
import MessageArea from "./MessageArea";
import MessageTopNav from "./MessageTopNav";
import axios from "axios";
import io from 'socket.io-client'

const SpecificInMessContainer = () => {
  const { loggedInUser } = useAuth();
  const { email } = useParams(); // email of the user you are chatting with
  const [messages, setMessages] = useState([]); // I am passing it on to the MessageArea
  const [recipient, setRecipient] = useState({ name: '', dp: '' });
  const [message, setMessage] = useState("");
  const [sentFrom] = useState(loggedInUser.collegeEmail);
  const [sentTo] = useState(email); // this comes from the parameter

  useEffect(() => {
    const socket = io(BaseUrl);

// just socket.io client code
    socket.on('connect', () => {
      // console.log('Connected to server:', socket.id);
      socket.emit("loggedInUser",loggedInUser.collegeEmail);
    });
// just socket.io client code ednds


    axios.get(`${BaseUrl}api/messages`, {
      params: {
        sentFrom: loggedInUser.collegeEmail,
        sentTo: email
      }
    })
    .then(response => {
      const { messages, recipient } = response.data;
      setMessages(messages);
      setRecipient(prevRecipient => ({
        ...prevRecipient,
        ...recipient
      })); // Merge previous recipient data to preserve `dp` and `name`
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
  }, [loggedInUser.collegeEmail, email]);


// typing function
const handleTyping = () => {
  if (!isTyping) {
    setIsTyping(true);
    socket.emit("typing", { username: "User1" }); // Emit typing event
  }

  // Stop typing after 1 second of inactivity
  setTimeout(() => {
    setIsTyping(false);
    socket.emit("stopTyping", { username: "User1" }); // Emit stop typing event
  }, 1000);
};

// typing function ends


  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent form submission

    const formData = new FormData();
    formData.append("sentFrom", sentFrom);
    formData.append("sentTo", sentTo);
    formData.append("message", message);

    try {
      const response = await axios.post(`${BaseUrl}api/messages`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { messages, recipient } = response.data;
      setMessages(messages);
      setRecipient(prevRecipient => ({
        ...prevRecipient,
        ...recipient
      })); // Ensure recipient is always set
      
      // Clear input after message is sent
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="Container h-full overflow-y-auto">
      <div className="chatbox">
        <div className="Profile and backward button h-[10vh]">
          <MessageTopNav 
            loggedInUser={sentFrom} 
            name={recipient.name || null} 
            dp={recipient.dp || null} 
            onlineOrLastSeen={"use socket io-client"}
          />
        </div>

        {/* Message area */}
        <div className="messageArea h-[78vh]">
          <MessageArea 
            allmessages={messages} 
            loggedInUser={sentFrom} 
            sentTo={sentTo} 
          />
        </div>

        {/* Send message area */}
        <div className="sendMessage h-[8vh]">
          <div className="p-5">
            <form onSubmit={sendMessage}>
              <div className="flex">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      handleTyping();            // trigers socket io vatsal
                    }} // Bind input to state
                    id="message-input"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Type your message..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificInMessContainer;

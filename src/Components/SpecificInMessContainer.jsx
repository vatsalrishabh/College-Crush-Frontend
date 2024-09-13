import React, { useEffect, useState } from "react";
import { BaseUrl } from "./BaseUrl";
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from "../context/loginContext";
import { useParams } from "react-router-dom";
import MessageArea from "./MessageArea";
import MessageTopNav from "./MessageTopNav";
import axios from "axios";

const SpecificInMessContainer = () => {
  const { loggedInUser } = useAuth();
  const { email } = useParams(); // email of the user you are chatting with
  const [messages, setMessages] = useState([]); // I am passing it on to the MessageArea
  const [recipient, setRecipient] = useState({ name: '', dp: '' });
  const [message, setMessage] = useState("");
  const [sentFrom] = useState(loggedInUser.collegeEmail);
  const [sentTo] = useState(email); // this comes from the parameter

  useEffect(() => {
    // console.log(loggedInUser.collegeEmail + " " + email);

    axios.get(`${BaseUrl}api/messages`, {
      params: {
        sentFrom: loggedInUser.collegeEmail,
        sentTo: email
      }
    })
    .then(response => {
      const { messages, recipient } = response.data;
      setMessages(messages);
      setRecipient(recipient || { name: '', dp: '' }); // Ensure recipient is always set
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
  }, [loggedInUser.collegeEmail, email]);

  const sendMessage = async (e) => {
    e.preventDefault(); // Corrected to prevent form submission

    const formData = new FormData();
    formData.append("sentFrom", sentFrom);
    formData.append("sentTo", sentTo);
    formData.append("message", message);

    try {
      const response = await axios.post(`${BaseUrl}api/messages`, formData, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${loggedInUser.jwt}`,  // Assuming you send the JWT for authentication
        }
      });

      // console.log("Message sent successfully", response.data);
      const { messages, recipient } = response.data;
      setMessages(messages);
      setRecipient(recipient || { name: '', dp: '' }); // Ensure recipient is always set
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
                    onChange={(e) => setMessage(e.target.value)} // Bind input to state
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

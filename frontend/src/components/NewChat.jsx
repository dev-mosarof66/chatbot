import { useState, useRef, useEffect } from "react";
import moment from "moment";
import { FaUser, FaRobot } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useDispatch } from 'react-redux'
import { updateChatHistory } from '../store/slices/user'
import { useNavigate } from "react-router";
import ReactMarkDown from 'react-markdown'
import { ParseStringToLiteral } from "../lib/parseString";
const NewChat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);




  useEffect(() => {
    const timeout = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages, botTyping]);

  const generateId = () => `${Date.now()}-${Math.random()}`;

  const handleSend = async () => {
    if (!input.trim()) {
      toast.error("Prompt can't be empty.");
      return;
    }

    const userMessage = {
      id: generateId(),
      sender: "user",
      text: input,
      time: moment().format("h:mm A"),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setBotTyping(true);

    try {
      const response = await axiosInstance.post('/create-chat', {
        prompt: input
      })
      if (!response) {
        return;
      }
      console.log(response.data.chat)
      const chatId = response.data.chat._id

      dispatch(updateChatHistory(response.data.chat))
      const res = await axiosInstance.post(`/gemini-chat/${chatId}`, { prompt: input });
      await new Promise((r) => setTimeout(r, 500));

      let botText = res.data.data;

      const botMessage = {
        id: generateId(),
        sender: "bot",
        text: botText,
        time: moment().format("h:mm A"),
      };
      setMessages((prev) => [...prev, botMessage]);
      navigate(`/${response.data.chat._id}`)
    } catch (error) {
      const botMessage = {
        id: generateId(),
        sender: "bot",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        time: moment().format("h:mm A"),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
      setBotTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full  h-full max-w-4xl mx-auto flex flex-col px-4 bg-white dark:bg-gray-800">
      {/* Chat Messages */}
      <div className="w-full h-[75vh] overflow-y-auto flex flex-col  space-y-4 scrollbar-hidden">
        {messages.length === 0 && !botTyping && (
          <div className="w-full h-full flex flex-col justify-end pb-18 md:py-32">
            <h3 className="w-[80%] sm:w-full mx-auto text-center text-3xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
              How can I help you today?
            </h3>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-full flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >

            {/* Message */}
            <div className={`px-4 py-2 rounded-sm shadow ${msg.sender === "user" ? "bg-purple-800 dark:bg-purple-700 text-white" : " text-gray-900 dark:text-white"}`}>
              {
                msg.sender === "bot" ? (
                  <ReactMarkDown>
                    msg.text
                  </ReactMarkDown>
                ) : (
                  <p className="text-right">{msg.text}</p>
                )
              }
              <span className="block text-xs text-gray-400 mt-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {/* Bot Typing */}
        {botTyping && (
          <div className="flex items-start gap-3 justify-start animate-pulse">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="w-full max-w-3xl mx-auto flex items-center border rounded-lg mb-4 border-purple-500 bg-purple-500/10 p-2">
        <textarea
          aria-label="Chat message input"
          className="flex-1 p-2 outline-none border-none bg-transparent text-gray-900 dark:text-white resize-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={1}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-purple-700 transition duration-300 delay-75"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <BsFillSendFill />
          )}
        </button>
      </div>
    </div >
  );
};

export default NewChat;

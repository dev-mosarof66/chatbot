import { useState, useEffect } from "react";
import moment from "moment";
import { FaRobot } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useDispatch } from 'react-redux';
import { setSelectedChat } from '../store/slices/user';
import { useNavigate, useParams } from "react-router";
import { ParseStringToLiteral } from "../lib/parseString";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [botTyping, setBotTyping] = useState(false);

    useEffect(() => {
        if (!id) navigate('/model-auto');
        dispatch(setSelectedChat(id));

        const fetchPreviousChats = async () => {
            try {
                const res = await axiosInstance.get(`/chats/${id}`);
                setMessages(res.data.chats);
            } catch (error) {
                console.log("Error fetching chats:", error);
            }
        };
        fetchPreviousChats();
    }, [id, dispatch, navigate]);

    const generateId = () => `${Date.now()}-${Math.random()}`;

    const handleSend = async () => {
        if (!input.trim()) return toast.error("Prompt can't be empty.");

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
            const res = await axiosInstance.post(`/gemini-chat/${id}`, { prompt: input });
            await new Promise((r) => setTimeout(r, 500));

            const botText = res.data.data;
            const botMessage = {
                id: generateId(),
                sender: "bot",
                text: botText,
                time: moment().format("h:mm A"),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.log(error);
            const botMessage = {
                id: generateId(),
                sender: "bot",
                text: "Something went wrong. Please try again.",
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
        <div className="w-full max-w-4xl mx-auto flex flex-col px-4 bg-white dark:bg-gray-800">
            {/* Chat Messages */}
            <div className="w-full h-[75vh] overflow-y-auto flex flex-col space-y-4 scrollbar-hidden">
                {messages.length === 0 && !botTyping && (
                    <div className="w-full h-full flex flex-col justify-end pb-32">
                        <h3 className="w-[80%] sm:w-full mx-auto text-center text-3xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
                            How can I help you today?
                        </h3>
                    </div>
                )}

                {messages.map((msg) => {
                    const parsed = ParseStringToLiteral(msg.text);
                    return (
                        <div
                            key={msg.id}
                            className={`w-full flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`px-4 py-2 rounded-sm shadow ${msg.sender === "user" ? "bg-purple-800 dark:bg-purple-700 text-white" : " text-gray-900 dark:text-white"}`}>
                                {msg.sender === "bot" ? (
                                    <ReactMarkdown
                                        components={{
                                            code({ inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || "");
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={oneDark}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="code-block rounded-lg my-2"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                                                        {children}
                                                    </code>
                                                );
                                            }
                                        }}
                                    >
                                        {parsed}
                                    </ReactMarkdown>
                                ) : (
                                    <p className="text-right">{msg.text}</p>
                                )}
                                <span className="block text-xs text-gray-400 mt-1">{msg.time}</span>
                            </div>
                        </div>
                    );
                })}

                {botTyping && (
                    <div className="flex items-start gap-3 justify-start animate-pulse">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                )}
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
                    {loading ? <span className="loading loading-spinner loading-xs"></span> : <BsFillSendFill />}
                </button>
            </div>
        </div>
    );
};

export default Chat;

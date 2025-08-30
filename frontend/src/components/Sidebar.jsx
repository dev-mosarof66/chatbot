import { useState } from "react";
import { Plus, Menu, Trash2 } from "lucide-react";
import { FaTimes, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setSelectedChat, setChatHistory } from "../store/slices/user";



const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedChat } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data, chatHistory } = useSelector(state => state.user)

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post('/logout')
            console.log(res.data)
            toast.success(res.data.message)
            dispatch(setUser(null))
            navigate("/login")

        } catch (error) {
            console.log('error in logout controller', error)
        }
    }

    const handleChatDelete = async (chatId) => {
        try {
            const res = await axiosInstance.delete(`/delete-chat/${chatId}`)
            console.log(res.data.chats)
            dispatch(setChatHistory(res.data.chats))
            toast.success(res.data.message)
            navigate('/')
        } catch (error) {
            console.log('error in deleting chat : ', error)
        }
    }

    return (
        <>

            {
                !isOpen &&
                <button
                    className="lg:hidden fixed top-4 left-4 z-40  p-2 rounded-lg bg-purple-400 text-white cursor-pointer hover:text-purple-200 active:scale-[0.95] transition duration-300 delay-75"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu size={26} />
                </button>
            }

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-80 lg:w-80 bg-gray-900 text-white flex flex-col p-4 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
            >
                {/* Bot Name */}
                <div className="w-full flex items-center justify-between px-2 py-4">
                    <h2 className=" text-2xl font-semibold bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">Chatbot</h2>
                    {
                        isOpen && <div onClick={() => setIsOpen(false)} className="block md:hidden cursor-pointer hover:text-purple-400 active:text-purple-400  active:scale-[0.95] transition duration-300 delay-75">
                            <FaTimes size={22} />
                        </div>
                    }
                </div>

                {/* New Chat Button */}
                <button onClick={() => { navigate('/'); setIsOpen(false); dispatch(setSelectedChat(0)) }} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700  active:scale-[0.95] cursor-pointer transition duration-300 delay-75 rounded-sm px-4 py-2 my-3">
                    <Plus size={20} /> New Chat
                </button>

                {/* Chat History */}
                <div className="w-full h-[65vh] overflow-y-scroll my-2">
                    <p className="text-gray-400 mb-2">Chat History</p>
                    <ul className="w-full flex flex-col gap-2">

                        {
                            chatHistory?.length > 0 ?

                                chatHistory?.map((chat) => {
                                    console.log(chat)
                                    return (
                                        <li key={chat._id} onClick={() => {
                                            navigate(`/${chat._id}`);
                                            setSelectedChat(chat._id);
                                            setIsOpen(false)
                                        }} className={`p-2 rounded-lg  cursor-pointer flex justify-between items-center group ${chat._id === selectedChat ? 'bg-purple-400/40' : 'border border-purple-300/10 hover:bg-purple-300/20'} transition-all duration-300 delay-75`}>
                                            <span>{chat.title}</span>
                                            <Trash2 onClick={() => handleChatDelete(chat?._id)} size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-purple-600 active:text-purple-700 transition duration-300 delay-75" />
                                        </li>
                                    )
                                })

                                :
                                <p className="text-center my-4 text-gray-600">No chat found</p>
                        }


                    </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 p-2 border border-purple-600 cursor-pointer hover:bg-purple-700/30 transition duration-300 delay-75 rounded-sm bg-gray-800">
                    <div className="w-full flex items-center gap-2">
                        <div className="bg-gray-700 p-2 rounded-full">
                            <FaUser size={15} />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{data && data.fullName}</p>
                            <p className="text-xs text-gray-400">{data && data.email}</p>
                        </div>
                    </div>
                    <div onClick={handleLogout} className="p-2 hover:bg-purple-700/50 active:bg-purple-700/50 rounded-full active:scale-[0.95] cursor-pointer transition duration-300 delay-75">
                        <MdLogout size={22} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

import { useState } from "react";
import { Plus, Menu, Trash2 } from "lucide-react";
import { FaTimes, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";



const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            {
                !isOpen &&
                <button
                    className="md:hidden fixed top-4 left-4 z-40  p-2 rounded-lg bg-purple-400 text-white cursor-pointer hover:text-purple-200 active:scale-[0.95] transition duration-300 delay-75"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu size={26} />
                </button>
            }

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-72 md:w-full bg-gray-900 text-white flex flex-col p-4 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
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
                <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700  active:scale-[0.95] cursor-pointer transition duration-300 delay-75 rounded-sm px-4 py-2 my-3">
                    <Plus size={20} /> New Chat
                </button>

                {/* Chat History */}
                <div className="w-full h-[65vh] overflow-y-scroll my-2">
                    <p className="text-gray-400 mb-2">Chat History</p>
                    <ul className="w-full flex flex-col gap-2">
                        <li className="p-2 rounded-lg hover:bg-gray-800 cursor-pointer flex justify-between items-center group">
                            <span>Chat with Support</span>
                            <Trash2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 delay-75" />
                        </li>
                        <li className="p-2 rounded-lg hover:bg-gray-800 cursor-pointer flex justify-between items-center group">
                            <span>Project Ideas</span>
                            <Trash2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 delay-75" />
                        </li>
                        <li className="p-2 rounded-lg hover:bg-gray-800 cursor-pointer flex justify-between items-center group">
                            <span>Daily Notes</span>
                            <Trash2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 delay-75" />
                        </li>
                    </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 p-2 border border-purple-600 cursor-pointer hover:bg-purple-700/30 transition duration-300 delay-75 rounded-sm bg-gray-800">
                    <div className="w-full flex items-center gap-2">
                        <div className="bg-gray-700 p-2 rounded-full">
                            <FaUser size={20} />
                        </div>
                        <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-gray-400">@johndoe</p>
                        </div>
                    </div>
                    <div className="p-2 hover:bg-purple-700/50 active:bg-purple-700/50 rounded-full active:scale-[0.95] cursor-pointer transition duration-300 delay-75">
                        <MdLogout size={22} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

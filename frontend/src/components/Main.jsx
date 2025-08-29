import React, { useState } from 'react';
import moment from 'moment';
import { FaUser, FaRobot } from 'react-icons/fa';

const Main = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! How can I help you today?', time: moment().subtract(2, 'minutes').format('h:mm A') },
        { id: 2, sender: 'user', text: 'I want to know about your services.', time: moment().subtract(1, 'minutes').format('h:mm A') },
        { id: 3, sender: 'bot', text: 'Sure! We offer AI chatbot development and integrations.', time: moment().format('h:mm A') },
        { id: 1, sender: 'bot', text: 'Hello! How can I help you today?', time: moment().subtract(2, 'minutes').format('h:mm A') },
        { id: 2, sender: 'user', text: 'I want to know about your services.', time: moment().subtract(1, 'minutes').format('h:mm A') },
        { id: 3, sender: 'bot', text: 'Sure! We offer AI chatbot development and integrations.', time: moment().format('h:mm A') },
        { id: 1, sender: 'bot', text: 'Hello! How can I help you today?', time: moment().subtract(2, 'minutes').format('h:mm A') },
        { id: 2, sender: 'user', text: 'I want to know about your services.', time: moment().subtract(1, 'minutes').format('h:mm A') },
        { id: 3, sender: 'bot', text: 'Sure! We offer AI chatbot development and integrations.', time: moment().format('h:mm A') },
    ]);

    const [input, setInput] = useState('');

    const handleSend = () => {
        if(input.trim() === '') return;
        setMessages([...messages, { id: messages.length + 1, sender: 'user', text: input, time: moment().format('h:mm A') }]);
        setInput('');
        // simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: prev.length + 1, sender: 'bot', text: 'Thanks for your message!', time: moment().format('h:mm A') }]);
        }, 1000);
    };

    return (
        <div className='w-full max-w-2xl mx-auto h-full flex flex-col px-4 bg-white dark:bg-gray-800'>
            {/* Chat Messages */}
            <div className='w-full h-[85vh] overflow-y-scroll scrollbar-hidden py-18 space-y-8'>
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}> 
                        {msg.sender === 'bot' && <FaRobot size={24} className='text-purple-600' />}
                        <div className={`${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'} p-3 rounded-lg text-xs sm:text-sm max-w-xs relative`}> 
                            {msg.text}
                            <span className='absolute text-xs text-gray-400 bottom-[-18px] right-2'>{msg.time}</span>
                        </div>
                        {msg.sender === 'user' && <FaUser size={22} className='text-purple-600' />}
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className='w-full flex items-center justify-center border rounded-sm border-purple-500 bg-purple-500/30'>
                <input 
                    type='text' 
                    className='flex-1 p-3 outline-none border-none ' 
                    placeholder='Type your message...' 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button 
                    className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition' 
                    onClick={handleSend}
                >Send</button>
            </div>
        </div>
    );
};

export default Main;

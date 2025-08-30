import User from '../models/user.models.js';
import asyncHandler from 'express-async-handler';
import Chat from '../models/chat.models.js';
import { geminiImage, geminiText } from './gemini.controllers.js';

export const signupUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName) {
            return res.status(400).json({
                message: "Fullname is required.",
                success: false
            });
        }
        if (fullName.trim().length < 5) {
            return res.status(400).json({
                message: "Full name must be at least 5 characters long.",
                success: false
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Email is required.",
                success: false
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long.",
                success: false
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "This email is already in use.",
                success: false
            });
        }

        const user = await User.create({ fullName, email, password });
        if (!user) {
            return res.status(500).json({
                message: "Something went wrong. Please try again.",
                success: false
            });
        }

        res.status(201).json({
            message: "Your account has been created successfully.",
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(`Error in signup controller : ${error}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
});


export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required.",
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Inavalid credentials.",
                success: false
            });
        }

        const isMatch = user.isPasswordMatch(password)

        if (!isMatch) {
            return res.status(404).json({
                message: "Inavalid credentials.",
                success: false
            });
        }
        const token = await user.generateJWT()
        res.cookie('token', token, {

        })

        res.json({
            message: `Welcome back ${user.fullName}`,
            success: true,
            data: user
        });
    } catch (error) {
        console.error(`Error in login controller : ${error}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }

});

export const getUser = asyncHandler(async (req, res) => {
    try {
        const id = req.user
        if (!id) {
            res.status(400).json({
                message: 'Login session expired.',
                success: false
            })
        }

        //TODO: need send the chathistory in ascending order / the new one should be at the top
        const user = await User.findById(id).populate('chatHistory') 
        if (!user) {
            res.status(400).json({
                message: "Your internet connection is unstable.Try again",
                success: false
            })
        }
        res.status(201).json({
            message: `Welcome back ${user?.fullName}`,
            success: true,
            data: user
        })


    } catch (error) {
        console.error(`Error in get user controller : ${error}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    try {
        const id = req.user
        if (!id) {
            res.status(400).json({
                message: 'Login session expired.',
                success: false
            })
        }
        res.cookie('token', null)
        res.status(201).json(
            {
                message: "You have successfully logged out.",
                success: false
            }
        )
    } catch (error) {
        console.error(`Error in logout controller : ${error}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
});


export const createChat = asyncHandler(async (req, res) => {
    try {
        console.log('inside the create new chat..')
        const userId = req.user
        if (!userId) {
            res.status(400).json({
                message: "Login session expired.",
                success: false
            })
        }
        const { prompt } = await req.body;
        console.log('prompt in create new chat: ', prompt)

        if (!prompt) {
            return res.status(400).json({
                message: "Prompt can't be empty.",
                success: false
            });
        }

        console.log('prompt below validation : ',prompt)

        const user = await User.findById(userId);

        if (!user) {
            res.status(400).json({
                message: 'Your internet connection is unstable.Try again.',
                success: false
            })
        }

        const newChat = await Chat.create({
            title: prompt.substring(0, 25) + "...",
            userId: user._id,
            isActive: true,
            messages: [],
        })

        if (!newChat) {
            res.status(500).json({
                message: 'Internal server error.',
                success: false
            })
        }

        user.chatHistory.push(newChat._id);
        await user.save({
            validateBeforeSave: false
        });
        res.status(201).json({
            message: "New chat created successfully.",
            success: true,
            chat: newChat
        });

    } catch (error) {
        console.error(`Error in chat creation controller : ${error}`);
        res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
});


export const deleteChat = asyncHandler(async (req, res) => {
    try {
        const id = req.user
        if (!id) {
            res.status(400).json({
                message: "Login session expired.",
                success: false
            })
        }
        const user = await User.findById(id).populate('chatHistory')

        if (!user) {
            res.status(400).json({
                message: "Your internet connection is unstable.Try again.",
                success: false
            })
        }



        const chat = await Chat.findByIdAndDelete(req.params.id);
        if (!chat) {
            return res.status(404).json({
                message: "Your internet connection is unstable.Try again.",
                success: false
            });
        }

        user.chatHistory = user.chatHistory.filter(c => c._id.toString() !== chat._id.toString());
        await user.save({
            validateBeforeSave: false
        });

        res.json({
            message: "Chat deleted successfully.",
            success: true,
            chats: user.chatHistory
        });

    } catch (error) {

    }
});


export const getChats = asyncHandler(async (req, res) => {
    try {
        const id = req.user
        if (!id) {
            res.status(400).json({
                message: "Login session expired."
            })
        }
        const chatId = req.params.id
        const chat = await Chat.findById(chatId)
            .populate({
                path: "messages",
            });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Your internet connection is unstable.Try again.",
            });
        }
        res.status(200).json({
            success: true,
            chats: chat.messages,
        });
    } catch (error) {
        console.error("Error in getAllChats:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

export const generateChat = asyncHandler(async (req, res) => {
    try {
        console.log('inside the generate chat...')
        const userId = req.user;
        if (!userId) {
            return res.status(400).json({
                message: "Login session expired.",
                success: false,
            });
        }

        const { prompt } = req.body;
        console.log('prompt inside the generate chat : ', prompt)
        if (!prompt) {
            return res.status(400).json({
                message: "Prompt can't be empty.",
                success: false,
            });
        }

        const chatId = req.params.id;
        console.log('chat id in generate chat: ', chatId)

        const user = await User.findById(userId)
        let chat = await Chat.findOne({ _id: chatId, isActive: true });
        console.log(chat)
        if (!chat) {
            res.status(400).json({
                message: "Something went wrong . Please try again",
                data: "Something went wrong . Please try again",
                success: false
            })
        }

        chat.messages.push({
            text: prompt,
            sender: "user",
        });

        let result = await geminiText(prompt);
        if (!result) {
            return res.status(400).json({
                message: "Your internet connection is unstable. Try again.",
                success: false,
            });
        }

        result = JSON.stringify(result)

        chat.messages.push({
            text: result,
            sender: "bot",
        });

        await chat.save({
            validateBeforeSave: false
        });
        await user.save({
            validateBeforeSave: false
        });


        return res.status(201).json({
            message: "Reply from gemini.",
            success: true,
            data: result,
            chat,
        });
    } catch (error) {
        console.error("Error in generateChat:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});
export const generateImages = asyncHandler(async (req, res) => {
    try {
        const id = req.user
        if (!id) {
            res.status(400).json({
                message: "Login session expired.",
                success: false
            })
        }
        const { prompt } = await req.body
        if (!prompt) {
            res.status(400).json({
                message: "Prompt can't be empty.",
                success: false
            })
        }

        const result = await geminiImage(prompt)

        if (!result) {
            res.status(400).json({
                message: "Your internet connection is unstable.Try again.",
                success: false
            })
        }

        res.status(201).json({
            message: "Reply from gemini.",
            success: true,
            data: result
        })
    } catch (error) {

    }
})


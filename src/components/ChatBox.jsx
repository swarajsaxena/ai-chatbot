import React, { useEffect } from "react";
import { useState } from "react";
import { FiAperture, FiUser } from "react-icons/fi";

const ChatBox = ({ chatLog, setchatLog, activeModel, currentTemp }) => {
	const [input, setInput] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();
		let chatLogNew = [...chatLog, { user: "me", message: input }, { user: "ai", message: 'AI doing its thing 🖥️' }];

		setchatLog(chatLogNew);

		setInput("");

		const messages = chatLogNew.map(chat => chat.message).join("\n");

		const response = await fetch("https://ai-chatbot-backend-ss.vercel.app/:5000/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: messages,
				currentModel: activeModel,
				currentTemp
			}),
		});

		const data = await response.json();
		chatLogNew.pop()
		setchatLog([
			...chatLogNew,
			{
				user: "ai",
				message: data.message,
			},
		]);
	};

	return (
		<main className='chats bg-[#7700ff]/10 w-full rounded-tl-lg flex flex-col items-center justify-between overflow-hidden border-l-2 border-t-2 border-[#7700ff]/70'>
			<div className='w-full flex flex-col justify-center items-center overflow-auto mb-4'>
				{chatLog.map((chat, index) => (
					<div
						key={index}
						className={`w-full p-8 ${
							chat.user === "me" ? "bg-[#7700ff]/10" : "bg-[#7700ff]/20"
						}`}
					>
						<div className='w-[80%] mx-auto flex gap-4'>
							<div className='border-[#7700ff] bg-[#cfa6ff] p-2 w-max h-max rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm'>
								{chat.user === "me" ? (
									<FiUser color='black' fontSize={20} />
								) : (
									<FiAperture color='black' fontSize={20} />
								)}
							</div>
							<div className='p-2 text-lg'>{chat.message}</div>
						</div>
					</div>
				))}
			</div>
			<form className='w-[100%] flex justify-center' onSubmit={handleSubmit}>
				<input
					value={input}
					onChange={e => setInput(e.target.value)}
					className='w-[90%] mb-4 mx-auto bg-white/5 rounded-md border-white/10 border-2 p-2 focus:outline-none '
					placeholder='Type your input here...'
				/>
			</form>
		</main>
	);
};

export default ChatBox;

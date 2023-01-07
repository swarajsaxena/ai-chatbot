import React from "react";
import { FiPlus } from "react-icons/fi";

const Navbar = ({
	setchatLog,
	models,
	activeModel,
	setactiveModel,
	currentTemp,
	setcurrentTemp,
}) => (
	<nav className='min-w-[18rem] max-w-[18rem] pr-4 pb-4 flex flex-col gap-8'>
		<button
			onClick={() =>
				setchatLog([
					{
						message: "What can i help you with today?",
						user: "ai",
					},
				])
			}
			className='flex items-center rounded-lg gap-2 p-2 border-[#7700ff]/40 border-2 w-full hover:bg-[#7700ff]/40'
		>
			<FiPlus />
			<div>New Chat</div>
		</button>

		<div className='flex flex-col gap-2'>
			<div>Select Model:</div>
			<select
				onChange={e => {
					setactiveModel(e.target.value);
				}}
				value={activeModel}
				className='bg-transparent rounded-lg p-2 border-[#7700ff]/40 border-2 w-full hover:bg-[#7700ff]/40 focus:outline-none'
			>
				{models.map(model => (
					<option
						onClick={() => console.log(model.id)}
						className='bg-[hsl(268,100%,5%)] text-[#7700ff] p-2'
						key={model.id}
						value={model.id}
					>
						{model.id}
					</option>
				))}
			</select>
			<div className='w-full text-sm'>
				This parameters decides the engine you are using.
			</div>
		</div>

		<div className='flex flex-col gap-2'>
			<div>Select Temperature:</div>
			<input
				className='bg-transparent rounded-lg p-2 border-[#7700ff]/40 border-2 w-full hover:bg-[#7700ff]/40 focus:outline-none'
				type='number'
				max={1}
				min={0.1}
				step={0.05}
				value={currentTemp}
				onChange={e => setcurrentTemp(e.target.value)}
			/>
			<div className="flex gap-2">
				<button onClick={() => setcurrentTemp('0.1')} className="w-full text-center px-2 py-1 bg-[#7700ff]/30 rounded-md hover:bg-[#7700ff]/40 cursor-pointer">0.1</button>
				<button onClick={() => setcurrentTemp('0.5')} className="w-full text-center px-2 py-1 bg-[#7700ff]/30 rounded-md hover:bg-[#7700ff]/40 cursor-pointer">0.5</button>
				<button onClick={() => setcurrentTemp('1')} className="w-full text-center px-2 py-1 bg-[#7700ff]/30 rounded-md hover:bg-[#7700ff]/40 cursor-pointer">1</button>
			</div>
			<div className='w-full text-sm'>
				This parameters decides how creative the AI model will be with 0 being the
				least creative and 1 being the most.
			</div>
		</div>
	</nav>
);

export default Navbar;

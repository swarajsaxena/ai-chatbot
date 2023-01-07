import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import "@fontsource/fira-code"
import ChatBox from "./components/ChatBox";

const App = () => {
	const [models, setModels] = useState([]);
	const [activeModel, setactiveModel] = useState("text-davinci-003");
	const [currentTemp, setcurrentTemp] = useState("0.5");

	const [chatLog, setchatLog] = useState([
		{
			message: "What can i help you with today?",
			user: "ai",
		},
	]);

	const getEngines = async () => {
		fetch("http://localhost:5000/models")
			.then(res => res.json())
			.then(data => setModels(data.models));
	};

	useEffect(() => {
		getEngines();
	}, []);

	return (
		<div className='flex h-screen p-4 pr-0 pb-0'>
			<Navbar
				models={models}
				activeModel={activeModel}
				setactiveModel={setactiveModel}
				chatLog={chatLog}
				setchatLog={setchatLog}
				currentTemp={currentTemp} 
				setcurrentTemp={setcurrentTemp}
			/>
			<ChatBox
				activeModel={activeModel}
				chatLog={chatLog}
				setchatLog={setchatLog}
				currentTemp={currentTemp} 
			/>
		</div>
	);
};

export default App;

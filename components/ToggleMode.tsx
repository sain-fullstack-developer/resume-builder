import React from "react";

interface ToggleModeProps {
	handleDarkMode: () => void;
	isDarkMode: boolean;
	positionClass?: string;
}

const ToggleMode: React.FC<ToggleModeProps> = ({
	handleDarkMode,
	isDarkMode,
	positionClass,
}) => {
	return (
		<div className={`fixed right-5 ${positionClass} z-50`}>
			<p className="text-white font-thin text-sm mb-1 uppercase">
				{isDarkMode ? "Toggle to Light" : "Toggle to Dark"}
			</p>
			<div
				onClick={handleDarkMode}
				className="cursor-pointer rounded-full h-3 w-10 p-2 bg-white">
				<div
					className={`h-4 w-4 rounded-full bg-primary -mt-2 ${
						isDarkMode ? "ml-2" : "ml-0"
					}`}></div>
			</div>
		</div>
	);
};

export default ToggleMode;

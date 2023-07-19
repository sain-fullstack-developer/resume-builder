import React from "react";

interface InputSelectModalTypes {
	options: string[];
	handleClick: (option: string) => void;
}

const InputSelectModal: React.FC<InputSelectModalTypes> = ({
	options,
	handleClick,
}) => {
	return (
		<div className="absolute z-10 top-full left-0 right-0">
			<div className="bg-[rgba(0,0,0,0.3)] rounded-xl shadow-md">
				{options.map((option: string) => (
					<>
						<div
							key={option}
							className="px-4 py-2 text-lg tracking-wide backdrop-blur-sm cursor-pointer text-white hover:bg-gray-100 hover:rounded-t-md hover:text-black"
							onClick={() => handleClick(option)}>
							{option}
						</div>
						<div className="w-full h-[1px] bg-white rounded-md"></div>
					</>
				))}
			</div>
		</div>
	);
};

export default InputSelectModal;

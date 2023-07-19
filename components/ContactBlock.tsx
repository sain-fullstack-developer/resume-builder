import React from "react";
import TextIcon from "../elements/TextIcon";
import { apiDataTypes } from "../utils/typeInterfaces";

interface ContactBlockProps {
	data: apiDataTypes;
	color?: boolean;
}

const ContactBlock: React.FC<ContactBlockProps> = ({ data, color }) => {
	const Contactlist = [
		{
			icon: color ? "/phone-call.png" : "/phone-call-b.png",
			contact: data?.phone,
		},
		{
			icon: color ? "/mail.png" : "/email-b.png",
			contact: data?.mail,
		},
		{
			icon: color ? "/location.png" : "/location-b.png",
			contact: data?.location,
		},
		{
			icon: color ? "/location.png" : "/location-b.png",
			contact: data?.location,
		},
	];
	return (
		<div className="r4-contact-list">
			{Contactlist.map((list, index) => (
				<TextIcon
					key={index}
					icon={list.icon}
					text={list.contact}
					color={color ? "white" : ""}
				/>
			))}
		</div>
	);
};

export default ContactBlock;

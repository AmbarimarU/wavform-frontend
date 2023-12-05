import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
	{
		title: "Home",
		path: "/welcome",
		icon: <AiIcons.AiFillHome />,
		
        // iconClosed: <RiIcons.RiArrowDownSFill />,
		// iconOpened: <RiIcons.RiArrowUpSFill />,

		// subNav: [
		// 	{
		// 		title: "Our Aim",
		// 		path: "/about-us/aim",
		// 		icon: <IoIcons.IoIosPaper />,
		// 	},
		// 	{
		// 		title: "Our Vision",
		// 		path: "/about-us/vision",
		// 		icon: <IoIcons.IoIosPaper />,
		// 	},
		// ],
	},
	{
		title: "Lessons",
		path: "/lessons",
		icon: <IoIcons.IoIosPaper />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Notes",
				path: "/topics/1",
				icon: <FaIcons.FaMusic />,
				cName: "sub-nav",
			},
			{
				title: "Rhythm",
				path: "/topics/2",
				icon: <FaIcons.FaMusic />,
				cName: "sub-nav",
			},
			
		],
	},
	{
		title: "Step Sequencer",
		path: "/musictool",
		icon: <FaIcons.FaHeadphones />,
	},
	{
		title: "Profile",
		path: "/profile",
		icon: <FaIcons.FaRegUser />,

    },
	{
		title: "About us",
		path: "/about",
		icon: <IoIcons.IoMdHelpCircle />,
	},
];

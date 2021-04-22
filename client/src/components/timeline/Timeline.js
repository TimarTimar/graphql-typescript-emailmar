import "./Timeline.css";
import { ReactComponent as WorkIcon } from "./work.svg";
import { ReactComponent as SchoolIcon } from "./school.svg";

import TimelineItems from "./CodeTimelineItems";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

const Timeline = () => {
	const workIconStyles = { background: "#06D6A0" };
	const schoolIconStyles = { background: "#f9c74f" };

	return (
		<div>
			<h1 className="title">Timeline</h1>
			<VerticalTimeline>
				{TimelineItems.map((element) => {
					const isWorkIcon = element.icon === "work";
					const showButton =
						element.buttonText !== undefined &&
						element.buttonText !== null &&
						element.buttonText !== "";

					return (
						<VerticalTimelineElement
							key={element.id}
							date={element.date}
							dateClassName="date"
							iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
							icon={isWorkIcon ? <WorkIcon /> : <SchoolIcon />}
						>
							<h3 className="vertical-timeline-element-title">
								{element.title}
							</h3>
							<h5 className="vertical-timeline-element-subtitle">
								{element.location}
							</h5>
							<p id="description">{element.description}</p>
							{showButton && (
								<a
									className={`button ${
										isWorkIcon ? "workButton" : "schoolButton"
									}`}
									href={element.buttonHref}
									target="_blank"
									rel="noreferrer"
								>
									{element.buttonText}
								</a>
							)}
						</VerticalTimelineElement>
					);
				})}
			</VerticalTimeline>
		</div>
	);
};

export default Timeline;

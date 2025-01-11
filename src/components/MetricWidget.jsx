import React from "react";

const Metric = ({
	label = "LABEL",
	value = "123",
	percentChange = "+5%",
	indicatorColor = "#fffefd",
	percentChangeStyles = {},
	icon = null, // New prop for the image/icon
}) => {
	return (
		<div className="metric-widget">
			<div className="widget-content">
				<div className="header">
					<div
						className="indicator"
						style={{ background: indicatorColor }}
					></div>
					<div className="widget-label label-small">{label}</div>
					<div className="change-tag">
						<div className="percent-change" style={percentChangeStyles}>
							{percentChange}
						</div>
					</div>
				</div>
				<div className="stat">
					<div className="stat-info">
						{icon && <div className="icon">{icon}</div>}{" "}
						{/* Render icon if provided */}
						<div className="stat-content accent-4">{value}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Metric;


import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleRating = ({ rating, backgroundColor, trailColor, textColor }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                className=""
                value={rating}
                maxValue={10}
                text={rating}
                background={true}
                backgroundPadding={8}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    backgroundColor: backgroundColor,
                    trailColor: trailColor,
                    textSize: '32px',
                    textColor: textColor,
                })}
            />
        </div>
    );
};

export default CircleRating;
import React from "react";
import ReactPlayer from "react-player/youtube";


const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {

    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={` flex justify-center items-center w-full h-full fixed top-0 left-0 px-4 z-20  ${show ? ' opacity-100 visible ' : ' opacity-0 invisible '}`}>
            <div className={`absolute top-0 left-0 w-full h-full bg-slate-900 bg-opacity-25 backdrop-blur transition-all  ${show ? ' opacity-100 ' : ' opacity-0 '} `} onClick={hidePopup}></div>
            <div className={`relative w-[800px] max-w-full aspect-16/9 bg-slate-800 transition-transform ${show ? ' scale-100 ' : ' scale-0 '} `}>
                <span className="absolute top-[-22px] right-0 text-white cursor-pointer" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup
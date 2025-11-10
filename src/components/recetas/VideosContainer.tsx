'use client'

import { useAppSelector } from "@/store";
import NoVideoCard from "./NoVideoCard";
import YoutubeVideo from "./YoutubeVideo";
import ReactPlayer from "react-player";

const VideosContainer = () => {  
  
  const procedimiento = useAppSelector( (state) => state.receta.procedimiento );


  return (
    <div className = "w-full">
        {
            !procedimiento?.videos ? 
                <NoVideoCard /> :
                procedimiento.videos.map(({ url, autor }, index) => (
                    <>
                        <div key={index} className="video-wrapper mb-3">
                        <ReactPlayer
                            url={ url }
                            controls={true}
                            width="100%" 
                            height="100%"
                            className="react-player"
                        />
                        </div> 
                        <span className="text-md text-black mb-7">Cortesía de <b>{ autor }</b>.</span>
                    </> )
                )
        }
    </div>
  )
}

export default VideosContainer

import ReactPlayer from "react-player"

interface Props {
    videoUrl: string
}

const YoutubeVideo = ( { videoUrl }: Props ) => {
  return (
    <div className="video-wrapper">
      <ReactPlayer url={videoUrl} controls={true} width="100%" height="100%" className="react-player" />
    </div>
  )
}

export default YoutubeVideo

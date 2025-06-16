import ReactPlayer from "react-player"

interface Props {
    videoUrl: string
}

const YoutubeVideo = ( { videoUrl }: Props ) => {
  return (
    <ReactPlayer url={videoUrl} controls={true} />
  )
}

export default YoutubeVideo

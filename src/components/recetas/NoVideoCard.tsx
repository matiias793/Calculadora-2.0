const NoVideoCard = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        <div className="p-6">
            <h4 className="text-lg text-logoGreen font-bold mb-5">Videos</h4>
            <span className='text-md text-gray-400'>No hay videos disponibles.</span>
        </div>
    </div>
  )
}

export default NoVideoCard

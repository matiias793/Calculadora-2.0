import Link from "next/link";

interface Props {
    image: JSX.Element,
    title: string;
    url: string;
}

const OptionCard = ( { image, title, url }: Props ) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <Link
            href = { url }
            passHref
        >
            <div className="w-full overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer">
                            <div className="relative min-h-[150px] sm:min-h-[180px] m-0 overflow-hidden text-gray-700 bg-gray-100 rounded-none shadow-none bg-clip-border">
                { image }
            </div>
                <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl text-logoGreen text-center font-bold">{ title }</h3>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default OptionCard
import Link from "next/link";

interface Props {
    image: JSX.Element,
    title: string;
    url: string;
}

const OptionCard = ( { image, title, url }: Props ) => {
  return (
    <div className="w-full md:w-1/4">
        <Link
            href = { url }
            passHref
        >
            <div className="w-full overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer">
                <div className="relative min-h-[180px] m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                    { image }
                </div>
                <div className="p-6">
                    <h3 className="text-xl text-logoGreen text-center font-bold">{ title }</h3>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default OptionCard
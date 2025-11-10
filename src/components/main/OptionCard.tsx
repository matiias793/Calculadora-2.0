import Link from "next/link";

interface Props {
    image: JSX.Element,
    title: string;
    subtitle?: string;
    url: string;
}

const OptionCard = ( { image, title, subtitle, url }: Props ) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <Link
            href = { url }
            passHref
        >
            <div className="w-full overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:cursor-pointer active:scale-95">
                            <div className="relative min-h-[160px] sm:min-h-[200px] md:min-h-[220px] m-0 overflow-hidden bg-gray-50 rounded-t-xl">
                { image }
            </div>
                <div className="p-5 sm:p-6 md:p-7">
                    <h3 className="text-lg sm:text-xl md:text-2xl text-logoGreen text-center font-bold leading-tight">{ title }</h3>
                    {subtitle && (
                        <p className="text-sm text-gray-600 text-center mt-2">{ subtitle }</p>
                    )}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default OptionCard
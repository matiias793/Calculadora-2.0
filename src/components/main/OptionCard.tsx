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
            <div className="w-full overflow-hidden rounded-xl bg-neutral-card bg-clip-border text-neutral-text shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:cursor-pointer active:scale-95">
                            <div className="relative min-h-[160px] sm:min-h-[200px] md:min-h-[220px] m-0 overflow-hidden bg-transparent rounded-t-xl">
                { image }
            </div>
                <div className="p-5 sm:p-6 md:p-7 min-h-[100px] flex flex-col justify-between">
                    <h3 className="text-lg sm:text-xl md:text-2xl text-primary text-center font-bold leading-tight mb-2">{ title }</h3>
                    {subtitle && (
                        <p className="text-xs text-neutral-text text-center mt-auto pt-2 border-t border-neutral-soft">{ subtitle }</p>
                    )}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default OptionCard
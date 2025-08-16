import { ArrowRight } from "lucide-react"

const CtaSection = () => {
    return (
        <div className="bg-sudo-neutral-5  text-sudo-white-1 flex  min-h-[calc(100vh)] py-20">
            <div className="sudo-container ">
                <div className="md:max-w-[70%] mx-auto  h-full space-y-20 flex flex-col justify-evenly items-center">
                    <p className="text-sudo-header-28  md:text-sudo-header-56 font-heading text-center">Let’s Build What You’ve Been Dreaming Of</p>
                    <div className="group w-[350px] relative grid grid-rows-2   group-hover:bg-transparent h-[350px] bg-sudo-blue-4  text-sudo-neutral-1">

                        <div className="absolute group-hover:bg-sudo-white-1 transition-all duration-700 group-hover:w-[350px] group-hover:h-[350px] w-full h-0  bg-none  -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div>
                        <div className="row-span-1  flex justify-end p-5 group-hover:text-sudo-neutral-6 duration-700 transition-all">
                            <ArrowRight className="-rotate-45 group-hover:translate-x-5 group-hover:-translate-y-5 duration-700 transition-all" size={40} />

                        </div>
                        <div className="row-span-2 relative z-20 px-5 group-hover:text-sudo-neutral-6 duration-700 transition-all ">
                            <div>
                                <p>hello@softsudo.com</p>
                                <p>01223434234234324</p>
                            </div>
                            <p className="text-sudo-header-70  whitespace-nowrap text-center font-bold">Let’s Talk</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CtaSection
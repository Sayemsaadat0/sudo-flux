import Button from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Blogs = () => {
  return (
    <div className="h-screen py-20 sudo-container ">
      <Button icon={<ArrowRight size={'18'} />} icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100"  className="text-sudo-white-2 "  label=" New Button" /> 
      
      <Button className="text-minion-white-2 "  label="New Button" />

    </div>
  )
}
export default Blogs
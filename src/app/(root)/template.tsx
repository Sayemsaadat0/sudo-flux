import Footer from "@/components/core/footer/Footer"
import DefaultNavbar from "@/components/core/header/DefaultNavbar"
import React from "react"

const template = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <DefaultNavbar />
            {children}
            <Footer />
        </div>
    )
}
export default template
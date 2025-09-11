import Footer from "@/components/core/footer/Footer"
import DefaultNavbar from "@/components/core/header/DefaultNavbar"
import VisitorTrackingProvider from "@/components/visitor-tracking/VisitorTrackingProvider"
import React from "react"

const template = ({ children }: { children: React.ReactNode }) => {
    return (
        <VisitorTrackingProvider>
            <div>
                <DefaultNavbar />
                {children}
                <Footer />
            </div>
        </VisitorTrackingProvider>
    )
}
export default template
import React from "react";

interface PageProp {
    children: React.ReactNode
}

const Mobile: React.FC<PageProp> = ({ children }) => {
    return (
        <div className="flex items-center h-screen">
            <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1 relative">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mobile;
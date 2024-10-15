'use client'

import ECommerceLanding from "./components/eCommerceLandingPage";

export default function LandingPage() {

    return <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-4 min-h-[calc(100vh_-36px)]">
            <ECommerceLanding/>
        </div>
    </div>

}
'use client'

import NavBar from "../components/navBar"



export default function ECommerceLayout({children}: {children: React.ReactNode}){
    return (
        <>
            <NavBar
            />
            {children}
        </>
    )
}
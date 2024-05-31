import React from "react";


//interface props
type CardProps = {
    children: React.ReactNode
}

export default function Card(props: CardProps) {

    const { children } = props
    return (
        <div>
            {children}
        </div>
    )
}
"use client"

export default function Button({ onClick, label }) {

    return (
        <>
            <div className="all-buttons">
                <button onClick={onClick}>{label}</button>
            </div>
        </>
    )

};
import React from 'react'

export default function Loader({classes=''}) {
    return (
        <div className={`loader-wrapper ${classes}`}>
            <span className="loader"></span>
        </div>
    )
}

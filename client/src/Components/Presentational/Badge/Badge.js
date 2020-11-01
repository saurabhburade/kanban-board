import React from 'react'
import "./Badge.css"
function Badge({icon,title}) {
    return (
        <div className="presentational-badge-main">
            {icon && <div className="mr-2">
                {icon}
            </div>}
            <p>
              {title}
            </p>
        </div>
    )
}

export default Badge

import React from 'react'
import '../Styles/Button.css'

export default function ButtonComponent(props) {
    return (
        <div className="Buttons" onClick={props.onClick}>
            {props.title}
        </div>
    )
}

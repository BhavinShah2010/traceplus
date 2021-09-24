import React from 'react'
import { getTranslatedText } from './utilities'

export function CommonHeading(props){
    return(
        <h5 className="commonHeading">{getTranslatedText(props.title)}</h5>
    )
}
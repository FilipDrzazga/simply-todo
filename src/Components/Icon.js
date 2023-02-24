import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(far);

const Icon = ({ iconName }) => {
    return (
        <FontAwesomeIcon icon={['far', iconName]} />
    )
};

export default Icon;
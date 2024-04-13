import React from 'react'
import './Breadcrumb.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = (props) => {
    const {recipe}=props;
    return (
    <div className='breadcrumb'>
        {recipe.category}
        <FontAwesomeIcon icon={faAngleRight} />
        {recipe.name}
    </div>
    )        
}

export default Breadcrumb

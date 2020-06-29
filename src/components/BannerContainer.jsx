import React from 'react' 
import {SortableElement, SortableHandle } from 'react-sortable-hoc'
import BannerRouter from './BannerRouter';

const BannerContainer = SortableElement(({value}) => {
    return (
        <BannerRouter banner={value} />
    )
}
)
export default BannerContainer
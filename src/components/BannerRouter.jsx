import React from 'react' 
import {SortableHandle } from 'react-sortable-hoc'
import './index.css'

const DragHandle = SortableHandle(() => <div className={"dragHolder"}>
    {/* <div className={"dragBarDiv"}> */}
    <span className={"dragBar"}></span>
    <span className={"dragBar"}></span>
    <span className={"dragBar"}></span>
</div>);

class BannerRouter extends React.Component {
    state = {
        style: "banner"
    }

    getStyleClass = (event) => {
        switch(event) {
            case "over": {
                this.setState({style: "banner bannerOver"})
                return
            }
            case "down": {
                this.setState({style: "banner bannerDown"})
                return
            }
        }
    }

render() {
    return (
        <div className={this.state.style} onMouseOver={this.getStyleClass} onMouseOut={this.getStyleClass}>
            <DragHandle/>
            <div className={"bannerModel"}>{this.props.banner.title}</div>
        </div>
    )
}
}
export default BannerRouter
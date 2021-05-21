import React from 'react';
import { Link, withRouter } from 'react-router-dom'

import { sidebarMenuItems } from '../common/menuItems';
import { getTranslatedText } from '../common/utilities';



class Aside extends React.Component {
    
    getActiveTab = (eachMenuItem) =>{

        

        let className = ''

        if(this.props.location.pathname.includes(eachMenuItem.paths)){
            className = 'activeTab'
        }

        return className
    }

    showMenuItems = () => {
        let arr = []

        for (let index = 0; index < sidebarMenuItems.length; index++) {
            const element = sidebarMenuItems[index];

            let content = null

            content = <Link to={element.paths} >
                <img src={this.getActiveTab(element) !== '' ? element.activeIcon : element.defaultIcon} alt="" title={element.title} />
                <span className={this.getActiveTab(element)}>
                {getTranslatedText(element.title)}
                
                
                </span>
            </Link>


            arr.push(
                <li className={this.getActiveTab(element)} key={index}>{content}</li>
            )


        }

        return arr
    }
    render() {
        return (
            <aside>
                <ul>
                    {this.showMenuItems()}
                </ul>
            </aside>
        )
    }
}

export default withRouter(Aside)

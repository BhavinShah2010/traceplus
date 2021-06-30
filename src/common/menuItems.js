
import dashboardDefaultIcon from '../assets/traceplusImages/dashboardDefault.svg'
import dashboardActiveIcon from '../assets/traceplusImages/dashboardActive.svg'

import SiteManagementDefaultIcon from '../assets/traceplusImages/siteManagementDefault.svg'
import SiteManagementActiveIcon from '../assets/traceplusImages/siteManagementActive.svg'

import ManPowerManagementDefaultIcon from '../assets/traceplusImages/manpowerManagementDefault.svg'
import ManPowerManagementActiveIcon from '../assets/traceplusImages/manpowerManagementActive.svg'


export const sidebarMenuItems = [
    {
        "title": "Dashboard",
        "defaultIcon": dashboardDefaultIcon,
        "activeIcon":dashboardActiveIcon,
        "paths":"/dashboard",
        "tooltip":"Dashboard"
    },

    {
        "title": "Site Management",
        "defaultIcon": SiteManagementDefaultIcon,
        "activeIcon":SiteManagementActiveIcon,
        "paths":"/site-management",
        "tooltip":"Site Management"
    },


    {
        "title": "Manpower Management",
        "defaultIcon": ManPowerManagementDefaultIcon,
        "activeIcon":ManPowerManagementActiveIcon,
        "paths":"/manpower-management",
        "tooltip":"Manpower Management"
    },

    {
        "title": "Policy Management",
        "defaultIcon": ManPowerManagementDefaultIcon,
        "activeIcon":ManPowerManagementActiveIcon,
        "paths":"/policy-management",
        "tooltip":"Policy Management"
    },

]
import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../dashboard/components';
import ThreatWatch from '../dashboard/components/threatWatch';

import SiteMangementList from '../siteManagement/components/index'
import SiteViewDetails from '../siteManagement/components/details';
import LoginComponent from '../login/components/login';
import ManPowerMangementList from '../manPowerManagement/components';



const Routes = () => (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={LoginComponent} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/site-list/view/:id' component={SiteViewDetails} />
        <Route exact path='/site-list' component={SiteMangementList} />
        <Route exact path='/manpower-management' component={ManPowerMangementList} />
        
    </Switch>
)

export default Routes

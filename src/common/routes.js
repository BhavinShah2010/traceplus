import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../dashboard/components';
import ThreatWatch from '../dashboard/components/threatWatch';

import SiteMangementList from '../siteManagement/components/index'
import SiteViewDetails from '../siteManagement/components/details';
import LoginComponent from '../login/components/login';
import ManPowerMangementList from '../manPowerManagement/components';

import PrivateRoute from './privateRoute'

const Routes = () => (
    <Switch>
        <Route exact path='/login' component={LoginComponent} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/site-list/view/:id' component={SiteViewDetails} />
        <PrivateRoute exact path='/site-list' component={SiteMangementList} />
        <PrivateRoute exact path='/manpower-management' component={ManPowerMangementList} />
        <PrivateRoute exact path='/' component={Dashboard} />
        
    </Switch>
)

export default Routes

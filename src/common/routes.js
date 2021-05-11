import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../dashboard/components';
import ThreatWatch from '../dashboard/components/threatWatch';

import SiteMangementList from '../siteManagement/components/index'
import SiteViewDetails from '../siteManagement/components/details';



const Routes = () => (
    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/site-list/view/:id' component={SiteViewDetails} />
        <Route path='/site-list' component={SiteMangementList} />
    </Switch>
)

export default Routes

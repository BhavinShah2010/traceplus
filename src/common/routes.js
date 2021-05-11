import React from 'react'
import { Switch, Route } from 'react-router-dom';
 
    import Dashboard from '../dashboard/components';
import ThreatWatch from '../dashboard/components/threatWatch';

import SiteMangementList from '../siteManagement/components/index'

const Routes = () => (
    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/site-list' component={SiteMangementList} />
    </Switch>
)

export default Routes

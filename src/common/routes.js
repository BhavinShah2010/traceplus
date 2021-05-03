import React from 'react'
import { Switch, Route } from 'react-router-dom';
 
    import Dashboard from '../dashboard/components';
import ThreatWatch from '../dashboard/components/threatWatch';

const Routes = () => (
    <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/site-list' component={ThreatWatch} />
    </Switch>
)

export default Routes

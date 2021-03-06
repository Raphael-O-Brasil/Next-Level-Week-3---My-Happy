import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from './pages/landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

export default function Routes(){
    return (
        <BrowserRouter>
             <Switch>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/app" component={OrphanagesMap}/>
                    <Route path="/orfanato/criar" exact component={CreateOrphanage}/>
                    <Route path="/orfanato/:id" component={Orphanage}/>
            </Switch>
        </BrowserRouter>
    );
}
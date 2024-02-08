import * as React from 'react';
import styles from './OdManagment.module.scss';
import { IOdManagmentProps } from './services/interfaces/IOdManagmentProps';
import ODMDashboard from './services/Modals/Dashboard';
import NewODForm from './services/Modals/NewODForm';
import { escape } from '@microsoft/sp-lodash-subset';
import { BrowserRouter as Router, Switch, Route, Routes, Link, HashRouter, NavLink } from 'react-router-dom';
import { Icon } from 'office-ui-fabric-react';
import { SPComponentLoader } from '@microsoft/sp-loader';
import ViewODForm from './services/Modals/ViewODForm';
import ApproveOD from './services/Modals/ApproveODForm';
import ApproverDashboard from './services/Modals/ApproverDashboard';

SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css");
//SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/js/src/tab.js");
export default class OdManagment extends React.Component<IOdManagmentProps, {}> {
  public render(): React.ReactElement<IOdManagmentProps> {
    return (
      <div className='border shadow p-3 rounded-sm'> <h2 className={"text-center"}> On Duty Request Managment </h2>
        <HashRouter>
          <div className='container-fluid '>
            <div className="navbar navbar-expand-sm bg-blue">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" exact={true} activeClassName="active-link"><Icon iconName="FileSymlink" /> My Request</NavLink>
                </li>
                <li className="nav-item">

                </li>
                <li className="nav-item">
                  {/* <navlink to="/ApproverDashboard" ><Icon iconName='DocumentApproval' /> My Approvals
                  </navlink> */}
                  <NavLink exact={true} to="/ApproverDashboard" activeClassName="active-link"><Icon iconName='DocumentApproval' /> My Approvals</NavLink>
                </li>
              </ul>

            </div>
            <div className={'container-fluid'}>
              <Switch>
                <Route path="/" exact={true} render={() => <ODMDashboard  {...this.props} />} />
                <Route path="/NewForm" exact={true} render={() => <NewODForm {...this.props}></NewODForm>} />
                <Route path="/ViewForm/:ItemID" exact={true} render={() => <ViewODForm {...this.props}></ViewODForm>} />
                <Route path="/ApproveForm/:ItemID" exact={true} render={() => <ApproveOD {...this.props}></ApproveOD>} />
                <Route path="/ApproverDashboard" exact={true} render={() => <ApproverDashboard  {...this.props} />} />
              </Switch>
            </div>
          </div>
        </HashRouter>
        
      </div>
    );
  }
}

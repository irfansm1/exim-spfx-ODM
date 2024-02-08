var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import ODMDashboard from './services/Modals/Dashboard';
import NewODForm from './services/Modals/NewODForm';
import { Switch, Route, HashRouter, NavLink } from 'react-router-dom';
import { Icon } from 'office-ui-fabric-react';
import { SPComponentLoader } from '@microsoft/sp-loader';
import ViewODForm from './services/Modals/ViewODForm';
import ApproveOD from './services/Modals/ApproveODForm';
import ApproverDashboard from './services/Modals/ApproverDashboard';
SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css");
//SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/js/src/tab.js");
var OdManagment = /** @class */ (function (_super) {
    __extends(OdManagment, _super);
    function OdManagment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OdManagment.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'border shadow p-3 rounded-sm' },
            " ",
            React.createElement("h2", { className: "text-center" }, " On Duty Request Managment "),
            React.createElement(HashRouter, null,
                React.createElement("div", { className: 'container-fluid ' },
                    React.createElement("div", { className: "navbar navbar-expand-sm bg-blue" },
                        React.createElement("ul", { className: "navbar-nav" },
                            React.createElement("li", { className: "nav-item" },
                                React.createElement(NavLink, { to: "/", exact: true, activeClassName: "active-link" },
                                    React.createElement(Icon, { iconName: "FileSymlink" }),
                                    " My Request")),
                            React.createElement("li", { className: "nav-item" }),
                            React.createElement("li", { className: "nav-item" },
                                React.createElement(NavLink, { exact: true, to: "/ApproverDashboard", activeClassName: "active-link" },
                                    React.createElement(Icon, { iconName: 'DocumentApproval' }),
                                    " My Approvals")))),
                    React.createElement("div", { className: 'container-fluid' },
                        React.createElement(Switch, null,
                            React.createElement(Route, { path: "/", exact: true, render: function () { return React.createElement(ODMDashboard, __assign({}, _this.props)); } }),
                            React.createElement(Route, { path: "/NewForm", exact: true, render: function () { return React.createElement(NewODForm, __assign({}, _this.props)); } }),
                            React.createElement(Route, { path: "/ViewForm/:ItemID", exact: true, render: function () { return React.createElement(ViewODForm, __assign({}, _this.props)); } }),
                            React.createElement(Route, { path: "/ApproveForm/:ItemID", exact: true, render: function () { return React.createElement(ApproveOD, __assign({}, _this.props)); } }),
                            React.createElement(Route, { path: "/ApproverDashboard", exact: true, render: function () { return React.createElement(ApproverDashboard, __assign({}, _this.props)); } })))))));
    };
    return OdManagment;
}(React.Component));
export default OdManagment;

//# sourceMappingURL=OdManagment.js.map

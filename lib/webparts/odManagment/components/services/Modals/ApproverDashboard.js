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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
//import { Route, HashRouter, Routes } from 'react-router-dom';
import EmployeeOps from '../BAL/EmployeeOps';
import ODMOps from '../BAL/ODMOps';
import { SelectionMode } from '@pnp/spfx-controls-react';
import { format } from "date-fns";
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import DashboardApproved from './dashboardApproved';
import DashboardPending from './dashboardPending';
import { Link } from 'react-router-dom';
import { Icon, DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react';
var ApproverDashboard = /** @class */ (function (_super) {
    __extends(ApproverDashboard, _super);
    function ApproverDashboard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [],
            pendingOD: [],
            approvedOD: []
        };
        _this.getEmployeeData = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EmployeeOps().getEmployee(this.props).then(function (brrResults) {
                            if (brrResults) {
                                _this.setState({
                                    EmployeeName: (brrResults.FirstName + brrResults.LastName),
                                    EmployeeCode: brrResults.EmployeeTitle,
                                    Designation: brrResults.Designation,
                                    ApproverNameId: brrResults.LeaveLevel2Id,
                                    ApproverName: brrResults.LeaveLevel2,
                                    SubGroup: brrResults.SubGroup,
                                    OfficeLocation: brrResults.CurrentOfficeLocation
                                });
                            }
                            ODMOps().getApprovals(_this.props, brrResults.Title).then(function (response) {
                                _this.setState({ data: response.filter(function (user) { return user.ApproverResponse == "Pending"; }) });
                                //console.log(response);
                                _this.setState({ approvedOD: response.filter(function (user) { return user.ApproverResponse == "Approved"; }) });
                                _this.setState({ pendingOD: response.filter(function (user) { return user.ApproverResponse == "Rejected"; }) });
                            });
                            return brrResults;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.state = {
            data: [],
            pendingOD: [],
            approvedOD: []
        },
            // Column Defs
            _this.columns = [
                {
                    key: 'EmployeeID',
                    name: 'EmployeeID',
                    fieldName: 'EmployeeID',
                    minWidth: 50,
                    maxWidth: 100,
                    isResizable: true,
                    onRender: function (item, index, columns) {
                        return React.createElement("div", null, item.EmployeeID.Title);
                    },
                    headerClassName: 'tableHead'
                },
                {
                    key: 'EmployeeID',
                    name: 'Employee Name',
                    fieldName: 'EmployeeID',
                    minWidth: 100,
                    maxWidth: 200,
                    isResizable: true,
                    onRender: function (item, index, columns) {
                        return React.createElement("div", null, item.EmployeeID.EmployeeName);
                    },
                    headerClassName: 'tableHead'
                },
                {
                    key: 'FromDate',
                    name: 'FromDate',
                    fieldName: 'FromDate',
                    minWidth: 50,
                    maxWidth: 100,
                    isResizable: true,
                    onRender: function (item, index, columns) {
                        return React.createElement("div", null, format(item['FromDate'], "MM/DD/YYYY"));
                    },
                    headerClassName: 'tableHead'
                },
                {
                    key: 'Todate',
                    name: 'Todate',
                    fieldName: 'Todate',
                    minWidth: 50,
                    maxWidth: 100,
                    isResizable: true,
                    onRender: function (item, index, columns) {
                        return React.createElement("div", null, format(item['Todate'], "MM/DD/YYYY"));
                    },
                    headerClassName: 'tableHead'
                },
                {
                    key: 'Category',
                    name: 'Category',
                    fieldName: 'Category',
                    minWidth: 100,
                    maxWidth: 150,
                    isResizable: true,
                    headerClassName: 'tableHead'
                },
                {
                    key: 'ApproverResponse',
                    name: 'Approver Response',
                    fieldName: 'ApproverResponse',
                    minWidth: 50,
                    maxWidth: 150,
                    isResizable: true,
                    headerClassName: 'tableHead'
                },
                {
                    key: 'Approve', name: 'Approve', fieldName: 'ID', minWidth: 50, maxWidth: 200, isResizable: true,
                    onRender: function (item, index, columns) {
                        var ItemId = item['ID'];
                        return React.createElement("div", null,
                            React.createElement(Link, { to: '/ApproveForm/' + ItemId },
                                React.createElement(Icon, { iconName: 'Accept' })));
                    },
                    headerClassName: 'tableHead'
                },
                {
                    key: 'View', name: 'View', fieldName: 'ID', minWidth: 50, maxWidth: 150, isResizable: true,
                    onRender: function (item, index, columns) {
                        var ItemId = item['ID'];
                        return React.createElement("div", null,
                            React.createElement(Link, { to: '/ViewForm/' + ItemId },
                                React.createElement(Icon, { iconName: 'View' })));
                    },
                    headerClassName: 'tableHead'
                }
            ];
        return _this;
    }
    ApproverDashboard.prototype.componentDidMount = function () {
        this.getEmployeeData();
    };
    ApproverDashboard.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement(Pivot, { linkSize: PivotLinkSize.large, linkFormat: PivotLinkFormat.tabs },
                React.createElement(PivotItem, { linkText: 'Pending for Approval' },
                    React.createElement("hr", null),
                    React.createElement(DetailsList, { columns: this.columns, items: this.state.data, selectionMode: SelectionMode.none, layoutMode: DetailsListLayoutMode.justified })),
                React.createElement(PivotItem, { linkText: 'Approved Requests' },
                    React.createElement(DashboardApproved, { approvedOD: this.state.approvedOD })),
                React.createElement(PivotItem, { linkText: 'Rejected Requests' },
                    React.createElement(DashboardPending, { pendingOD: this.state.pendingOD })))));
    };
    return ApproverDashboard;
}(React.Component));
export default ApproverDashboard;

//# sourceMappingURL=ApproverDashboard.js.map

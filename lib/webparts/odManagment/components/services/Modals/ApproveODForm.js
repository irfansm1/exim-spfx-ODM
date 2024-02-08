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
import { Link, Redirect } from 'react-router-dom';
import { format } from "date-fns";
import { TextField, PrimaryButton, Dropdown } from 'office-ui-fabric-react';
var ApproveOD = /** @class */ (function (_super) {
    __extends(ApproveOD, _super);
    function ApproveOD(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            setSPCRUD: [],
            Title: "",
            EmployeeItemID: 0,
            EmployeeName: "",
            EmployeeCode: "",
            Designation: "",
            FromDate: null,
            Todate: null,
            Status: "",
            SubGroup: "",
            OfficeLocation: "",
            ApproverNameId: "",
            ApproverName: "",
            ID: 0,
            showDashboard: false,
            ODdays: 0,
            Remark: "",
            Category: "",
            UserName: "",
            Approver: "",
            StartDay: "",
            HalfType: "",
            ToDate_Halftype: "",
            LastDay: "",
            approverResponses: [],
            ApproverRemark: "",
            selectedKey: "",
            ItemID: 0,
            Submitted: false,
        };
        _this.getAllChoices = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ODMOps().getChoices(this.props, 'ApproverResponse').then(function (choices) {
                            var Options = choices.map(function (choice, idx) {
                                return {
                                    key: idx,
                                    text: choice
                                };
                            });
                            _this.setState({ approverResponses: Options });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
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
                                _this.setState({ employeeID: brrResults.Title });
                            }
                            return brrResults;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.changeStatus = function (item) {
            _this.setState({ Status: item.text, selectedKey: item.key });
        };
        _this.updateRequest = function () {
            if (_this.state.ApproverRemark == "" || _this.state.ApproverRemark == null) {
                alert("Please ad comments");
                return false;
            }
            else {
                var request = {
                    ID: _this.state.ItemID,
                    ApproverRemark: _this.state.ApproverRemark,
                    ApproverResponse: _this.state.Status
                };
                ODMOps().setApproval(_this.props, _this.state.ItemID, request).then(function (dataReceived) {
                    console.log(dataReceived);
                    _this.setState({ Submitted: true });
                });
            }
        };
        _this.state = {
            setSPCRUD: [],
            Title: "",
            EmployeeItemID: 0,
            EmployeeName: "",
            EmployeeCode: "",
            Designation: "",
            FromDate: null,
            Todate: null,
            Status: "",
            SubGroup: "",
            OfficeLocation: "",
            ApproverNameId: "",
            ApproverName: "",
            ID: 0,
            showDashboard: false,
            ODdays: 0,
            Remark: "",
            Category: "",
            UserName: "",
            Approver: "",
            StartDay: "",
            HalfType: "",
            ToDate_Halftype: "",
            LastDay: "",
            approverResponses: [],
            ApproverRemark: "",
            selectedKey: "",
            ItemID: 0,
            Submitted: false,
        };
        return _this;
    }
    ApproveOD.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hashUrl, hashUrlSplit, ItemID;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hashUrl = window.location.hash;
                        hashUrlSplit = hashUrl.split('/');
                        ItemID = hashUrlSplit[2];
                        return [4 /*yield*/, this.getAllChoices()];
                    case 1:
                        _a.sent();
                        this.setState({ ItemID: ItemID });
                        return [4 /*yield*/, ODMOps().getODRequest(this.props, parseInt(ItemID)).then(function (results) {
                                _this.currentRequest = results;
                                _this.setState({
                                    EmployeeItemID: results.EmployeeCode,
                                    EmployeeName: results.EmployeeName,
                                    FromDate: format(results.FromDate, "MM/DD/YYYY"),
                                    Todate: format(results.Todate, "MM/DD/YYYY"),
                                    Category: results.Category,
                                    Remark: results.Remark,
                                    ApproverId: results.ApproverNameId,
                                    UserNameId: results.UserName,
                                    ODdays: results.ODdays,
                                    StartDay: results.StartDay,
                                    HalfType: results.HalfType,
                                    ToDate_Halftype: results.ToDate_Halftype,
                                    LastDay: results.LastDay,
                                    ApproverName: results.ApproverName,
                                    Status: results.Status
                                });
                                var currentStatus = _this.state.approverResponses.filter(function (opt) { return opt.text == results.Status; })[0];
                                _this.setState({ selectedKey: currentStatus.key });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApproveOD.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "container-fluid" },
            this.state.Submitted ? React.createElement(Redirect, { to: '/ApproverDashboard' }) : null,
            React.createElement("div", { className: "container" },
                React.createElement("h3", null, "Approve Request "),
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Employee Name:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.EmployeeName }))),
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Approver:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.ApproverName })))),
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "From Date:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.FromDate })),
                        (this.state.FromDate) && React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: 'col-md-6' },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "Start Day:"),
                                    React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.StartDay }))),
                            React.createElement("div", { className: 'col-md-6' },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "Start Half type:"),
                                    React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.HalfType }))))),
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "End Date:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.Todate })),
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: 'col-md-6' },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "End Day:"),
                                    React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.ToDate_Halftype }))),
                            React.createElement("div", { className: 'col-md-6' },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "End Day Half type:"),
                                    React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.LastDay })))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Days:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.ODdays.toString() }))),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Category:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.Category })))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Reason:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.Remark }))),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Approve:"),
                            React.createElement(Dropdown, { className: 'Dropdown-example', placeHolder: 'Select option', onChanged: this.changeStatus, options: this.state.approverResponses, defaultValue: this.state.Status, selectedKey: this.state.selectedKey })))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Approver Remarks:"),
                            React.createElement(TextField, { value: this.state.ApproverRemark, onChanged: function (e) { _this.setState({ ApproverRemark: e }); } })))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-2" },
                        React.createElement(PrimaryButton, { text: "Submit Request", onClick: this.updateRequest, className: 'btn btn-primary' })),
                    React.createElement("div", { className: "col-md-2 " },
                        React.createElement(Link, { className: "btn btn-danger", to: "/ApproverDashboard" }, " Cancel "))))));
    };
    return ApproveOD;
}(React.Component));
export default ApproveOD;

//# sourceMappingURL=ApproveODForm.js.map

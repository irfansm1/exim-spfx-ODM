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
import { TextField, PrimaryButton, DatePicker, Dropdown } from 'office-ui-fabric-react';
import EmployeeOps from '../BAL/EmployeeOps';
import ODMOps from '../BAL/ODMOps';
import { Redirect, Link } from 'react-router-dom';
var pageSize;
pageSize = 10;
var NewODForm = /** @class */ (function (_super) {
    __extends(NewODForm, _super);
    function NewODForm(props) {
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
            categoryOptions: [],
            startDayOption: [],
            halfTypeOption: [],
            Submitted: false,
            myRequests: []
        };
        _this.getAllChoices = function () {
            ODMOps().getChoices(_this.props, 'Category').then(function (choices) {
                var categoryOptions = choices.map(function (choice, idx) {
                    return {
                        key: idx,
                        text: choice
                    };
                });
                _this.setState({ categoryOptions: categoryOptions });
            });
            ODMOps().getChoices(_this.props, 'StartDay').then(function (choices) {
                var categoryOptions = choices.map(function (choice, idx) {
                    return {
                        key: idx,
                        text: choice
                    };
                });
                _this.setState({ startDayOption: categoryOptions });
            });
            ODMOps().getChoices(_this.props, 'HalfType').then(function (choices) {
                var categoryOptions = choices.map(function (choice, idx) {
                    return {
                        key: idx,
                        text: choice
                    };
                });
                _this.setState({ halfTypeOption: categoryOptions });
            });
        };
        _this.getEmployeeData = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EmployeeOps().getEmployee(this.props).then(function (brrResults) {
                            _this.setState({
                                EmployeeItemID: brrResults.ID,
                                EmployeeName: (brrResults.FirstName + brrResults.LastName),
                                EmployeeCode: brrResults.EmployeeTitle,
                                Designation: brrResults.Designation,
                                ApproverNameId: brrResults.LeaveLevel2Id,
                                Approver: brrResults.LeaveLevel2,
                                SubGroup: brrResults.SubGroup,
                                OfficeLocation: brrResults.CurrentOfficeLocation,
                                UserName: brrResults.UserName
                            });
                            ODMOps().getMyOD(_this.props, brrResults.Title).then(function (myRequests) {
                                _this.setState({ myRequests: myRequests.filter(function (data) { return data.CancelRequest == "No"; }) });
                                console.log(myRequests);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this._formatDate = function (date) {
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear());
        };
        _this._onSelectFromDate = function (date) {
            _this.setState({ FromDate: date });
        };
        _this._onSelectTodate = function (date) {
            if (date <= _this.state.FromDate) {
                alert("End date should be greater than start date..");
            }
            else {
                _this.setState({ Todate: date }, function () {
                    _this.ODdaysCalculation();
                });
            }
        };
        _this.changeCategory = function (item) {
            //console.log('here is the things updating...' + item.key + ' ' + item.text + ' ');
            _this.setState({ Category: item.text });
        };
        _this.changeStartDay = function (item) {
            _this.setState({ StartDay: item.text });
        };
        _this.changeEndDay = function (item) {
            _this.setState({ LastDay: item.text });
        };
        _this.changeEndDayType = function (item) {
            _this.setState({ ToDate_Halftype: item.text });
        };
        _this.changeFromDayType = function (item) {
            _this.setState({ HalfType: item.text });
        };
        _this.handleInputChange = function (event) {
            var _a;
            var _b = event.currentTarget, name = _b.name, value = _b.value;
            //this.setState({ ...this.state, [event.target.name]: event.target.value })
            var targetName = event.currentTarget.name;
            _this.setState((_a = {}, _a[event.currentTarget.name] = event.currentTarget.value, _a));
            // switch (event.currentTarget.name) {
            //     case "TravelID":
            //         this.setState({ TravelID: event.currentTarget.value.toString() });
            //         break;
        };
        _this.validate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.state.FromDate == null || this.state.Todate == null) {
                    alert("Please select Valid start and end Date");
                    return [2 /*return*/, false];
                }
                if (this.state.FromDate > this.state.Todate == null) {
                    alert("Start date should be less than End Date");
                    return [2 /*return*/, false];
                }
                if (this.state.Category == "") {
                    alert("Please select Category");
                    return [2 /*return*/, false];
                }
                if (this.state.Remark == "") {
                    alert("Please enter valid reason");
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            });
        }); };
        _this.addRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            var isValid, checkLeave, odRequest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validate()];
                    case 1:
                        isValid = _a.sent();
                        return [4 /*yield*/, this.validateOD()];
                    case 2:
                        checkLeave = _a.sent();
                        if (isValid == true && checkLeave == false) {
                            odRequest = {
                                Title: this.state.EmployeeName,
                                EmployeeIDId: this.state.EmployeeItemID,
                                FromDate: this.state.FromDate,
                                Todate: this.state.Todate,
                                Category: this.state.Category,
                                Remark: this.state.Remark,
                                ApproverId: this.state.ApproverNameId,
                                UserNameId: this.state.UserName,
                                Day: this.state.ODdays,
                                StartDay: this.state.StartDay,
                                HalfType: this.state.HalfType,
                                ToDate_Halftype: this.state.ToDate_Halftype,
                                LastDay: this.state.LastDay,
                            };
                            if (checkLeave == false) {
                                ODMOps().insertNewODRequest(this.props, odRequest).then(function (dataReceived) {
                                    console.log(dataReceived);
                                    //alert("setting state");
                                    _this.setState({ Submitted: true });
                                });
                            }
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.validateOD = function () { return __awaiter(_this, void 0, void 0, function () {
            var datafilter, toDate, checkDate_1, findData;
            return __generator(this, function (_a) {
                datafilter = [];
                toDate = new Date(this.state.Todate);
                this.state.myRequests.map(function (item) {
                    datafilter.push({
                        FromDate: new Date(item.FromDate),
                        Todate: new Date(item.Todate),
                        ApproverResponse: item.ApproverResponse,
                        ID: item.ID
                    });
                });
                if (datafilter.length > 0) {
                    checkDate_1 = new Date(this.state.FromDate);
                    while (checkDate_1 <= toDate) {
                        findData = datafilter.filter(function (request) { return (request.FromDate <= checkDate_1 && request.Todate >= checkDate_1 && request.ApproverResponse != "Rejected"); });
                        if (findData && findData.length > 0) {
                            alert("You have already applied the request on these dates.");
                            return [2 /*return*/, true];
                        }
                        checkDate_1.setDate(checkDate_1.getDate() + 1);
                    }
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, false];
            });
        }); };
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
            categoryOptions: [],
            startDayOption: [],
            halfTypeOption: [],
            Submitted: false,
            myRequests: []
        };
        return _this;
    }
    NewODForm.prototype.componentDidMount = function () {
        this.getEmployeeData();
        //StartDay  HalfType LastDay
        this.getAllChoices();
    };
    NewODForm.prototype._log = function (str) {
        var _this = this;
        return function () {
            console.log(str);
            console.log(_this.state);
        };
    };
    NewODForm.prototype.ODdaysCalculation = function () {
        var fDate = new Date(this.state.FromDate);
        fDate.setHours(0);
        console.log(this.state.FromDate);
        console.log(fDate);
        //Date FromDate = (this.state.FromDate)
        var ToDate = this.state.Todate;
        //var F_FromDate = FromDate.split("-");
        //var D_FromDate = new Date(F_FromDate[2], F_FromDate[1] - 1, F_FromDate[0]);
        //var F_ToDate = ToDate.split("-");
        //var D_ToDate = new Date(F_ToDate[2], F_ToDate[1] - 1, F_ToDate[0]);
        if (this.state.FromDate > this.state.Todate) {
            alert("From Date should be less than To Date");
            //$("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text(0);
            return false;
        }
        if (this.state.FromDate == this.state.Todate) {
            // $("#lastOD").hide();
            //$("#halfOD").hide();
        }
        else {
            //$("#lastOD").show();
            //$('#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_ff7_1_ctl00_DropDownChoice').focus();
            //$("#halfOD").show();
        }
        var ODdays_Time = (this.state.Todate.getTime() - this.state.FromDate.getTime());
        var ODdays = Math.round(ODdays_Time / (1000 * 60 * 60 * 24)) + 1;
        if (isNaN(ODdays)) {
            this.setState({ ODdays: 0 });
        }
        else {
            this.setState({ ODdays: ODdays });
        }
        // if ($("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text() == "1") {
        //     $("select[title='LastDay']").hide();
        //     $(".lastdayclsspan").hide();
        // }
        // else {
        //     $("select[title='LastDay']").show();
        //     $(".lastdayclsspan").show();
        // }
    };
    NewODForm.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            this.state.Submitted == true ? React.createElement(Redirect, { to: '/' }) : null,
            React.createElement("div", { className: "container shadow p-3" },
                React.createElement("h2", null, "Request New OD "),
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Employee Name:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.EmployeeName }))),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Designation:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.Designation })))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Approver:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.Approver }))),
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Sub Group:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.SubGroup })))),
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "From Date:"),
                            React.createElement(DatePicker, { formatDate: this._formatDate, onSelectDate: this._onSelectFromDate, value: this.state.FromDate })),
                        (this.state.FromDate) && React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: 'col-md-6' },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "Start Day:"),
                                    React.createElement(Dropdown, { className: 'Dropdown-example', placeHolder: 'Select start', ariaLabel: 'Select Start day', onChanged: this.changeStartDay, options: this.state.startDayOption }))),
                            this.state.StartDay == "Half day" &&
                                React.createElement("div", { className: 'col-md-6' },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", null, "Start Half type:"),
                                        React.createElement(Dropdown, { className: 'Dropdown-example', placeHolder: 'Select start', ariaLabel: 'Select Start day', onChanged: this.changeFromDayType, options: this.state.halfTypeOption }))))),
                    React.createElement("div", { className: 'col-md-6' },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "End Date:"),
                            React.createElement(DatePicker, { isRequired: false, pickerAriaLabel: 'Please select end date', minDate: this.state.FromDate, formatDate: this._formatDate, onSelectDate: this._onSelectTodate, value: this.state.Todate })),
                        (this.state.Todate) && React.createElement("div", { className: 'row' },
                            React.createElement("div", { className: 'col-md-6' },
                                React.createElement("div", { className: "form-group" },
                                    React.createElement("label", null, "End Day:"),
                                    React.createElement(Dropdown, { className: 'Dropdown-example', placeHolder: 'Select start', ariaLabel: 'Select Start day', onChanged: this.changeEndDay, options: this.state.startDayOption }))),
                            this.state.LastDay == "Half day" &&
                                React.createElement("div", { className: 'col-md-6' },
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", null, "End Day Half type:"),
                                        React.createElement(Dropdown, { className: 'Dropdown-example', placeHolder: 'Select start', ariaLabel: 'Select End day', onChanged: this.changeEndDayType, options: this.state.halfTypeOption })))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Days:"),
                            React.createElement(TextField, { disabled: true, readOnly: true, value: this.state.ODdays.toString() }))),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Category:"),
                            React.createElement(Dropdown, { className: 'Dropdown-example', placeHolder: 'Select Category', id: 'Basicdrop1', ariaLabel: 'Select Category', onChanged: this.changeCategory, options: this.state.categoryOptions })))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Reason:"),
                            React.createElement(TextField, { onChanged: function (e) { _this.setState({ Remark: e }); }, name: "Remark", value: this.state.Remark })))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-2" },
                        React.createElement(PrimaryButton, { text: "Add Request", onClick: this.addRequest, className: 'btn btn-primary' })),
                    React.createElement("div", { className: "col-md-2 " },
                        React.createElement(Link, { className: "btn btn-danger", to: "/" }, " Cancel "))))));
    };
    return NewODForm;
}(React.Component));
export default NewODForm;

//# sourceMappingURL=NewODForm.js.map

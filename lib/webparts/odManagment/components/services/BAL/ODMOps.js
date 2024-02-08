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
import SPCRUDOPS from '../DAL/spcrudops';
export default function ODMOps() {
    var _this = this;
    var spCrudOps = new SPCRUDOPS();
    var getGroups = function (groupArray) {
        var groups = "";
        groupArray.forEach(function (element) {
            groups = groups + (groups == "" ? element.ShortName : "," + element.ShortName);
        });
        return groups;
    };
    var getApprovalDashboard = function (props) { return __awaiter(_this, void 0, void 0, function () {
        var currentUserLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
                    return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getData("ODManagement", "*,EmployeeID/EmployeeName,EmployeeID/Title", "EmployeeID", "", { column: 'Id', isAscending: false }, props).then(function (results) {
                        console.log(results);
                        return results;
                    })];
                case 2: 
                //props.currentSPContext.pageContext._user._email;
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getPendingOD = function (props, employeeID) { return __awaiter(_this, void 0, void 0, function () {
        var currentUserLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
                    return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getData("ODManagement", "*,EmployeeID/EmployeeName,EmployeeID/Title", "EmployeeID", "EmployeeID/Title eq " + employeeID + " and ApproverResponse eq 'Pending'", { column: 'Id', isAscending: false }, props).then(function (results) {
                        return results;
                    })];
                case 2: 
                //props.currentSPContext.pageContext._user._email;
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getMyOD = function (props, employeeID) { return __awaiter(_this, void 0, void 0, function () {
        var currentUserLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
                    return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getData("ODManagement", "*,EmployeeID/EmployeeName,EmployeeID/Title", "EmployeeID", "EmployeeID/Title eq " + employeeID, { column: 'Id', isAscending: false }, props).then(function (results) {
                        return results;
                    })];
                case 2: 
                //props.currentSPContext.pageContext._user._email;
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getMyApprovedOD = function (props, employeeID) { return __awaiter(_this, void 0, void 0, function () {
        var currentUserLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debugger;
                    currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
                    return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getData("ODManagement", "*,EmployeeID/EmployeeName,EmployeeID/Title", "EmployeeID", "EmployeeID/Title eq " + employeeID + " and ApproverResponse eq 'Approved'", { column: 'Id', isAscending: false }, props).then(function (results) {
                        console.log(results);
                        return results;
                    })];
                case 2: 
                //props.currentSPContext.pageContext._user._email;
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getGroupHeads = function (props) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getRootData("EmployeeMaster", "*,Designation/Title,LeaveLevel1/Title,LeaveLevel2/Title,LeaveLevel2/Id,SubGroup/ShortName,CurrentOfficeLocation/Title", "SubGroup,Designation,LeaveLevel1,LeaveLevel2,CurrentOfficeLocation", "((Role eq 'Group Head') or (Role eq 'Regional Head')) and (Active eq 1)", { column: 'Id', isAscending: false }, props).then(function (results) {
                        console.log(results);
                        var employees = new Array();
                        results.map(function (item) {
                            employees.push({
                                Title: item.Title,
                                ID: item.ID,
                                EmployeeTitle: item.EmployeeTitle,
                                FirstName: item.FirstName,
                                MiddleName: item.MiddleName,
                                LastName: item.LastName,
                                UserName: item.UserName,
                                Gender: item.Gender,
                                OfficeLocation: item.OfficeLocation,
                                CurrentOfficeLocation: item.CurrentOfficeLocation.Title,
                                SubGroup: (item.SubGroup.length > 0 ? getGroups(item.SubGroup) : ""),
                                Unit: item.Unit,
                                EmployeeType: item.EmployeeType,
                                Scale: item.Scale,
                                Grade: item.Grade,
                                Designation: item.Designation.Title,
                                Payscale: item.Payscale,
                                ReportingManager: item.ReportingManager,
                                AlternateReportingManager: item.AlternateReportingManager,
                                Active: item.Active,
                                Phone_x0020_No: item.Phone_x0020_No,
                                MobileNo_x002e_: item.MobileNo_x002e_,
                                CompanyEmail: item.CompanyEmail,
                                AlternateEmail: item.AlternateEmail,
                                LeaveLevel1: item.LeaveLevel1.Title,
                                LeaveLevel2: item.LeaveLevel2.Title,
                                LeaveLevel2Id: item.LeaveLevel2Id,
                                Role: item.Role,
                                BranchName: item.BranchName,
                                HHApproverName: item.HHApproverName,
                                LTCDate: item.LTCDate,
                                TempDOB: item.TempDOB,
                                EmpType: item.EmpType
                            });
                        });
                        return employees;
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getSubGroups = function (props) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getRootData("Sub Group Master", "*", "", "", { column: 'Id', isAscending: false }, props).then(function (results) {
                        console.log(results);
                        return results;
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getUserProfile = function (props) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getUserProfile(props)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var insertNewODRequest = function (props, requestData) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).insertData("ODManagement", requestData, props)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getCategories = function (props) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getChoicesByFields("ODManagement", "Category", props).then(function (results) {
                        console.log(results.Choices);
                        return results.Choices;
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getChoices = function (props, fieldName) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getChoicesByFields("ODManagement", fieldName, props).then(function (results) {
                        console.log(results.Choices);
                        return results.Choices;
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getODRequest = function (props, itemID) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getItemById("ODManagement", "*,EmployeeID/EmployeeName,Approver/Name,Approver/Title", "EmployeeID,Approver", itemID, props).then(function (results) {
                        //let ODRequest: Array<IODRequest> = new Array<IODRequest>();
                        var ODRequest = {
                            ID: results.ID,
                            EmployeeName: results.EmployeeID.EmployeeName,
                            ODdays: results.Day,
                            Remark: results.Remark,
                            Category: results.Category,
                            UserName: results.UserName,
                            Approver: results.Approver,
                            StartDay: results.StartDay,
                            HalfType: results.HalfType,
                            ToDate_Halftype: results.ToDate_Halftype,
                            LastDay: results.LastDay,
                            EmployeeCode: results.EmployeeCode,
                            Designation: "",
                            FromDate: results.FromDate,
                            Todate: results.Todate,
                            Status: results.ApproverResponse,
                            ApproverNameId: results.ApproverNameId,
                            ApproverName: results.Approver.Title,
                        };
                        return ODRequest;
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var checklAlreadyRaisedRequest = function (EmployeeID, fromDate, toDate) {
        return false;
    };
    var getApprovals = function (props, employeeID) { return __awaiter(_this, void 0, void 0, function () {
        var currentUserLogin, email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
                    email = props.currentSPContext.pageContext._user._email;
                    return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).getData("ODManagement", "*,EmployeeID/EmployeeName,EmployeeID/Title,Level2EmpID/ID,Level2EmpID/Title", "EmployeeID,Level2EmpID", "Level2EmpID/Title eq " + employeeID, { column: 'Id', isAscending: false }, props).then(function (results) {
                        return results;
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var setApproval = function (props, itemID, request) { return __awaiter(_this, void 0, void 0, function () {
        var currentUserLogin, email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
                    email = props.currentSPContext.pageContext._user._email;
                    return [4 /*yield*/, spCrudOps];
                case 1: return [4 /*yield*/, (_a.sent()).updateData("ODManagement", itemID, request, props)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return {
        getApprovalDashboard: getApprovalDashboard,
        getGroupHeads: getGroupHeads,
        getSubGroups: getSubGroups,
        getUserProfile: getUserProfile,
        getPendingOD: getPendingOD,
        getMyOD: getMyOD,
        getMyApprovedOD: getMyApprovedOD,
        insertNewODRequest: insertNewODRequest,
        getCategories: getCategories,
        getChoices: getChoices,
        checklAlreadyRaisedRequest: checklAlreadyRaisedRequest,
        getODRequest: getODRequest,
        getApprovals: getApprovals,
        setApproval: setApproval
    };
}

//# sourceMappingURL=ODMOps.js.map

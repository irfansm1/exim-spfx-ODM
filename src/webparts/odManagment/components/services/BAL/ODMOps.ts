
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
import SPCRUDOPS from '../DAL/spcrudops';
import { IODRequest } from '../interfaces/IODRequest';

export interface ODMOps {
    getApprovalDashboard(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getPendingOD(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    getMyOD(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    getMyApprovedOD(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    getGroupHeads(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getSubGroups(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getUserProfile(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    insertNewODRequest(props: IOdManagmentProps,requestData:any): Promise<IOdManagmentProps>;
    getCategories(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getChoices(props: IOdManagmentProps,fieldName:string): Promise<any[]>;
    getODRequest(props:IOdManagmentProps,itemID:number): Promise<IODRequest>;
    getApprovals(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    setApproval(props: IOdManagmentProps, ItemID: number, request:any): Promise<any>;
}

export default function ODMOps() {
    const spCrudOps = new SPCRUDOPS();
    const getGroups = (groupArray) => {
        let groups = "";
        groupArray.forEach(element => {
            groups = groups + (groups == "" ? element.ShortName : "," + element.ShortName)
        });
        return groups;
    }
    const getApprovalDashboard = async (props: IOdManagmentProps): Promise<any[]> => {
        var currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
        //props.currentSPContext.pageContext._user._email;
        return await (await spCrudOps).getData("ODManagement"
            , "*,EmployeeID/EmployeeName,EmployeeID/Title"
            , "EmployeeID"
            , ""
            , { column: 'Id', isAscending: false }, props).then(results => {
                console.log(results);
                return results;
            });
    };
    const getPendingOD = async (props: IOdManagmentProps, employeeID: string): Promise<any[]> => {
        var currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
        //props.currentSPContext.pageContext._user._email;
        return await (await spCrudOps).getData("ODManagement"
            , "*,EmployeeID/EmployeeName,EmployeeID/Title"
            , "EmployeeID"
            , "EmployeeID/Title eq " + employeeID + " and ApproverResponse eq 'Pending'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                return results;
            });
    };
    const getMyOD = async (props: IOdManagmentProps, employeeID: string): Promise<any[]> => {
        var currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
        //props.currentSPContext.pageContext._user._email;
        return await (await spCrudOps).getData("ODManagement"
            , "*,EmployeeID/EmployeeName,EmployeeID/Title"
            , "EmployeeID"
            , "EmployeeID/Title eq " + employeeID
            , { column: 'Id', isAscending: false }, props).then(results => {
                return results;
            });
    };
    const getMyApprovedOD = async (props: IOdManagmentProps, employeeID: string): Promise<any[]> => {
        debugger;
        var currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
        //props.currentSPContext.pageContext._user._email;
        return await (await spCrudOps).getData("ODManagement"
            , "*,EmployeeID/EmployeeName,EmployeeID/Title"
            , "EmployeeID"
            , "EmployeeID/Title eq " + employeeID + " and ApproverResponse eq 'Approved'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                console.log(results);
                return results;
            });
    };
    const getGroupHeads = async (props: IOdManagmentProps): Promise<IEmployee[]> => {
        return await (await spCrudOps).getRootData("EmployeeMaster"
            , "*,Designation/Title,LeaveLevel1/Title,LeaveLevel2/Title,LeaveLevel2/Id,SubGroup/ShortName,CurrentOfficeLocation/Title"
            , "SubGroup,Designation,LeaveLevel1,LeaveLevel2,CurrentOfficeLocation"
            , "((Role eq 'Group Head') or (Role eq 'Regional Head')) and (Active eq 1)"
            , { column: 'Id', isAscending: false }, props).then(results => {
                console.log(results);
                let employees: Array<IEmployee> = new Array<IEmployee>();
                results.map(item => {
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
            });
    };
    const getSubGroups = async (props: IOdManagmentProps): Promise<any> => {
        return await (await spCrudOps).getRootData("Sub Group Master"
            , "*"
            , ""
            , ""
            , { column: 'Id', isAscending: false }, props).then(results => {
                console.log(results);
                return results;
            });
    };
    const getUserProfile = async (props: IOdManagmentProps): Promise<any> => {
        return await (await spCrudOps).getUserProfile(props);
    };
    const insertNewODRequest = async (props: IOdManagmentProps,requestData:any): Promise<any> => {
        return await (await spCrudOps).insertData("ODManagement",requestData,props);
    };
    const getCategories = async (props: IOdManagmentProps): Promise<any[]> => {
        return await (await spCrudOps).getChoicesByFields("ODManagement"
            , "Category"
            , props).then(results => {
                console.log(results.Choices);
                return results.Choices;
            });
    };
    const getChoices = async (props: IOdManagmentProps,fieldName:string): Promise<any[]> => {
        return await (await spCrudOps).getChoicesByFields("ODManagement"
            , fieldName
            , props).then(results => {
                console.log(results.Choices);
                return results.Choices;
            });
    };
    const getODRequest = async(props:IOdManagmentProps,itemID:number): Promise<IODRequest>=>{
        return await (await spCrudOps).getItemById("ODManagement"
            , "*,EmployeeID/EmployeeName,Approver/Name,Approver/Title","EmployeeID,Approver",itemID
            , props).then(results => {
                //let ODRequest: Array<IODRequest> = new Array<IODRequest>();
                let ODRequest: IODRequest = {
                    
                    ID: results.ID,
                    EmployeeName: results.EmployeeID.EmployeeName,
                    ODdays:results.Day,
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
                }
                return ODRequest;
            });
    }
    const checklAlreadyRaisedRequest = (EmployeeID:string,fromDate:Date,toDate:Date):boolean=>{
        
        return false;
    }
    const getApprovals = async (props: IOdManagmentProps, employeeID: string): Promise<any[]> => {
        var currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
        let email = props.currentSPContext.pageContext._user._email;
        return await (await spCrudOps).getData("ODManagement"
            , "*,EmployeeID/EmployeeName,EmployeeID/Title,Level2EmpID/ID,Level2EmpID/Title"
            , "EmployeeID,Level2EmpID"
            , "Level2EmpID/Title eq " + employeeID
            , { column: 'Id', isAscending: false }, props).then(results => {
                return results;
            });
    };
    const setApproval = async (props: IOdManagmentProps, itemID: number,request:any): Promise<any> => {
        var currentUserLogin = (props.currentSPContext.pageContext._user._displayName == "spfarmadmin") ? "developer4@eximbankindia.in" : props.currentSPContext.pageContext._user._email;
        let email = props.currentSPContext.pageContext._user._email;
        return await (await spCrudOps).updateData("ODManagement",itemID,request,props);
    };
    return {
          getApprovalDashboard
        , getGroupHeads
        , getSubGroups
        , getUserProfile
        , getPendingOD
        , getMyOD
        , getMyApprovedOD
        , insertNewODRequest
        , getCategories
        , getChoices
        , checklAlreadyRaisedRequest
        , getODRequest
        , getApprovals
        , setApproval
    };
}
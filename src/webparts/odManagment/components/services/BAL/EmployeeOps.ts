import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
import SPCRUDOPS from '../DAL/spcrudops';



export interface EmployeeOps {
    getEmployee( props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getGroupHeads( props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getSubGroups( props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getUserProfile( props: IOdManagmentProps): Promise<IOdManagmentProps>;
}

export default function EmployeeOps() {
    const spCrudOps = new SPCRUDOPS();
        const getGroups=(groupArray)=>{
            let groups= "";
            groupArray.forEach(element => {
                groups =groups+ (groups==""?element.ShortName:","+element.ShortName)
            });
            return groups;
        }
        const getEmployee = async (props: IOdManagmentProps): Promise<IEmployee> => {
            debugger;
            var currentUserLogin=(props.currentSPContext.pageContext._user._displayName=="spfarmadmin")?"developer3@eximbankindia.in":props.currentSPContext.pageContext._user._email;
            //props.currentSPContext.pageContext._user._email;
                return await (await spCrudOps).getRootData("EmployeeMaster"
                    , "*,Designation/Title,LeaveLevel1/Title,LeaveLevel2/Title,LeaveLevel2/Id,SubGroup/ShortName,CurrentOfficeLocation/Title"
                    , "SubGroup,Designation,LeaveLevel1,LeaveLevel2,CurrentOfficeLocation"
                    , "(CompanyEmail eq '"+(currentUserLogin)+"')"
                    , { column: 'Id', isAscending: false }, props).then(results => {
                        //console.log(results);
                        let employees: Array<IEmployee> = new Array<IEmployee>();
                        results.map(item => {
                            employees.push({
                            Title:item.Title,
                            ID:item.ID.toString(),
                            EmployeeTitle:item.EmployeeTitle,
                            FirstName:item.FirstName,
                            MiddleName:item.MiddleName,
                            LastName:item.LastName,
                            UserName:item.UserNameId,
                            Gender:item.Gender,
                            OfficeLocation:item.OfficeLocation,
                            CurrentOfficeLocation:item.CurrentOfficeLocation.Title,
                            SubGroup:(item.SubGroup.length>0 ? getGroups(item.SubGroup):""),
                            Unit:item.Unit,
                            EmployeeType:item.EmployeeType,
                            Scale:item.Scale,
                            Grade:item.Grade,
                            Designation:item.Designation.Title,
                            Payscale:item.Payscale,
                            ReportingManager:item.ReportingManager,
                            AlternateReportingManager:item.AlternateReportingManager,
                            Active:item.Active,
                            Phone_x0020_No:item.Phone_x0020_No,
                            MobileNo_x002e_:item.MobileNo_x002e_,
                            CompanyEmail:item.CompanyEmail,
                            AlternateEmail:item.AlternateEmail,
                            LeaveLevel1:item.LeaveLevel1.Title,
                            LeaveLevel2:item.LeaveLevel2.Title,
                            LeaveLevel2Id:item.LeaveLevel2Id,
                            Role:item.Role,
                            BranchName:item.BranchName,
                            HHApproverName:item.HHApproverName,
                            LTCDate:item.LTCDate,
                            TempDOB:item.TempDOB,
                            EmpType:item.EmpType
                            });
                        });
    
                        return employees[0];
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
                            Title:item.Title,
                            ID:item.ID,
                            EmployeeTitle:item.EmployeeTitle,
                            FirstName:item.FirstName,
                            MiddleName:item.MiddleName,
                            LastName:item.LastName,
                            UserName:item.UserName,
                            Gender:item.Gender,
                            OfficeLocation:item.OfficeLocation,
                            CurrentOfficeLocation:item.CurrentOfficeLocation.Title,
                            SubGroup:(item.SubGroup.length>0 ? getGroups(item.SubGroup):""),
                            Unit:item.Unit,
                            EmployeeType:item.EmployeeType,
                            Scale:item.Scale,
                            Grade:item.Grade,
                            Designation:item.Designation.Title,
                            Payscale:item.Payscale,
                            ReportingManager:item.ReportingManager,
                            AlternateReportingManager:item.AlternateReportingManager,
                            Active:item.Active,
                            Phone_x0020_No:item.Phone_x0020_No,
                            MobileNo_x002e_:item.MobileNo_x002e_,
                            CompanyEmail:item.CompanyEmail,
                            AlternateEmail:item.AlternateEmail,
                            LeaveLevel1:item.LeaveLevel1.Title,
                            LeaveLevel2:item.LeaveLevel2.Title,
                            LeaveLevel2Id:item.LeaveLevel2Id,
                            Role:item.Role,
                            BranchName:item.BranchName,
                            HHApproverName:item.HHApproverName,
                            LTCDate:item.LTCDate,
                            TempDOB:item.TempDOB,
                            EmpType:item.EmpType
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
    return {
        getEmployee
        ,getGroupHeads
        ,getSubGroups
        ,getUserProfile
        //,insertTravelData
    };
}
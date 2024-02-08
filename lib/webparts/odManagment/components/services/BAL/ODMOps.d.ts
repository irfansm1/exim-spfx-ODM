import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
import { IODRequest } from '../interfaces/IODRequest';
export interface ODMOps {
    getApprovalDashboard(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getPendingOD(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    getMyOD(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    getMyApprovedOD(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    getGroupHeads(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getSubGroups(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getUserProfile(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    insertNewODRequest(props: IOdManagmentProps, requestData: any): Promise<IOdManagmentProps>;
    getCategories(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getChoices(props: IOdManagmentProps, fieldName: string): Promise<any[]>;
    getODRequest(props: IOdManagmentProps, itemID: number): Promise<IODRequest>;
    getApprovals(props: IOdManagmentProps, employeeID: string): Promise<IOdManagmentProps>;
    setApproval(props: IOdManagmentProps, ItemID: number, request: any): Promise<any>;
}
export default function ODMOps(): {
    getApprovalDashboard: (props: IOdManagmentProps) => Promise<any[]>;
    getGroupHeads: (props: IOdManagmentProps) => Promise<IEmployee[]>;
    getSubGroups: (props: IOdManagmentProps) => Promise<any>;
    getUserProfile: (props: IOdManagmentProps) => Promise<any>;
    getPendingOD: (props: IOdManagmentProps, employeeID: string) => Promise<any[]>;
    getMyOD: (props: IOdManagmentProps, employeeID: string) => Promise<any[]>;
    getMyApprovedOD: (props: IOdManagmentProps, employeeID: string) => Promise<any[]>;
    insertNewODRequest: (props: IOdManagmentProps, requestData: any) => Promise<any>;
    getCategories: (props: IOdManagmentProps) => Promise<any[]>;
    getChoices: (props: IOdManagmentProps, fieldName: string) => Promise<any[]>;
    checklAlreadyRaisedRequest: (EmployeeID: string, fromDate: Date, toDate: Date) => boolean;
    getODRequest: (props: IOdManagmentProps, itemID: number) => Promise<IODRequest>;
    getApprovals: (props: IOdManagmentProps, employeeID: string) => Promise<any[]>;
    setApproval: (props: IOdManagmentProps, itemID: number, request: any) => Promise<any>;
};

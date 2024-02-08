import * as React from 'react';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
export default class ViewODForm extends React.Component<IOdManagmentProps, {}> {
    private columns;
    private data;
    private currentRequest;
    state: {
        setSPCRUD: any[];
        Title: string;
        EmployeeItemID: number;
        EmployeeName: string;
        EmployeeCode: string;
        Designation: string;
        FromDate: any;
        Todate: any;
        Status: string;
        SubGroup: string;
        OfficeLocation: string;
        ApproverNameId: string;
        ApproverName: string;
        ID: number;
        showDashboard: boolean;
        ODdays: number;
        Remark: string;
        Category: string;
        UserName: string;
        Approver: string;
        StartDay: string;
        HalfType: string;
        ToDate_Halftype: string;
        LastDay: string;
    };
    constructor(props: IOdManagmentProps);
    componentDidMount(): void;
    getEmployeeData: () => Promise<IEmployee>;
    render(): React.ReactElement<IOdManagmentProps>;
}

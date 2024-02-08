import * as React from 'react';
import styles from '../../OdManagment.module.scss';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
//import { Route, HashRouter, Routes } from 'react-router-dom';
import EmployeeOps from '../BAL/EmployeeOps';
import ODMOps from '../BAL/ODMOps';
import { IEmployee } from '../interfaces/IEmployee';
import { SelectionMode } from '@pnp/spfx-controls-react';
import { compareAsc, format } from "date-fns";
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
    Pivot,
    PivotItem,
    PivotLinkSize,
    PivotLinkFormat
} from 'office-ui-fabric-react/lib/Pivot';
import DashboardApproved from './dashboardApproved'
import DashboardPending from './dashboardPending';
import { Link } from 'react-router-dom';
import { TextField, Icon, DetailsList, DetailsListLayoutMode, IColumn, Fabric, DefaultButton, PrimaryButton, DatePicker, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
export default class ApproverDashboard extends React.Component<IOdManagmentProps, {}> {

    private columns: IColumn[];
    private data: any[];
    public state = {
        data: [],
        pendingOD: [],
        approvedOD: []
    }
    constructor(props: IOdManagmentProps) {
        super(props);
        this.state = {
            data: [],
            pendingOD: [],
            approvedOD: []
        },
            // Column Defs
            this.columns = [
                {
                    key: 'EmployeeID',
                    name: 'EmployeeID',
                    fieldName: 'EmployeeID',
                    minWidth: 50,
                    maxWidth: 100,
                    isResizable: true,
                    onRender: (item: any, index: number, columns: IColumn) => {

                        return <div>{item.EmployeeID.Title}</div>;
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
                    onRender: (item: any, index: number, columns: IColumn) => {

                        return <div>{item.EmployeeID.EmployeeName}</div>;
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
                    onRender: (item: any, index: number, columns: IColumn) => {

                        return <div>{format(item['FromDate'], "MM/DD/YYYY")}</div>;
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
                    onRender: (item: any, index: number, columns: IColumn) => {

                        return <div>{format(item['Todate'], "MM/DD/YYYY")}</div>;
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
                    onRender: (item: any, index: number, columns: IColumn) => {
                        const ItemId = item['ID'];
                        return <div>
                            <Link to={'/ApproveForm/' + ItemId}><Icon iconName='Accept' /></Link>
                        </div>;
                    },
                    headerClassName: 'tableHead'
                },
                {
                    key: 'View', name: 'View', fieldName: 'ID', minWidth: 50, maxWidth: 150, isResizable: true,
                    onRender: (item: any, index: number, columns: IColumn) => {
                        const ItemId = item['ID'];
                        return <div>
                            <Link to={'/ViewForm/' + ItemId}><Icon iconName='View' /></Link>
                        </div>;
                    },
                    headerClassName: 'tableHead'
                }
            ];
    }
    componentDidMount(): void {
        this.getEmployeeData();
    }

    getEmployeeData = async (): Promise<IEmployee> => {

        return await EmployeeOps().getEmployee(this.props).then(brrResults => {
            if (brrResults) {
                this.setState({
                    EmployeeName: (brrResults.FirstName + brrResults.LastName),
                    EmployeeCode: brrResults.EmployeeTitle,
                    Designation: brrResults.Designation,
                    ApproverNameId: brrResults.LeaveLevel2Id,
                    ApproverName: brrResults.LeaveLevel2,
                    SubGroup: brrResults.SubGroup,
                    OfficeLocation: brrResults.CurrentOfficeLocation
                });
            }
            ODMOps().getApprovals(this.props, brrResults.Title).then(response => {
                this.setState({ data: response.filter(user => user.ApproverResponse == "Pending")});
                //console.log(response);
                this.setState({ approvedOD: response.filter(user => user.ApproverResponse == "Approved")});
                this.setState({ pendingOD: response.filter(user => user.ApproverResponse == "Rejected")});
            });
            return brrResults;

        });
    };
    public render(): React.ReactElement<IOdManagmentProps> {

        return (
            <div className="container-fluid" >
                <Pivot linkSize={PivotLinkSize.large} linkFormat={PivotLinkFormat.tabs}>
                    <PivotItem linkText='Pending for Approval'>
                        <hr></hr>
                        <DetailsList
                            columns={this.columns}
                            items={this.state.data}
                            selectionMode={SelectionMode.none}
                            layoutMode={DetailsListLayoutMode.justified}
                        />
                    </PivotItem>
                    <PivotItem linkText='Approved Requests'>
                        <DashboardApproved approvedOD={this.state.approvedOD}></DashboardApproved>
                    </PivotItem>
                    <PivotItem linkText='Rejected Requests'>
                        <DashboardPending pendingOD={this.state.pendingOD}></DashboardPending>
                    </PivotItem>
                </Pivot>
            </div >
        );
    }
}

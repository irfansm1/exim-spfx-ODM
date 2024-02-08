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
import { Link } from 'react-router-dom';
import { TextField, Icon, DetailsList, DetailsListLayoutMode, IColumn, Fabric, DefaultButton, PrimaryButton, DatePicker, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
export default class ApprovedOD extends React.Component<IOdManagmentProps, {}> {

    private columns: IColumn[];
    private data: any[];
    public state = {
        data: []
    }
    constructor(props: IOdManagmentProps) {
        super(props);
        this.state = {
            data: []
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
                    headerClassName:'tableHead'
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
                    headerClassName:'tableHead'
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
                    headerClassName:'tableHead'
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
                    headerClassName:'tableHead'
                },
                {
                    key: 'Category',
                    name: 'Category',
                    fieldName: 'Category',
                    minWidth: 100,
                    maxWidth: 200,
                    isResizable: true,
                    headerClassName:'tableHead'
                },
                {
                    key: 'ApproverResponse',
                    name: 'Approver Response',
                    fieldName: 'ApproverResponse',
                    minWidth: 50,
                    maxWidth: 300,
                    isResizable: true,
                    headerClassName:'tableHead'
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
                ODMOps().getMyApprovedOD(this.props, brrResults.Title).then(dataReceived => {
                    this.setState({ data: dataReceived });
                });
            }
            return brrResults;

        });
    };
    public render(): React.ReactElement<IOdManagmentProps> {

        return (
            <div className={"container-fluid"} >
                <hr></hr>
                <DetailsList
                    columns={this.columns}
                    items={this.state.data}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}
                />

            </div >
        );
    }
}

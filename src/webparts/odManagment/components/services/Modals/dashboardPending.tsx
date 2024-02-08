import * as React from 'react';
import styles from '../../OdManagment.module.scss';
import { TextField, Icon, DetailsList, DetailsListLayoutMode, IColumn, Fabric, DefaultButton, PrimaryButton, DatePicker, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { compareAsc, format } from "date-fns";
import { Link } from 'react-router-dom';
import { SelectionMode } from '@pnp/spfx-controls-react';
export interface IPendingProps {
    pendingOD: any;
  }
export default class DashboardPending extends React.Component<IPendingProps, any> {
    private columns : IColumn[];
  
    constructor(props : IPendingProps) {
      super(props);
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
            maxWidth: 150,
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
    
    public render(): React.ReactElement<IPendingProps> {
        return (
         <div>  
            <hr></hr>
          <Fabric>
              <DetailsList 
                columns={ this.columns } 
                items={ this.props.pendingOD as any } 
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified} 
                />
          </Fabric></div> 
        );
      }
}

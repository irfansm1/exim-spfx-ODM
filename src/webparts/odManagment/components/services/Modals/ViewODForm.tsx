import * as React from 'react';
import styles from '../../OdManagment.module.scss';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
//import { Route, HashRouter, Routes } from 'react-router-dom';
import EmployeeOps from '../BAL/EmployeeOps';
import ODMOps from '../BAL/ODMOps';
import { IEmployee } from '../interfaces/IEmployee';
import { SelectionMode } from '@pnp/spfx-controls-react';
import { IODRequest } from '../interfaces/IODRequest';
import { useParams,useLocation} from 'react-router-dom';
import { compareAsc, format } from "date-fns";
import {  Link } from 'react-router-dom';
import { TextField, Icon, DetailsList, DetailsListLayoutMode, IColumn, Fabric, DefaultButton, PrimaryButton, DatePicker, Dropdown, IDropdownOption } from 'office-ui-fabric-react';

export default class ViewODForm extends React.Component<IOdManagmentProps, {}> {

    private columns: IColumn[];
    private data: any[];
    private currentRequest:IODRequest;
    public state = {
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
        //currentRequest:
    }
    constructor(props: IOdManagmentProps) {
        super(props);
        this.state = {
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
        }
    }
    componentDidMount(): void {
        //this.getEmployeeData();
        //let { ItemID } = useParams();
        let hashUrl=window.location.hash;
        let hashUrlSplit=hashUrl.split('/');
        let ItemID=hashUrlSplit[2];
        //let query = useLocation().search;
        //console.log(query);
        this.setState({ItemID:ItemID});
         ODMOps().getODRequest(this.props, parseInt(ItemID)).then(results => {
            this.currentRequest = results;
            this.setState({
                EmployeeItemID: results.EmployeeCode,
                EmployeeName:results.EmployeeName,
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
        });
        //console.log(ItemID);
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
                this.setState({employeeID : brrResults.Title});
               
            }
            return brrResults;

        });
    };
    public render(): React.ReactElement<IOdManagmentProps> {

        return (
            <div className={"container-fluid"} >
            <hr></hr>
            < div className="container" >
                <h3>OD Request - {this.state.EmployeeName} </h3>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Employee Name:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.EmployeeName}></TextField>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label >Approver:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.ApproverName}></TextField>
                        </div>
                    </div>
                </div>
               
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label >From Date:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.FromDate}></TextField>
                        </div>
                        {(this.state.FromDate) && <div className='row'>
                            <div className='col-md-6' >
                                <div className="form-group">
                                    <label >Start Day:</label>
                                    <TextField disabled={true} readOnly={true} value={this.state.StartDay}></TextField>
                                </div>
                            </div>
                            {
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label >Start Half type:</label>
                                        <TextField disabled={true} readOnly={true} value={this.state.HalfType}></TextField>
                                    </div>
                                </div>}
                        </div>}
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label >End Date:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.Todate}></TextField>

                        </div>
                        {<div className='row'>
                            <div className='col-md-6' >
                                <div className="form-group">
                                    <label >End Day:</label>
                                    <TextField disabled={true} readOnly={true} value={this.state.ToDate_Halftype}></TextField>

                                </div>
                            </div>
                            {
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label >End Day Half type:</label>
                                        <TextField disabled={true} readOnly={true} value={this.state.LastDay}></TextField>

                                    </div>
                                </div>}
                        </div>}
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Days:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.ODdays.toString()}></TextField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Category:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.Category}></TextField>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Reason:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.Remark}></TextField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Status:</label>
                            <TextField disabled={true} readOnly={true} value={this.state.Status}></TextField>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Approver :</label>
                            <TextField disabled={true} readOnly={true} value={this.state.ApproverName}></TextField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label >Approver Remarks:</label>
                            <TextField disabled={true} readOnly={true}></TextField>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <Link className="btn btn-danger" to="/"> Close </Link>
                    </div>
                    <div className="col-md-6">
                       
                    </div>
                </div>

            </div >

        </div >
        );
    }
}

import * as React from 'react';
import styles from '../../OdManagment.module.scss';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
//import { Route, HashRouter, Routes } from 'react-router-dom';
import EmployeeOps from '../BAL/EmployeeOps';
import ODMOps from '../BAL/ODMOps';
import { IEmployee } from '../interfaces/IEmployee';
import { SelectionMode } from '@pnp/spfx-controls-react';
import { IODRequest } from '../interfaces/IODRequest';
import { Link,Redirect } from 'react-router-dom';
import { compareAsc, format } from "date-fns";

import { TextField, Icon, DetailsList, DetailsListLayoutMode, IColumn, Fabric, DefaultButton, PrimaryButton, DatePicker, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { result } from 'lodash';

export default class ApproveOD extends React.Component<IOdManagmentProps, {}> {

    private columns: IColumn[];
    private data: any[];
    private currentRequest: IODRequest;
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
        approverResponses: [],
        ApproverRemark:"",
        selectedKey:"",
        ItemID:0,
        Submitted:false,
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
            approverResponses: [],
            ApproverRemark:"",
            selectedKey:"",
            ItemID:0,
        Submitted:false,

        }
    }
    async componentDidMount(): Promise<void> {
        //this.getEmployeeData();
        //let { ItemID } = useParams();
        let hashUrl = window.location.hash;
        let hashUrlSplit = hashUrl.split('/');
        let ItemID = hashUrlSplit[2];
        await this.getAllChoices();
        this.setState({ ItemID: ItemID });

        await ODMOps().getODRequest(this.props, parseInt(ItemID)).then(results => {
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
            var currentStatus:any = this.state.approverResponses.filter(opt => opt.text == results.Status)[0];
            this.setState({ selectedKey: currentStatus.key });
        });
        //console.log(ItemID);
    }

    getAllChoices = async () => {
       await ODMOps().getChoices(this.props, 'ApproverResponse').then(choices => {
            var Options = choices.map((choice: string, idx: number) => {
                return {
                    key: idx,
                    text: choice
                }
            })
            this.setState({ approverResponses: Options });
            

        });


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
                this.setState({ employeeID: brrResults.Title });

            }
            return brrResults;

        });
    };
    changeStatus = (item: IDropdownOption) => {
        this.setState({ Status: item.text,selectedKey:item.key });

    }
    updateRequest = () =>{
        if(this.state.ApproverRemark =="" || this.state.ApproverRemark ==null){
            alert("Please ad comments");
            return false;
        }
        else{
            var request ={
                ID:this.state.ItemID,
                ApproverRemark:this.state.ApproverRemark,
                ApproverResponse:this.state.Status
        };
        ODMOps().setApproval(this.props,this.state.ItemID,request).then(dataReceived => {
            console.log(dataReceived);
            this.setState({ Submitted: true });
            
        });
        }
    }
    public render(): React.ReactElement<IOdManagmentProps> {

        return (
            <div className={"container-fluid"} >
              {this.state.Submitted ? <Redirect to='/ApproverDashboard' ></Redirect> : null}
                < div className="container" >
                    <h3>Approve Request </h3>
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
                                <label >Approve:</label>
                                <Dropdown
                                    className='Dropdown-example'
                                    placeHolder='Select option'
                                    onChanged={this.changeStatus}
                                    options={this.state.approverResponses}
                                    defaultValue={this.state.Status}
                                    selectedKey={this.state.selectedKey}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                                <label >Approver Remarks:</label>
                                <TextField value={this.state.ApproverRemark} onChanged={e => { this.setState({ ApproverRemark: e }) }}></TextField>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                         <PrimaryButton
                                text="Submit Request"
                                onClick={this.updateRequest}
                                className='btn btn-primary'
                            /> 
                            {/* <button  className='btn btn-primary' onClick={this.updateRequest} >Submit Request</button> */}
                        </div>
                       
                        <div className="col-md-2 ">
                        <Link className="btn btn-danger" to="/ApproverDashboard"> Cancel </Link>
                        </div>
                    </div>

                </div >

            </div >
        );
    }
}

import * as React from 'react';
import { TextField, Icon, DefaultButton, PrimaryButton, DatePicker, DropdownMenuItemType, Dropdown, IDropdownOption } from 'office-ui-fabric-react';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import SPCRUD from '../BAL/spcrud';
import SPCRUDOPS from '../DAL/spcrudops';
import { IEmployee } from '../interfaces/IEmployee';
import EmployeeOps from '../BAL/EmployeeOps';
import ODMOps from '../BAL/ODMOps';
import { useNavigate, Redirect, Route, NavLink, Link } from 'react-router-dom';
import { ControlMode } from '@pnp/sp/lists';
import { isEqual } from 'date-fns';
let pageSize: number;
pageSize = 10;

export default class NewODForm extends React.Component<IOdManagmentProps> {

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
        categoryOptions: [],
        startDayOption: [],
        halfTypeOption: [],
        Submitted: false,
        myRequests: []
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
            categoryOptions: [],
            startDayOption: [],
            halfTypeOption: [],
            Submitted: false,
            myRequests: []
        }
    }
    componentDidMount() {

        this.getEmployeeData();
        //StartDay  HalfType LastDay
        this.getAllChoices();
    }
    getAllChoices = () => {
        ODMOps().getChoices(this.props, 'Category').then(choices => {
            var categoryOptions = choices.map((choice: string, idx: number) => {
                return {
                    key: idx,
                    text: choice
                }
            })
            this.setState({ categoryOptions: categoryOptions });
        });
        ODMOps().getChoices(this.props, 'StartDay').then(choices => {
            var categoryOptions = choices.map((choice: string, idx: number) => {
                return {
                    key: idx,
                    text: choice
                }
            })
            this.setState({ startDayOption: categoryOptions });
        });
        ODMOps().getChoices(this.props, 'HalfType').then(choices => {
            var categoryOptions = choices.map((choice: string, idx: number) => {
                return {
                    key: idx,
                    text: choice
                }
            })
            this.setState({ halfTypeOption: categoryOptions });
        });

    }
    getEmployeeData = async () => {

        await EmployeeOps().getEmployee(this.props).then(brrResults => {
            this.setState({
                EmployeeItemID: brrResults.ID,
                EmployeeName: (brrResults.FirstName + brrResults.LastName),
                EmployeeCode: brrResults.EmployeeTitle,
                Designation: brrResults.Designation,
                ApproverNameId: brrResults.LeaveLevel2Id,
                Approver: brrResults.LeaveLevel2,
                SubGroup: brrResults.SubGroup,
                OfficeLocation: brrResults.CurrentOfficeLocation,
                UserName: brrResults.UserName
            });
            ODMOps().getMyOD(this.props, brrResults.Title).then(myRequests => {
                this.setState({ myRequests: myRequests.filter(data => data.CancelRequest == "No") });
                console.log(myRequests);
            });
        });
    };

    private _formatDate = (date: Date): string => {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear());
    }
    private _onSelectFromDate = (date: Date | null | undefined): void => {
        this.setState({ FromDate: date });
    };

    private _onSelectTodate = (date: Date | null | undefined): void => {
        if (date <= this.state.FromDate) {
            alert("End date should be greater than start date..");
        }
        else {
            this.setState({ Todate: date }, () => {
                this.ODdaysCalculation();
            });
        }
    };
    private _log(str: string): () => void {
        return (): void => {
            console.log(str);
            console.log(this.state);
        };
    }

    changeCategory = (item: IDropdownOption) => {
        //console.log('here is the things updating...' + item.key + ' ' + item.text + ' ');
        this.setState({ Category: item.text });
    };
    changeStartDay = (item: IDropdownOption) => {
        this.setState({ StartDay: item.text });
    };
    changeEndDay = (item: IDropdownOption) => {
        this.setState({ LastDay: item.text });
    }
    changeEndDayType = (item: IDropdownOption) => {
        this.setState({ ToDate_Halftype: item.text });
    }
    changeFromDayType = (item: IDropdownOption) => {
        this.setState({ HalfType: item.text });
    }
    private handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        //this.setState({ ...this.state, [event.target.name]: event.target.value })
        let targetName = event.currentTarget.name;
        this.setState({ [event.currentTarget.name]: event.currentTarget.value })
        // switch (event.currentTarget.name) {
        //     case "TravelID":
        //         this.setState({ TravelID: event.currentTarget.value.toString() });
        //         break;

    };
    private ODdaysCalculation() {
        var fDate = new Date(this.state.FromDate);
        fDate.setHours(0);

        console.log(this.state.FromDate);
        console.log(fDate);
        //Date FromDate = (this.state.FromDate)
        var ToDate = this.state.Todate
        //var F_FromDate = FromDate.split("-");
        //var D_FromDate = new Date(F_FromDate[2], F_FromDate[1] - 1, F_FromDate[0]);
        //var F_ToDate = ToDate.split("-");
        //var D_ToDate = new Date(F_ToDate[2], F_ToDate[1] - 1, F_ToDate[0]);

        if (this.state.FromDate > this.state.Todate) {
            alert("From Date should be less than To Date");
            //$("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text(0);
            return false;
        }
        if (this.state.FromDate == this.state.Todate) {
            // $("#lastOD").hide();
            //$("#halfOD").hide();
        }
        else {
            //$("#lastOD").show();
            //$('#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_ff7_1_ctl00_DropDownChoice').focus();
            //$("#halfOD").show();
        }
        var ODdays_Time = (this.state.Todate.getTime() - this.state.FromDate.getTime());
        var ODdays = Math.round(ODdays_Time / (1000 * 60 * 60 * 24)) + 1;
        if (isNaN(ODdays)) {
            this.setState({ ODdays: 0 });
        }
        else {
            this.setState({ ODdays: ODdays });
        }

        // if ($("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text() == "1") {
        //     $("select[title='LastDay']").hide();
        //     $(".lastdayclsspan").hide();
        // }
        // else {
        //     $("select[title='LastDay']").show();
        //     $(".lastdayclsspan").show();
        // }

    }
    validate = async (): Promise<boolean> => {
        if (this.state.FromDate == null || this.state.Todate == null) {
            alert("Please select Valid start and end Date");
            return false;
        }
        if (this.state.FromDate > this.state.Todate == null) {
            alert("Start date should be less than End Date");
            return false;
        }
        if (this.state.Category == "") {
            alert("Please select Category");
            return false;
        }
        if (this.state.Remark == "") {
            alert("Please enter valid reason");
            return false;
        }
        return true;
    }
    addRequest = async () => {
        var isValid = await this.validate();
        var checkLeave = await this.validateOD();
        if (isValid == true && checkLeave == false) {
            var odRequest = {
                Title: this.state.EmployeeName,
                EmployeeIDId: this.state.EmployeeItemID,
                FromDate: this.state.FromDate,
                Todate: this.state.Todate,
                Category: this.state.Category,
                Remark: this.state.Remark,
                ApproverId: this.state.ApproverNameId,
                UserNameId: this.state.UserName,
                Day: this.state.ODdays,
                StartDay: this.state.StartDay,
                HalfType: this.state.HalfType,
                ToDate_Halftype: this.state.ToDate_Halftype,
                LastDay: this.state.LastDay,
            }

            if (checkLeave == false) {
                ODMOps().insertNewODRequest(this.props, odRequest).then(dataReceived => {
                    console.log(dataReceived);
                    //alert("setting state");
                    this.setState({ Submitted: true });
                });
            }
        }
        else {return false;}

    }
    validateOD = async():Promise<boolean> => {
        let datafilter = [];
        //var fromDate =new Date(this.state.FromDate);
        var toDate = new Date(this.state.Todate);
        this.state.myRequests.map(item => {
            datafilter.push({
                FromDate: new Date(item.FromDate),
                Todate: new Date(item.Todate),
                ApproverResponse: item.ApproverResponse,
                ID: item.ID
            })
        });
        if (datafilter.length > 0) {
            let checkDate = new Date(this.state.FromDate);
            while (checkDate <= toDate) {
                let findData = datafilter.filter(request => (request.FromDate <= checkDate && request.Todate >= checkDate && request.ApproverResponse!="Rejected"));
                if (findData && findData.length > 0) {
                    alert("You have already applied the request on these dates.");
                    return true;
                }
                checkDate.setDate(checkDate.getDate() + 1);
            }
        }
        else {
            return false;
        }
        return false;
    }
    public render(): React.ReactElement<IOdManagmentProps> {
        return (
            <div>
                {/* {this.state.showDashboard ?  <TravelDashboard {...this.props} />: */}
                {this.state.Submitted==true ? <Redirect to='/' ></Redirect> : null}
                < div className="container shadow p-3" >
                    <h2>Request New OD </h2>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label >Employee Name:</label>
                                <TextField disabled={true} readOnly={true} value={this.state.EmployeeName}></TextField>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label >Designation:</label>
                                <TextField disabled={true} readOnly={true} value={this.state.Designation}></TextField>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label >Approver:</label>
                                <TextField disabled={true} readOnly={true} value={this.state.Approver}></TextField>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label>Sub Group:</label>
                                <TextField disabled={true} readOnly={true} value={this.state.SubGroup}></TextField>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label >From Date:</label>
                                <DatePicker
                                    formatDate={this._formatDate}
                                    onSelectDate={this._onSelectFromDate}
                                    value={this.state.FromDate}
                                >
                                </DatePicker>
                            </div>
                            {(this.state.FromDate) && <div className='row'>
                                <div className='col-md-6' >
                                    <div className="form-group">
                                        <label >Start Day:</label>
                                        <Dropdown
                                            className='Dropdown-example'
                                            placeHolder='Select start'
                                            ariaLabel='Select Start day'
                                            onChanged={this.changeStartDay}
                                            options={this.state.startDayOption}

                                        />
                                    </div>
                                </div>
                                {this.state.StartDay == "Half day" &&
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label >Start Half type:</label>
                                            <Dropdown
                                                className='Dropdown-example'
                                                placeHolder='Select start'
                                                ariaLabel='Select Start day'
                                                onChanged={this.changeFromDayType}
                                                options={this.state.halfTypeOption}
                                            />
                                        </div>
                                    </div>}
                            </div>}
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label >End Date:</label>
                                <DatePicker
                                    isRequired={false}
                                    pickerAriaLabel='Please select end date'
                                    minDate={this.state.FromDate}
                                    formatDate={this._formatDate}
                                    onSelectDate={this._onSelectTodate} value={this.state.Todate}
                                >
                                </DatePicker>
                            </div>
                            {(this.state.Todate) && <div className='row'>
                                <div className='col-md-6' >
                                    <div className="form-group">
                                        <label >End Day:</label>
                                        <Dropdown
                                            className='Dropdown-example'
                                            placeHolder='Select start'
                                            ariaLabel='Select Start day'
                                            onChanged={this.changeEndDay}
                                            options={this.state.startDayOption}

                                        />
                                    </div>
                                </div>
                                {this.state.LastDay == "Half day" &&
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label >End Day Half type:</label>
                                            <Dropdown
                                                className='Dropdown-example'
                                                placeHolder='Select start'
                                                ariaLabel='Select End day'
                                                onChanged={this.changeEndDayType}
                                                options={this.state.halfTypeOption}

                                            />
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
                                <Dropdown
                                    className='Dropdown-example'
                                    placeHolder='Select Category'
                                    id='Basicdrop1'
                                    ariaLabel='Select Category'
                                    onChanged={this.changeCategory}
                                    options={this.state.categoryOptions}
                                />

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label >Reason:</label>
                                <TextField onChanged={e => { this.setState({ Remark: e }) }} name="Remark" value={this.state.Remark}></TextField>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <PrimaryButton
                                text="Add Request"
                                onClick={this.addRequest}
                                className='btn btn-primary'
                            />
                             {/* <button onClick={this.addRequest} className='btn btn-primary'>Submit Request</button> */}
                        </div>
                        <div className="col-md-2 ">
                            <Link className="btn btn-danger" to="/"> Cancel </Link>
                        </div>
                    </div>


                </div >
            </div >
        );
    }
}
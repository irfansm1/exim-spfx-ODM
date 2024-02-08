function ODdaysCalculation() {
    //console.log("days calculation");
    var FromDate = $("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_ff3_1_ctl00_ctl00_DateTimeField_DateTimeFieldDate").val();
    var ToDate = $("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_ff6_1_ctl00_ctl00_DateTimeField_DateTimeFieldDate").val();
    var F_FromDate = FromDate.split("-");
    var D_FromDate = new Date(F_FromDate[2], F_FromDate[1] - 1, F_FromDate[0]);
    var F_ToDate = ToDate.split("-");
    var D_ToDate = new Date(F_ToDate[2], F_ToDate[1] - 1, F_ToDate[0]);

    if (D_FromDate > D_ToDate) {
        alert("From Date should be less than To Date");
        $("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text(0);
        return false;
    }
    if (FromDate == ToDate) {
        $("#lastOD").hide();
        $("#halfOD").hide();
    }
    else {
        $("#lastOD").show();
        //$('#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_ff7_1_ctl00_DropDownChoice').focus();
        //$("#halfOD").show();
    }
    var ODdays_Time = (D_ToDate.getTime() - D_FromDate.getTime());
    var ODdays = Math.round(ODdays_Time / (1000 * 60 * 60 * 24)) + 1;
    if (isNaN(ODdays)) {
        var ODdays = 0;
    }
    var days = $("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text(ODdays);
    if ($("#ctl00_ctl36_g_5ca5ab26_cf9d_4eec_9cf1_e8f8e7da695a_Ldays").text() == "1") {
        $("select[title='LastDay']").hide();
        $(".lastdayclsspan").hide();
    }
    else {
        $("select[title='LastDay']").show();
        $(".lastdayclsspan").show();
    }

}
function LeaveAlreadyApplied(empid, FromDate, ToDate) {


    var Arr_FromDate = FromDate.split("-");
    var F_FromDate = Arr_FromDate[2] + "-" + Arr_FromDate[1] + "-" + Arr_FromDate[0];
    var D_FromDate = new Date(F_FromDate);
    var Arr_ToDate = ToDate.split("-");
    var F_ToDate = Arr_ToDate[2] + "-" + Arr_ToDate[1] + "-" + Arr_ToDate[0];
    var D_ToDate = new Date(F_ToDate);
    var IncDate = new Date();
    IncDate = D_FromDate;
    while (IncDate <= D_ToDate) {
        var dd = IncDate.getDate();
        if (dd < 10) {
            dd = "0" + dd;
        }
        var mm = IncDate.getMonth() + 1;
        if (mm < 10) {
            mm = "0" + mm;
        }
        var F_IncDate = IncDate.getFullYear() + "-" + mm + "-" + dd;

        var stDay = $('select[title="StartDay"] option:selected').text();
        var stDayType = $('select[title="HalfType"] option:selected').text();
        var ltDay = $('select[title="LastDay"] option:selected').text();
        var ltDayType = $('select[title="ToDate_Halftype"] option:selected').text();

        var ODquery = "<Where><And><Eq><FieldRef Name='EmployeeID' /><Value Type='Lookup'>" + empid + "</Value></Eq><And><Leq><FieldRef Name='FromDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + F_IncDate + "</Value></Leq><Geq><FieldRef Name='Todate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + F_IncDate + "</Value></Geq></And></And></Where>";
        var ODColl = jP.Lists.setSPObject(SiteURL, "ODManagement");
        var LRColl = ODColl.getSPItemsWithQuery(ODquery).Items;

        if (LRColl !== undefined) {
            for (var k = 0; k < LRColl.length; k++) {
                var L2Response = LRColl[k].ApproverResponse;
                var CanReq = LRColl[k].CancelRequest;

                if ((L2Response == "Approved" || L2Response == "Pending") && CanReq == "No") {
                    //half day code to be added

                    if (stDay == 'Full day' && IncDate == D_FromDate) {
                        alert("You have already applied OD in between the selected dates");
                        return false;
                    }
                    if (ltDay == 'Full day' && IncDate == D_ToDate) {
                        alert("You have already applied OD in between the selected dates");
                        return false;
                    }

                    if (stDay == 'Half day') {
                        if (stDayType == LRColl[k].HalfType && IncDate == D_FromDate) {
                            alert("You have already applied OD in between the selected dates");
                            return false;
                        }
                        if (stDayType == LRColl[k].ToDate_Halftype && IncDate == D_FromDate) {
                            alert("You have already applied OD in between the selected dates");
                            return false;
                        }
                    }
                    if (ltDay == 'Half day') {
                        if (ltDayType == LRColl[k].ToDate_Halftype && IncDate == D_ToDate) {
                            alert("You have already applied OD in between the selected dates");
                            return false;
                        }
                        if (ltDayType == LRColl[k].HalfType && IncDate == D_ToDate) {
                            alert("You have already applied OD in between the selected dates");
                            return false;
                        }
                    }
                }
            }
        }

        IncDate.setDate(IncDate.getDate() + 1);
    }
    return true;
}


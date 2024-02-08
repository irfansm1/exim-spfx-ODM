var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Icon, DetailsList, DetailsListLayoutMode, Fabric } from 'office-ui-fabric-react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { SelectionMode } from '@pnp/spfx-controls-react';
var DashboardPending = /** @class */ (function (_super) {
    __extends(DashboardPending, _super);
    function DashboardPending(props) {
        var _this = _super.call(this, props) || this;
        // Column Defs
        _this.columns = [
            {
                key: 'EmployeeID',
                name: 'EmployeeID',
                fieldName: 'EmployeeID',
                minWidth: 50,
                maxWidth: 100,
                isResizable: true,
                onRender: function (item, index, columns) {
                    return React.createElement("div", null, item.EmployeeID.Title);
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
                onRender: function (item, index, columns) {
                    return React.createElement("div", null, item.EmployeeID.EmployeeName);
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
                onRender: function (item, index, columns) {
                    return React.createElement("div", null, format(item['FromDate'], "MM/DD/YYYY"));
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
                onRender: function (item, index, columns) {
                    return React.createElement("div", null, format(item['Todate'], "MM/DD/YYYY"));
                },
                headerClassName: 'tableHead'
            },
            {
                key: 'Category',
                name: 'Category',
                fieldName: 'Category',
                minWidth: 100,
                maxWidth: 200,
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
                key: 'View', name: 'View', fieldName: 'ID', minWidth: 50, maxWidth: 150, isResizable: true,
                onRender: function (item, index, columns) {
                    var ItemId = item['ID'];
                    return React.createElement("div", null,
                        React.createElement(Link, { to: '/ViewForm/' + ItemId },
                            React.createElement(Icon, { iconName: 'View' })));
                },
                headerClassName: 'tableHead'
            }
        ];
        return _this;
    }
    DashboardPending.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("hr", null),
            React.createElement(Fabric, null,
                React.createElement(DetailsList, { columns: this.columns, items: this.props.pendingOD, selectionMode: SelectionMode.none, layoutMode: DetailsListLayoutMode.justified }))));
    };
    return DashboardPending;
}(React.Component));
export default DashboardPending;

//# sourceMappingURL=dashboardPending.js.map

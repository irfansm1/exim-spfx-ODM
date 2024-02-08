import * as React from 'react';
export interface IApprovedProps {
    approvedOD: any;
}
export default class DashboardApproved extends React.Component<IApprovedProps, any> {
    private columns;
    constructor(props: IApprovedProps);
    render(): React.ReactElement<IApprovedProps>;
}

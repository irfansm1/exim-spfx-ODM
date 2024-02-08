import * as React from 'react';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
export default class ODMDashboard extends React.Component<IOdManagmentProps, {}> {
    private columns;
    private data;
    state: {
        data: any[];
        pendingOD: any[];
        approvedOD: any[];
        rejectedOD: any[];
    };
    constructor(props: IOdManagmentProps);
    componentDidMount(): void;
    getEmployeeData: () => Promise<IEmployee>;
    render(): React.ReactElement<IOdManagmentProps>;
}

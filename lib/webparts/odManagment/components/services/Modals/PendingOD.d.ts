import * as React from 'react';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
export default class PendingOD extends React.Component<IOdManagmentProps, {}> {
    private columns;
    private data;
    state: {
        data: any[];
        employeeID: string;
    };
    constructor(props: IOdManagmentProps);
    componentDidMount(): void;
    getEmployeeData: () => Promise<IEmployee>;
    render(): React.ReactElement<IOdManagmentProps>;
}

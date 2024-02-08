import * as React from 'react';
import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
export default class ApprovedOD extends React.Component<IOdManagmentProps, {}> {
    private columns;
    private data;
    state: {
        data: any[];
    };
    constructor(props: IOdManagmentProps);
    componentDidMount(): void;
    getEmployeeData: () => Promise<IEmployee>;
    render(): React.ReactElement<IOdManagmentProps>;
}

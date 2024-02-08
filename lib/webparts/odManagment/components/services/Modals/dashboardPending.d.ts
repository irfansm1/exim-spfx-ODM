import * as React from 'react';
export interface IPendingProps {
    pendingOD: any;
}
export default class DashboardPending extends React.Component<IPendingProps, any> {
    private columns;
    constructor(props: IPendingProps);
    render(): React.ReactElement<IPendingProps>;
}

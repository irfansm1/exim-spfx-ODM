import { IOdManagmentProps } from '../interfaces/IOdManagmentProps';
import { IEmployee } from '../interfaces/IEmployee';
export interface EmployeeOps {
    getEmployee(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getGroupHeads(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getSubGroups(props: IOdManagmentProps): Promise<IOdManagmentProps>;
    getUserProfile(props: IOdManagmentProps): Promise<IOdManagmentProps>;
}
export default function EmployeeOps(): {
    getEmployee: (props: IOdManagmentProps) => Promise<IEmployee>;
    getGroupHeads: (props: IOdManagmentProps) => Promise<IEmployee[]>;
    getSubGroups: (props: IOdManagmentProps) => Promise<any>;
    getUserProfile: (props: IOdManagmentProps) => Promise<any>;
};

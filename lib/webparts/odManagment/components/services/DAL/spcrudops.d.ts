import { IOdManagmentProps } from "../interfaces/IOdManagmentProps";
import { IFile, IFileAddResult, IFieldInfo, IItemAddResult, IItemUpdateResult, IListInfo } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
export default class SPCRUDOPS {
    getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: {
        column: string;
        isAscending: boolean;
    }, props: IOdManagmentProps): Promise<any[]>;
    getRootData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: {
        column: string;
        isAscending: boolean;
    }, props: IOdManagmentProps): Promise<any[]>;
    getItemById(listName: string, columnsToRetrieve: string, columnsToExpand: string, itemId: number, props: IOdManagmentProps): Promise<any>;
    getChoicesByFields(listName: string, fieldName: string, props: IOdManagmentProps): Promise<any>;
    insertData(listName: string, data: {}, props: IOdManagmentProps): Promise<IItemAddResult>;
    updateData(listName: string, itemId: number, data: {}, props: IOdManagmentProps): Promise<IItemUpdateResult>;
    deleteData(listName: string, itemId: number, props: IOdManagmentProps): Promise<void>;
    getListInfo(listName: string, props: IOdManagmentProps): Promise<IListInfo>;
    batchInsert(listName: string, data: [], props: IOdManagmentProps): Promise<IItemAddResult[]>;
    batchUpdate(listName: string, data: [], props: IOdManagmentProps): Promise<IItemUpdateResult[]>;
    batchDelete(listName: string, data: [], props: IOdManagmentProps): Promise<void>;
    uploadFile(folderServerRelativeUrl: string, file: File, props: IOdManagmentProps): Promise<IFileAddResult>;
    updateFileContent(fileServerRelativeUrl: string, file: File, props: IOdManagmentProps): Promise<IFileAddResult | IFile>;
    deleteFile(fileServerRelativeUrl: string, props: IOdManagmentProps): Promise<void>;
    getSPListColumn(listName: string, columnInternalName: string, props: IOdManagmentProps): Promise<IFieldInfo>;
    getUserProfile(props: IOdManagmentProps): Promise<any>;
}

import { IOdManagmentProps } from "../interfaces/IOdManagmentProps";
import { IFieldInfo, IFile, IFileAddResult, IFileInfo, IItemAddResult, IItemUpdateResult, IListInfo } from "@pnp/sp/presets/all";
import SPCRUDOPS from "../DAL/spcrudops";

export default class SPCRUD {

    public spCrudOps = new SPCRUDOPS();

    public async getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IOdManagmentProps): Promise<any[]> {
        return await this.spCrudOps.getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props);
    }
    public async getRootData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IOdManagmentProps): Promise<any[]> {
        return await this.spCrudOps.getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props);
    }
    public async getItemById(listName: string, columnsToRetrieve: string, columnsToExpand: string, itemId: number
        , props: IOdManagmentProps): Promise<any> {
        return await this.spCrudOps.getItemById(listName, columnsToRetrieve, columnsToExpand, itemId, props);
    }
    //get choice fields data
    public async getChoiceFieldData(listName :string,choiceFieldName,props:IOdManagmentProps):Promise<any[]>{
        return await this.spCrudOps.getChoicesByFields(listName,choiceFieldName,props);
    }
    public async insertData(listName: string, data: {}, props: IOdManagmentProps): Promise<IItemAddResult> {
        return await this.spCrudOps.insertData(listName, data, props);
    }

    public async updateData(listName: string, itemId: number, data: {}, props: IOdManagmentProps): Promise<IItemUpdateResult> {
        return await this.spCrudOps.updateData(listName, itemId, data, props);
    }

    public async deleteData(listName: string, itemId: number, props: IOdManagmentProps): Promise<void> {
        return await this.spCrudOps.deleteData(listName, itemId, props);
    }

    public async getListInfo(listName: string, props: IOdManagmentProps): Promise<IListInfo> {
        return await this.spCrudOps.getListInfo(listName, props);
    }

    public async batchInsert(listName: string, data: [], props: IOdManagmentProps): Promise<IItemAddResult[]> {
        return await this.spCrudOps.batchInsert(listName, data, props);
    }

    public async batchUpdate(listName: string, data: [], props: IOdManagmentProps): Promise<IItemUpdateResult[]> {
        return await this.spCrudOps.batchUpdate(listName, data, props);
    }

    public async batchDelete(listName: string, data: [], props: IOdManagmentProps): Promise<void> {
        return await this.spCrudOps.batchDelete(listName, data, props);
    }

    public async uploadFile(folderServerRelativeUrl: string, file: File, props: IOdManagmentProps): Promise<IFileAddResult> {
        return await this.spCrudOps.uploadFile(folderServerRelativeUrl, file, props);
    }

    public async updateFileContent(fileServerRelativeUrl: string, file: File, props: IOdManagmentProps): Promise<IFileAddResult | IFile> {
        return await this.spCrudOps.updateFileContent(fileServerRelativeUrl, file, props);
    }

    public async deleteFile(fileServerRelativeUrl: string, props: IOdManagmentProps): Promise<void> {
        return await this.spCrudOps.deleteFile(fileServerRelativeUrl, props);
    }

    public async getSPListColumn(listName: string, columnInternalName: string, props: IOdManagmentProps): Promise<IFieldInfo>{
        return await this.spCrudOps.getSPListColumn(listName, columnInternalName, props);
    }
}

import { IOdManagmentProps } from "../interfaces/IOdManagmentProps";
import { IFile, IFileAddResult,Profiles,IUserProfile, IFieldInfo, IItemAddResult, IItemUpdateResult, IListInfo, Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import { ConsoleListener, Logger, LogLevel } from "@pnp/logging";

export default class SPCRUDOPS {
    public async getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string, isAscending: boolean }, props: IOdManagmentProps): Promise<any[]> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.select(columnsToRetrieve).expand(columnsToExpand).filter(filters).orderBy(orderby.column, orderby.isAscending).get();
    }
    public  async getRootData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: {column: string, isAscending: boolean}, props: IOdManagmentProps): Promise<any[]> {
        let url=window.location.origin;
        let web =  Web(url);
        //const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.select(columnsToRetrieve).expand(columnsToExpand).filter(filters).orderBy(orderby.column, orderby.isAscending).get();
    }
    public async getItemById(listName: string, columnsToRetrieve: string, columnsToExpand: string, itemId: number, props: IOdManagmentProps): Promise<any> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.getById(itemId).select(columnsToRetrieve).expand(columnsToExpand).get();
    }
    public async getChoicesByFields(listName: string, fieldName: string, props: IOdManagmentProps): Promise<any> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).fields.getByTitle(fieldName).get();
         //web.lists.getByTitle(listName).items.add(data);
    }
    public async insertData(listName: string, data: {}, props: IOdManagmentProps): Promise<IItemAddResult> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.add(data);
    }

    public async updateData(listName: string, itemId: number, data: {}, props: IOdManagmentProps): Promise<IItemUpdateResult> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.getById(itemId).update(data);
    }

    public async deleteData(listName: string, itemId: number, props: IOdManagmentProps): Promise<void> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.getById(itemId).delete();
    }

    public async getListInfo(listName: string, props: IOdManagmentProps): Promise<IListInfo> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list = await web.lists.getByTitle(listName);
        const listInfo = await list.select("Id,Title")();

        return listInfo;
    }

    public async batchInsert(listName: string, data: [], props: IOdManagmentProps): Promise<IItemAddResult[]> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list = web.lists.getByTitle(listName);
        const entityTypeFullName = await list.getListItemEntityTypeFullName();
        const batch = web.createBatch();
        let itemAddResult: IItemAddResult[];

        for (let d = 0; d < data.length; d++) {
            await list.items.inBatch(batch).add(data[d], entityTypeFullName).then(b => {
                itemAddResult.push(b);
            }).catch((e) => { console.log(e) });
        }

        return await batch.execute().then((v: void) => {
            return itemAddResult;
        });
    }

    public async batchUpdate(listName: string, data: [], props: IOdManagmentProps): Promise<IItemUpdateResult[]> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list = web.lists.getByTitle(listName);
        const entityTypeFullName = await list.getListItemEntityTypeFullName();
        const batch = web.createBatch();
        let itemUpdateResult: IItemUpdateResult[];

        for (let d = 0; d < data.length; d++) {
            await list.items.getById(data[d]["Id"]).inBatch(batch).update(data[d], entityTypeFullName).then(b => {
                itemUpdateResult.push(b);
                console.log(b);
            }).catch((e) => { console.log(e) });
        }

        return await batch.execute().then((v: void) => {
            return itemUpdateResult;
        });
    }

    public async batchDelete(listName: string, data: [], props: IOdManagmentProps): Promise<void> {
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list = web.lists.getByTitle(listName);
        const batch = web.createBatch();
                      
        for (let d = 0; d < data.length; d++) {
            await list.items.getById(data[d]["Id"]).inBatch(batch).delete();
        }

        return await batch.execute();
    }

    public async uploadFile(folderServerRelativeUrl: string, file: File, props: IOdManagmentProps): Promise<IFileAddResult> {
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;

        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const ticks = ((new Date().getTime() * 10000) + 621355968000000000);
        if (file.size <= 10485760) {
            return await web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.addUsingPath(encodeURI(ticks.toString() + "_" + file.name), file, { Overwrite: true });
        }
        else {
            return await web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.addChunked(ticks.toString() + "_" + file.name, file, data => {
                Logger.log({ data: data, level: LogLevel.Verbose, message: "progress" });
            }, true);
        }
    }

    public async updateFileContent(fileServerRelativeUrl: string, file: File, props: IOdManagmentProps): Promise<IFileAddResult | IFile> {
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;

        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        if (file.size <= 10485760) {
            return await web.getFileByServerRelativeUrl(fileServerRelativeUrl).setContent(file);
        }
        else {
            return await web.getFileByServerRelativeUrl(fileServerRelativeUrl).setContentChunked(file, data => {
                Logger.log({ data: data, level: LogLevel.Verbose, message: "progress" });
            });
        }
    }

    public async deleteFile(fileServerRelativeUrl: string, props: IOdManagmentProps): Promise<void> {
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;

        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);

        return await web.getFileByServerRelativeUrl(fileServerRelativeUrl).delete();
    }

    public async getSPListColumn(listName: string, columnInternalName: string, props: IOdManagmentProps): Promise<IFieldInfo>{
        const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(columnInternalName).select('Choices,ID').get();
    }
    public async getUserProfile(props: IOdManagmentProps): Promise<any> {
        const web = Profiles(props.currentSPContext.pageContext.web.absoluteUrl);
        //web.myProperties.get
        await web.myProperties.get().then((response: any): Promise<{ value: IUserProfile }> => {    
            console.log(response);
            return response.json();    
          })  ;
        //await web.myProperties.select("Title", "Email")();
       // web.setMultiValuedProfileProperty
    }
}
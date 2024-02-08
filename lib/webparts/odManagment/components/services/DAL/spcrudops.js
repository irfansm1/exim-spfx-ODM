var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Profiles, Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import { ConsoleListener, Logger } from "@pnp/logging";
var SPCRUDOPS = /** @class */ (function () {
    function SPCRUDOPS() {
    }
    SPCRUDOPS.prototype.getData = function (listName, columnsToRetrieve, columnsToExpand, filters, orderby, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).items.select(columnsToRetrieve).expand(columnsToExpand).filter(filters).orderBy(orderby.column, orderby.isAscending).get()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.getRootData = function (listName, columnsToRetrieve, columnsToExpand, filters, orderby, props) {
        return __awaiter(this, void 0, void 0, function () {
            var url, web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = window.location.origin;
                        web = Web(url);
                        return [4 /*yield*/, web.lists.getByTitle(listName).items.select(columnsToRetrieve).expand(columnsToExpand).filter(filters).orderBy(orderby.column, orderby.isAscending).get()];
                    case 1: 
                    //const web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.getItemById = function (listName, columnsToRetrieve, columnsToExpand, itemId, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).items.getById(itemId).select(columnsToRetrieve).expand(columnsToExpand).get()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.getChoicesByFields = function (listName, fieldName, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).fields.getByTitle(fieldName).get()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.insertData = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).items.add(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.updateData = function (listName, itemId, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).items.getById(itemId).update(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.deleteData = function (listName, itemId, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).items.getById(itemId).delete()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.getListInfo = function (listName, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web, list, listInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName)];
                    case 1:
                        list = _a.sent();
                        return [4 /*yield*/, list.select("Id,Title")()];
                    case 2:
                        listInfo = _a.sent();
                        return [2 /*return*/, listInfo];
                }
            });
        });
    };
    SPCRUDOPS.prototype.batchInsert = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web, list, entityTypeFullName, batch, itemAddResult, d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        list = web.lists.getByTitle(listName);
                        return [4 /*yield*/, list.getListItemEntityTypeFullName()];
                    case 1:
                        entityTypeFullName = _a.sent();
                        batch = web.createBatch();
                        d = 0;
                        _a.label = 2;
                    case 2:
                        if (!(d < data.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, list.items.inBatch(batch).add(data[d], entityTypeFullName).then(function (b) {
                                itemAddResult.push(b);
                            }).catch(function (e) { console.log(e); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        d++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, batch.execute().then(function (v) {
                            return itemAddResult;
                        })];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.batchUpdate = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web, list, entityTypeFullName, batch, itemUpdateResult, d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        list = web.lists.getByTitle(listName);
                        return [4 /*yield*/, list.getListItemEntityTypeFullName()];
                    case 1:
                        entityTypeFullName = _a.sent();
                        batch = web.createBatch();
                        d = 0;
                        _a.label = 2;
                    case 2:
                        if (!(d < data.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, list.items.getById(data[d]["Id"]).inBatch(batch).update(data[d], entityTypeFullName).then(function (b) {
                                itemUpdateResult.push(b);
                                console.log(b);
                            }).catch(function (e) { console.log(e); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        d++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, batch.execute().then(function (v) {
                            return itemUpdateResult;
                        })];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.batchDelete = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web, list, batch, d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        list = web.lists.getByTitle(listName);
                        batch = web.createBatch();
                        d = 0;
                        _a.label = 1;
                    case 1:
                        if (!(d < data.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, list.items.getById(data[d]["Id"]).inBatch(batch).delete()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        d++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, batch.execute()];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.uploadFile = function (folderServerRelativeUrl, file, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web, ticks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger.subscribe(new ConsoleListener());
                        Logger.activeLogLevel = 0 /* Verbose */;
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        ticks = ((new Date().getTime() * 10000) + 621355968000000000);
                        if (!(file.size <= 10485760)) return [3 /*break*/, 2];
                        return [4 /*yield*/, web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.addUsingPath(encodeURI(ticks.toString() + "_" + file.name), file, { Overwrite: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.addChunked(ticks.toString() + "_" + file.name, file, function (data) {
                            Logger.log({ data: data, level: 0 /* Verbose */, message: "progress" });
                        }, true)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.updateFileContent = function (fileServerRelativeUrl, file, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger.subscribe(new ConsoleListener());
                        Logger.activeLogLevel = 0 /* Verbose */;
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        if (!(file.size <= 10485760)) return [3 /*break*/, 2];
                        return [4 /*yield*/, web.getFileByServerRelativeUrl(fileServerRelativeUrl).setContent(file)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, web.getFileByServerRelativeUrl(fileServerRelativeUrl).setContentChunked(file, function (data) {
                            Logger.log({ data: data, level: 0 /* Verbose */, message: "progress" });
                        })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.deleteFile = function (fileServerRelativeUrl, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger.subscribe(new ConsoleListener());
                        Logger.activeLogLevel = 0 /* Verbose */;
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.getFileByServerRelativeUrl(fileServerRelativeUrl).delete()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.getSPListColumn = function (listName, columnInternalName, props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Web(props.currentSPContext.pageContext.web.absoluteUrl);
                        return [4 /*yield*/, web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(columnInternalName).select('Choices,ID').get()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUDOPS.prototype.getUserProfile = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var web;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web = Profiles(props.currentSPContext.pageContext.web.absoluteUrl);
                        //web.myProperties.get
                        return [4 /*yield*/, web.myProperties.get().then(function (response) {
                                console.log(response);
                                return response.json();
                            })];
                    case 1:
                        //web.myProperties.get
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SPCRUDOPS;
}());
export default SPCRUDOPS;

//# sourceMappingURL=spcrudops.js.map

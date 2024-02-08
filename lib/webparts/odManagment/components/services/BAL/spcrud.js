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
import SPCRUDOPS from "../DAL/spcrudops";
var SPCRUD = /** @class */ (function () {
    function SPCRUD() {
        this.spCrudOps = new SPCRUDOPS();
    }
    SPCRUD.prototype.getData = function (listName, columnsToRetrieve, columnsToExpand, filters, orderby, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.getRootData = function (listName, columnsToRetrieve, columnsToExpand, filters, orderby, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.getItemById = function (listName, columnsToRetrieve, columnsToExpand, itemId, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.getItemById(listName, columnsToRetrieve, columnsToExpand, itemId, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //get choice fields data
    SPCRUD.prototype.getChoiceFieldData = function (listName, choiceFieldName, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.getChoicesByFields(listName, choiceFieldName, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.insertData = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.insertData(listName, data, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.updateData = function (listName, itemId, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.updateData(listName, itemId, data, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.deleteData = function (listName, itemId, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.deleteData(listName, itemId, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.getListInfo = function (listName, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.getListInfo(listName, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.batchInsert = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.batchInsert(listName, data, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.batchUpdate = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.batchUpdate(listName, data, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.batchDelete = function (listName, data, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.batchDelete(listName, data, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.uploadFile = function (folderServerRelativeUrl, file, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.uploadFile(folderServerRelativeUrl, file, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.updateFileContent = function (fileServerRelativeUrl, file, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.updateFileContent(fileServerRelativeUrl, file, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.deleteFile = function (fileServerRelativeUrl, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.deleteFile(fileServerRelativeUrl, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SPCRUD.prototype.getSPListColumn = function (listName, columnInternalName, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spCrudOps.getSPListColumn(listName, columnInternalName, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SPCRUD;
}());
export default SPCRUD;

//# sourceMappingURL=spcrud.js.map

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'OdManagmentWebPartStrings';
import OdManagment from './components/OdManagment';
var OdManagmentWebPart = /** @class */ (function (_super) {
    __extends(OdManagmentWebPart, _super);
    function OdManagmentWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OdManagmentWebPart.prototype.render = function () {
        var element = React.createElement(OdManagment, {
            description: this.properties.description,
            myhttpclient: this.context.httpClient,
            siteURL: this.context.pageContext.web.absoluteUrl,
            currentSPContext: this.context,
        });
        ReactDom.render(element, this.domElement);
    };
    OdManagmentWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(OdManagmentWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    OdManagmentWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return OdManagmentWebPart;
}(BaseClientSideWebPart));
export default OdManagmentWebPart;

//# sourceMappingURL=OdManagmentWebPart.js.map

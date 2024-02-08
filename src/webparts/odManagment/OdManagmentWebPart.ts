import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'OdManagmentWebPartStrings';
import OdManagment from './components/OdManagment';
import { IOdManagmentProps } from './components/services/interfaces/IOdManagmentProps';
//import { IEximODMProps } from './components/services/interfaces/IEximODMProps';

export interface IOdManagmentWebPartProps {
  description: string;
}

export default class OdManagmentWebPart extends BaseClientSideWebPart<IOdManagmentWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IOdManagmentProps > = React.createElement(
      OdManagment,
      {
        description: this.properties.description,
        myhttpclient:this.context.httpClient,
        siteURL:this.context.pageContext.web.absoluteUrl,
        currentSPContext:this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}

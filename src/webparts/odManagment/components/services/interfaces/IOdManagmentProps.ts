
import { HttpClient } from "@microsoft/sp-http";
export interface IOdManagmentProps {
  description: string;
  currentSPContext: any;
  myhttpclient:HttpClient;
  siteURL:string;
}
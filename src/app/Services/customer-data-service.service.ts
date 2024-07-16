import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerDataServiceService {

  constructor(private _HttpClient:HttpClient) { }


  getAllCustomers():Observable<any>{
    return this._HttpClient.get(`Local_API/Customers_Data.json`)
  }

  getAllTransactions():Observable<any>{
    return this._HttpClient.get(`Local_API/Customers_Data.json`)
  }

  


   setAttributeIfDefined(element: HTMLElement | null, attribute: string, value: string) {
    if (element) {
      element.setAttribute(attribute, value);
    } else {
      console.error("Element is undefined, cannot set attribute:", attribute);
    }
  }



}

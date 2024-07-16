import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerDataServiceService {

  constructor(private _HttpClient:HttpClient) { }


  getAllCustomers():Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/customers`)
  }

  getAllTransactions():Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/transactions`)
  }

  


   setAttributeIfDefined(element: HTMLElement | null, attribute: string, value: string) {
    if (element) {
      element.setAttribute(attribute, value);
    } else {
      console.error("Element is undefined, cannot set attribute:", attribute);
    }
  }



}

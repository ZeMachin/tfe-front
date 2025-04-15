import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Connection } from './routes.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  call<T>(connection: Connection, body: any, params: { [key: string]: string | number } = {}, queryParams: { [key: string]: string | number } = {}): Promise<T> {
    for (const param of Object.keys(params)) 
      connection.url = connection.url.replace(':' + param, params[param].toString());

    for (const [index, param] of Object.keys(queryParams).entries()) {
      connection.url += index === 0 ? '?' : '&';
      connection.url += param + '=' + queryParams[param];    
    }

    switch(connection.method) {
      case 'GET':
        return firstValueFrom(this.httpClient.get<T>(connection.url));
      case 'POST':
        return firstValueFrom(this.httpClient.post<T>(connection.url, body));
      case 'PUT':
        return firstValueFrom(this.httpClient.put<T>(connection.url, body));
      case 'DELETE':
        return firstValueFrom(this.httpClient.delete<T>(connection.url));
    }
  }
}

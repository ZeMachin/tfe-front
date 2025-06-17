import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Connection } from './routes.service';
import { firstValueFrom } from 'rxjs';
import { Jwt } from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  call<T>(connection: Connection, body: any = {}, params: { [key: string]: string | number } = {}, queryParams: { [key: string]: string | number } = {}, headers? : HttpHeaders): Promise<T> {
    let url = connection.url;

    for (const param of Object.keys(params))
      url = url.replace(':' + param, params[param].toString());

    for (const [index, param] of Object.keys(queryParams).entries()) {
      url += index === 0 ? '?' : '&';
      url += param + '=' + queryParams[param];
    }

    const options = { headers };

    switch (connection.method) {
      case 'GET':
        return firstValueFrom(this.httpClient.get<T>(url, options));
      case 'POST':
        return firstValueFrom(this.httpClient.post<T>(url, body, options));
      case 'PUT':
        return firstValueFrom(this.httpClient.put<T>(url, body, options));
      case 'DELETE':
        return firstValueFrom(this.httpClient.delete<T>(url, options));
    }
  }
}

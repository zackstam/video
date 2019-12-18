import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { dropboxContentUrl, dropboxApiUrl } from './../constants';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  constructor(private httpClient: HttpClient) {}

  getPreview(pathFile: string): any {
    // console.log(file_id)
    const httpOptions: {
      headers?: HttpHeaders,
      // responseType:"blob"
    } = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${environment.dropboxKey}`,
        'Content-Type': 'application/json'
        // "Dropbox-API-Arg": JSON.stringify({path:file_id})
      }),

      // responseType: "blob"
    };
    return this.httpClient.post(`${dropboxApiUrl}/files/get_temporary_link`, {path: pathFile}, httpOptions);
  }

  getFile(params): any {
    // console.log(params)
    const httpOptions: {
      headers?: HttpHeaders;
    } = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${environment.dropboxKey}`,
        'Content-Type': 'application/json'
      }),
    };
    return this.httpClient.post(
      `${dropboxContentUrl}/files/get_metadata`,
      params,
      httpOptions
    ).pipe(
      retry(10),
      map (response => response),
      catchError(this._errorHandler)
    );
  }

  _errorHandler(error: Response) {
    return throwError(error || 'Server Error');
  }
}

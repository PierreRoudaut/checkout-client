import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class APIService {

    protected readonly API_BASE_URL = environment.apiEndpoint + '/api';
    protected httpClient: HttpClient;

    protected options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    constructor(injector: Injector) {
        this.httpClient = injector.get<HttpClient>(HttpClient);
    }

}


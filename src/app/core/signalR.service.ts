import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatMessage } from './message';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    productUpdated = new EventEmitter<any>();
    cartExpired = new EventEmitter<any>();
    connectionEstablished = new EventEmitter<Boolean>();

    private connectionIsEstablished = false;
    private hubConnection: HubConnection;

    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    sendChatMessage(message: ChatMessage) {
        this.hubConnection.invoke('SendMessage', message);
    }

    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.apiEndpoint + '/hub')
            .build();
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.warn(err);
                console.warn('Error while establishing connection');
            });
    }

    private registerOnServerEvents(): void {
        this.hubConnection.on('ReceiveMessage', (data: any) => {
            this.productUpdated.emit(data);
        });
        this.hubConnection.on('CartExpired', (data: any) => {
            this.cartExpired.emit(data);
        });
    }
}


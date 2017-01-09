import { Component } from '@angular/core';
import { Http } from "@angular/http";

declare var io: any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent {
  name = 'Angular';

  messages: Array<String>;
  chatBox: String;
  socket: any;

  constructor(http: Http) {
    this.messages = [];

    http.get("/fetch").subscribe((success) => {
      const data = success.json();

      for (var i = 0; i < data.length; i++) {
        this.messages.push(data[i].message);
      }
    }, (error) => {
      console.log(JSON.stringify(error));
    });

    this.chatBox = "";
    this.socket = io();
    this.socket.on("chat_message", (msg) => {
      console.log('receiving message:', msg)
      this.messages.push(msg);
    });
  }

  send(message) {
    console.log('sending message:', message);
    this.socket.emit("chat_message", message);
    this.chatBox = "";
  }
}

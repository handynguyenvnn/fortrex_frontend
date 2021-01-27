import * as signalR from "@microsoft/signalr";
import {  _getCookie } from "../common/helpers/index";
const protocol = new signalR.JsonHubProtocol();
const transport = signalR.HttpTransportType.WebSockets || signalR.HttpTransportType.LongPolling;
//const transport = signalR.HttpTransportType.WebSockets ;
let access_token = _getCookie("access_token");
const options = {
  transport,
  formatType: "json&format=text",
  skipNegotiation: true,
  accessTokenFactory: () => access_token,
};
let socket;
if (access_token) {

  try {
    socket = new signalR.HubConnectionBuilder()
      .withUrl("https://wss.fortrex.io/stocks", options)
      //.withUrl("http://localhost:4235/stocks", options)
      .withHubProtocol(protocol)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.elapsedMilliseconds < 60000) {
            return Math.random() * 3000;
          } else {
            return null;
          }
        },
      })
      .build();
  } catch (err) {
    console.log("err connect socket>>>", err);
  }
}

export default { socket };

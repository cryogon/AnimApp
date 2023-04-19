import { app, BrowserWindow } from "electron";

app.whenReady().then(() => {
  new BrowserWindow().loadURL("http://localhost:3000");
});

"use strict";
const {BrowserWindow, app} = require("electron");

const mainURL = `file://${__dirname}/src/index.html`;
let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 720,
        minWidth: 320,
        minHeight: 240,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL(mainURL);
    mainWindow.on("closed", () => mainWindow = null);
}

app.on("ready", () => createWindow());
app.on("window-all-closed", () => app.quit());
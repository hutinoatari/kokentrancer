const {contextBridge} = require("electron");

contextBridge.exposeInMainWorld("requires", {
    fs: require("fs"),
    __dirname: __dirname,
    path: require("path"),
});
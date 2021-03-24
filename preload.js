const {contextBridge, ipcRenderer} = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("requires", {
    fsRead: (file) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if(data){
                return data;
            }else{
                throw err;
            }
        });
    },
    fsWrite: (file, text) => {
        fs.writeFile(file, text, "utf-8", (err) => {
            if(err){
                throw err;
            }
        });
    }
});
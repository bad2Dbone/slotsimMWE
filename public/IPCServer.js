const SERVER_NAME = "ipcServer";
const SP_UI_IPC = "singleplay_ui";
const SP_SIM_IPC = "slotsimplay_single";
const SIM_UI_IPC = "simulation_ui";
const SIM_SIM_IPC = "slotsimplay_simulation";
const Store = require('electron-store-atomically');

var Router = require('electron-router');
var router = Router('IPCSERVER');
var tmpCounter = 0;

class IPCServer {
    
    inited;
    ipc;
    clients;

    store = new Store({
        //watch: true
     });

    constructor() {

        // class data
        this.inited = false;
        this.ipc = require('node-ipc');
        this.clients = new Map();
        
        // config
        this.ipc.config.id = SERVER_NAME;
        this.ipc.config.retry = 1500;
        this.ipc.config.silent = true;
        //this.ipc.config.sync = false;
    };

    storeSet = (key, value) => {
        return new Promise (resolve => {
            this.store.set(key, value)
            resolve("resolved") 
        });
    };

    storeAppend = (key, value) => {
        return new Promise (resolve => {
            this.store.set(key, this.store.get(key) + value + "\n")
            resolve("resolved") 
        });
    };

    storeGet = (section, key) => {
        return new Promise(resolve => {
            var value = undefined
            if (this.store.has(section + "." + key)) {
                value = this.store.get(section + "." + key)
            };
            resolve(value);
        });

    };

    init = () => {

        //store communication via router start
            //set data
            router.on("store.set", async (data) => {
                await this.storeSet(data.key, data.value)
            });

            //append data
            router.on("store.append", async (data) => {
                await this.storeAppend(data.key, data.value)
            });

            //request data
            /*from: "simulation",
            key: {
                section: "simulation",
                key: "injRandoms"
                },
            context: "settings"*/
            router.on("store.get", async (evt, req) => {
                
                var data = {
                    to: req.from,
                    key: {
                        section: req.key.section,
                        key: req.key.key
                    },
                    context: req.context,
                    value: undefined 
                };

                data.value = await this.storeGet(req.key.section, req.key.key);
                router.send("store.data", (data));
                console.log("settings sent: " + tmpCounter ++);
            });
        //store communication via router end

        this.inited = true;
    } 
}
module.exports = IPCServer;

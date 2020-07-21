var fs = require("fs");

// Constructs the object setting its name
let Router = require('electron-router');
 
// Returns the static instance
let router = Router("MAIN");
const logger = require('electron-log');
//logger configuration
logger.transports.file.fileName = "slotsim.log";
logger.transports.console.level = false;

router.post('/getLogFile', ( req, res ) => {
//    console.log(Path.join(app.getPath('userData')) + "Roaming/Slotsim/logs/slotsim.log");

    // get file content
    fs.readFile(logger.transports.file.getFile().path, {encoding: 'utf-8'}, (err, data) => {
        
        if (err) {
            console.error(err);
        
        } else  {
            res.json({file : data});
        }
    });
})

router.post('/truncateLogFile', ( req, res ) => {
    
    console.log("MAIN_ROUTER::Received: /truncateLogFile");
    
    // truncate file content
    fs.truncate(logger.transports.file.getFile().path, (err) => {
        
        if (err) {
            console.error(err);
        
        } else  {
            res.json("done");
        }
    });
})
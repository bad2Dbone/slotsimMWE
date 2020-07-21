const fs = window.require("fs");

class Logger   {

    getDate = () => {
        
        let current_datetime = new Date();

        return current_datetime.getFullYear() + "-" 
            + (current_datetime.getMonth() + 1) + "-" 
            + current_datetime.getDate() + " " 
            + current_datetime.getHours() + ":" 
            + current_datetime.getMinutes() + ":"
            + current_datetime.getSeconds(); 
    }
    
    logInfo = (data) => {
        fs.appendFile('./log.txt', data, (err) => {
            if (err) {
                console.error(err);
            }
        });
        console.log(data);
    }

    log (message) {
        this.logInfo(this.getDate() +"[32m info:[39m " + message);
        //logger.info("%o", (getDate()) + message);
    }

    info(message) {
        this.logInfo(this.getDate() +"[32m info:[39m " + message);
    }

    warn(message) {
        this.logInfo(this.getDate() +"[33m warn:[39m " + message);
    }

    error(message) {
        this.logInfo(this.getDate() +"[31m error:[39m " + message);
    }
}

export default Logger;


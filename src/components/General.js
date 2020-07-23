import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const { dialog } = window.require('electron').remote;

var Router = window.require('electron-router');

const styles = theme => ({

    paper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    grid: {
        padding: theme.spacing(0),
        marginLeft: theme.spacing(1),
        flexGrow: 1,
    },
    text: {
        width: "100%",
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
});

class General extends React.Component {

    _generalMounted = false;

    state = {
        filePath:"none",
        folderPath:"none"
    }

    //router communication betwwen main and window process
    router = Router('GENERAL');

    componentDidMount(){
        this._generalMounted = true;

        //load initial data from store
        /*Object.keys(this.state).forEach(element => {
            var req = {
                from: "general",
                key: {
                    section: "general",
                    key: element
                },
                context: "settings"
            }
            this.router.send("store.get", req)
        });  */

            //do shit, when data received from store
            /*this.router.on("store.data", (data) => {
                if (data.to === "general"){
                    switch(data.context){
    
                        case "settings":
                            if (this._generalMounted === true) {
                                this.setState( {[data.key.key]: data.value});
                            };
                            break;
                        
                        default:
                            console.log("General: data received, but no case was hit");
                            break;
                    }
                }
            });*/
    };

    componentWillUnmount() {
        this._generalMounted = false;
        this.router.removeAllListeners();

        //remove listeners with router.removeListener (evt, handler, ctx)
        /*for (var event in this.router._events) {
            if (this.router._events[event].constructor === Array ) { // case when there are multiple listeners
                
                for (var listener of this.router._events[event]) {
                    this.router.removeListener(event, listener.fn, listener.context)
                }

            } else {
                this.router.removeListener(event, this.router._events[event].fn, this.router._events[event].context)
            }

        }*/
    };

    getFilePath = () => {
        var filePath = dialog.showOpenDialogSync({properties: ['openFile']});
        if (filePath !== undefined){
            
            //save data to store
            var data = {
                key: "general.filePath",
                value: filePath
                }
            this.router.send("store.set", data);
            
            //set state in render
            if (this._generalMounted === true) {
                this.setState({filePath: filePath});
            };
        }
    };

    getFolderPath = () => {
        var folderPath = dialog.showOpenDialogSync({properties: ['openDirectory']});
        if (folderPath !== undefined){

            //save data to store
            var data = {
                key: "general.folderPath",
                value: folderPath
                }
            this.router.send("store.set", data);

            //set state in render
            if (this._generalMounted === true) {
                this.setState({folderPath: folderPath});
            };
        }
    }

    render() {

        const { classes } = this.props;

        return(

            <Grid container spacing={2} alignItems="center" alignContent="center" justify="center">
                <Grid item xs={10}>
                    {/*Selected file*/}
                    <TextField
                        className={classes.text}
                        id="Selected-file"
                        label="Script file"
                        name="filePath"
                        size="small"
                        onClick={this.getFilePath}
                        value={this.state.filePath}
                        margin={"normal"}
                    /> 

                    <TextField
                        className={classes.text}
                        id="Selected-folder"
                        label="Working directory"
                        name="folderPath"
                        size="small"
                        onClick={this.getFolderPath}
                        value={this.state.folderPath}
                        helperText={"example: D:\\Gameart\\Slotide"}
                        margin={"normal"}
                    />
                     
                </Grid>
            </Grid>
        );
    }


}

General.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(General);

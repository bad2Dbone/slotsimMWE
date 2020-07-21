import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

var Router = window.require('electron-router');

const styles = theme => ({

    paper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    grid: {
        padding: theme.spacing(0),
        marginLeft: theme.spacing(1),
    },
    text: {
        width: "100%",
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    formatText: {
        fontSize: 12,
        color:"black"
    }
});

class SinglePlay extends React.Component {

    _singlePlayMounted = false;

    state = {
        numPaylines: 0, 
        injectRandoms: "",
        ndbDebug: false,
        spinDisabled : true
    };

    //router communication betwen main and window process
    router = Router('SINGLEPLAY');
    
    componentDidMount() {

        if (this._singlePlayMounted === false) {
            
            // send initial settings request
            Object.keys(this.state).forEach(element => {

                var req = {
                    from: "singlePlay",
                    key: {
                        section: "singlePlay",
                        key: element
                    },
                    context: "settings"
                }
                this.router.send("store.get", req)
            });

            // send request for start button status
            var req = {
                from: "singlePlay",
                key: {
                    section: "singlePlay",
                    key: "running"
                },
                context: "simRunning"
            }
            this.router.send("store.get", req)

            // register handler for "SPDone" events
            this.refreshStates();

            this.router.on("store.data", this.refreshSettings);
        }


        this._singlePlayMounted = true;
        console.log("Mount events: " + this.router._eventsCount);

    };

    componentWillUnmount() {
        
        this._singlePlayMounted = false; 
        this.router.removeAllListeners();
        console.log("Unmount events: " + this.router._eventsCount);

        //remove listeners with router.removeListener (evt, handler, ctx)
       /* for (var event in this.router._events) {
            if (this.router._events[event].constructor === Array ) { // case when there are multiple listeners
                
                for (var listener of this.router._events[event]) {
                    console.log("Removing array: " + event);
                    this.router.removeListener(event, listener.fn, listener.context)
                }

            } else {
                this.router.removeListener(event, this.router._events[event].fn, this.router._events[event].context)
                console.log("Removing object: " + event);
            }

        }*/

        console.log(this.router);
    }

    //check if something in electron-store has changed
    refreshStates = () => {
        //running
        this.router.on("SPDone", () => {
            if (this._singlePlayMounted === true){
                this.setState({spinDisabled: false});
            };
        });
    };

    // do all possible shit, when data received from store
    refreshSettings = (data)  => {
        if (data.to === "singlePlay") {
            
            console.log("got SP data: " + data.context + ":" + JSON.stringify(data.key));
            switch(data.context){

                case "settings":
                    if (this._singlePlayMounted === true){
                        this.setState( {[data.key.key]: data.value});
                    };
                    break;
                
                case "simRunning":
                    if (this._singlePlayMounted === true){
                        this.setState( {spinDisabled: data.value});
                    };
                    break;

                case "folderPath":
                    this.spawnChild(data.value);
                    break;

                case "spinEvents":
                    if (this._singlePlayMounted === true){
                        this.setState({spinEvents: data.value});
                    };
                    break;

                default:
                    console.log("SinglePlay: data received, but no case was hit");
                    console.log(data);
                    break;
            }
        }
    };
   

    
    render() {

        const { classes } = this.props;
        //logger.log("render()");

        return (
            
            <React.Fragment>

            {/* settings*/}
            <Grid container spacing={2} alignItems="center" alignContent="center" justify="center">

            <Grid item xs={3}>
                    {/*Number of paylines*/}
                    <TextField
                        className={classes.text}
                        id="numPaylines"
                        label="Number of paylines"
                        name="numPaylines"
                        onChange={this.handleInputChange}
                        value={this.state.numPaylines}
                    />
                </Grid>

                <Grid item xs={7}>
                    {/*inject randoms field*/}
                    <TextField
                        className={classes.text}
                        id="injectRandoms"
                        label="Inject randoms"
                        name="injectRandoms"
                        onChange={this.handleInputChange}
                        value={this.state.injectRandoms}
                    />
                </Grid>

            </Grid>
            
            <Grid container spacing={2} alignItems="center" alignContent="center" justify="center">
                {/*ndb Debug chechbox*/}
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.ndbDebug}
                        onChange={this.handleCBChange}
                        name="ndbDebug"
                        color="primary"
                    />
                    }
                    label="Debug with ndb (use debugger statement)"
                />
                
            </Grid>

            {/* buttons*/}
            <Grid container  spacing={2} alignItems="center" alignContent="center" justify="center">
            
                <Grid item>
                    <br/>
                    <Button
                        id={"spinButton"}
                        variant="contained"
                        color="primary"
                        onClick={this.spin}
                        disabled={this.state.spinDisabled}
                    >
                    Spin
                    </Button>
                </Grid>

                <Grid item>
                    <br/>
                    <Button
                        id={"stopBtton"}
                        variant="contained"
                        color="primary"
                        onClick={this.stopChild}>
                    stop
                    </Button>
                </Grid>
            </Grid>

        </React.Fragment>
    );
    }
}

SinglePlay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SinglePlay);

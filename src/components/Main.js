import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import General from './General';
import SinglePlay from "./SinglePlay";


var MainMounted = false;

class Main extends React.Component {

  state =  {
    value: 0,
    index: 0
  };

  componentDidMount() {
    MainMounted = true;
  };

  componentWillUnmount() {
    MainMounted = false;
  }

  TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div    
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      >

      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>    
    );  
  }


  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  handleChange = (event, newValue) => {
    if (MainMounted === true) {
      this.setState({value: newValue});
    };
  };

  handleChangeIndex = index => {
    if (MainMounted === true) {
      this.setState({index: index});
    };
  };


  render() {

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="General" {...this.a11yProps(0)} />
            <Tab label="Single Play" {...this.a11yProps(1)} />

          </Tabs>
        </AppBar>

          <this.TabPanel value={this.state.value} index={0}>   
              <General/>
          </this.TabPanel>

          <this.TabPanel value={this.state.value} index={1}>
            <SinglePlay/>
          </this.TabPanel>

      </div>
    );
  }
}

export default Main;


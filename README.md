
# slotsim.git

Slotgame simulation GUI based on react and electron.  
Project forked from example:  
Article: [Medium article](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)  
Author: [@thekitze](https://twitter.com/thekitze)  


## Prerequisites

* [yarn package manager](https://classic.yarnpkg.com/en/docs/install#windows-stable) – tested with yarn-1.22.4.msi

## Installing

### Use yarn scripts

```yarn install``` install all needed dependencies   
```yarn start``` will start the slotsim app in development mode  
```yarn build``` will build the slotsim app into executable package. Target win32 is built into "./dist/win-unpacked" folder 

### Packaging - production

* ```npm install electron-packager -g``` You need electron packager to build platform packages.   
* ```electron-packager slotsimv2.git\ ElectronTest --platform=win32 --arch=x64``` will make windows executable  #   s l o t s i m M W E  
 
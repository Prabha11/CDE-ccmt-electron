# CCMT - Installation guide

### Prerequisites
1) Maven installed
2) NodeJs and npm installed
3) MongoDB installed
4) git installed

### Steps
1) Start MongoDB
2) Go to mongod application in a new terminal
3) Create a database with name 'acc' by using command ```use acc```
1) Make a directory in your computer as the root directory of the project. eg: ```mkdir ccmt-project```
1) Chande workig directory to project root derectory. eg: ```cd ccmt-project```
3) Clone the angular - electron project repository. ```git clone https://github.com/Prabha11/ccmt-electron.git```
1) Chande workig directory to angular - electron project derectory. ```cd ccmt-electron```
2) Build the electron project by running. ```npm run package```
2) Go back to project root derectory. eg: ```cd ..```
1) Clone the CCMT java project repository. ```git clone https://github.com/Prabha11/CCMT.git```
1) Chande workig directory to angular - electron project derectory. ```cd CCMT```
2) Build the project by running. ```mvn clean package```
5) Copy built jar file ```ccmt-project/CCMT/target/ACC-0.0.1-SNAPSHOT.jar``` to electron package location ```ccmt-project/ccmt-electron/ccmt-electron-win32-x64```
6) Copy config folder ```ccmt-project/CCMT/config``` from CCMT root folder to electron package location ```ccmt-project/ccmt-electron/ccmt-electron-win32-x64```
7) Finally, run the jar file ```ccmt-project/ccmt-electron/ccmt-electron-win32-x64/ACC-0.0.1-SNAPSHOT.jar```

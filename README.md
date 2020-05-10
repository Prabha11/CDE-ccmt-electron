# CCMT - Installation guide

### Prerequisites
1) Maven installed
2) NodeJs and bpm installed
3) MongoDB installed
4) git installed

### Steps
1) Start MongoDB
2) Go to mongod application in a new termina
3) Create a database with name 'acc' by using command ```use acc```
1) Make a directory in your computer as the root directory of the project
eg:    ```mkdir ccmt-project```
1) Clone the java project repository
2) Build the project by running 'mvn clean package'
3) Clone the angular - electron project repository
2) Build the electron project by running 'npm run package'
5) Copy built jar file to electron package location
6) Copy config folder from CCMT root folder to electron package location
7) Finally, run the jar file

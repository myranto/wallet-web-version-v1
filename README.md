# wallet-web-version-v1
repository pour le code source coté front du backoffice et frontoffice du projet

project installation:
-Node v18.16.0

first you need to download and unpackage this project or clone tis repository.
Open terminal or cmd then go in the root directory if you're not in yet using command line below:
-cd wallet-web-version-v1
Now run the following command:
-rm package-lock.json
-npm install

create .env file and add the following variable:
--application name
REACT_APP_NAME = Gestion de porte-feuille
host of the backend --
REACT_APP_HOST_API = http://localhost:8000/

and then run : npm start or npm run start
the link http://localhost:3000 will be avalaible
then you will redirect to http://localhost:3000/login

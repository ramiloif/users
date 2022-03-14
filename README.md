# Users

## stracture: 
`/server` - nestjs server <br/>
`/client` - react client<br/>
`/e2e` - pupeteer e2e test<br/>


What can be improved: 
1. DB connection from environment variable nest js props...
2. spesific error code response in case email alreadu exist for example 409,
and in client side validate what error came back from server and show `email already exist` only on that spesific errpr
3. dont refethch all users on any user create
4. add some report to pupeteer test and not just exit code


How to run ? 
1. mongo docker:
```
$ docker-compose -f mongo.yml up -d
```
2. server: 
```
$ cd server
$ npm install
$ npm run start
```
3. client: 
```
$ cd client
$ npm install
$ npm run start
```
4. e2e test 
```
$ cd e2e
$ npm install
$ node test.js
```
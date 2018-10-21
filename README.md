# PropertyApi

This project is a Web Api service which the server side is **NodeJs (v 6.9.1)**

## Development server
Run `npm install` to make sure that all the node_modules have been downloaded completely

Run `npm run start` to start the dev server. The server will runs under Port 3200

## How to Use
This application has 2 endpoints that you can use:-
* `http://localhost:3200/api/htv/completed`
    - Content-Type: application/json
    - body: { payload: [ ... ] }
    - Objective
        - this will filter the submitted payload by type (htv) and workflow (completed)
* `http://localhost:3200/api/:type/workflow/:completed`
    - Content-Type: application/json
    - body: { payload: [ ... ] }
    - Objective
        - this will filter the submitted payload by type and workflow provided by the caller through the parameters

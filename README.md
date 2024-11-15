# NGSoftwareDesign

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.


## Verdaccio installation

`Verdaccio` must be installed globally using either of the following methods:

$ `npm install --global verdaccio`

You can use a custom registry either by setting it globally for all your projects

`npm set registry http://localhost:4000/`

### Creating User

`npm adduser --registry http://localhost:4000/`

### Start Verdaccio

`verdaccio --listen 4000 --config /yourHome/yourUserName/.config/verdaccio/config.yaml`

### Publish library on Verdaccio

`sh ng-rebuild.sh`

## Development server

Move to folder `ng-software-design` and run `ng serve`. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

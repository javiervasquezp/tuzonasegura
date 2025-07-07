# Micro Apps with Web Components and Angular Elements

This example consists of three Angular projects that demonstrate how to use Web Components/ Angular Elements to implement a TuZonaSegura that loads micro apps:

- **TuZonaSegura (/src):** TuZonaSegura loading micro apps
- **appaportante (/projects/appaportante)**: Demo micro app
- **apppensionista (/projects/apppensionista)**: Another demo micro app

## Install Dependencies

```
npm install
```

## Standalone

For debugging and testing, you can start each of those projects individually. Please note that the TuZonaSegura will throw some exceptions when doing so because it does not find the micro apps that are expected in an sub folder for the sake of simplicity.

Use one of the following commands for this:

```
ng serve --project TuZonaSegura --open
ng serve --project appaportante --open
ng serve --project apppensionita--open
```

## Everything together

For using everything together, you have to build the example and run it:

```
npm run build
npm start
```
## other comand
```
npm i -D concat --project apppensionista
ng add ngx-build-plus --project appempleador
npm install lodash --save
ng add lodash --project apppensionista
npm install @types/lodash --save-dev
```
## create components in project
```
ng g c shared/components/alerta --project appaportante

```
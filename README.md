# Checkout.Client
[![Build Status](https://travis-ci.org/PierreRoudaut/checkout-client.svg?branch=master)](https://travis-ci.org/PierreRoudaut/checkout-client)

## About

Checkout.Client is web application client that consumes the API exposed by [Checkout.API](https://github.com/PierreRoudaut/checkout-api)

- ## /shop
The shop page allows customers to retrieve the product catalog, add/update/remove item to their card, as well as clearing out the cart entirely.
Using data binding and push notification subscription, the shop page will update itself in realtime according the the available quantity of products. The unique __id__ of the customer cart is stored on the client side using __localStorage__.

Performing cart operations simultaneously from two different browsers should display product updates accordingly.

- ## /admin
The admin page allows administrators to perform CRUD operations on products


## UI

This web application implements Google's [Material Design Specification](https://material.io/) and relies on UI components coming from:
 - [Angular Material](https://material.angular.io)
 - [Devextreme](https://js.devexpress.com/Overview/Angular/)

## Development Environment

Checkout API is powered by [Angular](https://angular.io/) 7

1. Clone the repo
2. Run the following commands:
```bash
npm install -g @angular/cli
npm install
## Replace the apiEndpoint with the url of the checkout-api server in src/environments/environment.ts
ng serve -o
```

## Continuous Integration

Checkout.Client uses [Travis CI](https://travis-ci.org/PierreRoudaut/checkout-client) to run tests

## Testing

```bash
ng test
```

## TODO

 - Support realtime products update for administration page
 - Add authentication
 - Setup continuous deployment script
 - Support checkout
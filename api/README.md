# Pecunia API

This directory contains the code used for Pecunia's API.

## Introduction

First of all, it is important to note the purpose of this API. This API exists to help Pecunia provide a better user experience for users. The collected data is used for the following:

- Sending push notifications to users.
- Helping users carry out scheduled automated tasks.
- Storing signed messages for executing/cancelling recurring payments.

In the future, this list will inevitably become longer, but this API will not collect data indiscriminately. The code can be audited to make sure that this remains true. At any point, users can request the export or deletion of all their data.

## Architecture

This API is built with Node, Express.js and TypeScript. It uses Redis for caching and MongoDB for more permanent data storage.

## Security

This version of this API is a proof-of-concept (still in development) and as such, does not include a number of security features. However, this will change before launch.

It should be noted that this API is built to be used with the Pecunia app, and as such, the endpoints will only be accessible from the app. This is to ensure that users' data is not available on other services they have not signed up for.


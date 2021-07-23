# iq-air-twilio-function

This project uses a Twilio function to query an [AirVisual Pro](https://www.iqair.com/air-quality-monitors/airvisual-pro) device-specific API endpoint and respond with the CO2 concentration or PM2.5 for the configured device as [Messsaging TwiML](https://www.twilio.com/docs/messaging/twiml/message). You must have an AirVisual Pro device linked to an iqair.com account as well as a Twilio account to make use of this respository.

## Environment variables

The following environment variables should be configured:
* AIR_QUALITY_API: The HTTPS URL to your AirVisual Node API obtained from [your AirVisual devices dashboard](https://www.iqair.com/dashboard/devices) in format https://www.airvisual.com/api/v2/node/{uniqueDeviceApiLink}

## Requirements

To deploy this plugin, you will need:

- npm version 5.0.0 or later installed (type `npm -v` in your terminal to check)
- Node.js version 12 or later installed (type `node -v` in your terminal to check)
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) along with the [Serverless Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins). Run the following commands to install them:
  
  ```bash
  # Install the Twilio CLI
  npm install twilio-cli -g
  # Install the Serverless and Flex as Plugins
  twilio plugins:install @twilio-labs/plugin-serverless
  ```

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

1. Clone this repo
2. Install the dependencies

```bash
  # Install the dependencies of the Twilio Function
  npm install
  ```

3. Copy the `.env.example` file:

  ```bash
  cp .env.example .env
  ```

4. Edit `.env`:

  ```bash
  AIR_QUALITY_API=https://www.airvisual.com/api/v2/node/XXXXXXXXXXXX
  ```

## Development

```bash
# Start Twilio Functions
npm run start 
```

Your function will run on `http://localhost:3000`.

## Deploy

When you are ready to deploy your plugin, first deploy your Twilio Functions:

```bash
twilio serverless:deploy
```

You will see your service and function deployed in the [Twilio Functions console](https://www.twilio.com/console/functions/). Note that the function is protected so it is not publicly accessible (see [Understanding Visibility of Functions and Assets](https://www.twilio.com/docs/runtime/functions-assets-api/api/understanding-visibility-public-private-and-protected-functions-and-assets)). Your Function will be available to configure as a [webhook handler for your Twilio number](https://www.twilio.com/docs/runtime/quickstart/serverless-functions-receive-inbound-sms#set-a-function-as-a-webhook).
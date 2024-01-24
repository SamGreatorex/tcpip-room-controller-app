# ZRIP2CC (Zoom Room IP2CC Helper)

ZRIP2CC is a node.js application that acts as middleware for Zoom Room Controls.

# About

This demo is an application designed to enhance the functionality of Zoom Rooms Controllers by seamlessly integrating with smart home devices. This app allows users to control an internet-connected device directly from their Zoom Rooms Controller interface.
The customization uses the Tuya interface APIs, A Zoom Room and a middleware Service. The service and Zoom Room must be connected to the same network as the connection is done via TCP/IP.

The customization is initiated by a Zoom room controller. This controller has an adapter installed which will send a TCP/IP request over the network to a running local node.js server. The request sent is to switch on or off a plug. Once the local server gets the request it sends a http request to the Tuya apis to find a plug named “trade-plug”. Once the plug is found it sends a request to switch the plug on / off.

**Prerequisites:**

- Smartlife App installed and controlled on a device such as an Android or Ipad. Account details:
- A Smart plug which is enabled for Tuya SmartLife (e.g. https://amzn.eu/d/5VdMQst )
- A Tuya Developer Account (https://iot.tuya.com/)
- A Mac / Windows machine with node.js installed https://nodejs.org/en/download

## Setup app locally

Login to the Tuya Development account https://iot.tuya.com/ using the account credentials. Click on Cloud, Development then open the Zoom Trade Project. The client id and secret are located as the Authorization key. Ensure these values are copied into the tuya file "tuya_integration.js" and save the file.

# Start the server

Within a terminal type the following to start:

```bash
npm start
```

# Zoom Room Setup

- Sign in to the [Zoom web portal](https://zoom.us).
- Click Room Management > Zoom Rooms.
- Click the Edit to the right of the Zoom Room name.
- Under Devices, toggle Enable Room Controls to on (blue).
- Click Create Profile.
- Enter the json configuration for the room.

> NOTE: The json configuration can be found in Solutions folder

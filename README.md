
# ZRIP2CC (Zoom Room IP2CC Helper)

ZRIP2CC is a node.js application that acts as middleware for Zoom Room Controls.

# Getting Started

These instructions will get you a copy of the project up and running on your local machine.  The current demo turns on a Philips Hue lamp.  This code can be modified for your use case.

**Prerequisites:**
* [Zoom account](https://zoom.us)
* Zoom Room
* [Node.js 8+](https://nodejs.org/)
* [Philips Hue Bridge](https://www.philips-hue.com/en-us/p/hue-bridge/046677458478) (optional)

>Note:  If you do not have a Philips Hue Bridge that's ok!  You can still see the events firing in the console and log file.  Skip those steps in the setup guide below.

## Setup app locally

Assuming macOS 10.15+.

Clone and install the app and it's dependencies. We'll be using [dotenv](https://www.npmjs.com/package/dotenv) for our credentials, and [winston](https://www.npmjs.com/package/winston) for logging. 

```bash
git clone https://github.com/will4950/zrip2cc
```

```bash
cd zrip2cc && npm install 
```

### Setup dotenv 
Create a `.env` file in which to store your Philips Hue Bridge credentials.

```bash
touch .env
```

Copy the following into this file, which we'll add your own values to:

```bash
HUE_TOKEN=
HUE_BRIDGE=
HUE_LIGHTID=
```

> Remember: Never share or store your client credentials publicly. Your `.env` is included in the `.gitignore` file to ensure these files won't be included in a git workflow.

# Philips Hue Bridge API Token

We will need to create an API token on the Philips Hue bridge in order to send it commands. Complete the following steps:
1. [Get your Bridge IP](https://www.meethue.com/api/nupnp) from the meethue portal or another method.
2. Access the API debugger interface ```http://<bridge ip address>/debug/clip.html```.
3. Enter ```{"devicetype":"my_hue_app#app"}``` in the message body.
4. Press the *link* button on your Hue Bridge then click `Post`.

If everything worked you should see a response similar to this: 
```
[
    {
        "success": {
            "username": "7fbb0cd252f3787c2b81892b03d8a9"
        }
    }
]
```
Copy this token and place it in your `.env` file.  

Example: ```HUE_TOKEN=7fbb0cd252f3787c2b81892b03d8a9```.

Enter the IP Address of your Philips Hue Bridge in your `.env` file.  

Example: ```HUE_BRIDGE=192.168.1.2```.

If you have multiple lights connected to your Philips Hue Bridge, specify that in your `.env` file.  The default is light ```1```.  

Example: ```HUE_LIGHTID=1```.

# Start the server

If you have followed along with the setup instructions, your `.env` file should look like this:

```bash
HUE_TOKEN=7fbb0cd252f3787c2b81892b03d8a9
HUE_BRIDGE=192.168.1.2
HUE_LIGHTID=1
```
> Note: replace these values with your own.

Tab back to the terminal and start ZRIP2CC:
```bash
npm start
```

# Zoom Room Setup

* Sign in to the [Zoom web portal](https://zoom.us).
* Click Room Management > Zoom Rooms.
* Click the Edit to the right of the Zoom Room name.
* Under Devices, toggle Enable Room Controls to on (blue). 
* Click Create Profile.
* Enter the json configuration for this room. 

> NOTE: The json configuration can be found in [controller.json](controller.json).  Edit the IP address to match your dev machine.

### Support

None :)  Please ping me with any discussion!


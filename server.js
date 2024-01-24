const config = require("./config.js");
const tuyaconfig = require("./Solutions/tuya_integration/tuya_integration.js");
const tsa_rooms = require("./Solutions/tsa_room_web_display/tsa_room_switch_on.js");
const Net = require("net");
const port = config.port;
const api = require("./api.js");

const server = new Net.Server();

server.listen(port, function () {
  console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on("connection", function (socket) {
  console.log("A new connection has been established.");

  socket.write("Connected");

  socket.on("data", function (chunk) {
    var data = JSON.parse(chunk.toString());
    console.log("request sent", data);
    switch (data.integration) {
      case "tuya_lamp":
        tuyaconfig.handle_plug_change(data);
        break;
      case "tsa_room":
        tsa_rooms.handle_ui_room_change(data);
        break;
      default:
        console.log("Unknown integration");
    }
  });

  socket.on("end", function () {
    console.info("Closing connection with the client");
  });

  socket.on("error", function (err) {
    console.error(`Error: ${err}`);
  });
});

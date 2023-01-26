const axios = require('axios');

// exports.sendMessage = async function (roomName, switchOn) {
//     console.log('Send Light Switch On Message');
//     try {

//      let messageData = {
//         "action" : "ROOM_NATIVE_CONTROL",
//         "data": {"roomName": roomName, "switchOn": switchOn}
//         }
//       let result = await axios({
//         url: `https://6el4la4z4k.execute-api.eu-west-2.amazonaws.com/dev/ws/sendmessage`,
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         data: JSON.stringify(messageData)
//       });
//       return result.data
//     } catch (error) {
//       console.error(error);
//     }
//   };

exports.sendMessage = async function (data) {
    try {

     let messageData = {
        "action" : "ROOM_NATIVE_CONTROL",
        "data": data
        }
      let result = await axios({
        url: `https://eblfwakkbd.execute-api.eu-west-2.amazonaws.com/dev/ws/sendmessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(messageData)
      });
      return result.data
    } catch (error) {
      console.error(error);
    }
  };
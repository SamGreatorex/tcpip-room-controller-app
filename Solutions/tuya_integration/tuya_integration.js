const axios = require("axios");
const crypto = require("crypto");
const qs = require("qs");
const CryptoJS = require("crypto-js");
const tuya_client_id = "r5eduv9atdfwjsxhjpd5";
const tuya_client_secret = "96dbd5be7d764190a81267f5c98e7b80";
const tuya_url = "https://openapi.tuyaeu.com";

let timestamp = "";
let url = "";
let sign = "";
exports.handle_plug_change = async function (data) {
  try {
    let token = await getToken();
    console.log("TOKEN IS", token.access_token, data);

    const devices = await getDevices(token.access_token);

    const trade_plug = devices.find((x) => x.customName === "trade-plug");
    if (trade_plug) {
      await sendDeviceCommand(token.access_token, trade_plug.id, {
        commands: [
          {
            code: "switch_1",
            value: data.action === "switch_on",
          },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

async function getToken() {
  try {
    const methodUrl = "/v1.0/token?grant_type=1";
    const timestamp = Date.now().toString();
    const sign = await encryptStrNoToken(timestamp, "GET", methodUrl, "");

    let tokenRequest = await axios({
      url: tuya_url + methodUrl,
      method: "GET",
      headers: {
        t: timestamp,
        sign_method: "HMAC-SHA256",
        client_id: tuya_client_id,
        sign,
      },
    });
    console.log(tokenRequest.data.result);
    return tokenRequest.data.result;
  } catch (error) {
    console.error(error);
  }
}

async function getDevices(token) {
  try {
    const methodUrl = "/v2.0/cloud/thing/device?page_size=20";
    const timestamp = Date.now().toString();
    const sign = await encryptStr(timestamp, "GET", methodUrl, "", token);

    let devicesRequest = await axios({
      url: tuya_url + methodUrl,
      method: "GET",
      headers: {
        t: timestamp,
        path: methodUrl,
        client_id: tuya_client_id,
        sign,
        sign_method: "HMAC-SHA256",
        access_token: token,
      },
    });
    console.log("Get devices response", devicesRequest.data.result);
    return devicesRequest.data.result;
  } catch (error) {
    console.error(error);
  }
}

async function getDevice(token, deviceId) {
  try {
    const methodUrl = `/v2.0/cloud/thing/${deviceId}`;
    const timestamp = Date.now().toString();
    const sign = await encryptStr(timestamp, "GET", methodUrl, "", token);

    let response = await axios({
      url: tuya_url + methodUrl,
      method: "GET",
      headers: {
        t: timestamp,
        path: methodUrl,
        client_id: tuya_client_id,
        sign,
        sign_method: "HMAC-SHA256",
        access_token: token,
      },
    });
    console.log(`Get device  ${deviceId} response`, response.data.result);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

async function updateDeviceProperty(token, deviceId, body) {
  try {
    console.log("Updating device properties", deviceId, body);
    const methodUrl = `/v1.0/devices/${deviceId}/commands`;
    const timestamp = Date.now().toString();

    const data = JSON.stringify(body);
    const sign = await encryptStr(timestamp, "POST", methodUrl, data, token);

    let response = await axios({
      url: tuya_url + methodUrl,
      method: "POST",
      headers: {
        t: timestamp,
        path: methodUrl,
        client_id: tuya_client_id,
        sign,
        sign_method: "HMAC-SHA256",
        access_token: token,
        "Content-Type": "application/json",
      },
      data: data,
    });
    console.log(`Updated device ${deviceId} response`, response);
  } catch (error) {
    console.error(error);
  }
}

async function sendDeviceCommand(token, deviceId, body) {
  try {
    console.log("Updating device properties", deviceId, body);
    const methodUrl = `/v1.0/devices/${deviceId}/commands`;
    const timestamp = Date.now().toString();

    const data = JSON.stringify(body);
    const sign = await encryptStr(timestamp, "POST", methodUrl, data, token);

    let response = await axios({
      url: tuya_url + methodUrl,
      method: "POST",
      headers: {
        t: timestamp,
        path: methodUrl,
        client_id: tuya_client_id,
        sign,
        sign_method: "HMAC-SHA256",
        access_token: token,
        "Content-Type": "application/json",
      },
      data: data,
    });
    console.log(`Updated device ${deviceId} response`, response);
  } catch (error) {
    console.error(error);
  }
}

async function encryptStrNoToken(timestamp, method, methodUrl, body) {
  const contentHash = crypto.createHash("sha256").update(body).digest("hex");
  const stringToSign = method + "\n" + contentHash + "\n" + "" + "\n" + methodUrl; // [method, contentHash, "", methodUrl].join("\n");
  const str = tuya_client_id + timestamp + stringToSign;
  return crypto.createHmac("sha256", tuya_client_secret).update(str, "utf8").digest("hex").toUpperCase();
}

async function encryptStr(timestamp, method, methodUrl, body, token) {
  const contentHash = crypto.createHash("sha256").update(body).digest("hex");
  const stringToSign = method + "\n" + contentHash + "\n" + "" + "\n" + methodUrl; // [method, contentHash, "", methodUrl].join("\n");
  const str = tuya_client_id + token + timestamp + stringToSign;
  return crypto.createHmac("sha256", tuya_client_secret).update(str, "utf8").digest("hex").toUpperCase();
}

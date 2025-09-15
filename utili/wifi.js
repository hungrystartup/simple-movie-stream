const os = require('os');
// ====Get connected hotspot ip address. why? i originally built this as an offline streaming, so another device on the same hotspot willuse that hotspot ip as a url e.g mine is 10.30.190.116 currently so i'd be something like http://10.30.190.116:43034/ ====
const getWifiIp = () => {
  // ====This gets the list of networks external and internal====
  const networks = os.networkInterfaces();
  for (const names of Object.keys(networks)) {
    // ====Filter out the one with wifi... this might and would be different on win 7====
    if (names.toLowerCase().includes('wi-fi')) {
      // ====if using win 7 remove this line====
      for (const network of networks[names]) {
        if (network.family === 'IPv4' && !network.internal)
          // ====Make sure the ip we are getting isn't internal====
          return network.address; // ====Return the network address in essence the ip: 10.30.190.116 — my ip
      }
    }
  }
  return 'localhost'; // ====A fallback option, mostly when getting hotspot ip fails====
};
// ====Setting ip to the hostpot ip====
const ip = getWifiIp();
// ====Exporting it as a module====
module.exports = { ip };

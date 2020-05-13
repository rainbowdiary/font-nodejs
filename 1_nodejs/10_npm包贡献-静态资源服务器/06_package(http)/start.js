const Server = require("./server");
const yargs = require("yargs");

const argv = yargs.argv;

new Server(argv).start()
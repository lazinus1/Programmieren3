const os = require("os");

let message = "The operating system is ";

function main() {
    console.log(message + os.platform());
}

main();
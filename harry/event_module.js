const EventEmitter = require("node:events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("WaterFull", () => {
  console.log("Please turn off the motor");
  
  setTimeout(() => {
    console.log("Gentle Reminder! please turn off the motor");
  }, 3000);
});

myEmitter.emit("WaterFull");

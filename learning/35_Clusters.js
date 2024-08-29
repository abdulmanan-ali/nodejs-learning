const express = require("express");
const os = require("os");
const cluster = require("cluster");

const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = 3000;

    app.get("/", (req, res) => {
        return res.json({ message: `Hello from express server ${process.pid}` });
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}; 
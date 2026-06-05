const app=require('./src/app');
require('dotenv').config();
const PORT = process.env.PORT||3000;

const startServer = ()=>{
    app.listen(PORT, ()=>{
    console.log(`
    ┌─────────────────────────────────────┐
    │     Server Online                   │
    ├─────────────────────────────────────┤
    │  Port   : ${PORT}                      │
    │  URL    : localhost:${PORT}            │
    │  Status : \x1b[32mREADY\x1b[0m                     │
    └─────────────────────────────────────┘
    `);
    });
};

startServer();
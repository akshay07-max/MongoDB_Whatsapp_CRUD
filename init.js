const mongoose = require("mongoose");
const Chat = require("./Models/chat.js"); // importing Chat model.


main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


let allChats = [
  {
    from: "Neha",
    to: "Raghav",
    msg: "Mere Dolna Sunn",
    createdAt: new Date(),
  },
  {
    from: "Akshay",
    to: "Kajal",
    msg: "Mere Pyar kin Dhun",
    createdAt: new Date(),
  },
  {
    from: "Akshada",
    to: "Pravin",
    msg: "Mene tujhe Chun liya",
    createdAt: new Date(),
  },
  {
    from: "Monali",
    to: "Karan",
    msg: "Tu bhi mujhe Chunn",
    createdAt: new Date(),
  },
  {
    from: "Kalyani",
    to: "Shubham",
    msg: "Chunn, Chunn, Chunn",
    createdAt: new Date(),
  },
];


Chat.insertMany(allChats);

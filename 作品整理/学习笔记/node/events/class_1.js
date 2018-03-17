/**
 * Created by mastermin on 17-6-7.
 */
var event=require("events").EventEmitter;
var eventEmitter=new event();

eventEmitter.on("send_mess",function (data) {
    console.log(data.text)
});
eventEmitter.emit("send_mess",{text:"Hello Wrold"});


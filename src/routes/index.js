const { Router } = require('express');
const _ = require('underscore'); 

const router = Router();

const rooms = [];

var globalId = 1

//Get all rooms

router.post('/room-users', (req, res) => {

    const { id, action } = req.body;

    console.log(id);

    let currentRoom;

    for(let i = 0; i < rooms.length; i++){
        if (rooms[i].id == id){
            currentRoom = rooms[i];
            break;
        } 
    }

    if (currentRoom == undefined) {
        res.status(404).json({"message" : "Not Found"});
    } else {
        if(action == "connect") {
            currentRoom.users++;
        } else {
            currentRoom.users--;
        }
        res.status(200).json({"message" : "Modified"});
    }
});

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

//Get one room

router.get('/rooms/:id', (req, res) => {

    const { id } = req.params;

    let room;

    for(let index = 0; index < rooms.length; index++)
    {
        if(rooms[index].id == id)
        {
            room = rooms[index];
            break;
        }
    }

    if (room) {
        res.status(200).json(room);
    } else {
        res.status(404).json({"message" : "Not Found"});
    }
});

//Add a new room

router.post('/rooms', (req, res) => {
    const room = {
        "id"       : globalId,
        "thematic" : req.body['thematic'],
        "port"     : req.body['port'],
        "users"    : 0
    }

    rooms.push(room);

    globalId++

    res.status(201).json(room);
});

//Delete a room

router.delete('/rooms/:id', (req, res) => {

    const { id } = req.params;
    let deleted = false

    for(let index = 0; index < rooms.length; index++)
    {
        if(rooms[index].id == id)
        {
            rooms.splice(index, 1);
            roomsAdmin.splice(index, 1)
            deleted = true;
            break;
        }
    }

    if (deleted) {
        res.status(204).json({"message" : "The object has been deleted"});
    } else {
        res.status(404).json({"message" : "Not Found"});
    }

});

module.exports = router;
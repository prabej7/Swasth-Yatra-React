const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const randomString = require('randomstring');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/SwasthaYatra').then(() => {
    console.log('Mongodb connected !');
}).catch((err) => {
    console.log(err);
});

const doctorSchema = mongoose.Schema({
    name: String,
    type: String,
    img: String,
    attend: String
});

const Doctor = mongoose.model('doctor', doctorSchema);

const userSchema = ({
    email: String,
    username: String,
    password: String,
    type: String,
    doctors: [doctorSchema],
    eSewaName: String,
    eSewaNo: String
});

const User = mongoose.model('user', userSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, randomString.generate(7) + file.originalname);
    }
});

const uploads = multer({ storage });

io.on('connection', (socket) => {

})

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const isUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (isUser.length == 0) {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: hash
                });
                const user = await newUser.save();
                res.status(200).json(user);
            })
        })
    } else {
        res.status(201).json('User already exists');
    }

});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ $or: [{ username: username }, { email: username }] });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).json(user);
                } else {
                    res.status(201).json('Incorrect password !');
                }
            });
        } else {
            res.status(404).json('User not found!')
        }
    } catch (err) {
        console.log(err);
    }

});

app.post('/addDoctor', uploads.single('file'), async (req, res) => {
    const { name, type, _id } = req.body;
    const imgName = req.file.filename;
    const user = await User.findById(_id);
    const newDoctor = new Doctor({
        name: name,
        type: type,
        img: imgName,
        attend: 'Present'
    });
    const saveDoctor = await newDoctor.save();
    user.doctors.push(saveDoctor);
    await user.save();
    res.status(200).json('Data added successfully!');
});

app.post('/delete', async (req, res) => {
    const { user, _id } = req.body;
    const doctor = await Doctor.findById(_id);
    let img = doctor.img;
    await User.updateOne({ _id: user }, { $pull: { doctors: { _id: _id } } });
    Doctor.deleteOne({ _id: _id });
    fs.unlink(`../client/public/uploads/${img}`, (err) => {
        if (!err) {

        }
    });
    res.status(200).json('Delete successfully!');
})

app.post('/getUser', async (req, res) => {
    const user = await User.findById(req.body._id);
    res.status(200).json(user);
});

app.post('/update', async (req, res) => {
    const { username, email, eSewaName, eSewaNo, original } = req.body;

    const data = await User.updateOne({
        username: original
    },
        {
            $set: {
                username: username,
                email: email,
                eSewaName: eSewaName,
                eSewaNo: eSewaNo
            }
        });
        console.log(data);
    res.status(200).json('Data updated successfully');
})

server.listen(5000, () => {
    console.log('Server is running at port 5000');
});
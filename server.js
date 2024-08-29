const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/paintingData", async (req, res) => {
    let paintingData = fs.readFileSync('./paintingData.json');
    res.json(JSON.parse(paintingData));
})

app.post("/", async (req, res, next) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.phone) {
        return res.json({ mess: 'Vui lòng nhập đầy đủ thông tin' });
    }
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
                <p>xin chao ${req.body.name} - ${req.body.phone}</p>
            </div>
        </div>
    `;
    let mailOption = {
        from: 'NQH-Test nodemailer',
        to: req.body.email,
        subject: 'Test Nodemailer',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
            res.json({ mess: 'Lỗi gửi mail' });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({ mess: 'Gửi mail thành công' });
        }
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'noreply.halvamericanstudy@gmail.com',
        pass: 'xwww jtlr zpbs vqmu'
    }
});
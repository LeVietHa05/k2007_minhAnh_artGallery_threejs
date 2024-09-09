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
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.price || !req.body.paintingID) {
        return res.json({ mess: 'Vui lòng nhập đầy đủ thông tin' });
    }

    let paintingData = fs.readFileSync('./paintingData.json');
    paintingData = JSON.parse(paintingData);
    let painting = paintingData[req.body.paintingID - 1];

    var content = '';
    content += `
    <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h2>Kính gửi: Các Bác, các Cô, các Chú </h2>
            <p>Lời đầu tiên, con xin gửi đến quý Bác, các Cô, các Chú cùng  tất cả mọi người đã ghé thăm phòng tranh online và ủng hộ con lời chúc sức khoẻ và lời cảm ơn chân thành nhất.</p>
            <p>Con đã nhận được thông tin đăng ký Mua tranh ủng hộ cho dự án “ Một bức vẽ – Triệu niềm vui” nhằm gây quỹ ủng hộ 40 học sinh nữ, các bé gái có hoàn cảnh khó khăn thuộc Hội người Mù Hà Nội. </p>
            <p>Con Rất mong sẽ tiếp tục nhận được sự đồng hành, chia sẻ thường xuyên từ những vòng tay nhân ái của quý Bác, các Cô, các Chú để cùng con mang lại những giá trị tốt đẹp nhất tới nhiều học sinh khiếm thị có hoàn cảnh đặc biệt khó khăn hiện nay để không học sinh nào bị bỏ lại phía sau.</p>
            <p>Con xin trân trọng kính mời Các Bác, các Cô, các Chú có mặt tại Lễ tổng kết dự án vào ngày 22/9/2024 để nhận tranh trực tiếp và cùng con trao quà cho các học sinh khó khăn nói trên. </p>
            <p>Thời gian Lễ tổng kết: 8h30 -11h30, ngày 22/9/2024</p>
            <p>Địa điểm: Không gian văn hóa Đông Tây ( Làng sinh viên Hacinco) số 79 Phố Ngụy Như Kon Tum – quận Thanh Xuân – thành phố Hà Nội. </p>
            <p>Con xin gửi lại 1 số thông tin để hoàn tất việc mua tranh.</p>
            
            Tên tác phẩm: <b><i>${painting.info.title}</i></b>
            Bức tranh số: <b>${+req.body.paintingID}</b>
            Kích thước: <b>${painting.info.size}</b>
            Chất liệu: <b>${painting.info.material}</b>
            Giá bán:  <b>${req.body.price}</b> đồng
            Thông tin chuyển khoản: ...
            Số tài khoản: ...
            Ngân hàng ...
            Chủ tài khoản: Vũ Minh Anh
            Trân trọng!
        </div>
    </div>
    `;
    let mailOption = {
        from: 'NQH-Test nodemailer',
        to: req.body.email,
        subject: 'Xác nhận tham gia đấu giá dự án "Mỗi bức vẽ - Triệu niềm vui"',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
            res.json({ mess: 'Lỗi gửi mail' });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({ mess: 'Xác nhận đấu giá. Vui lòng kiểm tra Email của bạn' });
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
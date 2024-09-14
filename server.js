const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('dotenv').config();

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

let soldPainting = [];

app.post("/", async (req, res, next) => {
    console.log(req.body);

    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.paintingID) {
        return res.json({ mess: 'Vui lòng nhập đầy đủ thông tin', status: 'error' });
    }

    if (!parseInt(req.body.price)) {
        return res.json({ mess: 'Giá không hợp lệ. Ví dụ hợp lệ: 5000000', status: 'error' });
    }

    let paintingData = fs.readFileSync('./paintingData.json');
    paintingData = JSON.parse(paintingData);
    let painting = paintingData[req.body.paintingID - 1];
    //check if painting is bought
    if (painting.info.isBought) {
        return res.json({ mess: 'Bức tranh đã bán cho người khác. Rất xin lỗi bạn. Bạn vui lòng tải lại trang để cập nhật thông tin mới nhất nhé', status: 'error' });
    }
    //check if price is lower than the current price
    if (+req.body.price < +painting.info.price) {
        return res.json({ mess: 'Giá bạn đưa ra không hợp lý', status: 'error' });  
    }
    //update bought status
    paintingData[req.body.paintingID - 1].info.isBought = true;
    fs.writeFileSync('./paintingData.json', JSON.stringify(paintingData));
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
            
            Tên tác phẩm: <b><i>${painting.info.title}</i></b> <br>
            Bức tranh số: <b>${+req.body.paintingID}</b><br>
            Kích thước: <b>${painting.info.size}</b><br>
            Chất liệu: <b>${painting.info.material}</b><br>
            Giá bán:  <b>${req.body.price}</b> đồng<br>
            Thông tin chuyển khoản: Mua tranh ủng hộ cho dự án “Một bức vẽ – Triệu niềm vui”. Mã số bức tranh: ${+req.body.paintingID}<br>
            Số tài khoản: 0867060156<br>
            Ngân hàng MB bank <br>
            Chủ tài khoản: Vũ Minh Anh<br>
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
            res.json({ mess: 'Lỗi gửi mail', status: 'error' });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({ mess: 'Xác nhận đấu giá. Vui lòng kiểm tra Email của bạn' , status: 'success'});
        }
    });
})

app.listen(3007, () => {
    console.log('Server is running on port 3000');
})

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});
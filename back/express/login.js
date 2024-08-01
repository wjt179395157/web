const express = require('express');
const app = express();
const port = 3000;

// 解析 JSON 请求体
app.use(express.json());

// 允许跨域请求
const cors = require('cors');
app.use(cors());


// 定义一个 POST 路由

app.post('/', (req, res) => {
    console.log('Received request');
    const data = req.body;
    console.log('Received data:', data);
    res.json({ message: 'Data received successfully!', receivedData: data });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
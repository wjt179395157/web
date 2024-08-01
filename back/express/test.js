const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let comments = []; // 模拟的数据库

const cors = require('cors');
app.use(cors());

// 获取所有评论
app.get('/test', (req, res) => {
    res.json(comments);
    console.log(comments);
});

// 添加新评论
app.post('/test', (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    comments.push(newComment);
    res.status(201).json(newComment);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
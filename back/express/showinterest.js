const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

app.use(bodyParser.json());

// 存储数据的对象，按用户ID分类
let userCounts = {};
const cors = require('cors');
app.use(cors());
// 处理更新请求
app.post('/updateCounts', (req, res) => {
    const { userId, postCount, commentCount } = req.body;
    
    // 更新或创建用户的数据
    userCounts[userId] = {
        postCount: postCount,
        commentCount: commentCount
    };

    res.sendStatus(200);
});

// 处理获取请求
app.get('/getCounts', (req, res) => {
    const userId = req.query.userId;

    // 返回指定用户的数据
    res.json(userCounts[userId] || { postCount: 0, commentCount: 0 });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
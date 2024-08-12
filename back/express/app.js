const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const createError = require('http-errors');

const app = express();
const port = 3000;

// 允许跨域请求
app.use(cors());

// 解析 JSON 请求体和 URL 编码的数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



// 配置 multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 内存中存储数据
let dataStore = [];
let commentfood = []; // 模拟的评论数据库
let commenttravel = []; // 模拟的评论数据库
let commentall = []; // 模拟的评论数据库
let commentbook = []; // 模拟的评论数据库
let commentsights = []; // 模拟的评论数据库
let dataStoreid = [];
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let postData =[];

// 设置路由，访问根路径时返回index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 处理圈子创建请求
app.post('/circle', (req, res) => {
    const { name, category, description, rules } = req.body;

    // 检查必需的字段是否存在
    if (!name || !category || !description || !rules) {
        return res.status(400).json({ error: '所有字段都是必需的' });
    }

    // 将数据存储到内存中（实际应用中应该保存到数据库）
    dataStore.push({ name, category, description, rules });

    console.log('收到的数据:', { name, category, description, rules });

    // 发送成功响应
    res.status(200).json({ message: '内容添加成功' });
});

// 获取圈子数据
app.get('/circle', (req, res) => {
    if (dataStore.length === 0) {
        console.log("没有数据");
        return res.status(200).json({ message: '当前没有圈子数据' });
    }

    console.log("有数据");
    dataStore.forEach(item => {
        console.log(item.name);
    });

    res.status(200).json(dataStore);
});

// 处理用户注册请求
app.post('/register', (req, res) => {
    const { name, category, description, rules } = req.body;

    // 检查必需的字段是否存在
    if (!name || !category || !description || !rules) {
        return res.status(400).json({ error: '所有字段都是必需的' });
    }

    // 将数据存储到内存中（实际应用中应该保存到数据库）
    dataStoreid.push({ name, category, description, rules });

    console.log('收到的数据:', { name, category, description, rules });

    // 发送成功响应
    res.status(200).json({ message: '内容添加成功' });
});

app.get('/register', (req, res) => {
    if (dataStoreid.length === 0) {
        console.log("没有数据");
        return res.status(200).json({ message: '当前没有圈子数据' });
    }

    console.log("有数据");
    dataStoreid.forEach(item => {
        console.log(item.name);
    });

    res.status(200).json(dataStoreid);
});

// 根据 ID 获取数据
app.get('/post', (req, res) => {
    res.status(200).json(postData);
});

// 处理表单提交，包括文件上传
app.post('/post', upload.array('image', 10), (req, res) => {
    const { content } = req.body;
    const files = req.files;
    console.log("1");
    console.log("2");
    const imagePaths = files.map(file => file.filename);
    console.log(imagePaths);
    console.log("3");
    const newPost = { content, imagePaths };
    postData.push(newPost);
    console.log(newPost)
    res.status(200).send('内容添加成功');
});



// 获取所有评论
app.get('/testfood', (req, res) => {
    res.json(commentfood);
    console.log(commentfood);
    console.log("text");
});

// 添加新评论
app.post('/testfood', (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    commentfood.push(newComment);
    res.status(201).json(newComment);
});

// 获取所有评论
app.get('/testall', (req, res) => {
    res.json(commentall);
    console.log(commentall);
    console.log("text1");
});

// 添加新评论
app.post('/testall', (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    commentall.push(newComment);
    res.status(201).json(newComment);
});

app.get('/testtravel', (req, res) => {
    res.json(commenttravel);
    console.log(commenttravel);
    console.log("text");
});

// 添加新评论
app.post('/testtravel', (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    commenttravel.push(newComment);
    res.status(201).json(newComment);
});

app.get('/testsights', (req, res) => {
    res.json(commentsights);
    console.log(commentsights);
    console.log("text");
});

// 添加新评论
app.post('/testsights', (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    commentsights.push(newComment);
    res.status(201).json(newComment);
});

app.get('/testbook', (req, res) => {
    res.json(commentbook);
    console.log(commentbook);
    console.log("text");
});

// 添加新评论
app.post('/testbook', (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    commentbook.push(newComment);
    res.status(201).json(newComment);
});

// 定义一个 POST 路由
app.post('/', (req, res) => {
    console.log('Received request');
    const data = req.body;
    console.log('Received data:', data);
    res.json({ message: 'Data received successfully!', receivedData: data });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({ error: err.message });
});


// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});
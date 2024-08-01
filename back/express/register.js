const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3003;

// 允许跨域请求
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的数据

// 设置静态文件夹
app.use(express.static(path.join(__dirname, 'uploads')));

// 配置 multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 存储数据的对象（模拟数据库）
const dataStorage = {};

// 处理圈子创建请求
app.post('/register', upload.none(), (req, res) => {
    const { name, property, category, description, rules, id } = req.body;

    console.log('圈子名称:', name);
    console.log('圈子属性:', property);
    console.log('圈子类别:', category);
    console.log('圈子简介:', description);
    console.log('圈子规约:', rules);
    console.log('随机 ID:', id);

    dataStorage[id] = { name, property, category, description, rules };

    res.json({
        id: id,
        content: { name, property, category, description, rules }
    });
});

// 根据 ID 获取数据
app.get('/data', (req, res) => {
    const id = req.query.id;
    const data = dataStorage[id];

    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: '数据未找到' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});
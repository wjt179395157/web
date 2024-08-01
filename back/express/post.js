const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// 允许跨域请求
app.use(cors());

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

// 内存中存储数据
const dataStore = {};

// 处理表单提交
app.post('/post', upload.array('image'), (req, res) => {
    try {
        const content = req.body.content;
        const files = req.files.map(file => ({
            filename: file.filename,
            path: file.path
        }));
        const id = req.body.id || uuidv4(); // 使用 UUID 生成唯一 ID

        // 保存数据到内存中
        dataStore[id] = {
            content,
            files: files.map(file => ({
                filename: file.filename,
                path: file.path
            }))
        };

        res.json({ id, content, files });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 根据 ID 获取数据
app.get('/data', (req, res) => {
    const id = req.query.id;

    // 从内存中读取数据
    if (dataStore[id]) {
        const data = dataStore[id];
        res.json({
            id,
            content: data.content,
            files: data.files.map(file => ({
                filename: file.filename,
                path: path.join('uploads', file.filename)
            }))
        });
    } else {
        res.status(404).json({ error: '数据未找到' });
    }
});

// 根据 ID 删除数据
app.delete('/data', (req, res) => {
    const id = req.query.id;

    // 从内存中删除记录
    if (dataStore[id]) {
        const files = dataStore[id].files;

        // 删除文件
        files.forEach(file => {
            const filePath = path.join('uploads', file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // 删除文件
            }
        });

        // 从内存中删除记录
        delete dataStore[id];

        res.json({ message: '数据已删除' });
    } else {
        res.status(404).json({ error: '数据未找到' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
import express from 'express'
import { users, posts } from './data.js'
import { cloneDeep } from './utils/constans.js'
const PORT = 8080

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello Mindx')
})
app.get('/users', (req, res) => {
    res.send({
        users
    })
})

app.get('/users/:userId', (req, res) => {
    const { userId } = req.params
    console.log('userId', userId)
    const user = users.find((item) => item.id === userId)
    if (!user) {
        res.status(500).send({
            message: 'User not found'
        })
        return
    }
    res.send(user)
})

app.post('/users', (req, res) => {
    //có thông user : req.body
    const { id, userName, email, avatar } = req.body
    // tạo 1 id random
    //check email trùng
    const userEmail = users.find((item) => item.email === email)
    // Nếu trùng => lỗi
    if (userEmail) {
        res.send({
            message: 'Email is exist'
        })
        return
    }
    // Tạo user mới
    const newUser = { id, userName, email, avatar }
    users.push(newUser)
    res.status(201).send({
        users
    })
})


// app.get('/posts/:userId', (req, res) => {
//     // lấy ra userId
//     const { userId } = req.params
//     // tìm bài post có userId trùng với userId
//     const listPost = posts.filter(item => item.userId === userId)
//     // trả về list posts phù hợp
//     res.status(200).send({
//         posts: listPost,
//         total: listPost.length
//     })
// })

app.post('/posts/:userId', (req, res) => {
    // lấy đc userId truyền lên
    const { userId } = req.params
    // lấy đc body của bài post
    const { postId, content, isPublic } = req.body
    // tìm user có tồn tại
    const findUser = users.find((item) => item.id === userId)
    // nếu k tồn tại user => lỗi
    if (!findUser) {
        res.status(500).send({
            message: 'User not found'
        })
        return
    }
    // tạo bài post nếu tồn tại user
    const newPost = { userId, postId, content, isPublic }
    posts.push(newPost)
    res.status(201).send({
        message: 'Create success',
        post: newPost
    })
})
app.put('/posts/:postId', (req, res) => {
    //Lấy postId
    const { postId } = req.params
    //Lấy userId qua query
    const { userId } = req.query
    //Lấy thông tin update
    const { content, isPublic } = req.body
    //tìm bài post theo postId
    const findPost = posts.find(item => item.postId === postId)
    //Nếu k tìm thấy bài post -> trả về lỗi
    if (!findPost) {
        res.status(404).send({
            message: 'post not found'
        })
        return
    }
    //Ktra xem bài post tìm thấy có userId trùng với userId truyền lên k
    const checkUser = findPost.userId === userId
    //Nếu k trùng -> trả ra lỗi
    if (!checkUser) {
        res.status(404).send({
            message: 'user can not update this post'
        })
        return
    }
    //update lại content của bài post
    const postIndex = posts.findIndex(item => item.postId === postId)
    posts[postIndex] = {
        ...posts[postIndex],
        content,
        isPublic,
    }
    res.send({
        message: 'Update success',
        post: posts[postIndex],
    })
})
app.delete('/posts/:postId', (req, res) => {
    //Lấy postId
    const { postId } = req.params
    //Lấy userId qua query
    const { userId } = req.query
    //tìm bài post theo postId
    const findPost = posts.find(item => item.postId === postId)
    //Nếu k tìm thấy bài post -> trả về lỗi
    if (!findPost) {
        res.status(404).send({
            message: 'post not found'
        })
        return
    }
    //Ktra xem bài post tìm thấy có userId trùng với userId truyền lên k
    const checkUser = findPost.userId === userId
    //Nếu k trùng -> trả ra lỗi
    if (!checkUser) {
        res.status(404).send({
            message: 'user can not delete this post'
        })
        return
    }
    //update lại content của bài post
    const postIndex = posts.findIndex(item => item.postId === postId)
    posts.splice(postIndex, 1)
    res.send({
        message: 'Update success',
        post: posts,
    })
})
// app.get('/posts', (req, res) => {
//     // lấy ra content
//     const { content } = req.query
//     // tìm bài post có content trùng với content truyền lên
//     // const listPost = posts.filter(item => item.content === content) // tìm tuyệt đối
//     const listPostRelative = posts.filter(item => item.content.includes(content)) // Phân biệt hoa thường
//     // trả về list posts phù hợp
//     res.status(200).send({
//         posts: listPostRelative,
//         total: listPostRelative.length
//     })
// })
app.get('/posts', (req, res) => {
    // lấy ra điều kiện
    const { content, userId, isPublic } = req.query
    let listPost = cloneDeep(posts)
    if (userId) {
        listPost = posts.filter(item => item.userId === userId)
    }
    if (content) {
        listPost = listPost.filter(item => item.content.includes(content))
    }
    if (isPublic) {
        listPost = listPost.filter(item => +item.isPublic === +isPublic)
    }
    res.status(200).send({
        posts: listPost,
        total: listPost.length
    })
})
app.listen(PORT, (err) => {
    if (err) throw new Error('err')
    console.log(`Server is running in http://localhost:${PORT}`);
})
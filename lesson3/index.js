import express from 'express'
import { v4 as uuidv4 } from 'uuid'
const PORT = 8080
const SERVER_API = 'http://localhost:3000'
const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    //có thông user : req.body
    const { userName, email, avatar } = req.body
    try {
        //Lấy list user
        const users = await fetch(`${SERVER_API}/users`)
        if (users) {
            const data = await users.json()
            console.log('users', data)

            //checkvalidate
            if (!userName) throw new Error('username is required!')
            //check email trùng
            const userEmail = data.find((item) => item.email === email)
            // Nếu trùng => lỗi
            if (userEmail) throw new Error('Email is exist')
            // tạo 1 id random
            const id = uuidv4()
            // Tạo user mới
            const newUser = { id, userName, email, avatar }
            data.push(newUser)
            res.status(201).send({
                data
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.post('/post', async (req, res) => {
    // lấy được userId
    const { userId } = req.query
    // Lấy ra thông tin gửi lên của post
    const { content, isPublic } = req.body
    try {
        // gọi ra list user
        const dataUser = await fetch(`${SERVER_API}/users`)
        const users = await dataUser.json()
        // Tìm xem user có tồn tại k
        const findUser = users.find(item => item.userId)
        // Nếu k tồn tại => show lỗi
        if (!findUser) {
            throw new Error('User is not correct')
        }
        // Nếu nội dung gửi lên rỗng hoặc k gửi => show lỗi
        if (!content) {
            throw new Error('content is required')
        }
        // Lấy list post
        const dataPosts = await fetch(`${SERVER_API}/posts`)
        const posts = await dataPosts.json()
        // Tạo id của post mới
        const postId = uuidv4()
        // Tạo data new post
        const newPost = {
            postId, userId, content, isPublic,
            createAt: new Date(),
        }
        posts.push(newPost)
        res.status(201).send({
            post: newPost,
            message: 'Create success'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.put('/posts/:postId', async (req, res) => {
    //Lấy postId
    const { postId } = req.params
    //Lấy userId qua query
    const { userId } = req.query
    //Lấy thông tin update
    const { content, isPublic } = req.body
    //tìm bài post theo postId
    try {
        const dataPosts = await fetch(`${SERVER_API}/posts`)
        const posts = await dataPosts.json()
        const findPost = posts.find(item => item.postId === postId)
        //Nếu k tìm thấy bài post -> trả về lỗi
        if (!findPost) {
            throw new Error('post not found')
        }
        //Ktra xem bài post tìm thấy có userId trùng với userId truyền lên k
        const checkUser = findPost.userId === userId
        //Nếu k trùng -> trả ra lỗi
        if (!checkUser) {
            throw new Error('This user can not update this post')
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
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.post('/comments', async (req, res) => {
    const { userId, postId } = req.query
    const { content } = req.body
    try {
        const dataPosts = await fetch(`${SERVER_API}/posts`)
        const posts = await dataPosts.json()
        const findPost = posts.find(item => item.postId === postId)
        if (!findPost) throw new Error('post not found')
        const dataUsers = await fetch(`${SERVER_API}/posts`)
        const users = await dataUsers.json()
        const findUser = users.find(item => item.userId === userId)
        if (!findUser) throw new Error('User is not correct')
        const dataComments = await fetch(`${SERVER_API}/posts`)
        const comments = await dataComments.json()
        const commentId = uuidv4()
        const newComment = {
            commentId,
            userId,
            postId,
            content,
            createAt: new Date()
        }
        comments.push(newComment)
        res.status(201).send({
            message: 'Create success',
            comment: newComment,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.put('/comments/:commentId', async (req, res) => {
    const { userId } = req.query
    const { commentId } = req.params
    const { content } = req.body
    try {
        const dataComments = await fetch(`${SERVER_API}/posts`)
        const comments = await dataComments.json()
        const findComment = comments.find(item.commentId === commentId)
        if (!findComment) throw new Error('comment not found')
        const users = await dataUsers.json()
        const findUser = users.find(item => item.userId === userId)
        if (!findUser) throw new Error('User is not correct')
        const findIndex = comments.findIndex(item.commentId === commentId)
        comments[findIndex] = {
            ...comments[findIndex],
            content,
        }
        res.status(200).send({
            message: 'Update succes'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

})

app.get('/comments', async (req, res) => {
    const { postId } = req.query
    try {
        const dataPosts = await fetch(`${SERVER_API}/posts`)
        const posts = await dataPosts.json()
        const findPost = posts.find(item => item.postId === postId)
        if (!findPost) throw new Error('post not found')
        const dataComments = await fetch(`${SERVER_API}/comments`)
        const comments = await dataComments.json()
        const commentList = comments.filter(item => item.postId === postId)
        res.status(200).send({
            commentList,
            total: commentList.length,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.get('/users', async (req, res) => {
    // get limit
    const { limit_comment } = req.query
    try {
        // lấy list post
        const dataPosts = await fetch(`${SERVER_API}/posts`)
        const posts = await dataPosts.json()

        // lấy list user
        const dataUsers = await fetch(`${SERVER_API}/users`)
        const users = await dataUsers.json()
        // lấy list comment
        const dataComments = await fetch(`${SERVER_API}/comments`)
        const comments = await dataComments.json()
        // Tạo ra 1 list rỗng
        const list = []
        users.forEach(user => {
            let data = {}
            const userId = user.id

            // tìm list post theo userId
            const listPost = posts.filter(item => item.userId === userId)
            data = {
                userId,
                listPost
            }
            listPost.forEach((post, index) => {
                const postId = post.postId
                // tìm list comment theo postId
                const listComment = comments.filter(item => item.postId === postId)
                const newListComment = listComment.slice(0, +limit_comment)
                data.listPost[index].listComment = newListComment
            })
            list.push(data)
        });
        res.status(200).send({
            users: list,
            total: list.length,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.listen(PORT, (err) => {
    console.log(`Server is running http://localhost:${PORT}`)
})
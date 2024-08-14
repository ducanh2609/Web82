import express from 'express'
import mongoose from 'mongoose'
import { DATABASE_PASSWORD, DATABASE_USERNAME, PORT_DEVELOP } from './utils/constants.js'
import UserModel from './models/users.models.js'
import PostModel from './models/posts.models.js'
import { cloneDeep } from './utils/funconstant.js'
import CommentModel from './models/comments.models.js'
const app = express()
app.use(express.json())

await mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@test.dknwp.mongodb.net/test`)
console.log('database connected')

app.post('/users', async (req, res) => {
    //có thông user : req.body
    const { username, password, email } = req.body
    try {
        const users = await UserModel.find()
        const checkEmail = users.find(item => item.email === email)
        if (checkEmail) throw new Error('Email is exist')
        const createUser = await UserModel.create({
            username, password, email
        })
        res.status(201).send({
            user: createUser,
            message: 'Create success'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.post('/posts', async (req, res) => {
    // lấy được userId
    const { userId } = req.query
    // Lấy ra thông tin gửi lên của post
    const { content, isPublic } = req.body
    try {
        // Tìm xem user có tồn tại k
        const findUser = await UserModel.findById(userId)
        // Nếu k tồn tại => show lỗi
        if (!findUser) {
            throw new Error('User is not correct')
        }
        // Nếu nội dung gửi lên rỗng hoặc k gửi => show lỗi
        if (!content) {
            throw new Error('content is required')
        }
        // Tạo data new post
        const newPost = {
            userId,
            content,
            isPublic,
        }

        const createPost = await PostModel.create({ ...newPost })
        res.status(201).send({
            post: createPost,
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
        const post = await PostModel.findById(postId)
        //Nếu k tìm thấy bài post -> trả về lỗi
        if (!post) {
            throw new Error('post not found')
        }
        //Ktra xem bài post tìm thấy có userId trùng với userId truyền lên k
        const checkUser = cloneDeep(post.userId) === userId
        //Nếu k trùng -> trả ra lỗi
        if (!checkUser) {
            throw new Error('This user can not update this post')
        }
        //update lại content của bài post
        post.content = content
        post.isPublic = isPublic
        post.save()
        res.send({
            message: 'Update success',
            post: post,
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
        const findPost = await PostModel.findById(postId)
        if (!findPost) throw new Error('post not found')
        const findUser = await UserModel.findById(userId)
        if (!findUser) throw new Error('User is not correct')
        const newComment = {
            userId,
            postId,
            content,
        }
        const createComment = await CommentModel.create({ ...newComment })
        res.status(201).send({
            message: 'Create success',
            comment: createComment,
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
        const findComment = await CommentModel.findById(commentId)
        if (!findComment) throw new Error('comment not found')
        const findUser = await UserModel.findById(userId)
        if (!findUser) throw new Error('User is not correct')
        const checkUser = cloneDeep(findUser._id) === findComment.userId
        if (!checkUser) {
            throw new Error('this user can not edit this comment')
        }
        findComment.content = content
        findComment.save()
        res.status(200).send({
            message: 'Update succes',
            comment: findComment,
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
        const findPost = await PostModel.findById(postId)
        if (!findPost) throw new Error('post not found')
        const comments = await CommentModel.find()
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
        const posts = await PostModel.find()

        // lấy list user
        const users = await UserModel.find()

        // lấy list comment
        const comments = await CommentModel.find()

        // Tạo ra 1 list rỗng
        const list = []
        users.forEach(user => {
            let data = {}
            const userId = cloneDeep(user._id)

            // tìm list post theo userId
            const listPost = posts.filter(item => item.userId === userId)
            data = {
                userId,
                listPost
            }
            listPost.forEach((post, index) => {
                const postId = cloneDeep(post._id)
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

app.listen(PORT_DEVELOP, (err) => {
    console.log(`Server is running http://localhost:${PORT_DEVELOP}`)
})
import http from 'http'
import users from './data.js'
const PORT = 8080

const app = http.createServer((req, res) => {
    const data = { school: 'Mindx' }
    const endpoint = req.url
    switch (true) {
        case endpoint.includes('/users'):
            if (endpoint.includes('old')) {
                const userOld = users.filter((item) => item.age >= 50)
                if (!userOld.length) {
                    res.end(JSON.stringify('Không có user nào có tuổi lớn hơn 50'))
                }
                res.end(JSON.stringify(userOld))
            } else if (endpoint.includes('add-random')) {
                const newUser = {
                    id: 4,
                    userName: 'Nguyen',
                    email: 'nguyen@gmail.com',
                    address: 'HN',
                    age: 25,
                }
                users.push(newUser)
                console.log(users)
                res.end(JSON.stringify(users))
            } else {
                res.end(JSON.stringify(users))
            }
            break;
        // case '/users/old':
        //     const userOld = users.filter((item) => item.age >= 50)
        //     if (!userOld.length) {
        //         res.end(JSON.stringify('Không có user nào có tuổi lớn hơn 50'))
        //     }
        //     res.end(JSON.stringify(userOld))
        //     break;
        default:
            res.end(JSON.stringify(data))
            break;
    }
})
const a = 0
console.log(!a) //- Nếu giá trị bằng 0 thì => true ngc lại => false
console.log(!!a) //- Nếu giá trị bằng 0 thì => false ngc lại => true
app.listen(PORT, (err) => {
    if (err) throw new Error('Error')
    console.log(`Server is running: http://localhost:${PORT}`)
})

// Method: GET, PUT, POST, DELETE
// CRUD:
// + Create: POST
// + Read: GET
// + Update: PUT
// + Delete: DELETE
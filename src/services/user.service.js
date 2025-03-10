import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    signupDemoUsers
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { id: user.id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function updateScore(diff) {
    const loggedInUserId = getLoggedinUser().id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function signupDemoUsers() {
    return storageService.query(STORAGE_KEY)
        .then(users => !users.length || Promise.reject('Too Many Demo Users!'))
        .then(() => userService.signup({ username: 'admin', password: 'admin', fullname: 'Admin Adminov' }))
        .then(() => userService.signup({ username: 'popo', password: 'popo', fullname: 'Popo McPopo' }))
        .then(() => userService.signup({ username: 'nina', password: 'nina', fullname: 'Nina Simantov' }))
}




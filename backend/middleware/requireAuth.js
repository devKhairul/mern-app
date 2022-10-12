const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization is required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)        
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Unauthorized request'})
    }

}
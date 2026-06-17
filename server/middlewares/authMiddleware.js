import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" })
    } 

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error("Token verification failed:", error.message, "Token received:", token ? token.substring(0, 15) + "..." : "none")
        return res.status(401).json({ message: "Not authorized, token failed" })
    }
}

export default protect
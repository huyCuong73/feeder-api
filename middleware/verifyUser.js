import jwt from "jsonwebtoken"

export default function verifyUser (req,res,next) {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, "abcd", (err, user) =>{
            if(err)
                return res.status(403).json("Not valid")
            req.userId = user.id;
            next()
        })
    } else{
        return res.status(401).json("Not authenticated")
    }
}
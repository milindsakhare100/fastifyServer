import jwt from 'jsonwebtoken';

export const verifyToken = async (req, reply) => {

    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({ message: "Access denied" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return true;
    }catch(error){
        console.log(error);
        return reply.code(500).send({ message: "An error occurred", error });
    }   


}
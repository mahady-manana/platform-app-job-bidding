const config = {
    port : process.env.PORT || 5555,
    // mongoURI : process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dfdfsdfsdfsdfsdfsdfsd0",
    mongoURI : process.env.MONGO_URI || "mongodb+srv://mahady:mahady1906@cluster0.tasds.mongodb.net/mahady?retryWrites=true&w=majority",
    // Rah mampiasa MongoDB Atlas ianao dia soloina Url cluster-nao io "mongodb://localhost...." io
    jwtSecret : process.env.JWT_SECRET || "jwt152secrethmac256",
    smtp : {
        user : 'rm.mahady@gmail.com',
        pass : 'mahady1906-janoary2021'
    }
}
export default config;
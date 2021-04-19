const config = {
    port : process.env.PORT || 5555,
    // mongoURI : process.env.MONGO_URI || "mongodb://localhost:27017/sharingapp-pl55",
    mongoURI : process.env.MONGO_URI || "mongodb+srv://mahady:mahady1906@cluster0.tasds.mongodb.net/mahady?retryWrites=true&w=majority",
    jwtSecret : process.env.JWT_SECRET || "jwt152secrethmac256",
    smtp : {
        user : 'rm.mahady@gmail.com',
        pass : 'password'
    }
}
export default config;
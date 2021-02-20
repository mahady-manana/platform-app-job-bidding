const config = {
    port : process.env.PORT || 5555,
    // mongoURI : process.env.MONGO_URI || "mongodb://localhost:27017/sharingapp-pl55",
    jwtSecret : process.env.JWT_SECRET || "jwt152secrethmac256",
     
}
export default config;
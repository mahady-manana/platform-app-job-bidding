const config = {
    port : process.env.PORT || 5555,
    mongoURI : process.env.MONGO_URI || 'mongodb+srv://mahady:K0FXmMm9gDFpeaBo@cluster0.tasds.mongodb.net/mahady?retryWrites=true&w=majority',
    jwtSecret : process.env.JWT_SECRET || "jwt152secrethmac256"
}
export default config;
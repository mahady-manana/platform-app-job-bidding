# Note
Noho ny fichier config misy donnee personnelle
dia tsy afaka push-na anaty repo github ny config.js

Aoka kosa mba samy hanana file config.js :

/server <br/>
-- configs/ <br/>
--- config.js (Ity ny config) <br/>
--- config.md

*Content anaty : config.js*

```
const config = {
    port : process.env.PORT || 5555,
    mongoURI : process.env.MONGO_URI || "mongodb://localhost:27017/sharingapp-pl55",
    // Rah mampiasa MongoDB Atlas ianao dia soloina Url cluster-nao io "mongodb://localhost...." io
    jwtSecret : process.env.JWT_SECRET || "jwt152secrethmac256",
    smtp : {
        user : 'adresse email no eto @gmail.com',
        pass : 'password anio gmail io no eto'
    }
}
export default config;

```
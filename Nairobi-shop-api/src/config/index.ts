import * as dotenv from 'dotenv';
dotenv.config();

const config={
    app:{
        NAME:process.env.APP_NAME || 'api',
        ENV:process.env.NODE_ENV || 'dev',
        PORT:process.env.PORT || 5000,
        API_URL:process.env.API_URL || 'http://localhost:5000',
        // MONGO_URI:process.env.MONGO_URI || "mongodb+srv://samuelnderitu495:prNIAUjyZdJ69uxj@cluster0.fdjty4n.mongodb.net/?retryWrites=true&w=majority",
        MONGO_URI:process.env.MONGO_URI || 'mongodb+srv://johnmwaniki:UFDQHk584rTAfDOw@cluster0.z9pasbz.mongodb.net/',
        

        FRONTEND_URL:process.env.FRONTEND_URL || 'http://localhost:3000',
        BACKEND_URL:process.env.BACKEND_URL || 'http://localhost:4000'
        
    },
    
    jwt:{
        SECRET:process.env.JWT_SECRET || "lfakjfslfkaslkdfjlksjfsfdskfjls",
        ISSUER:process.env.JWT_ISSUER || 'Samuel',
        TOKEN_TTL:process.env.JWT_TOKEN_TTL || "1d",
    },
    
    mail:{
        api_key:process.env.SENDER_API_KEY || "412075753517-s7vejr77tmriutc52ii655s25nfh8a4v.apps.googleusercontent.com"
    }
}

export default config;
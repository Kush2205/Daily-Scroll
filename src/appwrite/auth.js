import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

  async createAccount(email, password, name){
    try {
       const userAccount = await this.account.create(ID.unique(),email, password, name);
       
    return userAccount;
    }
    catch(e){
        console.error(e);
    }
}

async Login(email, password){
    try {
       return await this.account.createEmailPasswordSession(email, password);
    }
    catch(e){
        console.error(e);
    }
}

async getCurrentUser(){
    try {
        return await this.account.get();
    }
    catch(e){
        console.error(e);
    }
    
    return null;
    
}

async LogOut(){
    try {
        return await this.account.deleteSessions();
    }
    catch(e){
        console.error(e);
    }
}
}
const authService = new AuthService();
export default authService;
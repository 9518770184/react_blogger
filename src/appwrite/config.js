import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from '../conf/conf'

class apWriteService {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId, conf.appWriteCollectionId, slug, { title, content, featureImage, status, userId })
        } catch (error) {
            console.log("AppWrite service :: createPost :: error", error);

        }
    }

    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featureImage, status })
        } catch (error) {
            console.log("AppWrite service :: updatePost :: error", error);

        }
    }

    async deletePost(slug) {
        try {
            await this.database?.deletePost(conf.appwriteDatabaseId, conf.appwriteProjectId, slug);
            return true
        } catch (error) {
            console.log("AppWrite service :: deletePost :: error", error);
            return false
        }
    }

    async getAllPostList(queries = [Query.equal("status", 'active')]) {
        try {
            return await this.database?.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("AppWrite service :: getAllPostList :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.database?.getDocument(conf.appwriteDatabaseId, conf.appwriteProjectId, slug);
        } catch (error) {
            console.log("AppWrite service :: getPost :: error", error);
            return false;
        }
    }


    //file services
    async uploadFile(file) {
        try {
            return await this.bucket?.createFile(conf.appWriteBucketId, ID?.unique(), file)
        } catch (error) {
            console.log("AppWrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket?.deleteFile(conf.appWriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("AppWrite service :: deleteFile :: error", error);
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket?.getFilePreview(conf.appWriteBucketId, fileId)
        } catch (error) {
            console.log("AppWrite service :: filePreview :: error", error);
            return false; 
        }
    }
}

const appWriteservice = new apWriteService();
export default appWriteservice;
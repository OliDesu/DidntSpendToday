import { DocumentData } from "firebase/firestore";

export class User {
    email: string;
    name: string;
    progress: [Date, boolean];
    constructor(email: string, name: string, progress: [Date, boolean]) {
        this.email = email;
        this.name = name;
        this.progress = progress;
    }

     static convertDocumentDataToUser = (data: DocumentData): User => {
         return <User>{
             email: data.email,
             name: data.name,
             progress: data.progress
         };
     }


}
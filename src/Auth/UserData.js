import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "./FirebaseConfig";
import { User } from "../Models/User.ts";
import { useCurrentUser } from "../Services/CurrentUserService.tsx";
import { useLogin } from "../Services/LoginInProvider.tsx";

export const useFetchUserByEmail = () => {
    const { setCurrentUser } = useCurrentUser();
    const { setIsLoggedIn } = useLogin();

    async function fetchUserByEmail(email) {
        try {
            const userRef = collection(firestore, 'users');
            const userQuery = query(userRef, where('email', '==', email), limit(1));
            const querySnapshot = await getDocs(userQuery);
            if (querySnapshot.size === 1) {
                const user = querySnapshot.docs[0].data();
                setCurrentUser(User.convertDocumentDataToUser(user));
                setIsLoggedIn(true);
            } else {
                console.log("0 documents matched the query");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    return { fetchUserByEmail };
};



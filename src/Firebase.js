// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKwZuGjmQnwgQLGpMUOd3XhsOxHI2bHi4",
    authDomain: "dar-el-foaad-calculators.firebaseapp.com",
    projectId: "dar-el-foaad-calculators",
    storageBucket: "dar-el-foaad-calculators.appspot.com",
    messagingSenderId: "251022126155",
    appId: "1:251022126155:web:b1224ba551ecd61c4571ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user status in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            status: "pending"
        });
        console.log("Registration successful. Awaiting admin approval.");
        return Promise.resolve("Registration successful. Awaiting admin approval.");
    } catch (error) {
        console.error("Registration failed:", error.code, error.message);
        return Promise.reject(error.message);
    }
}

export async function approveUser(userId) {
    try {
        await updateDoc(doc(db, "users", userId), {
            status: "approved"
        });
        console.log("User approved successfully.");
        return true
    } catch (error) {
        console.error("User approval failed:", error.code, error.message);
        return false
    }
}

export async function rejectUser(userId) {
    try {
        await updateDoc(doc(db, "users", userId), {
            status: "rejected"
        });
        console.log("User rejected successfully.");
        return true
    } catch (error) {
        console.error("User rejection failed:", error.code, error.message);
        return false
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check user status in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.status === "approved") {
                if (userData.email === "khaled.toaima@daralfouad.net") {
                    localStorage.setItem('admin', 'true')
                }
                return Promise.resolve("Login successful.");
            } else if (userData.status === "pending") {
                await auth.signOut();
                return Promise.reject("Account is pending approval. Please wait for admin approval.");
            } else if (userData.status === "rejected") {
                await auth.signOut();
                return Promise.reject("Account has been rejected. Please contact support.");
            } else {
                await auth.signOut();
                return Promise.reject("Unknown account status. Please contact support.");
            }
        } else {
            await auth.signOut();
            return Promise.reject("No user data found. Email or password is incorrect.");
        }
    } catch (error) {
        return Promise.reject(`Login failed! Email or password is incorrect.`);
    }
}

export async function logout() {
    try {
        await auth.signOut();
        console.log("Logout successful.");
    } catch (error) {
        console.error("Logout failed:", error.message);
    }
}

export async function getPendingUsers() {
    try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return Promise.resolve(users);
    } catch (error) {
        console.error("Error getting pending users:", error.code, error.message);
        return Promise.reject(`Error getting pending users: ${error.code} - ${error.message}`);
    }
}



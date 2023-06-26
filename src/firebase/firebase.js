import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    getDoc,
    query,
    where,
    setDoc,
    deleteDoc,
    onSnapshot
} from '@firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage"
import { getAuth, } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)



export async function uploadFile(file, uniqueId) {
    // Creamos una referencia a la carpeta `imgproductos/{uniqueId}`
    const [, result] = uniqueId.split("_");
    console.log(result, file, uniqueId);
    const uniqueFolderRef = ref(storage, `imgproductos/ ${result}/ ${uniqueId}`);
    try {
        const imgRef = {}
        // Subimos el archivo a esa carpeta
        const snapshot = await uploadBytes(uniqueFolderRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imgRef[uniqueId] = url;
        console.log(imgRef, url, snapshot)
        return imgRef;

    } catch (error) {
        console.error(error);
    }
}

export async function deleteFile(url) {
    const desertRef = ref(storage, url);
    deleteObject(desertRef).then(() => {

    }).catch((error) => {
        console.log(error)
    });
}




export async function userExists(uid, email) {
    const usersRef = collection(db, "users"); // Referencia a la colección de usuarios

    try {
        const userDocRef = doc(usersRef, uid); // Referencia al documento correspondiente al UID
        const userDocSnap = await getDoc(userDocRef); // Obtener el documento correspondiente al UID

        if (userDocSnap.exists()) {
            return true; // Si el documento correspondiente al UID existe, se devuelve true
        } else {
            const querySnapshot = await getDocs(query(usersRef, where("email", "==", email))); // Obtener todos los documentos donde el campo "email" es igual al email recibido por parámetro
            return !querySnapshot.empty; // Si querySnapshot.empty es false, significa que se encontró al menos un documento con el email dado
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        return false; // Si hay un error, se devuelve false para indicar que el usuario no existe
    }
}


export async function emailExists(email) {

    try {
        const users = [];
        const q = query(collection(db, "users"), where("email", "==", email));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            users.push(doc.data());
            console.log("\n", users.uid)
        });
        return users.length > 0 ? true : false;
    } catch (error) {
        console.error(`Error al consultar el email`, error);
        throw error;
    }

}


export async function emailAndPasswordExists(email, password) {
    try {
        const users = [];
        const userQuery = query(
            collection(db, "users"),
            where("email", "==", email),
            where("password", "==", password)
        );
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
            users.push(doc.data());

        });
        return users.length > 0 ? users : false;
    } catch (error) {
        console.error(`Error al consultar el email: ${error}`);
        throw new Error("Error al consultar el email");
    }
}

export async function Category() {
    try {
        const category = [];
        const userQuery = query(
            collection(db, "categories")
        );
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            category.push({
                id: doc.id,
                data: doc.data()
            });
        });
        return category;
    } catch (error) {
        console.error(`Error al consultar el campo: ${error}`);
        throw new Error("Error al consultar el campo");
    }
}











export async function registerNewUser(user) {
    try {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, user.uid);
        await setDoc(userDocRef, user);
    } catch (error) {
        console.error(`Error al registrar usuario ${user.uid}:`, error);
        throw error;
    }
}



export async function registerNewProduct(data) {

    try {
        const datasRef = collection(db, "products");
        const dataDocRef = doc(datasRef, data.id);
        await setDoc(dataDocRef, data);



    } catch (error) {
        console.error(`Error al registrar el producto ${data.id}:`, error);
        throw error;
    }
}

export async function getProducts() {
    try {
        const products = [];
        const productQuery = query(
            collection(db, "products")
        );
        const querySnapshot = await getDocs(productQuery);
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });
        return products;
    } catch (error) {
        console.error(`Error al consultar el email: ${error}`);
        throw new Error("Error al consultar el email");
    }


}


export async function getProduct(id) {
    try {


        const product = [];
        const productQuery = query(
            collection(db, "products"), where("id", "==", id),
        );
        const querySnapshot = await getDocs(productQuery);
        querySnapshot.forEach((doc) => {
            product.push(doc.data());

        });
        return product;
    } catch (error) {
        console.error(`Error al consultar el producto: ${error}`);
        throw new Error("Error al consultar el producto");
    }


}


export async function getProductIndex() {
    try {


        const product = [];
        const productQuery = query(
            collection(db, "products"),
        );
        const querySnapshot = await getDocs(productQuery);
        querySnapshot.forEach((doc) => {
            product.push(doc.data());

        });
        return product;
    } catch (error) {
        console.error(`Error al consultar el producto: ${error}`);
        throw new Error("Error al consultar el producto");
    }


}
export async function deleteProduct(id) {


    try {
        const refFolder = "gs://tienda-e-commerce-55251.appspot.com/imgproductos/ " + id;
        const folderRef = ref(storage, refFolder);
        const res = await listAll(folderRef);
        console.log(res);
        res.items.forEach(async (itemRef) => {
            await deleteObject(itemRef);
        });

        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);

        console.log("salio todo chido");
    } catch (error) {
        console.error(error);
    }
}





// export async function getProducts() {
//     try {
//         const products2 = [];
//         const q = query(collection(db, "products"));
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 products2.push(doc.data().name);
//             });

//             console.log(products2)
//             return products2;
//         });

//     } catch (error) {
//         console.error(`Error al consultar el email: ${error}`);
//         throw new Error("Error al consultar el email");
//     }
// }



// export async function registerToken(uid) {
//     try {
//         const usersRef = collection(db, "users");
//         const userDocRef = doc(usersRef, uid);
//         const userDocSnap = await getDoc(userDocRef);
//         if (userDocSnap.exists()) {
//             const userData = userDocSnap.data();
//             if (userData.tokenAccess) {
//                 localStorage.setItem("tokenAccess", userData.tokenAccess);
//             }
//         }
//     } catch (error) {
//         console.error(`Error al actualizar el token`, error);
//         throw error;
//     }
// }
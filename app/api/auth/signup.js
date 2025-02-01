import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default async function signup(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only Post request is allowed" });
  }
  const { name, email, password } = req.body;

  try {
    const userCrendentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCrendentials.user;

    //saving user data to firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
    });

    return res
      .status(200)
      .json({ message: "User created successfully", uid: user.uid });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error" });
  }
}

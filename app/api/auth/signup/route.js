import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getIdToken } from "firebase/auth";
import { cookies } from "next/headers";
import dayjs from "dayjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, randomAvatar } = body;
    //validating all the data
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    }
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
      createdAt: new Date(),
      avatarValue: randomAvatar,
    });

    // Get the Firebase ID token
    const token = await getIdToken(user);

    return new Response(
      JSON.stringify({ success: true, message: "User Signedup successful!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

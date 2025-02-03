import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getIdToken } from "firebase/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
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
    });

    // Get the Firebase ID token
    const token = await getIdToken(user);

    //setting cookies
    cookies().set("user", JSON.stringify({ name, email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 2,
      path: "/",
    });

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

import { auth, db } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const userCrendentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCrendentials.user;

    //Fetch user data from firestore
    const userDetail = await getDoc(doc(db, "users", user.uid));
    if (!userDetail.exists()) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found!" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const userData = userDetail.data();

    //setting cookies
    cookies().set(
      "user",
      JSON.stringify({ name: userData.name, email: userData.email }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 2,
        path: "/",
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "User logged in successful!",
        userDetail,
      }),
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

import { auth, db } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    //test1
    console.log("1. body is: ", body);
    const userCrendentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCrendentials.user;
    //test2
    console.log("2. user is, ", user);

    //Fetch user data from firestore
    const userDetail = await getDoc(doc(db, "users", user.uid));

    //test3
    console.log("3. user details from firestore: ", userDetail);

    if (!userDetail.exists()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "e1. User(userdetail doesn't exist) not found!",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const userData = userDetail.data();
    //test4
    console.log("4. got the userdata from userdetail: ", userData);

    //test5
    console.log("5. cookie been set!");

    return new Response(
      JSON.stringify({
        success: true,
        message: "6. User logged in successful!",
        userData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("e1. Signup Error:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getIdToken } from "firebase/auth";
import { cookies } from "next/headers";
import dayjs from "dayjs";

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

    //creating unique documentId
    const hr = dayjs().format("H");
    const min = dayjs().format("m");
    const sec = dayjs().format("s");
    const date = dayjs().format("DMMMYY");
    const nameIdd =
      name.length > 6
        ? name.slice(0, 7).replace(/\s/g, "")
        : name.replace(/\s/g, "");
    const tempId = `${nameIdd}${hr}hr${min}min${sec}sec${date}`;
    let documentId;
    if (tempId.length % 2) {
      documentId = tempId;
    } else {
      documentId = `A${tempId}`;
    }

    //saving user data to firestore
    await setDoc(doc(db, "users", documentId), {
      name: name,
      email: email,
      createdAt: new Date(),
      booking: [
        // {
        //   branch: null,
        //   date: null,
        //   slot: null,
        // },
      ],
    });

    // Get the Firebase ID token
    const token = await getIdToken(user);

    // //setting cookies
    // cookies().set("user", JSON.stringify({ name, email }), {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 2,
    //   path: "/",
    // });

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

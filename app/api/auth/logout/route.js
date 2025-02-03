import { auth, signOut } from "@/firebase/firebase";

export async function POST(req) {
  try {
    const response = signOut(auth);
    if (response.ok) {
      console.log("singout successfull!");
    }
    return new Response(console.log("Singout Successful!"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("error signinout: ", error);
  }
}

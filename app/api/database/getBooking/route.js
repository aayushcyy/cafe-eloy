import { db } from "@/firebase/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "missing email field!",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No document found in the server!",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userDoc = querySnapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data() };

    return new Response(
      JSON.stringify({
        success: true,
        message: "booking document found successful!",
        data: userData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error finding the doc:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "errro getting booking doc at the end msg",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

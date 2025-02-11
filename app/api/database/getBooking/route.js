import { auth, doc, getDoc, db } from "@/firebase/firebase";

export async function GET(req) {
  try {
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Error getting document at docSnap.exists()",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "booking document found successful!",
        data: docSnap.data(),
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

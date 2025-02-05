import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore"; // Ensure you are correctly importing Firestore methods

export async function POST(req) {
  try {
    const body = await req.json();
    const { documentId } = body;

    if (!documentId) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const docRef = doc(db, "availability", documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Response(
        JSON.stringify({ success: false, message: "Document not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Document exists!",
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
      JSON.stringify({ message: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

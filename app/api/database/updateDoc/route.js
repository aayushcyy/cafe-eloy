import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { slot, newVal, documentId } = body;

    if (!slot || !documentId || !newVal) {
      return new Response(
        JSON.stringify({
          message: "Missing fields",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    //getting documents refference
    const docRef = doc(db, "availability", documentId);

    //updating doc
    await updateDoc(docRef, {
      [`slots.${slot}`]: newVal,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Document Updated successful!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating the doc!", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal Server error!" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

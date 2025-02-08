import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { newVal, documentId } = body;

    if (!documentId || !newVal) {
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
    //1. getting documents refference for availability doc
    const docRef = doc(db, "availability", documentId);

    //2. updating availability doc
    await updateDoc(docRef, {
      [`slots.${newVal.bookingDetail.slot}`]: newVal.available,
    });

    //1. getting documents refference for users doc
    ///yahase

    //updating users doc

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

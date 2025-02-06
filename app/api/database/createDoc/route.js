import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { dateValue, locationValue, documentId } = body;
    if (!dateValue || !locationValue || !documentId) {
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

    //first document is being created
    const docRef = doc(db, "availability", documentId);
    //getting time and location
    const bookingBranch = documentId.includes("samta")
      ? "Samta Colony, Raipur"
      : "Jagganath Chowk, Kota, Raipur";
    const bookingDate = documentId.split("-");

    //then in the created document data is being added
    await setDoc(docRef, {
      branch: bookingBranch,
      date: bookingDate[1],
      slots: {
        "10AM - 11AM": true,
        "11AM - 12PM": true,
        "12PM - 1PM": true,
        "1PM - 2PM": true,
        "2PM - 3PM": true,
        "3PM - 4PM": true,
        "4PM - 5PM": true,
        "5PM - 6PM": true,
        "6PM - 7PM": true,
        "7PM - 8PM": true,
        "8PM - 9PM": true,
        "9PM - 10PM": true,
      },
    });

    const docSnap = await getDoc(docRef);

    //checking if docSnap is exisiting or not ?
    if (docSnap.exists()) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Document created successful!",
          data: docSnap.data(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.error("Document not found after being created!");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Error retrieving the document after creation",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error creating doc:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

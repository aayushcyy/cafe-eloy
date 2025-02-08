import { db } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  setDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";

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

    //AVAILABILITY COLLECTION
    //1. getting documents refference for availability doc
    const docRef = doc(db, "availability", documentId);

    //2. updating availability doc
    await updateDoc(docRef, {
      [`slots.${newVal.bookingDetail.slot}`]: newVal.available,
    });

    //USERS COLLECTION
    //1. getting documents refference for users doc
    const q = query(
      collection(db, "users"),
      where("email", "==", newVal.email)
    );
    const querySnapshot = await getDocs(q);
    //2. updating users doc
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await updateDoc(doc.ref, { bookings: arrayUnion(newVal.bookingDetail) });
      console.log("user doc updated successful!");
    } else if (querySnapshot.size === 0) {
      console.log("No document found matching the criteria.");
    } else {
      console.log(
        "Multiple documents found matching the criteria. Update logic needs to be adjusted."
      );
    }

    //BOOKINGS COLLECTION
    await setDoc(doc(db, "bookings", newVal.bookingsDocId), {
      name: newVal.name,
      email: newVal.email,
      bookingId: newVal.bookingDetail.bookingId,
      branch: newVal.bookingDetail.branch.includes("samta")
        ? "Samta Colony, Raipur"
        : "Kota Chowk, Raipur",
      date: newVal.bookingDetail.date,
      slot: newVal.bookingDetail.slot,
      bookedOn: newVal.bookedOn,
      amountPaid: newVal.bookingDetail.amountPaid,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Availabiliy and Users document Updated successful!",
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

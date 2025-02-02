import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getUser(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Only Get method is allowed" });
  }

  const { uid } = req.query;

  try {
    const user = await getDoc(doc(db, "users", uid));
    if (user.exists()) {
      return res.status(200).json({ user: user.data() });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(400).json({ message: "Internal server error" });
  }
}

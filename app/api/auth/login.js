import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function login(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only Post request is allowed" });
  }

  const { email, password } = req.body;

  try {
    const userCrendentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCrendentials.user;

    return res
      .status(200)
      .json({ message: "User Logged in succesfully", uid: user.uid });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(400).json({ message: "Internal server error" });
  }
}

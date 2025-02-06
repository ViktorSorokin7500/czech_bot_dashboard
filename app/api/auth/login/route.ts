import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();
  const admin = { login: "admin", password: "1111" };

  if (login === admin.login && password === admin.password) {
    console.log("first");
    const token = jwt.sign({ login }, process.env.JWT_SECRET ?? "", {
      expiresIn: "1h",
    });
    return new Response(JSON.stringify({ token }), { status: 200 });
  }
  return new Response("Invalid credentials", { status: 401 });
}

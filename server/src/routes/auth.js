const router = require("express").Router();
const prisma = require("../prisma");
const crypto = require("crypto");
const admin = require("firebase-admin");

const hash = (pw) => crypto.createHash("sha256").update(pw).digest("hex");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hash(password) },
      select: { id: true, name: true, email: true, role: true },
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: "Email already in use" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password)
    return res.status(401).json({ error: "Please sign in with Google" });
  if (user.password !== hash(password))
    return res.status(401).json({ error: "Invalid credentials" });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

router.post("/google", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { name, email, uid } = decoded;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { name: name || email, email, password: uid },
      });
    }
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

module.exports = router;

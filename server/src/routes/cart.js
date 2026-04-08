const router = require("express").Router();
const prisma = require("../prisma");

router.get("/:userId", async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: +req.params.userId },
    include: { product: true },
  });
  res.json(items);
});

router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const item = await prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: { quantity },
    create: { userId, productId, quantity },
    include: { product: true },
  });
  res.json(item);
});

router.delete("/user/:userId", async (req, res) => {
  await prisma.cartItem.deleteMany({ where: { userId: +req.params.userId } });
  res.json({ message: "Cart cleared" });
});

router.delete("/:id", async (req, res) => {
  await prisma.cartItem.delete({ where: { id: +req.params.id } });
  res.json({ message: "Removed" });
});

module.exports = router;

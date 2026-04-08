const router = require("express").Router();
const prisma = require("../prisma");

router.get("/:userId", async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: +req.params.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

router.post("/", async (req, res) => {
  const { userId, totalAmount, address, items } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        address,
        items: { create: items },
      },
      include: { items: true },
    });
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  const order = await prisma.order.update({
    where: { id: +req.params.id },
    data: { status: req.body.status },
  });
  res.json(order);
});

module.exports = router;

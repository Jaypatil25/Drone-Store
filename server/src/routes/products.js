const router = require("express").Router();
const prisma = require("../prisma");

// GET all products (with optional filters)
router.get("/", async (req, res) => {
  const { category, purpose, experience } = req.query;
  const where = {};
  if (category) where.category = category;
  if (purpose) where.purpose = purpose;
  if (experience) where.experience = experience;
  const products = await prisma.product.findMany({ where });
  res.json(products);
});

// GET single product
router.get("/:id", async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: +req.params.id } });
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.json(product);
  } catch (e) {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: +req.params.id } });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(404).json({ error: "Not found" });
  }
});

module.exports = router;

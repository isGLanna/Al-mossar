import { Router } from 'express'

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Lista de usuários" });
})

router.get("/:id", (req, res) =>{
  res.json({ message: `Detalhes do usuário ${req.params.id}`});
});

export default router;
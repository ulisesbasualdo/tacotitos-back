import express, { Request, Response } from "express";
import cors from "cors";
import { TacoView } from "./views/taco-view";
import { FillingView } from "./views/filling-view";
import { SauceVIew } from "./views/sauce-view";
import { TortillaView } from "./views/tortilla-view";
import { asyncHandler } from "./utils/async-handler";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const tacoView = new TacoView();
const fillingView = new FillingView();
const sauceVIew = new SauceVIew();
const tortillaView = new TortillaView();

//#region Tortillas
app.get(
  "/tacos/tortillas",
  asyncHandler(async (req: Request, res: Response) => {
    const tortillas = await tortillaView.get();
    res.json(tortillas);
  })
);

app.post(
  "/tacos/tortillas",
  asyncHandler(async (req: Request, res: Response) => {
    const tortillaCreada = await tortillaView.add(req.body);
    res.status(201).json(tortillaCreada);
  })
);

app.put(
  "/tacos/tortillas/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const tortillaActualizada = await tortillaView.update(
      id,
      req.body
    );
    res.json(tortillaActualizada);
  })
);

app.delete(
  "/tacos/tortillas/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    await tortillaView.delete(id);
    res.status(204).send();
  })
);

//#region Fillings (Rellenos)
app.get(
  "/tacos/fillings",
  asyncHandler(async (req: Request, res: Response) => {
    const fillings = await fillingView.get();
    res.json(fillings);
  })
);

app.post(
  "/tacos/fillings",
  asyncHandler(async (req: Request, res: Response) => {
    const fillingCreado = await fillingView.add(req.body);
    res.status(201).json(fillingCreado);
  })
);

app.put(
  "/tacos/fillings/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const fillingActualizado = await fillingView.update(id, req.body);
    res.json(fillingActualizado);
  })
);

app.delete(
  "/tacos/fillings/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    await fillingView.delete(id);
    res.status(204).send();
  })
);

//#region Sauces (Salsas)
app.get(
  "/tacos/sauces",
  asyncHandler(async (req: Request, res: Response) => {
    const sauces = await sauceVIew.get();
    res.json(sauces);
  })
);

app.post(
  "/tacos/sauces",
  asyncHandler(async (req: Request, res: Response) => {
    const sauceCreada = await sauceVIew.add(req.body);
    res.status(201).json(sauceCreada);
  })
);

app.put(
  "/tacos/sauces/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const sauceActualizada = await sauceVIew.update(id, req.body);
    res.json(sauceActualizada);
    console.info("Salsa actualizada:", sauceActualizada);
  })
);

app.delete(
  "/tacos/sauces/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    await sauceVIew.delete(id);
    res.status(204).send();
    console.info("Salsa eliminada con ID:", id);
  })
);

//#region Estadísticas
app.get(
  "/tacos/stats/cheapest",
  asyncHandler(async (req: Request, res: Response) => {
    const taco = await tacoView.getCheapestTaco();
    if (!taco) {
      res.status(404).json({ error: "No se encontró el taco más económico" });
      return;
    }
    res.json(taco);
  })
);

app.get(
  "/tacos/stats/most-expensive",
  asyncHandler(async (req: Request, res: Response) => {
    const taco = await tacoView.getMostExpensiveTaco();
    if (!taco) {
      res.status(404).json({ error: "No se encontró el taco más costoso" });
      return;
    }
    res.json(taco);
  })
);

app.get(
  "/tacos/stats/average-price",
  asyncHandler(async (req: Request, res: Response) => {
    const promedio = await tacoView.getAverageTacoPrice();
    res.json({ averagePrice: promedio });
  })
);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(
    `*************************\n**** TACOTITOS START ****\n*************************`
  );
});

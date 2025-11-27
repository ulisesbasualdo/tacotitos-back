import express, { Request, Response } from "express";
import cors from "cors";
import { TacoView } from "./views/TacoView";
import { IngredientView } from "./views/AlimentoView";
import { TacoContentView } from "./views/TacoContentView";
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
const ingredientView = new IngredientView();
const tacoContentView = new TacoContentView();

//#region Tortillas
app.get(
  "/tacos/tortillas",
  asyncHandler(async (req: Request, res: Response) => {
    const tortillas = await tacoContentView.listTortillas();
    res.json(tortillas);
  })
);

app.post(
  "/tacos/tortillas",
  asyncHandler(async (req: Request, res: Response) => {
    const tortillaCreada = await tacoContentView.addTortilla(req.body);
    res.status(201).json(tortillaCreada);
  })
);

app.put(
  "/tacos/tortillas/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const tortillaActualizada = await tacoContentView.updateTortilla(
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
    await tacoContentView.deleteTortilla(id);
    res.status(204).send();
  })
);

//#region Fillings (Rellenos)
app.get(
  "/tacos/fillings",
  asyncHandler(async (req: Request, res: Response) => {
    const fillings = await ingredientView.getFillings();
    res.json(fillings);
  })
);

app.post(
  "/tacos/fillings",
  asyncHandler(async (req: Request, res: Response) => {
    const fillingCreado = await ingredientView.addFilling(req.body);
    res.status(201).json(fillingCreado);
  })
);

app.put(
  "/tacos/fillings/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const fillingActualizado = await ingredientView.updateFilling(id, req.body);
    res.json(fillingActualizado);
  })
);

app.delete(
  "/tacos/fillings/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    await ingredientView.deleteFilling(id);
    res.status(204).send();
  })
);

//#region Sauces (Salsas)
app.get(
  "/tacos/sauces",
  asyncHandler(async (req: Request, res: Response) => {
    const sauces = await ingredientView.getSauces();
    res.json(sauces);
  })
);

app.post(
  "/tacos/sauces",
  asyncHandler(async (req: Request, res: Response) => {
    const sauceCreada = await ingredientView.addSauce(req.body);
    res.status(201).json(sauceCreada);
  })
);

app.put(
  "/tacos/sauces/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const sauceActualizada = await ingredientView.updateSauce(id, req.body);
    res.json(sauceActualizada);
    console.info("Salsa actualizada:", sauceActualizada);
  })
);

app.delete(
  "/tacos/sauces/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    await ingredientView.deleteSauce(id);
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

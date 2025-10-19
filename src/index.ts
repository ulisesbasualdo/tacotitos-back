import express, { Request, Response } from 'express';
import cors from 'cors';
import { TacoView } from './views/TacoView';
import { IngredientView } from './views/AlimentoView';
import { TacoContentView } from './views/TacoContentView';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const tacoView = new TacoView();
const ingredientView = new IngredientView();
const tacoContentView = new TacoContentView();

//#region Tortillas
app.get('/tacos/tortillas', async (req: Request, res: Response) => {
  try {
    const tortillas = await tacoContentView.listTortillas();
    res.json(tortillas);
  } catch (error) {
    console.error('Error en GET /tacos/tortillas:', error);
    res.status(500).json({ error: 'Error al obtener tortillas' });
  }
});

app.post('/tacos/tortillas', async (req: Request, res: Response) => {
  try {
    const tortillaCreada = await tacoContentView.addTortilla(req.body);
    res.status(201).json(tortillaCreada);
    console.info('Tortilla creada', { tortillaCreada });
  } catch (error) {
    console.error('Error en POST /tacos/tortillas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/tacos/tortillas/:id', async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const tortillaActualizada = await tacoContentView.updateTortilla(id, req.body);
    res.json(tortillaActualizada);
    console.info('Tortilla actualizada:', { id, ...tortillaActualizada });
  } catch (error) {
    console.error('Error en PUT /tacos/tortillas/:id:', error);
    res.status(500).json({ error: 'Error al actualizar tortilla' });
  }
});

app.delete('/tacos/tortillas/:id', async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    await tacoContentView.deleteTortilla(id);
    res.status(204).send();
    console.info('Tortilla eliminada con ID:', id);
  } catch (error) {
    console.error('Error en DELETE /tacos/tortillas/:id:', error);
    res.status(500).json({ error: 'Error al eliminar tortilla' });
  }
});

//#region Fillings (Rellenos)
app.get('/tacos/fillings', async (req: Request, res: Response) => {
  try {
    const fillings = await ingredientView.getFillings();
    res.json(fillings);
  } catch (error) {
    console.error('Error en GET /tacos/fillings:', error);
    res.status(500).json({ error: 'Error al obtener rellenos' });
  }
});

app.post('/tacos/fillings', async (req: Request, res: Response) => {
  try {
    const fillingCreado = await ingredientView.addFilling(req.body);
    res.status(201).json(fillingCreado);
    console.info('Relleno creado', { fillingCreado });
  } catch (error) {
    console.error('Error en POST /tacos/fillings:', error);
    res.status(500).json({ error: 'Error al crear relleno' });
  }
});

app.put('/tacos/fillings/:id', async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const fillingActualizado = await ingredientView.updateFilling(id, req.body);
    res.json(fillingActualizado);
    console.info('Relleno actualizado:', { id, ...fillingActualizado });
  } catch (error) {
    console.error('Error en PUT /tacos/fillings/:id:', error);
    res.status(500).json({ error: 'Error al actualizar relleno' });
  }
});

app.delete('/tacos/fillings/:id', async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    await ingredientView.deleteFilling(id);
    res.status(204).send();
    console.info('Relleno eliminado con ID:', id);
  } catch (error) {
    console.error('Error en DELETE /tacos/fillings/:id:', error);
    res.status(500).json({ error: 'Error al eliminar relleno' });
  }
});

//#region Sauces (Salsas)
app.get('/tacos/sauces', async (req: Request, res: Response) => {
  try {
    const sauces = await ingredientView.getSauces();
    res.json(sauces);
  } catch (error) {
    console.error('Error en GET /tacos/sauces:', error);
    res.status(500).json({ error: 'Error al obtener salsas' });
  }
});

app.post('/tacos/sauces', async (req: Request, res: Response) => {
  try {
    const sauceCreada = await ingredientView.addSauce(req.body);
    res.status(201).json(sauceCreada);
    console.info('Salsa creada', { sauceCreada });
  } catch (error) {
    console.error('Error en POST /tacos/sauces:', error);
    res.status(500).json({ error: 'Error al crear salsa' });
  }
});

app.put('/tacos/sauces/:id', async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const sauceActualizada = await ingredientView.updateSauce(id, req.body);
    res.json(sauceActualizada);
    console.info('Salsa actualizada:', { id, ...sauceActualizada });
  } catch (error) {
    console.error('Error en PUT /tacos/sauces/:id:', error);
    res.status(500).json({ error: 'Error al actualizar salsa' });
  }
});

app.delete('/tacos/sauces/:id', async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    await ingredientView.deleteSauce(id);
    res.status(204).send();
    console.info('Salsa eliminada con ID:', id);
  } catch (error) {
    console.error('Error en DELETE /tacos/sauces/:id:', error);
    res.status(500).json({ error: 'Error al eliminar salsa' });
  }
});

//#region Estadísticas
app.get('/tacos/stats/cheapest', async (req: Request, res: Response): Promise<void> => {
  try {
    const taco = await tacoView.getCheapestTaco();
    if (!taco) {
      res.status(404).json({ error: 'No se encontró el taco más económico' });
      return;
    }
    res.json(taco);
  } catch (error) {
    console.error('Error en GET /tacos/stats/cheapest:', error);
    res.status(500).json({ error: 'Error al obtener taco más económico: ' + error });
  }
});

app.get('/tacos/stats/most-expensive', async (req: Request, res: Response): Promise<void> => {
  try {
    const taco = await tacoView.getMostExpensiveTaco();
    if (!taco) {
      res.status(404).json({ error: 'No se encontró el taco más costoso' });
      return;
    }
    res.json(taco);
  } catch (error) {
    console.error('Error en GET /tacos/stats/most-expensive:', error);
    res.status(500).json({ error: 'Error al obtener taco más costoso: ' + error });
  }
});

app.get('/tacos/stats/average-price', async (req: Request, res: Response): Promise<void> => {
  try {
    const promedio = await tacoView.getAverageTacoPrice();
    res.json({ averagePrice: promedio });
  } catch (error) {
    console.error('Error en GET /tacos/stats/average-price:', error);
    res.status(500).json({ error: 'Error al obtener valor promedio: ' + error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`*************************\n**** TACOTITOS START ****\n*************************`)
});

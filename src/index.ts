import express, { Request, Response } from 'express';
import cors from 'cors'; // Agregar esta importación
import { TacoView } from './views/TacoView';
import { ITaco } from './interfaces/i-taco';
import { TacoController } from './controllers/TacoController';
import { TacoContentController } from './controllers/TacoContentController';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const tacoView = new TacoView();

app.get('/', (req: Request, res: Response) => {
  res.send('Hola mundo desde Express con TypeScript!');
});

app.get('/tacos', async (req: Request, res: Response) => {
  try {
    const tacos = await tacoView.mostrarTacos();
    res.json(tacos);
  } catch (error) {
    console.error('Error en GET /tacos:', error);
    res.status(500).json({ error: 'Error al obtener tacos' });
  }
});
app.post('/tacos', async (req: Request, res: Response) => {
  try {
    const taco: ITaco = req.body;

    const tacoCreado = await tacoView.agregarTaco(taco);
    res.status(201).json(tacoCreado);
  } catch (error) {
    console.error('Error en POST /tacos:', error);
    res.status(500).json({ error: 'Error al crear taco' });
  }
});

//obtener tortillas
app.get('/tacos/tortillas', async (req: Request, res: Response) => {
  try {
    const tortillas = await tacoView.getTortillas();
    res.json(tortillas);
  } catch (error) {
    console.error('Error en GET /tacos/tortillas:', error);
    res.status(500).json({ error: 'Error al obtener tortillas' });
  }
});

app.post('/tacos/tortillas', async (req: Request, res: Response) => {
  try {
    const tortillaCreada = await TacoContentController.crearTortilla(req.body);
    res.status(201).json(tortillaCreada);
  } catch (error) {
    console.error('Error en POST /tacos/tortillas:', error);
    res.status(500).json({ error: 'Error al crear tortilla' });
  }
});

app.get('/tacos/stats/cheapest', async (req: Request, res: Response) => {
  try {
    const taco = await tacoView.mostrarTacoMasEconomico();
    if (!taco) {
      res.status(404).json({ error: 'No se encontró el taco más económico' });
    }
    res.json(taco);
  } catch (error) {
    console.error('Error en GET /tacos/stats/cheapest:', error);
    res.status(500).json({ error: 'Error al obtener taco más económico, error: ' + error });
  }
});

app.get('/tacos/stats/most-expensive', async (req: Request, res: Response) => {
  try {
    const taco = await tacoView.mostrarTacoMasCostoso();
    res.json(taco);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener taco más costoso, error: ' + error });
  }
});

app.get('/tacos/stats/average-price', async (req: Request, res: Response) => {
  try {
    const promedio = await tacoView.mostrarValorPromedioDeUnTaco();
    res.json(promedio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener valor promedio, error: ' + error });
  }
});



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`hola`)
});

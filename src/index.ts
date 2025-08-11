import express, { Request, Response } from 'express';
import cors from 'cors';
import { TacoView } from './views/TacoView';
import { AlimentoView } from './views/AlimentoView';
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
const alimentoView= new AlimentoView();
const tacoContentView = new TacoContentView();

//#region Tortillas
app.get('/tacos/tortillas', async (req: Request, res: Response) => {
  try {
    const tortillas = await tacoContentView.getTiposTortilla();
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
    console.info('tortilla Creada', {tortillaCreada})
  } catch (error) {
    console.error('Error en POST /tacos/tortillas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/tacos/tortillas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tortillaActualizada = await tacoContentView.updateTortilla(id, req.body);
    res.json(tortillaActualizada);
    console.info('Tortilla actualizada datos nuevos: ', { id, ...tortillaActualizada });
  } catch (error) {
    console.error('Error en PUT /tacos/tortillas/:id:', error);
    res.status(500).json({ error: 'Error al actualizar tortilla' });
  }
});

app.delete('/tacos/tortillas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await tacoContentView.deleteTortilla(id);
    res.status(204).send();
    console.info('Tortilla eliminada con ID:', id);
  } catch (error) {
    console.error('Error en DELETE /tacos/tortillas/:id:', error);
    res.status(500).json({ error: 'Error al eliminar tortilla' });
  }
});

//#region Alimentos
app.get('/tacos/alimentos', async (req: Request, res: Response) => {
  try {
    const alimentos = await alimentoView.getAlimentosTortilla();
    res.json(alimentos);
  } catch (error) {
    console.error('Error en GET /tacos/alimentos:', error);
    res.status(500).json({ error: 'Error al obtener alimentos' });
  }
});

app.post('/tacos/alimentos', async (req: Request, res: Response) => {
  try {
    const alimentoCreado = await alimentoView.addAlimento(req.body);
    res.status(201).json(alimentoCreado);
    console.info('Alimento creado', { alimentoCreado });
  } catch (error) {
    console.error('Error en POST /tacos/alimentos:', error);
    res.status(500).json({ error: 'Error al crear alimento' });
  }
});

app.put('/tacos/alimentos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const alimentoActualizado = await alimentoView.updateAlimento(id, req.body);
    res.json(alimentoActualizado);
    console.info('Alimento actualizado datos nuevos: ', { id, ...alimentoActualizado });
  } catch (error) {
    console.error('Error en PUT /tacos/alimentos/:id:', error);
    res.status(500).json({ error: 'Error al actualizar alimento' });
  }
});

app.delete('/tacos/alimentos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await alimentoView.deleteAlimento(id);
    res.status(204).send();
    console.info('Alimento eliminado con ID:', id);
  } catch (error) {
    console.error('Error en DELETE /tacos/alimentos/:id:', error);
    res.status(500).json({ error: 'Error al eliminar alimento' });
  }
});

//#region Salsas
app.get('/tacos/salsas', async (req: Request, res: Response) => {
  try {
    
    const salsas = await alimentoView.getSalsas();
    res.json(salsas);
  } catch (error) {
    console.error('Error en GET /tacos/salsas:', error);
    res.status(500).json({ error: 'Error al obtener salsas' });
  }
});

app.post('/tacos/salsas', async (req: Request, res: Response) => {
  try {
    const salsaData = { ...req.body, tipoAlimento: 'salsa' };
    const salsaCreada = await alimentoView.addAlimento(salsaData);
    res.status(201).json(salsaCreada);
    console.info('Salsa creada', { salsaCreada });
  } catch (error) {
    console.error('Error en POST /tacos/salsas:', error);
    res.status(500).json({ error: 'Error al crear salsa' });
  }
});

app.put('/tacos/salsas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salsaData = { ...req.body, tipoAlimento: 'salsa' };
    const salsaActualizada = await alimentoView.updateAlimento(id, salsaData);
    res.json(salsaActualizada);
    console.info('Salsa actualizada datos nuevos: ', { id, ...salsaActualizada });
  } catch (error) {
    console.error('Error en PUT /tacos/salsas/:id:', error);
    res.status(500).json({ error: 'Error al actualizar salsa' });
  }
});

app.delete('/tacos/salsas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await alimentoView.deleteAlimento(id);
    res.status(204).send();
    console.info('Salsa eliminada con ID:', id);
  } catch (error) {
    console.error('Error en DELETE /tacos/salsas/:id:', error);
    res.status(500).json({ error: 'Error al eliminar salsa' });
  }
});

//#region Estadísticas
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
  console.log(`*************************\n**** TACOTITOS START ****\n*************************`)
});

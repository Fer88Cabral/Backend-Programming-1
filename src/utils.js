
import { fileURLToPath } from 'url';
import { dirname } from 'path'; // Importa 'dirname' desde 'path', no '__dirname'

// Obtiene el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Calcula el directorio de este archivo
const __dirname = dirname(__filename);

export default __dirname;

//Lo usamos para configurar las rutas de las vistas y los archivos estáticos.
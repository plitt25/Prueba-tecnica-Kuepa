
Guía de Configuración del Proyecto

1. Configuración del Backend

Paso 1: Instalar dependencias necesarias
Primero, instala las dependencias básicas de tu backend:

npm install express bcrypt cors dotenv jsonwebtoken sequelize mysql2

Paso 2: Instalar dependencias de desarrollo
Luego, instala las herramientas necesarias para el desarrollo:

npm install typescript --save-dev
npm install nodemon --save-dev

Paso 3: Inicializar configuración de TypeScript
Inicia la configuración de TypeScript en tu proyecto:

npx tsc --init

Paso 4: Configurar salida en JavaScript
En el archivo tsconfig.json, habilita la salida de los archivos compilados en JavaScript en la carpeta dist:

"outDir": "./dist"

Paso 5: Compilar TypeScript a JavaScript
Genera los archivos JavaScript desde TypeScript:

npx tsc

Paso 6: Ejecutar el servidor
Para ejecutar el servidor después de compilar:

node dist/server.js

Paso 7: Ejecutar el servidor con nodemon
Para ejecutar el servidor en modo desarrollo y que se recargue automáticamente al hacer cambios, usa nodemon:

npx nodemon dist/index.js

Paso 8: Compilación en tiempo real con TypeScript
Si prefieres que los archivos se generen automáticamente cada vez que hagas cambios, ejecuta:

npx tsc --watch

Paso 9: Instalar dependencias extras para Express
Instala las dependencias necesarias para el uso de express en TypeScript:

npm install @types/express --save-dev

Paso 10: Instalación de dependencias para encriptación y CORS
Para poder encriptar contraseñas y habilitar CORS, instala los siguientes paquetes:

npm install --save-dev @types/bcrypt
npm install --save-dev @types/cors

2. Configuración del Frontend (Angular)

Paso 1: Instalar dependencias de Angular
Instala la librería para mostrar notificaciones ngx-toastr:

npm install ngx-toastr@16.0.1 --save

Instala la dependencia para animaciones en Angular:

npm install @angular/animations --save

Paso 2: Crear un guard en Angular
Genera un guard para manejar rutas protegidas o controles de acceso (ejemplo: CanDeactivate):

ng g guard utils/auth --guardType CanDeactivate --functional

Paso 3: Verificar la instalación de dependencias
Una vez instaladas todas las dependencias necesarias, asegúrate de que todo esté correctamente instalado ejecutando:

npm install

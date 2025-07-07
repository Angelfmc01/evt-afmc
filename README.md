- **IDE Utilizado:** Visual Studio Code (1.101.2)

- **Versión de lenguaje:**
    ## Backend: 
        JavaScript: ES2023
    ## Frontend: 
        TypeScript: 5.8.3

- **DBMS:**  MySQL 8.0.35
   
- **Pasos para correr la aplicación:**
    1. Clonar el repositorio: 'https://github.com/Angelfmc01/evt-afmc.git'

    2. Instalar dependencias:
        - cd backend && npm install 
        - cd ../frontend && npm install

    3. Configurar variables de entorno:
        - Crear ".env" en la raiz de backend 
            DB_DATABASE=
            DB_USER =
            DB_PASSWORD=
            DB_HOST=localhost
            DB_PORT=3306
            JWT_SECRET= 

    4. Iniciar servicios 
        #Iniciar backend: cd backend && npm run dev
        #Iniciar frontend: cd ../frontend && npm run dev
        
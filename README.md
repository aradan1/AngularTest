# Ejemplo de aplicacion con Typescript, Express y Angular

Hay que hacer ```"npm i"``` en directorio root y en directorio "client".

Para ejecutar el server: ```"npm run server"```
Para ejecutar el cliente: ```"npm run client"```


<br />


(No he implementado "concurrently" por no complicar las dependencias de quien lo ejecute)

En caso de añadirlo y ejecutar en un solo comando usar:

  ```"start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""```
  
Uso un archivo json como base de datos.

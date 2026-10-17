# Viriato Méteo

Viento, sol y lluvia a lo largo de un recorrido, a la hora a la que pasarás por cada punto.

**Web:** https://viriatoterra.github.io/viriato-meteo/

- Carga un GPX, elige fecha, hora de salida y ritmo o tiempo previsto.
- Mapa 3D con viento animado, sol, nubes y lluvia según la previsión de [Open-Meteo](https://open-meteo.com).
- "Compartir" crea un enlace que lleva la ruta dentro: quien lo abra ve la previsión actualizada en su móvil.
- Se instala en el móvil ("Añadir a pantalla de inicio") y, con "Guardar para usar sin cobertura", funciona sin conexión: mapa de la zona, ruta y última previsión.
- "Dónde estoy" usa el GPS del móvil (no necesita cobertura) para situarte en la ruta y decirte los km y la subida que quedan y la hora de llegada.

Mapas: OpenFreeMap / OpenStreetMap, Esri World Imagery, OpenTopoMap. Relieve: Mapzen Terrain Tiles.

## Rutas publicadas

Cada ruta es una ficha en `rutas/<id>.json` (GPX, fecha, hora, tiempo previsto, mapa, material y logos) y se abre con `#ruta=<id>`:

- [Ruta 12 · Castañar en apogeo](https://viriatoterra.github.io/viriato-meteo/#ruta=ruta-12-castanar) — Ayuntamiento de Pepino y Viriato Terra

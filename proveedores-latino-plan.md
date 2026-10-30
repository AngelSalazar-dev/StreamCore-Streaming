# Plan: Agregar proveedores de streaming en español latino

## Problema
Actualmente, la aplicación solo incluye reproductores en inglés (como VidLink, VidSrc, etc.), por lo que las películas y series no ofrecen por defecto opciones orientadas a contenido en español latino.

## Enfoque Propuesto
1. Modificar `src/utils/players.ts` para agregar nuevas opciones de proveedores populares orientados a contenido en español latino tanto para películas como para series (por ejemplo, adaptaciones de streaming latino como PelisPlus, Cuevana, etc. o reproductores compatibles).
2. Actualizar las funciones `getMoviePlayers` y `getTvShowPlayers` para incluir estos nuevos proveedores en el listado devuelto.
3. Validar el correcto funcionamiento de los cambios.

## Tareas
- [ ] Actualizar `src/utils/players.ts` con los nuevos proveedores en español latino.
- [ ] Verificar la compilación y los cambios realizados.

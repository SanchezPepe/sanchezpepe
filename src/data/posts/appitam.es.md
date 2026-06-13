# AppITAM: Herramientas Estudiantiles en Tiempo Real

> Cada estudiante del ITAM hacía la misma pregunta a las 7:58 AM: "¿Todavía viene el camión?"

AppITAM es una aplicación web que construí para estudiantes del Instituto Tecnológico Autónomo de México (ITAM). Permite planear horarios de materias y rastrear el camión del campus en tiempo real.

## El Problema

El campus del ITAM está conectado a varias colonias por un servicio de camión gratuito. El camión corre en horario, pero ese horario solo estaba disponible como PDF en una página de intranet que cargaba lento. Los estudiantes refrescaban un grupo de WhatsApp esperando que alguien publicara una actualización.

Para la planeación de horarios, el sistema oficial era funcional pero frustrante — sin vista visual, sin detección de choques, sin forma de compartir tu horario con amigos.

Ambos problemas tenían la misma causa: la información existía pero no era accesible.

## El Stack

**Vue.js + Vuetify** tiene sentido para una herramienta universitaria con muchos datos. Los componentes de tabla, selector de horario y diálogos de Vuetify manejaron el trabajo pesado de la UI. El lenguaje de Material Design también resultaba familiar para los estudiantes que ya usan productos de Google.

**Firebase** manejó el rastreo del camión en tiempo real. Cada parada tiene un sensor GPS que escribe su ubicación a Firestore. La app se suscribe a esos datos y renderiza la posición actual en un mapa con un listener `onSnapshot`:

```js
onSnapshot(doc(db, 'shuttle', 'current'), (snapshot) => {
  const { lat, lng, nextStop, eta } = snapshot.data()
  updateMapMarker(lat, lng)
  showETA(nextStop, eta)
})
```

La latencia de actualización es menor a un segundo.

## Constructor de Horarios

La funcionalidad de planeación fue más compleja de lo que parece. El desafío principal: detectar choques entre materias que comparten franjas horarias, incluyendo laboratorios que se alternan por semanas.

El algoritmo corre en cada cambio a las materias seleccionadas:

1. Expandir cada materia en sus bloques de tiempo individuales (día + inicio + fin)
2. Para cada par de bloques, verificar si sus intervalos se traslapan
3. Si se traslapan, marcar ambas materias como conflictivas y bloquear la acción de "Agregar"

El horario se guarda en Firestore para que persista entre dispositivos. El link para compartir codifica la selección de materias como un string seguro para URL.

## CI/CD con GitHub Actions

Cada push a `main` dispara:

1. Linting (`eslint`)
2. Pruebas unitarias (`vitest`)
3. Build (`vite build`)
4. Despliegue a Firebase Hosting

Todo el pipeline corre en menos de dos minutos, lo que significó que podíamos publicar correcciones para problemas del camión o bugs de horarios en minutos después de un reporte.

## Uso

El rastreador del camión fue el caso de uso dominante — los estudiantes abrían la app en una parada y la dejaban abierta hasta que llegaba. La funcionalidad más pedida fueron notificaciones push para retrasos. Nunca la publicamos; la ubicación en tiempo real en el mapa resultó ser suficiente.

## Lo que Haría Diferente

**Construir para móvil primero.** La mayor parte del uso ocurría en teléfonos en las paradas. Diseñamos para escritorio y adaptamos el layout móvil después — se nota.

**Extraer la lógica en tiempo real antes.** El código de `onSnapshot` de Firestore estaba copiado en tres componentes antes de extraerlo a un composable.

**Escribir las pruebas antes de publicar el algoritmo de conflictos.** Algunos casos edge en la lógica de traslape de horarios solo aparecieron porque un estudiante los encontró en producción.

---

AppITAM está en línea en [appitam.org](https://appitam.org). Si eres estudiante del ITAM, es gratis.

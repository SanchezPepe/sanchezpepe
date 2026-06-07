# Construyendo AppITAM: Herramientas Estudiantiles en Tiempo Real

> Cada estudiante del ITAM hacía la misma pregunta a las 7:58 AM: "¿Todavía viene el camión?"

AppITAM es una aplicación web que construí para estudiantes del Instituto Tecnológico Autónomo de México (ITAM). Permite planear horarios de materias y rastrear el camión del campus en tiempo real. Lo que empezó como un proyecto de fin de semana terminó siendo algo que miles de estudiantes usan diario.

## El Problema

El campus del ITAM está conectado a varias colonias por un servicio de camión gratuito. El camión corre en un horario, pero ese horario solo estaba disponible como un PDF en una página de intranet que cargaba lento. Los estudiantes refrescaban un grupo de WhatsApp esperando que alguien hubiera publicado una actualización.

Para la planeación de horarios, el sistema oficial era funcional pero frustrante — sin vista visual, sin detección de choques, sin forma de compartir tu horario con amigos.

Ambos problemas tenían la misma causa raíz: la información existía, pero no era accesible.

## La Decisión de Stack

**Vue.js + Vuetify** fue la elección obvia para una herramienta universitaria con muchos datos. Los componentes de tabla, selector de horario y diálogos de Vuetify nos dieron una UI pulida sin diseñar todo desde cero. El lenguaje de Material Design también resultaba familiar para los estudiantes que usan productos de Google diariamente.

**Firebase** manejó el rastreo del camión en tiempo real. Cada parada del camión tiene un sensor GPS que escribe su ubicación a Firestore. La app se suscribe a esos datos y renderiza la posición actual en un mapa con un listener `onSnapshot`:

```js
onSnapshot(doc(db, 'shuttle', 'current'), (snapshot) => {
  const { lat, lng, nextStop, eta } = snapshot.data()
  updateMapMarker(lat, lng)
  showETA(nextStop, eta)
})
```

La latencia de actualización es menor a un segundo, lo que significa que los estudiantes saben casi de inmediato si el camión va tarde.

## Constructor de Horarios

La funcionalidad de planeación de horarios fue más compleja de lo que parece. El desafío principal: detectar choques entre materias que comparten franjas horarias, incluyendo laboratorios que se alternan por semanas.

El algoritmo corre en cada cambio a las materias seleccionadas:

1. Expandir cada materia en sus bloques de tiempo individuales (día + inicio + fin)
2. Para cada par de bloques, verificar si sus intervalos se traslapan
3. Si se traslapan, marcar ambas materias como conflictivas y bloquear la acción de "Agregar"

Guardamos el horario del usuario en Firestore para que persista entre dispositivos. El link para compartir codifica la selección de materias como un string seguro para URL, facilitando comparar horarios con amigos.

## CI/CD con GitHub Actions

Configurar un pipeline de despliegue confiable desde el principio fue una de las mejores decisiones del proyecto. Cada push a `main` dispara:

1. Linting (`eslint`)
2. Pruebas unitarias (`vitest`)
3. Build (`vite build`)
4. Despliegue a Firebase Hosting

Todo el pipeline corre en menos de dos minutos. Esto significó que podíamos publicar correcciones para problemas de datos del camión o bugs de horarios en minutos después de un reporte, lo cual importaba mucho ya que los estudiantes dependían activamente de la app.

## Uso y Retroalimentación

Dentro del primer mes, AppITAM tuvo más usuarios activos diarios de lo que esperábamos. El rastreador del camión fue el caso de uso dominante — los estudiantes abrían la app en una parada y la dejaban abierta hasta que llegaba el camión.

La funcionalidad más solicitada fueron notificaciones push para retrasos del camión. Nunca la publicamos (la ubicación en tiempo real en el mapa resultó ser suficiente), pero nos mostró que el problema que estábamos resolviendo era real.

## Lo que Haría Diferente

**Construir la experiencia móvil primero.** La mayor parte del uso ocurría en teléfonos en las paradas del camión. Diseñamos para escritorio primero y adaptamos el layout móvil después, lo cual siempre se nota en el producto final.

**Abstraer la capa en tiempo real antes.** La lógica de `onSnapshot` de Firestore estaba duplicada en tres componentes antes de extraerla a un composable. Extrae temprano.

**Escribir las pruebas antes de la funcionalidad.** Parte de la lógica de conflictos de horarios tenía bugs sutiles que solo detectamos porque un estudiante los reportó. Un test suite adecuado para el algoritmo de traslape de horarios los habría capturado antes del lanzamiento.

---

AppITAM está en línea en [appitam.org](https://appitam.org). Si eres estudiante del ITAM, es gratis.

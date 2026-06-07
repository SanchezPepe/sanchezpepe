# Construyendo Raicen: Una Plataforma de Renta de Equipo Cinematográfico

> Rentar equipo profesional de cámara en México no debería requerir tres llamadas, una hoja de cálculo y cruzar los dedos.

Raicen nació de una frustración real. La industria cinematográfica opera con equipo rentado — cámaras, lentes, iluminación, grip — pero encontrar y reservar ese equipo seguía haciéndose con llamadas, DMs de Instagram y acuerdos de palabra. No existía una plataforma central y confiable. Esta es la historia de cómo la construimos.

## El Problema

Las producciones de cine profesionales raramente son dueñas del equipo que usan. Solo el cuerpo de una cámara puede costar más de $50,000 USD, así que rentar es lo normal. Las casas de renta existen, pero la experiencia de ver inventario, verificar disponibilidad y hacer una reserva no tenía ninguna infraestructura digital detrás.

Queríamos cambiar eso. Específicamente, darle tanto a los rentadores como a las casas de renta una plataforma simple y confiable donde la transacción fuera transparente y la experiencia no se sintiera del año 2005.

## ¿Por qué Vue.js?

Tenía opciones. React era la elección obvia dado su ecosistema, pero elegí Vue.js para este proyecto por varias razones:

- **Curva de aprendizaje más suave para el equipo.** Los demás desarrolladores del proyecto tenían menos experiencia en frontend. Los Single File Components de Vue y su sintaxis de templates eran más fáciles de entender rápidamente.
- **Los componentes de Vuetify.** Para una app con muchas tablas, formularios y diálogos, Material Design nos dio una base sólida de componentes.
- **Preferencia personal.** Ya había trabajado con Vue y genuinamente disfruto su modelo de reactividad.

En retrospectiva, los tradeoffs valieron la pena. El equipo entregaba funcionalidades más rápido gracias al menor costo cognitivo.

## El Backend: Firebase

Firebase fue una decisión pragmática. Éramos un equipo pequeño que necesitaba:

- **Disponibilidad de inventario en tiempo real** sin operar nuestro propio servidor de websockets
- **Autenticación** sin construirla desde cero
- **Cloud Storage** para las fotos del equipo
- **Cloud Functions** para los webhooks de Stripe

Los listeners en tiempo real de Firestore hicieron que el calendario de disponibilidad fuera sorprendentemente fácil de implementar. Cuando se confirma una renta, todos los demás usuarios que están viendo ese equipo ven las fechas bloquearse de inmediato — sin polling, sin estado desactualizado.

## Pagos con Stripe

Integrar Stripe fue la parte más difícil. No técnicamente complicada, pero requería pensar cuidadosamente en el flujo financiero:

1. El cliente navega y selecciona equipo + fechas
2. Se realiza un **hold** en su tarjeta al hacer checkout
3. La casa de renta confirma la reserva
4. El hold se captura y la transacción se completa

El patrón de hold-y-captura fue importante. No queríamos cobrar a los clientes antes de confirmar que el equipo realmente estuviera disponible en sus fechas, especialmente para rentas de varios días.

La API `PaymentIntent` de Stripe maneja esto bien, pero el manejo de webhooks requirió lógica cuidadosa de idempotencia para evitar cobros dobles en escenarios de reintento.

## Lo que Aprendí

Algunas cosas que haría diferente hoy:

**Empezar con TypeScript.** Comenzamos en JavaScript plano y migramos a la mitad. Cada hora invertida en esa migración fue dolorosa y evitable.

**Diseñar el modelo de datos primero.** Refactorizamos el esquema de Firestore dos veces porque la estructura original no soportaba los patrones de consulta que necesitábamos. En Firestore, cómo consultas determina cómo estructuras — no diseñes la estructura de forma aislada.

**No subestimar la subida de archivos.** Las fotos del equipo necesitan redimensionarse, comprimirse y servirse desde un CDN. Lo manejamos con Cloud Functions, pero añadió más complejidad de lo esperado.

---

La plataforma está en línea en [raicen.com](https://raicen.com). Si estás en la industria cinematográfica mexicana y necesitas equipo, dale un vistazo.

# Raicen: Una Plataforma de Renta de Equipo Cinematográfico

> Rentar equipo profesional de cámara en México no debería requerir tres llamadas, una hoja de cálculo y cruzar los dedos.

Raicen es una plataforma para la industria cinematográfica mexicana. Las producciones rentan en lugar de comprar su equipo — solo el cuerpo de una cámara puede costar más de $50,000 USD — pero encontrar y reservar ese equipo seguía haciéndose con llamadas, DMs de Instagram y acuerdos de palabra. Sin inventario central, sin calendario de disponibilidad, sin flujo de reserva real. Así que lo construimos.

## El Problema

Las casas de renta existían, pero la experiencia de ver inventario, verificar disponibilidad y hacer una reserva no tenía ninguna infraestructura digital detrás. La transacción era opaca y las herramientas parecían del año 2005.

## ¿Por qué Vue.js?

React era la elección obvia dado su ecosistema, pero elegí Vue.js por varias razones:

- **Onboarding.** Los demás desarrolladores del proyecto tenían menos experiencia en frontend. Los Single File Components de Vue y su sintaxis de templates eran más fáciles para volverse productivos rápido.
- **Vuetify.** Para una app con muchas tablas, formularios y diálogos, Material Design nos dio una base sólida de componentes sin diseñar todo desde cero.
- **Preferencia personal.** Ya había trabajado con Vue y me gusta su modelo de reactividad.

El equipo entregaba funcionalidades más rápido por eso.

## El Backend: Firebase

Éramos un equipo pequeño que necesitaba disponibilidad de inventario en tiempo real, autenticación, almacenamiento de fotos del equipo y funciones serverless para los webhooks de Stripe — sin construir nada de eso desde cero. Firebase lo cubrió todo.

Los listeners en tiempo real de Firestore hicieron que el calendario de disponibilidad fuera directo. Cuando se confirma una renta, todos los demás usuarios que están viendo ese equipo ven las fechas bloquearse de inmediato — sin polling, sin estado desactualizado.

## Pagos con Stripe

Stripe fue la parte técnicamente interesante. El flujo financiero:

1. El cliente selecciona equipo + fechas
2. Se realiza un **hold** en su tarjeta al hacer checkout
3. La casa de renta confirma la reserva
4. El hold se captura y la transacción se completa

No queríamos cobrar a los clientes antes de confirmar que el equipo realmente estuviera disponible, especialmente para rentas de varios días. La API `PaymentIntent` de Stripe maneja bien el patrón de hold-y-captura, pero el manejo de webhooks requirió lógica de idempotencia para evitar cobros dobles en reintentos.

## Lo que Haría Diferente

**Empezar con TypeScript.** Comenzamos en JavaScript plano y migramos a la mitad. Doloroso y evitable.

**Diseñar el modelo de datos antes de escribir cualquier query.** Refactorizamos el esquema de Firestore dos veces porque la estructura original no soportaba los patrones de consulta que necesitábamos. En Firestore, cómo consultas determina cómo estructuras — hay que resolverlo primero.

**Tomar en serio la subida de archivos desde el inicio.** Las fotos del equipo necesitan redimensionarse, comprimirse y servirse desde un CDN. Lo manejamos con Cloud Functions, pero añadió más complejidad de lo esperado.

---

La plataforma está en línea en [raicen.com](https://raicen.com). Si estás en la industria cinematográfica mexicana y necesitas equipo, dale un vistazo.

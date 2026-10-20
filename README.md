<p align="center"><img src="logo.svg" width="120" alt="Logo de ED Compás Ritmico"></p>

# 🥁 ED Compás Ritmico

**Estudio musical y academia matemática infantil** — los niños aprenden fracciones
construyendo compases rítmicos: cada bloque musical es una fracción (`1/4`, `1/8`,
`1/2`…) y juntos llenan el círculo del compás (¡un entero!).

Creado por **ED-Dev** · App 100% estática, sin dependencias, sin backend.

## ✨ Qué incluye

- 🎵 **18 niveles** progresivos: del pulso básico a la polirritmia
- ➗ **Academia matemática**: sumas, restas, multiplicaciones y divisiones *sonoras* (niveles 11–18)
- 🐣 **Mascotas con evolución**: Bumbo, Clave y Güira crecen con XP, se bautizan y llevan accesorios
- ✏️ **Creador de ritmos**: 4 compases, polifonía por nota (cada nota con su instrumento), exportación MP3/WAV
- 📚 **Biblioteca de compases** guardados y **modo canción** secuencial
- 🎯 **Mini-juegos**: Simon, Dúo (batalla de mascotas), Mapa, Mercado y Puesto
- 📱 **Mobile-first**: diseño responsivo con `clamp()`, safe-areas y navegación táctil
- 🎬 **Intro guiada** con mini-curso de fracciones + tour de la app (solo primera visita, con botón «¿Cómo se juega?»)

## 🗂️ Arquitectura modular

```
index.html   → markup semántico (estructura pura)
styles.css   → estilos (mobile-first, variables CSS, modo oscuro)
logic.js     → lógica pura del juego (sin DOM) — exportada como COMPAS
data.js      → re-export de datos: niveles, retos, problemas, mascotas
main.js      → UI e interacciones (DOM, audio, eventos)
```

`logic.js` es pura y testeable: no toca el DOM, solo calcula.

## 🚀 Desarrollo local

Los módulos ES requieren servirse por HTTP (no funcionan con `file://`):

```bash
node server.cjs
# → http://localhost:8123
```

## 🧪 Verificado

- Sintaxis de los 3 módulos ES (Node)
- Suite headless en Chrome real (Playwright): intro, onboarding de mascota,
  juego completo, 7 vistas de navegación, scroll móvil (360px y 390px),
  cero errores de consola

## 📦 Despliegue

Desplegada en Vercel como sitio estático. Conectada a GitHub para
auto-despliegue en cada push a `main`.

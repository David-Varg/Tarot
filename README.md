# 🌌 Mystic Tarot Pro: Tu Guía Estelar

**Mystic Tarot Pro** no es solo una aplicación de lectura de cartas; es una experiencia sensorial y mística diseñada para conectar con la intuición desde la palma de la mano. Desarrollada con un enfoque _mobile-first_, combina algoritmos de aleatoriedad real con una interfaz fluida y envolvente.

## ✨ Características Principales

### 🔮 El "Core" Místico

- **Sistema de Tiradas Dinámicas:**
- **Guía Diaria:** Una carta para una visión rápida del día.
- **Línea Temporal:** Lectura de Pasado, Presente y Futuro.
- **Dilemas (A/B):** Comparativa estratégica entre dos caminos.

- **Algoritmo de Mezcla Real:** Implementación del **Fisher-Yates Shuffle** para garantizar que el mazo se mezcle físicamente de forma virtual, evitando repeticiones en una misma tirada.
- **Lógica de Inversión:** Cada carta tiene un 50% de probabilidad de aparecer invertida, revelando significados profundos y variados.
- **Enciclopedia de Arcanos:** Diccionario interactivo para consultar las 78 cartas en alta resolución sin necesidad de tirar.

### 🎨 Experiencia de Usuario (Look & Feel)

- **Inmersión 3D:** Animaciones de "flip" con perspectiva real para una sensación táctil.
- **Mesa de Terciopelo:** Layout con texturas profundas y fondo de cielo estrellado.
- **Anti-Spam Místico:** Bloqueo de clics mediante _loaders_ animados (fases lunares) para respetar el tiempo de revelación.
- **PWA (Progressive Web App):** Instalable en iPhone y Android como una App nativa.

### 📚 Contenido Especializado

- **Interpretación Contextual:** Significados divididos por pestañas: ❤️ **Amor**, 💰 **Trabajo** y ✨ **Espiritualidad**.
- **Historial Local:** Almacenamiento en `localStorage` para recordar lecturas pasadas.
- **Social:** Botón para compartir resultados directamente por WhatsApp.

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).
- **Animaciones:** CSS 3D Transforms & `canvas-confetti` para momentos especiales (El Sol, El Mundo).
- **Audio:** Web Audio API para efectos de fricción de papel y ambiente místico.
- **Persistencia:** LocalStorage API.

## 💎 Otros factores

Este proyecto fue creado como un regalo especial, por lo que incluye:

- **Modo Lectura Nocturna:** Interfaz con luz filtrada para consultas antes de dormir.
- **Easter Egg:** Una combinación de toques secreta revela una **carta personalizada** con una foto especial y un mensaje romántico.
- **Ambientación Sonora:** Sonido de fondo tipo _ambient pad_ para inducir la concentración.

---

## 🚀 Instalación y Despliegue

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/mystic-tarot.git

```

2. No requiere dependencias pesadas. Puedes abrir el `index.html` o usar un servidor local:

```bash
npx serve .

```

3. **Despliegue recomendado:** Vercel o GitHub Pages (requiere HTTPS para la funcionalidad PWA).

## 💝 Dedicatoria

> _"Consultando a las estrellas para **Mahecha** – Hecho con ❤️ por **David**"_

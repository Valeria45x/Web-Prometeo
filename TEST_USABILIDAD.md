# Test de usabilidad y comprensión — Web Prometeo

Guion completo para validar la web (storytelling + user journey + propuesta de valor) y mejorarla de forma iterativa. Diseñado para ser defendible en la memoria del TFG y ejecutable por una sola persona con recursos de estudiante.

---

## 1. Objetivo

Verificar que la web cumple su **función principal**: que un visitante del público objetivo (Gen Z hispanohablante) (1) entienda en segundos qué es Prometeo, (2) recorra el arco emocional **incomodidad → comprensión → agencia**, y (3) comprenda y confíe en el sello de certificación como puente entre el conocimiento del usuario y la acción de las empresas.

A partir de los hallazgos, iterar el prototipo y volver a testear.

> **Por qué este test:** la guía de la UDIT lista explícitamente "Prototipado y Pruebas de Usuario", "Pruebas de Usabilidad", "Análisis Heurístico" y "Journey Maps" como metodologías UX válidas. Este test combina varias en una sola sesión y produce datos cuantificables (no solo opiniones), lo que la memoria valora como "evidencia sólida".

---

## 2. Hipótesis a validar

- **H1 (comprensión):** Tras el hero, el usuario sabe decir qué hace Prometeo y para quién.
- **H2 (modelo B2B2C):** El usuario entiende que existe una doble propuesta (personas / organizaciones) y qué es el sello.
- **H3 (arco emocional):** Tras recorrer la landing, el usuario expresa un cambio de actitud hacia sus propios datos (agencia), no solo información.
- **H4 (navegación):** El usuario encuentra sin fricción la ruta que le corresponde (/para-ti o /empresas).

Cada hipótesis se confirma o refuta con las métricas de la sección 6.

---

## 3. Participantes

- **Perfil:** 5 personas del público objetivo — jóvenes hispanohablantes (≈18–28), usuarios intensivos de móvil/RR.SS., sin formación en privacidad ni en diseño.
- **Por qué 5:** con 5 usuarios se detecta ≈85% de los problemas de usabilidad (Nielsen). Más usuarios dan rendimientos decrecientes; es mejor invertir el esfuerzo en una segunda ronda tras iterar.
- **Opcional (recomendado para el TFG):** 1–2 participantes "empresa" (perfil decisor: founder, product, marketing) para validar la ruta /empresas, ya que el público B2B es distinto.
- **Reclutamiento:** entorno cercano que encaje en el perfil, redes, universidad. Evitar a quien ya conozca el proyecto.
- **Consentimiento:** breve hoja de consentimiento para grabar pantalla y voz (anonimizado). Necesario para citar resultados en la memoria.

---

## 4. Setup

- **Tipo:** moderado, pensando en voz alta (think-aloud). Presencial o por videollamada con pantalla compartida.
- **Duración:** 25–35 min por sesión.
- **Material:** prototipo navegable (web real en local/desplegada), grabación de pantalla + audio, esta plantilla impresa para anotar.
- **Regla de oro del moderador:** no guiar, no explicar, no defender el diseño. Si el usuario pregunta "¿qué hago aquí?", devolver: "¿qué harías tú?". El silencio es información.
- **Dispositivo:** prioriza **móvil**, que es donde vive el target. Repite alguna sesión en desktop si el tiempo lo permite.

---

## 5. Guion de la sesión

### 5.1 Bienvenida (2 min)

Explica que se evalúa la web, no a la persona; que no hay respuestas correctas; que piense en voz alta. Pide consentimiento de grabación.

### 5.2 Preguntas de contexto (3 min)

- ¿Te preocupa lo que pasa con tus datos en internet? ¿Por qué sí/no?
- ¿Alguna vez has rechazado cookies o revisado los permisos de una app? ¿Qué te detuvo o te animó?

_(Establece la actitud previa, para medir el cambio al final — H3.)_

### 5.3 Test de 5 segundos (2 min) — valida H1

Muestra **solo el hero** 5 segundos, ocúltalo y pregunta:

- ¿Qué crees que es esta empresa o web?
- ¿Para quién crees que es?
- ¿Qué sensación te transmitió?

Anota sus palabras textuales. Si no menciona "privacidad" ni la idea de "entender/demostrar", H1 falla.

### 5.4 Exploración libre (3 min)

"Navega como lo harías normalmente. Cuéntame qué ves y qué piensas." No des tareas todavía. Observa qué le llama la atención, dónde se detiene, qué ignora.

### 5.5 Tareas dirigidas (12–15 min)

Una a una. Anota: éxito/fallo, tiempo aprox., fricciones, citas.

1. **Comprensión de valor (H1/H2):** "Explícame con tus palabras qué ofrece Prometeo y a quién."
2. **El sello (H2):** "¿Qué es el sello de Prometeo, qué garantiza y dónde lo verías?"
3. **Ruta personas (H4):** "Quieres aprender a proteger tus propios datos. ¿A dónde irías?"
4. **Ruta empresas (H2/H4):** "Imagina que tienes una empresa. ¿Qué tendrías que hacer aquí y qué consigues?"
5. **Agencia (H3):** "Después de leer esto, ¿harías algo distinto la próxima vez que te salga un banner de cookies? ¿Qué?"

> Las tareas 1, 2 y 4 son las que delatan directamente el desajuste B2B2C: si el usuario no sabe responderlas, tienes la prueba empírica documentada de que la narrativa de certificación aún no llega — un hallazgo válido para la memoria.

### 5.6 Desirability — reaction cards (3 min)

Muestra una lista de ~20 adjetivos (mezcla de positivos y negativos: _clara, confusa, cercana, fría, profesional, alarmista, confiable, vacía, innovadora, genérica, honesta, agobiante…_). Pide elegir 3–5 que describan la web y explicar una. Mide la resonancia de marca (clave en un proyecto tan emocional).

### 5.7 SUS — cuestionario (3 min)

Las 10 frases estándar del System Usability Scale (escala 1–5). Da una cifra 0–100 comparable entre rondas y citable en la memoria. (>68 = por encima de la media.)

### 5.8 Cierre (2 min)

- Si tuvieras que describir Prometeo a un amigo en una frase, ¿qué dirías?
- ¿Qué quitarías o cambiarías?

---

## 6. Métricas

| Métrica                         | Cómo se mide                                             | Hipótesis  |
| ------------------------------- | -------------------------------------------------------- | ---------- |
| **Comprensión de valor**        | % de usuarios que en T1 describen bien qué hace Prometeo | H1         |
| **Comprensión del sello**       | pass/fail por usuario en T2                              | H2         |
| **Comprensión dual**            | ¿identifica las dos rutas sin ayuda?                     | H2         |
| **Tasa de éxito por tarea**     | éxito / fallo / con ayuda                                | H4         |
| **Tiempo y fricción**           | tiempo aprox. + nº de dudas/retrocesos por tarea         | H4         |
| **Cambio de actitud (agencia)** | comparación contexto inicial (5.2) vs. T5                | H3         |
| **SUS**                         | puntuación 0–100                                         | global     |
| **Desirability**                | adjetivos más repetidos (nube/recuento)                  | resonancia |

---

## 7. Plantilla de síntesis (rellenar tras las 5 sesiones)

### 7.1 Matriz de hallazgos

| #   | Hallazgo (qué pasó) | Dónde | Frecuencia (de 5) | Severidad (1–4) | Hipótesis afectada | Recomendación |
| --- | ------------------- | ----- | ----------------- | --------------- | ------------------ | ------------- |
| 1   |                     |       |                   |                 |                    |               |
| 2   |                     |       |                   |                 |                    |               |

- **Severidad:** 1 cosmético · 2 menor · 3 serio (bloquea la tarea para algunos) · 4 crítico (bloquea para todos / rompe la función principal).
- **Prioriza** por `frecuencia × severidad`. Ataca primero severidad 3–4 que afecten a H1/H2/H3 (la función principal).

### 7.2 Resumen ejecutivo (½ página para la memoria)

- Función principal: ¿se cumple? (sí / parcial / no) y por qué.
- 3 hallazgos principales.
- SUS obtenido + adjetivos dominantes.
- Decisiones de rediseño que se derivan.

---

## 8. Iteración

Documenta el bucle completo — es lo que la metodología "prototipado y pruebas de usuario" espera ver:

```
Prototipo v1 → Test (5 usuarios) → Síntesis → Cambios priorizados → Prototipo v2 → Re-test → Comparar SUS y tasas
```

Dos rondas bastan para un TFG sólido: demuestran proceso y mejora medible (p. ej. "SUS pasó de 64 a 79; la comprensión del sello subió de 2/5 a 5/5 tras reescribir el pilar 4").

---

## 9. Métodos complementarios (sin reclutar usuarios)

Para reforzar la memoria con bajo coste:

- **Evaluación heurística (10 de Nielsen):** tú misma recorres la web puntuando cada heurística. Barato y rápido; complementa lo que ven los usuarios.
- **Tree testing / card sorting:** valida la arquitectura de información y los nombres de navegación (útil sobre todo con la ruta /empresas añadida).
- **A/B (opcional, si hay tráfico):** probar dos versiones de un copy o CTA. Requiere visitantes reales, así que es secundario para un TFG.

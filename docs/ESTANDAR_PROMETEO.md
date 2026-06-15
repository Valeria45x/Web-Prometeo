# Estándar Prometeo — v1.0 (DOCUMENTO INTERNO)

> ⚠️ **Confidencial · no publicar.** Esta es la metodología detallada de auditoría.
> En la web solo se comunica, de forma general, **qué busca cada sello** (ver
> sección "Qué se comunica en público" al final). El checklist de criterios se
> mantiene interno para no facilitar que se replique la metodología ni que las
> empresas "aprueben el examen" sin cumplir el espíritu.

Este archivo forma parte de la documentación de la propuesta. A medida que la
página se complete, se integrará en el documento maestro que explica todos los
aspectos del proyecto.

---

## Principio rector

Prometeo audita **solo lo observable desde fuera**: interfaz, documentación
pública, entornos de prueba y tráfico de red. Sin acceso a sistemas internos.
Esto hace la auditoría **reproducible por cualquiera** y es lo que la separa de
una consultoría de UX o de una auditoría legal de GDPR (que Prometeo **no**
sustituye).

La certificación se organiza en **cuatro pilares** y **tres niveles
acumulativos**. Cada pilar reúne criterios comprobables; cada nivel exige
cumplir pilares completos.

---

## Pilar 1 — Políticas
*(exigible desde Nivel 1)*

- **P1.** La política es localizable en menos de dos clics desde cualquier punto donde se recogen datos.
- **P2.** Se entiende en menos de cinco minutos: lenguaje claro, sin necesidad de leer otros documentos para captar lo esencial.
- **P3.** Para cada tipo de dato declara: qué se recoge, para qué, cuánto se conserva y con quién se comparte.
- **P4.** Lo declarado coincide con el comportamiento real del producto: no hay recogidas sin documentar.
- **P5.** Muestra fecha de última actualización y cómo ejercer los derechos (acceso, rectificación, supresión).

## Pilar 2 — Consentimiento
*(exigible desde Nivel 1)*

- **C1.** Se pide consentimiento explícito antes de cualquier recogida no estrictamente necesaria. Nada preseleccionado.
- **C2.** Rechazar cuesta los mismos pasos y clics que aceptar.
- **C3.** Es granular: se pueden aceptar unas finalidades y rechazar otras, no todo o nada.
- **C4.** Es reversible: cambiar de opinión después es fácil y está en un lugar accesible.
- **C5.** La información para decidir está visible *antes* de decidir, no escondida tras enlaces.

## Pilar 3 — Interfaz
*(exigible desde Nivel 2 · sin dark patterns)*

- **I1.** Aceptar y rechazar tienen el mismo peso visual: tamaño, color y contraste. Ninguna opción se realza sobre la otra.
- **I2.** No hay lenguaje que culpabilice o avergüence al rechazar.
- **I3.** No hay urgencia, escasez ni cuentas atrás falsas para forzar la decisión.
- **I4.** Las opciones por defecto son las más protectoras para el usuario.
- **I5.** Ninguna ruta para proteger la privacidad es más larga u oculta que la ruta para cederla.

## Pilar 4 — Terceros
*(exigible desde Nivel 3 · trazabilidad)*

- **T1.** Existe un inventario público de los proveedores y herramientas externas que reciben datos.
- **T2.** Para cada tercero se indica qué dato recibe, para qué y con qué base.
- **T3.** Las conexiones reales del producto coinciden con ese inventario: no hay terceros sin documentar.
- **T4.** No se carga ningún tercero que recoja datos antes del consentimiento.
- **T5.** Desde los ajustes, el usuario puede saber y limitar qué se comparte con terceros.

**Alcance de la verificación (importante):** Prometeo verifica las conexiones a
terceros **observables desde el cliente** (tráfico del navegador) y su coherencia
con el inventario declarado. El intercambio **servidor-a-servidor no es observable
externamente**: se acepta por **declaración atestiguada** de la empresa, con
comprobación puntual. Por eso este estándar no afirma "trazabilidad completa": se
limita a lo verificable más lo declarado.

---

## Los tres niveles

| Nivel | Nombre | Exige | En una frase |
|---|---|---|---|
| **N1** | Transparente | Políticas (P1–P5) + Consentimiento (C1–C5) | Dices la verdad y pides permiso de verdad. |
| **N2** | Íntegro | Todo N1 + Interfaz (I1–I5) | Además, nada en el diseño presiona ni empuja. |
| **N3** | Soberano | Todo N2 + Terceros (T1–T5) | Además, sabes a dónde van tus datos hacia terceros y puedes limitarlo. |

---

## Gobernanza

- **Metodología:** evaluación sobre lo observable (interfaz, documentación pública, entornos de prueba, tráfico de red). Sin acceso a sistemas internos → reproducible.
- **Versionado:** el estándar tiene versión pública. Al cambiar, se publica la nueva versión y su fecha.
- **Vigencia:** la certificación dura 12 meses. La renovación revisa solo los cambios del año.
- **Doble verificabilidad:** las certificaciones emitidas son públicas en el registro; el propio estándar (su versión y principios) es auditable. Cualquiera puede comprobar tanto a las empresas como a Prometeo.

---

## Qué se comunica en público (web)

En la página de Certificación **no** se publican los criterios P/C/I/T. Solo se
comunica, en lenguaje general y orientado al usuario, **qué busca cada sello**:

- **Nivel 1 · Transparente** — que la empresa te diga la verdad sobre tus datos y te pida permiso de forma honesta.
- **Nivel 2 · Íntegro** — todo lo anterior y, además, que ningún diseño te presione ni te oculte opciones.
- **Nivel 3 · Soberano** — todo lo anterior y, además, que sepas y controles a dónde van tus datos, incluidos terceros.

El mensaje al usuario es la **garantía** (qué le asegura el sello), no el
procedimiento (cómo se comprueba).

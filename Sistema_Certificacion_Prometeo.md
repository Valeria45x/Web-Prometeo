# Sistema de Certificación Prometeo — Documento Maestro

> Documento de referencia interna y base para memoria, manual de marca y desarrollo web. Consolida la propuesta del sistema de certificación tras las decisiones tomadas.

---

## 1. Principio rector

Prometeo audita **solo lo observable desde fuera**: interfaz, documentación pública, entornos de prueba y tráfico de red observable desde el cliente. Sin acceso a sistemas internos. Esta restricción no es una limitación: es lo que hace la auditoría **reproducible por cualquiera** y lo que define la categoría de auditoría que Prometeo ocupa.

Prometeo no sustituye a una auditoría legal de cumplimiento GDPR, ni a una auditoría de seguridad técnica, ni a una consultoría UX. Cubre un espacio distinto y propio: la **integridad comunicacional** de la empresa con el usuario en el momento del contacto.

---

## 2. El marco conceptual: honestidad observable

### 2.1. Una categoría propia de auditoría

La auditoría de honestidad observable no es un subconjunto de la auditoría legal. Es una **categoría distinta**.

- La **auditoría legal** verifica cumplimiento normativo: ¿la empresa cumple el GDPR?
- La **auditoría de seguridad** verifica integridad técnica: ¿los datos están protegidos?
- La **auditoría de honestidad observable** verifica integridad comunicacional: ¿la empresa se comporta con el usuario como dice que se comporta?

**El cumplimiento legal y la honestidad comunicacional son cosas distintas.**

Una empresa puede cumplir el GDPR legalmente y comportarse deshonestamente con sus usuarios. El GDPR no prohíbe taxativamente los dark patterns; las directrices del EDPB los desaconsejan, pero la ley los tolera. Una empresa puede tener políticas perfectas en términos legales y banners manipuladores en términos comunicacionales. Cumple la ley y traiciona al usuario al mismo tiempo.

Ese hueco es real y persistente. No lo cubre el regulador (la ley no exige todo lo que Prometeo audita). No lo cubre la consultora legal (no le compete certificar honestidad comunicacional). No lo cubre la consultora UX (no le compete certificar privacidad). No lo cubre la consultora de seguridad (audita backend, no contrato implícito con el usuario).

Es precisamente donde el usuario forma su juicio sobre la empresa, y precisamente lo que nadie estaba certificando. Prometeo existe para ocupar ese espacio.

### 2.2. Por qué la honestidad observable es la capa que importa

Una auditoría GDPR completa puede costar 50.000 € y producir un informe legal de 200 páginas que el usuario nunca verá. El cumplimiento existe pero es invisible. Prometeo audita la **única capa que el usuario ve y experimenta**: la superficie de contacto entre la empresa y el usuario en el momento crítico, cuando se está formando o destruyendo la confianza.

Esa superficie es lo que decide si el usuario confía o no, con independencia de lo que ocurra en el backend. Por eso es la capa que un sistema de certificación dirigido al usuario tiene que auditar. Cualquier otra cosa certifica algo que el usuario no puede verificar.

### 2.3. Anclaje teórico

El marco de honestidad observable se sostiene sobre cuerpo académico existente:

- **Asimetría informacional** entre empresa y usuario (Acquisti et al.).
- **Privacy as contextual integrity** (Nissenbaum): la integridad de la privacidad no se mide solo por cumplimiento normativo, sino por adecuación al contexto comunicacional.
- **Dark patterns**: Brignull (deceptive.design, 2010), Mathur et al. (2019, estudio masivo sobre dark patterns en e-commerce), Gray et al., informes de la CNIL francesa.
- **Transparencia y consentimiento**: Nouwens et al. (CHI 2020) sobre dark patterns en banners de cookies; directrices EDPB.

Prometeo no inventa criterios: operacionaliza un cuerpo teórico existente sobre integridad informacional en la interfaz.

---

## 3. Estructura del Estándar Prometeo

### 3.1. Un solo estándar

El Estándar Prometeo es **único, no estratificado en niveles**. Una empresa cumple el estándar o no lo cumple. No hay grados intermedios visibles para el usuario.

Esta decisión responde a dos consideraciones:

- **Legibilidad para el usuario final.** Una generación que se enfrenta a banners de cookies en cada navegación procesa los sellos como binarios. Los niveles intermedios serían ruido.
- **Coherencia con el discurso de marca.** Prometeo no negocia con grados de privacidad. Certifica privacidad bien hecha o no certifica.

Internamente, el estándar se organiza en cuatro pilares conjuntos. Los cuatro son exigibles. Faltar a uno significa no certificar.

### 3.2. Los cuatro pilares

**Pilar 1 — Políticas**

Que la empresa diga la verdad sobre los datos del usuario.

- P1. La política es localizable en menos de dos clics desde cualquier punto donde se recogen datos.
- P2. Se entiende en menos de cinco minutos: lenguaje claro, sin necesidad de leer otros documentos para captar lo esencial.
- P3. Para cada tipo de dato declara qué se recoge, para qué, cuánto se conserva y con quién se comparte.
- P4. Lo declarado coincide con el comportamiento real del producto: no hay recogidas sin documentar.
- P5. Muestra fecha de última actualización y cómo ejercer los derechos.

Anclaje: GDPR art. 12–14, directrices EDPB sobre transparencia.

**Pilar 2 — Consentimiento**

Que cada permiso sea libre, informado y reversible.

- C1. Se pide consentimiento explícito antes de cualquier recogida no estrictamente necesaria. Nada preseleccionado.
- C2. Rechazar cuesta los mismos pasos y clics que aceptar.
- C3. Es granular: se pueden aceptar unas finalidades y rechazar otras, no todo o nada.
- C4. Es reversible: cambiar de opinión después es fácil y está en un lugar accesible.
- C5. La información para decidir está visible antes de decidir, no escondida tras enlaces.

Anclaje: GDPR art. 7, directrices EDPB sobre consentimiento, Nouwens et al. (2020).

**Pilar 3 — Interfaz (sin dark patterns)**

Que nada en el diseño presione, oculte o manipule.

- I1. Aceptar y rechazar tienen el mismo peso visual: tamaño, color y contraste. Ninguna opción se realza sobre la otra.
- I2. No hay lenguaje que culpabilice o avergüence al rechazar.
- I3. No hay urgencia, escasez ni cuentas atrás falsas para forzar la decisión.
- I4. Las opciones por defecto son las más protectoras para el usuario.
- I5. Ninguna ruta para proteger la privacidad es más larga u oculta que la ruta para cederla.

Anclaje: Brignull (2010), Mathur et al. (2019), Gray et al., CNIL.

**Pilar 4 — Terceros**

Que el usuario sepa a dónde van sus datos y pueda limitarlo.

- T1. Existe un inventario público de los proveedores y herramientas externas que reciben datos.
- T2. Para cada tercero se indica qué dato recibe, para qué y con qué base.
- T3. Las conexiones reales del producto coinciden con ese inventario: no hay terceros sin documentar.
- T4. No se carga ningún tercero que recoja datos antes del consentimiento.
- T5. Desde los ajustes, el usuario puede saber y limitar qué se comparte con terceros.

Anclaje: GDPR art. 28–30, trabajo de The Markup, análisis de trackers.

**Alcance del Pilar 4 (delimitación honesta):** Prometeo verifica las conexiones a terceros observables desde el cliente (tráfico del navegador) y su coherencia con el inventario declarado. El intercambio servidor-a-servidor no es observable externamente: se acepta por declaración atestiguada de la empresa, con comprobación puntual de coherencia documental. El estándar no afirma "trazabilidad completa": se limita a lo verificable más lo declarado bajo atestación.

---

## 4. Procedimiento de auditoría

### 4.1. Fases

1. **Solicitud.** La empresa solicita auditoría desde el formulario de contacto.
2. **Auditoría sobre lo observable.** Recorrido real del usuario (antes del clic) + análisis de tráfico de red (después del clic). Sin acceso a sistemas internos.
3. **Diagnóstico.** Informe accionable con problemas detectados, priorizados y con propuestas de resolución. El informe es propiedad de la empresa y es privado.
4. **Emisión del sello** si cumple el estándar. Publicación en el registro público.
5. Si no cumple: ningún registro público de la no certificación. La empresa puede volver a presentarse cuando esté lista, sin empezar de cero.

### 4.2. Criterios objetivos vs. evaluativos

Algunos criterios son objetivos (booleanos: cumple o no cumple, sin margen de juicio). Otros son evaluativos (requieren rúbrica con descriptores). El protocolo de auditoría documenta ambos tipos.

Ejemplo objetivo (P3): la política declara, para cada tipo de dato, los cuatro elementos requeridos. Verificable como sí/no.

Ejemplo evaluativo (P2): la política se entiende en menos de cinco minutos. Verificable mediante rúbrica con descriptores (lenguaje, estructura, dependencia de otros documentos).

---

## 5. Vigencia, monitoreo y revocación

### 5.1. Vigencia

La certificación dura **12 meses**. La renovación revisa solo los cambios del año, no es auditoría completa repetida.

### 5.2. Monitoreo continuo

Durante la vigencia, se realizan **revisiones automatizadas trimestrales** sobre la empresa certificada:

- *Scraping* periódico de páginas clave (política, banner, ajustes de privacidad).
- Verificación del banner de consentimiento y de su estructura técnica.
- Comprobación del inventario declarado de terceros contra el tráfico real observable.

Si una revisión automatizada detecta divergencia significativa, se abre **revisión completa puntual** sobre el área detectada. Si la divergencia se confirma y la empresa no resuelve, se procede a **revocación pública** del sello.

Esto blinda el modelo reputacionalmente: la empresa certificada sabe que el sello no es un trámite anual sino un compromiso continuo.

### 5.3. Versionado del estándar

El Estándar Prometeo tiene versión pública. Cuando se actualiza, se publica la nueva versión con su fecha. Las certificaciones emitidas indican bajo qué versión fueron auditadas.

### 5.4. Doble verificabilidad

El sistema sostiene una doble verificabilidad pública:

- Las **certificaciones emitidas** son públicas en el registro.
- El **estándar mismo** (su versión y sus principios públicos) es auditable.

Cualquiera puede comprobar tanto a las empresas certificadas como a Prometeo. "Una certificación no debería pedir que confíes. Debería permitirte comprobar."

---

## 6. El sello: forma, uso y protección

### 6.1. Mensaje al usuario

El sello comunica **"Privacidad certificada por Prometeo"**. No comunica niveles, pilares ni jerga interna. El usuario ve una promesa clara y un símbolo reconocible.

### 6.2. Doble formato técnico

El sello existe en dos formatos:

- **Versión estática (SVG).** Para manual de marca, documentación, comunicación impresa, presentaciones internas. No se sirve a empresas certificadas para uso en su producto.
- **Versión embebida (widget verificable).** Es la versión que las empresas certificadas integran en su producto. Fragmento de código (script embed o iframe) servido desde el dominio de Prometeo.

### 6.3. Dónde aparece el sello

Como mínimo, en el **banner de consentimiento de cookies** de la empresa certificada. Adicionalmente, la empresa puede mostrarlo en:

- Página de política de privacidad.
- Pie de página del sitio.
- Páginas de producto donde se recogen datos.

El sistema documenta los emplazamientos permitidos y los desaconsejados (por ejemplo, en publicidad fuera del producto, donde no acompaña la práctica auditada).

### 6.4. Protección contra uso indebido

El sello es vulnerable al copiado por su naturaleza digital. La protección no consiste en impedir el copiado (imposible), sino en hacer que la copia **no sirva**. Cuatro capas combinadas:

**Capa 1 — Widget verificable en tiempo real.**

El sello servido a empresas certificadas es un fragmento de código que verifica, en cada carga, contra el registro público de Prometeo que la URL donde se carga corresponde a una empresa certificada. Si una empresa no certificada copia el código, el widget muestra "no verificado" o no se renderiza. Si copian solo el SVG, queda como imagen muerta sin enlace al registro, y se desactiva el principal valor del sello.

**Capa 2 — Enlace obligatorio al registro.**

El sello siempre enlaza, al hacer clic, a la página del registro público con la ficha de esa empresa certificada concreta (nombre, código de certificación, fecha, versión del estándar). Si el clic no lleva a ninguna ficha, el engaño se cae solo. Esto convierte al usuario en verificador final.

**Capa 3 — Marca registrada.**

El sello y el sistema de identidad asociado se registran como marca. El uso no autorizado constituye infracción legal perseguible. Esto no impide el uso técnico, pero proporciona herramientas legales para forzar la retirada cuando se detecta suplantación.

**Capa 4 — Reporte de suplantación.**

Existe un mecanismo público para reportar uso indebido del sello por empresas no certificadas. Es importante distinguir este mecanismo de la vigilancia del cumplimiento de las empresas certificadas (que no se delega en el usuario): aquí se trata únicamente de denunciar suplantación de marca, en defensa de los usuarios contra el engaño.

---

## 7. Lo que el Estándar Prometeo no es

Esta sección, deliberadamente presente en la comunicación pública, refuerza la credibilidad del modelo. Una propuesta seria delimita su alcance.

- **No es una auditoría legal de cumplimiento GDPR.** No sustituye al equipo legal ni al delegado de protección de datos.
- **No es una auditoría de seguridad técnica.** No certifica ISO 27001, no audita infraestructura, no garantiza ausencia de brechas.
- **No es una consultoría UX general.** No evalúa usabilidad ni accesibilidad fuera del ámbito de la privacidad.
- **No certifica el backend.** No puede verificar lo que ocurre en sistemas servidor-a-servidor no observables desde el cliente.
- **No certifica que la empresa no venda datos en mercados internos no observables.** Audita lo declarado y lo observable; lo invisible queda fuera de su alcance.

Lo que certifica: **honestidad observable, ausencia de dark patterns, coherencia entre lo declarado y lo verificable, transparencia accesible**. Esa es la promesa y ese es el límite.

---

## 8. Propuesta de valor para empresas

La sección "Para empresas" de la web articula qué gana la empresa al certificarse, no qué hace técnicamente Prometeo. La estructura recomendada:

1. **Posicionamiento.** Frase de encabezado: el estándar que demuestra a los usuarios que el trato de sus datos es honesto, sin sustituir al equipo legal ni a la auditoría de seguridad. La pieza que faltaba entre cumplir la ley y ganarse la confianza.
2. **Beneficios para la empresa.**
   - Señal verificable de confianza que el usuario reconoce.
   - Diferenciación frente a competidores que no se certifican.
   - Informe accionable con diagnóstico de prácticas y propuestas de mejora.
   - Cobertura reputacional ante una generación (Gen Z) que penaliza activamente las marcas percibidas como deshonestas.
   - Anticipación al endurecimiento regulatorio europeo (AI Act, revisión de ePrivacy, Digital Services Act).
3. **Qué es la honestidad observable.** Bloque conceptual que distingue cumplimiento legal de honestidad comunicacional. Reposiciona el servicio como categoría propia.
4. **Qué audita el Estándar Prometeo.** Los cuatro pilares, presentados brevemente y orientados a la promesa para el usuario, no como checklist técnico.
5. **Proceso de certificación.** Solicitud, auditoría, informe, emisión. Limpio y claro.
6. **Lo que el Estándar Prometeo no es.** Delimitación de alcance como signo de profesionalidad.
7. **Llamada a la acción.** Solicitar auditoría.

---

## 9. Líneas futuras de desarrollo

El Estándar Prometeo, en su versión actual, audita la honestidad observable. Líneas futuras contempladas, sin que alteren el principio rector de auditoría externa y reproducible:

- Integración con servicios legales especializados para cobertura ampliada de cumplimiento GDPR como producto complementario, no sustitutivo del estándar.
- Extensión del estándar a productos no-web (aplicaciones móviles nativas, dispositivos IoT).
- Internacionalización del estándar para jurisdicciones fuera del marco europeo (CCPA en California, LGPD en Brasil).
- Programa de formación para equipos de producto en honestidad comunicacional.

---

## 10. Resumen ejecutivo

- **Categoría:** auditoría de honestidad observable. Categoría propia, no subconjunto de la auditoría legal ni de la consultoría UX.
- **Alcance:** lo observable desde fuera (interfaz, documentación pública, tráfico cliente). Reproducible por cualquiera.
- **Estructura:** un solo estándar, cuatro pilares conjuntos exigibles (Políticas, Consentimiento, Interfaz, Terceros).
- **Vigencia:** 12 meses + revisiones automatizadas trimestrales + posibilidad de revocación.
- **Comunicación al usuario:** "Privacidad certificada por Prometeo".
- **Protección:** widget verificable + enlace al registro + marca registrada + reporte de suplantación.
- **Delimitación honesta:** Prometeo no sustituye auditoría legal ni de seguridad. Cubre el espacio que ninguna de ellas cubre.

---

*Documento de referencia interna. Versión 1.0. Base para integración en manual de marca, capítulo 5 de la memoria y desarrollo web.*

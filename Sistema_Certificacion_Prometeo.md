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

El sello comunica **"Privacidad Certificada por Prometeo"**. No comunica niveles, pilares ni jerga interna. El usuario ve una promesa clara y un símbolo reconocible.

### 6.2. Sobre el uso deliberado de simbología convencional (escudo y llama)

El símbolo del sello recupera dos elementos visualmente convencionales del entorno de la privacidad digital: el **escudo** (asociado a protección) y la **llama** (asociada a la marca Prometeo y al mito fundacional). Esta decisión merece justificación porque el sistema de identidad general de Prometeo, en cambio, evita deliberadamente los códigos visuales saturados del sector (candados, escudos, ojos, huellas dactilares) por considerarlos genéricos y desgastados.

La aparente contradicción se resuelve atendiendo a la **función comunicativa distinta de cada elemento**:

- La **marca Prometeo** opera como entidad cultural y discursiva, y se dirige a un público al que pretende reposicionar conceptualmente la idea de privacidad. En ese plano, romper con la iconografía heredada del sector es estratégico: refuerza el reposicionamiento y diferencia visualmente.
- El **sello de certificación**, en cambio, no opera como entidad cultural sino como **señal funcional en una superficie de interacción crítica** (el banner de cookies). Su función no es reposicionar nada, sino ser reconocido como sello en menos de dos segundos por un usuario que está realizando otra tarea.

La literatura sobre reconocimiento visual y procesamiento de marcas (Bloch, 1995; Pieters y Wedel, 2004) documenta que el reconocimiento de categorías visuales (en este caso, "esto es un sello de certificación") depende de la coincidencia con esquemas mentales preexistentes del usuario. Forzar al usuario a aprender una iconografía completamente nueva en el momento del banner de cookies introduce **carga cognitiva** justo donde el diseño del sello debería minimizarla.

El escudo, en tanto convención visual reconocida, cumple esa función: comunica "esto es un sello" antes de que el usuario lea el texto. La llama personaliza ese esquema y lo conecta con Prometeo, evitando que sea un escudo genérico. La composición resultante es **reconocible como sello pero distintiva como Prometeo**, y resuelve la tensión entre legibilidad funcional y diferenciación de marca.

Esta decisión es coherente con el principio de **honestidad observable** que rige el modelo: si el sello debe ser reconocido y verificable por el usuario, su forma debe facilitar ese reconocimiento, no obstaculizarlo. El gesto distintivo se reserva para el sistema general de identidad, donde la marca puede permitirse construir vocabulario propio. En el sello, la prioridad es la función.

### 6.3. El sello como sistema escalable: estructura visual y futuras certificaciones

La decisión de no integrar el logotipo de Prometeo directamente en el símbolo del sello responde, además, a una consideración **estructural y de escalabilidad del modelo de negocio**.

La versión actual del proyecto se concentra en una sola línea de certificación: la **honestidad comunicacional observable** en el trato a los datos del usuario. Pero la propuesta contempla, como línea futura de desarrollo, la expansión de Prometeo hacia otras áreas de certificación relacionadas con el entorno digital: cumplimiento normativo extendido (en colaboración con servicios legales especializados), accesibilidad, integridad informativa frente a desinformación, prácticas algorítmicas auditables, entre otras. Este modelo de expansión es análogo al recorrido seguido por organizaciones como **Europrivacy** o **B Corp**, que han ampliado progresivamente su alcance certificador una vez consolidada la comunidad y la base económica iniciales.

Para que el sistema de sellos pueda escalar sin perder coherencia visual, su arquitectura gráfica se concibe desde el principio como un **sistema generativo de dos capas**:

- **Capa estructural (constante):** el escudo, en tanto contenedor visual común a todos los sellos de Prometeo. Comunica al usuario "esto es una certificación Prometeo", con independencia de la línea concreta que certifique.
- **Capa de diferenciación (variable):** el símbolo interior, distinto para cada línea de certificación. En el sello actual de privacidad, este símbolo es la llama (referencia al mito fundacional). En futuros sellos (certificación legal, accesibilidad, etcétera), el símbolo interior será **un sigilo distinto generado mediante el pipeline cybersigilista** que constituye el sistema visual generativo de la marca.

Esta arquitectura cumple varias funciones simultáneamente:

1. **Consistencia visual a largo plazo.** Cada nueva certificación se incorpora al sistema sin necesidad de rediseñar el sistema de identidad. El escudo garantiza reconocibilidad transversal.
2. **Diferenciación clara entre líneas.** El usuario distingue qué se está certificando por el símbolo interior, sin necesidad de leer texto adicional.
3. **Justificación estructural de la herramienta de sigilos.** El pipeline generativo cybersigilista deja de ser ornamento del proyecto y pasa a ser **el sistema mediante el cual Prometeo produce las marcas de cada nueva línea de certificación**. Su existencia es funcional al modelo, no decorativa.
4. **Conexión conceptual entre la marca y los sellos.** Aunque el logotipo de Prometeo no aparezca dentro del sello, el lenguaje visual del sigilo interior pertenece al sistema generativo de la marca. La relación entre marca y sello es sistémica, no literal.

Esta justificación se documenta como parte del modelo de negocio en la sección de líneas futuras, donde se explicita el plan de expansión escalonada y el rol del sistema visual en sostener esa expansión.

### 6.4. Composición visual del sello

El sello se compone de **símbolo + texto** como unidad indivisible. La composición principal sitúa el símbolo a la izquierda y el texto a la derecha, en disposición horizontal, conforme a la convención visual reconocida en sellos de certificación digital (B Corp, Trusted Shops, ISO, sellos de pago).

Esta composición horizontal responde a tres criterios:

- **Adecuación al contexto principal de uso.** El sello vive prioritariamente en banners de consentimiento de cookies, superficies horizontales con altura limitada y lectura horizontal rápida. La composición horizontal se adapta nativamente a este contexto.
- **Convención reconocible.** El usuario identifica la estructura "símbolo + texto" como sello sin necesidad de leer. Salir de la convención sin razón funcional implica perder reconocibilidad.
- **Escalabilidad.** El sistema degrada correctamente a versiones reducidas (solo símbolo) cuando el espacio lo exige, sin perder función.

El sistema completo contempla **cinco versiones**, cada una asociada a un contexto de uso específico:

1. **Versión horizontal principal**: símbolo + texto en dos líneas ("Privacidad Certificada / por Prometeo"). Para footers, páginas dedicadas, comunicaciones corporativas.
2. **Versión horizontal compacta**: símbolo + texto en una sola línea. **Es la versión optimizada para banners de cookies**, donde la economía de altura es crítica.
3. **Versión vertical**: símbolo arriba + texto debajo. Para superficies cuadradas o verticales (packaging, redes sociales, publicidad impresa vertical).
4. **Versión reducida (solo símbolo)**: para usos muy pequeños donde el texto sería ilegible (favicon, microcopia, iconografía secundaria). Solo se permite cuando el contexto ya identifica a Prometeo en la misma superficie.
5. **Versión con código de verificación**: composición horizontal + código alfanumérico de certificación (por ejemplo, "PRO-2026-014"). Para el registro público y comunicación corporativa de la empresa certificada.

### 6.5. Tipografía del sello

El texto del sello se compone en **Funnel Sans Semibold con capitalización tipo título** ("Privacidad Certificada por Prometeo"). La elección de Funnel Sans mantiene coherencia con el sistema tipográfico de la marca. El peso Semibold ofrece presencia suficiente sin competir visualmente con los botones del banner anfitrión. La capitalización tipo título refuerza el carácter formal del sello sin recurrir a mayúsculas, que serían más agresivas en el contexto del banner.

**Decisión técnica importante:** la tipografía va **empotrada como trazos vectoriales** en el SVG final del sello, no como texto editable. Esto significa que el sello, al renderizarse en cualquier web del mundo, **mantiene Funnel Sans con independencia de las fuentes instaladas en el navegador o cargadas por el sitio anfitrión**. El sello se sirve como unidad cerrada y se ve igual en todos los contextos.

Esta solución es estándar en sellos de certificación serios y resuelve la preocupación legítima sobre la coherencia tipográfica en sitios de terceros que no usan la tipografía de marca de Prometeo.

### 6.6. Tamaños mínimos de uso

La legibilidad del símbolo y del texto del sello depende del tamaño de reproducción. Por debajo de ciertos umbrales, los detalles interiores del símbolo (la llama serpenteante) pierden definición y el texto deja de leerse. El sistema establece tamaños mínimos por versión y soporte:

**En entornos digitales:**

- **Versión horizontal una línea:** altura mínima del símbolo **24 px**. Por debajo de este tamaño, la llama interior pierde definición. En este tamaño, el ancho total de la composición (símbolo + texto) ronda los **180 px**.
- **Versión vertical:** altura mínima del símbolo **40 px**. La versión vertical requiere más tamaño que la horizontal porque el texto va en dos líneas y necesita mantener proporción óptica con el símbolo.
- **Versión solo símbolo (uso general):** mínimo **24 × 26 px**.
- **Versión solo símbolo en favicon:** se permite hasta **16 × 16 px** como excepción documentada, asumiendo pérdida de definición interior. Para usos por debajo de 24 px fuera de favicon, no se autoriza.

**En soportes impresos:**

- **Versión horizontal una línea:** altura mínima del símbolo **8 mm**.
- **Versión vertical:** altura mínima del símbolo **14 mm**.
- **Versión solo símbolo:** mínimo **8 × 9 mm**.

**Reglas adicionales:**

- En contextos donde el sello deba aparecer por debajo del tamaño mínimo recomendado para la versión horizontal, se sustituye por la versión solo símbolo, no por una versión horizontal reducida que perdería legibilidad textual.
- El área de respeto mínima alrededor del sello equivale a la mitad de la altura del símbolo en cualquier dirección.
- En pantallas de alta densidad (Retina, 2x, 3x), los píxeles mínimos se refieren a píxeles CSS, no físicos.

Estas reglas se documentan en el manual del sello como condición de uso para empresas certificadas.

### 6.7. Sistema cromático del sello

El sello se sirve a empresas certificadas en **versiones predefinidas y oficiales**, no en colores personalizables. La fuerza del sello reside en su reconocibilidad de un vistazo, y permitir personalización libre del color por cada empresa diluiría el sistema visual hasta hacerlo irreconocible.

Versiones cromáticas oficiales, definidas en la paleta RGB de marca:

- **Positivo**: composición en negro (`#050505`) sobre fondo claro. Versión predominante.
- **Negativo**: composición en blanco (`#FCFCFC`) sobre fondo oscuro. Para banners con fondo oscuro o modos nocturnos.
- **Monocromo a una tinta**: el sello en una sola tinta dentro de un rango aprobado de la paleta de marca (negro `#050505`, gris claro `#D9D9D6`, blanco `#FCFCFC`). La empresa elige dentro del rango para adaptarse a su contexto sin romper el sistema.
- **Versión adaptable** (vía widget): el sello detecta automáticamente el fondo del contenedor y aplica positivo o negativo según corresponda.

Las equivalencias para impresión (CMYK y referencias Pantone aproximadas) se documentan por separado en el manual de marca para soportes físicos.

Lo que el sistema **no permite**: gradientes, colores arbitrarios fuera del rango aprobado, separación de símbolo y texto en la versión principal, modificación de proporciones, alteración de la tipografía, recoloración por símbolo y texto por separado.

Esta aproximación replica el modelo que aplican B Corp y otros sellos consolidados, donde la coherencia visual se preserva mediante variantes oficiales en lugar de personalización libre.

### 6.8. Doble formato técnico

El sello existe en dos formatos:

- **Versión estática (SVG).** Para manual de marca, documentación, comunicación impresa, presentaciones internas. No se sirve a empresas certificadas para uso en su producto.
- **Versión embebida (widget verificable).** Es la versión que las empresas certificadas integran en su producto. Fragmento de código (script embed o iframe) servido desde el dominio de Prometeo. Renderiza el sello SVG con la tipografía empotrada, garantizando coherencia visual y verificación en tiempo real contra el registro.

### 6.9. Dónde aparece el sello

Como mínimo, en el **banner de consentimiento de cookies** de la empresa certificada. Adicionalmente, la empresa puede mostrarlo en:

- Página de política de privacidad.
- Pie de página del sitio.
- Páginas de producto donde se recogen datos.

El sistema documenta los emplazamientos permitidos y los desaconsejados (por ejemplo, en publicidad fuera del producto, donde no acompaña la práctica auditada).

### 6.10. Protección contra uso indebido

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

El Estándar Prometeo, en su versión actual, audita la honestidad observable en el ámbito de la privacidad digital. El modelo se concibe como **primera línea de un sistema escalable de certificaciones digitales**, donde Prometeo amplía progresivamente su alcance una vez consolidadas comunidad, reputación y base económica iniciales. Este recorrido es análogo al seguido por organizaciones como **Europrivacy** o **B Corp**, que han incorporado nuevas líneas certificadoras a partir de un núcleo inicial bien definido.

Líneas futuras contempladas, sin que alteren el principio rector de auditoría externa y reproducible:

- **Certificación de cumplimiento normativo extendido**, en colaboración con servicios legales especializados, como producto complementario al estándar actual de honestidad observable.
- **Certificación de accesibilidad digital** (WCAG y normativa europea), auditando la calidad real de la experiencia para personas con discapacidad más allá del cumplimiento mínimo.
- **Certificación de integridad informativa**, auditando prácticas observables de transparencia editorial frente a desinformación.
- **Certificación de prácticas algorítmicas auditables**, en el marco del AI Act europeo, sobre los aspectos observables externamente (información al usuario, explicabilidad, posibilidad de oposición).
- Extensión del estándar actual a productos no-web (aplicaciones móviles nativas, dispositivos IoT).
- Internacionalización para jurisdicciones fuera del marco europeo (CCPA en California, LGPD en Brasil).
- Programa de formación para equipos de producto en honestidad comunicacional.

Cada nueva línea se materializa como un **sello propio**, construido sobre la arquitectura visual descrita en la sección 6.3: estructura común (escudo) que garantiza reconocibilidad transversal como certificación Prometeo, y símbolo interior distintivo generado por el pipeline cybersigilista, que identifica visualmente la línea específica certificada. Esta arquitectura permite que el sistema escale sin perder coherencia ni requerir rediseños.

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

const principles = [
  { n: "001", title: "Map data flows", variant: "default" },
  { n: "002", title: "Detect friction", variant: "alt" },
  { n: "003", title: "Equal choices", variant: "alt" },
  { n: "004", title: "Readable consent", variant: "light" }
];

const merch = [
  { code: "P/01", name: "Reject All Tee", price: "32€" },
  { code: "P/02", name: "Own Your Data Hoodie", price: "59€" },
  { code: "P/03", name: "Interface Anatomy Print", price: "24€" }
];

export default function App() {
  return (
    <div className="bg-bg">
      <div className="site-frame mx-auto max-w-frame">
        <Topbar />
        <Hero />
        <Narrative />
        <Certification />
        <Merch merch={merch} />
        <Principles principles={principles} />
        <Footer />
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <header className="topbar-grid line-box border-b-0">
      <div className="line-box border-y-0 border-l-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border border-line relative">
          <div className="absolute inset-2 rounded-full border border-line"></div>
        </div>
      </div>
      <div className="line-box border-y-0 border-l-0 px-6 py-4 flex items-center justify-between">
        <div className="small-label">Prometeo / interface system</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="nav-link" href="#narrative">Narrative</a>
          <a className="nav-link" href="#certification">Certification</a>
          <a className="nav-link" href="#merch">Merch</a>
        </nav>
      </div>
      <div className="line-box border-y-0 border-l-0 flex items-center justify-center">
        <span className="small-label">≡</span>
      </div>
      <div className="line-box desktop-only border-y-0 border-l-0 flex items-center justify-center">
        <span className="small-label">project</span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid md:grid-cols-[1.1fr_0.9fr] border-b border-line">
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">Privacy systems / 2026</div>
        <div className="line-box border-l-0 border-t-0 min-h-[280px] md:min-h-[380px] px-6 py-6 flex items-end">
          <div>
            <div className="small-label mb-4">portfolio / brand / certification / education</div>
            <h1 className="mega-title">
              Designing
              <br />
              visible
              <br />
              privacy
            </h1>
          </div>
        </div>
      </div>

      <div className="grid md:grid-rows-[0.36fr_0.64fr]">
        <div className="line-box border-l-0 border-t-0 md:border-r-0 px-6 py-5 flex items-end">
          <p className="thin-copy">
            La web se rehace con una gramática mucho más cercana a la referencia:
            sobria, editorial, modular y tecnológica. Menos “campaña”, más “interface system”.
          </p>
        </div>
        <div className="grid sm:grid-cols-[1fr_1fr] md:grid-cols-[0.95fr_1.05fr]">
          <div className="panel hairline-grid cyber-mark border-l-0 border-t-0 px-6 py-6 flex flex-col justify-between">
            <div className="small-label">signal</div>
            <p className="section-title">Clear choices.</p>
          </div>
          <div className="media-block border-l-0 border-t-0"></div>
        </div>
      </div>
    </section>
  );
}

function Narrative() {
  return (
    <section id="narrative" className="grid lg:grid-cols-[0.75fr_1.25fr] border-b border-line">
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">Definition</div>
        <div className="line-box border-l-0 border-t-0 px-6 py-6 flex items-end min-h-[180px]">
          <h2 className="section-title">
            Interface
            <br />
            before
            <br />
            compliance
          </h2>
        </div>
        <div className="line-box border-l-0 border-t-0 px-6 py-6">
          <p className="thin-copy">
            El problema de la privacidad también es un problema de diseño:
            jerarquía, fricción, copy, densidad y arquitectura de información.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid md:grid-rows-[0.45fr_0.55fr]">
          <div className="line-box border-l-0 border-t-0 px-6 py-6 flex items-end">
            <h3 className="section-title">
              Making the
              <br />
              invisible
              <br />
              legible.
            </h3>
          </div>
          <div className="grid sm:grid-cols-2">
            <div className="line-box border-l-0 border-t-0 px-6 py-6">
              <div className="small-label mb-4">A / structural problem</div>
              <p className="micro-copy">
                La interfaz actual suele empujar a aceptar por cansancio o por ambigüedad.
              </p>
            </div>
            <div className="line-box border-l-0 border-t-0 px-6 py-6">
              <div className="small-label mb-4">B / design response</div>
              <p className="micro-copy">
                Prometeo plantea una traducción visual más clara, más directa y más culturalmente cercana.
              </p>
            </div>
          </div>
        </div>

        <div className="media-block alt border-l-0 border-t-0 md:border-r-0"></div>
      </div>
    </section>
  );
}

function Certification() {
  return (
    <section id="certification" className="grid lg:grid-cols-[0.82fr_1.18fr] border-b border-line">
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">Certification system</div>
        <div className="line-box border-l-0 border-t-0 px-6 py-6 min-h-[220px] flex items-end">
          <h2 className="section-title">
            A signal
            <br />
            people
            <br />
            can read
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-[0.78fr_1.22fr]">
        <div className="line-box border-l-0 border-t-0 px-6 py-6">
          <p className="thin-copy">
            En lugar de un sello frío o corporativo, el sistema usa niveles legibles,
            una nomenclatura simple y una presencia visual adaptable a web, contenido y producto.
          </p>
        </div>

        <div className="grid sm:grid-cols-3">
          {[
            ["A", "Legible", "Lenguaje claro, decisiones equilibradas y control visible."],
            ["B", "Traceable", "Información suficiente, pero aún compleja en algunos pasos."],
            ["C", "Biased", "Fricción, jerarquía o ambigüedad que empujan al usuario."]
          ].map(([level, title, text], i) => (
            <div key={level} className="panel border-l-0 border-t-0 md:last:border-r-0 px-5 py-5 flex flex-col justify-between min-h-[240px]">
              <div>
                <div className="small-label mb-5">class / {level}</div>
                <p className="text-5xl font-black leading-none">{level}</p>
                <h3 className="mt-5 text-2xl font-black uppercase">{title}</h3>
              </div>
              <p className="micro-copy max-w-[22ch]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Merch({ merch }) {
  return (
    <section id="merch" className="grid lg:grid-cols-[0.72fr_1.28fr] border-b border-line">
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">Output / merch</div>
        <div className="line-box border-l-0 border-t-0 px-6 py-6 min-h-[220px] flex items-end">
          <h2 className="section-title">
            Objects as
            <br />
            interface
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.12fr_0.88fr]">
        <div className="panel-dark border-l-0 border-t-0 px-6 py-6 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="small-label mb-6 text-bg">Featured / 01</div>
            <h3 className="section-title">
              Reject All
              <br />
              Hoodie
            </h3>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="thin-copy max-w-[30ch] text-bg/90">
              La pieza funciona como statement editorial: mensaje claro, composición dura y presencia de sistema.
            </p>
            <span className="text-5xl font-black leading-none">59€</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 md:grid-cols-1">
          {merch.map((item, index) => (
            <div key={item.code} className="line-box border-l-0 border-t-0 md:last:border-r-0 px-5 py-5 min-h-[106px] flex items-center justify-between gap-4">
              <div>
                <div className="small-label mb-2">{item.code}</div>
                <p className="text-xl font-black uppercase">{item.name}</p>
              </div>
              <span className="text-lg font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles({ principles }) {
  return (
    <section className="grid">
      <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">Principles</div>
      <div className="grid md:grid-cols-4">
        {principles.map((item, index) => (
          <div key={item.n} className="border-t-0 border-l-0 md:last:border-r-0 line-box px-4 py-4">
            <div className="small-label mb-3">{item.n}</div>
            <div className={`media-block ${item.variant === "alt" ? "alt" : item.variant === "light" ? "light" : ""}`}></div>
            <div className="mt-3 text-lg font-black uppercase">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="grid md:grid-cols-[1fr_220px]">
      <div className="line-box border-l-0 border-t-0 px-6 py-5">
        <div className="small-label mb-2">Prometeo / final project system</div>
        <p className="micro-copy">
          Esta versión está rehecha para acercarse más al lenguaje de la referencia:
          editorial, modular, cuadrada y tecnológica.
        </p>
      </div>
      <div className="line-box border-l-0 border-t-0 md:border-r-0 px-6 py-5 flex items-center justify-start md:justify-center">
        <span className="small-label">v3</span>
      </div>
    </footer>
  );
}

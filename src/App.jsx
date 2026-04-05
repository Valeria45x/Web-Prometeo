import { useState } from "react";

/* ── datos ─────────────────────────────────────────── */
const educCards = [
  {
    id: "001",
    tag:   "cookies",
    title: "Lo que aceptas sin leer",
    copy:  "Cada banner esconde decisiones de diseño deliberadas. Te enseñamos a leerlas.",
  },
  {
    id: "002",
    tag:   "dark patterns",
    title: "Te engañan a propósito",
    copy:  "Botones de colores, textos diminutos, opciones enterradas. Los reconocerás todos.",
  },
  {
    id: "003",
    tag:   "herramientas",
    title: "VPN, cifrado y contraseñas",
    copy:  "Guía práctica en menos de 60 segundos por tema. Sin tecnicismos.",
  },
];

const niveles = [
  {
    key:   "Bronce",
    en:    "Bronze",
    desc:  "Política legible + GDPR cumplido.",
    detail:"Lenguaje claro en la política de privacidad. Cumplimiento regulatorio básico verificado.",
  },
  {
    key:   "Plata",
    en:    "Silver",
    desc:  "Sin dark patterns + datos mínimos.",
    detail:"Auditoría de dark patterns superada. Recogida de datos limitada al mínimo necesario.",
  },
  {
    key:   "Oro",
    en:    "Gold",
    desc:  "Sin terceros + cifrado total.",
    detail:"Sin venta de datos a terceros. Cifrado extremo a extremo verificado en toda la cadena.",
  },
];

/* ── App ────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="bg-bg">
      <div className="site-frame mx-auto max-w-frame">
        <Topbar />
        <Hero />
        <Sobre />
        <Certificacion />
        <Producto />
        <Educativo />
        <Contacto />
        <Footer />
      </div>
    </div>
  );
}

/* ── Topbar ──────────────────────────────────────────── */
function Topbar() {
  return (
    <header className="topbar-grid line-box border-b-0 sticky top-0 z-50 bg-bg">
      <div className="line-box border-y-0 border-l-0 flex items-center justify-center">
        <SigiloMini />
      </div>

      <div className="line-box border-y-0 border-l-0 px-6 py-4 flex items-center justify-between">
        <div className="small-label">Prometeo / privacidad digital</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="nav-link" href="#sobre">Proyecto</a>
          <a className="nav-link" href="#certificacion">Certificación</a>
          <a className="nav-link" href="#producto">USB</a>
          <a className="nav-link" href="#educativo">Aprende</a>
          <a className="nav-link" href="#contacto">Contacto</a>
        </nav>
      </div>

      <div className="line-box border-y-0 border-l-0 flex items-center justify-center">
        <span className="small-label">≡</span>
      </div>

      <div className="line-box desktop-only border-y-0 border-l-0 flex items-center justify-center">
        <span className="small-label accent-red">ES</span>
      </div>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="grid md:grid-cols-[1.15fr_0.85fr] border-b border-line">
      {/* columna izquierda */}
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">
          Privacy systems / 2026 — proyectoprometeo.info
        </div>

        <div className="line-box border-l-0 border-t-0 min-h-[320px] md:min-h-[440px] px-6 py-8 flex items-end">
          <div>
            <div className="small-label mb-5 accent-red">
              marca / certificación / educación / producto
            </div>
            <h1 className="mega-title">
              El fuego<br />fue robado.<br />
              <span className="accent-red">Recupéralo.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* columna derecha */}
      <div className="grid md:grid-rows-[0.32fr_0.68fr]">
        <div className="line-box border-l-0 border-t-0 md:border-r-0 px-6 py-5 flex items-end">
          <p className="body-copy">
            Prometeo es la primera marca de privacidad digital pensada para
            jóvenes hispanohablantes. Educamos, certificamos y creamos objetos
            que hacen visible lo que las plataformas prefieren ocultar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2">
          <div className="panel hairline-grid border-l-0 border-t-0 px-6 py-6 flex flex-col justify-between min-h-[220px]">
            <div className="small-label">señal</div>
            <div>
              <p className="section-title">Datos claros.</p>
              <p className="section-title accent-red">Decisiones tuyas.</p>
            </div>
          </div>
          {/* bloque sigilo */}
          <div className="sigilo-block border border-line border-l-0 border-t-0 min-h-[220px] flex items-center justify-center">
            <SigiloHero />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sobre ───────────────────────────────────────────── */
function Sobre() {
  return (
    <section id="sobre" className="grid lg:grid-cols-[0.72fr_1.28fr] border-b border-line">
      {/* izquierda */}
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">
          Definition / el problema
        </div>
        <div className="line-box border-l-0 border-t-0 px-6 py-8 flex items-end min-h-[200px]">
          <h2 className="section-title">
            La privacidad<br />es un problema<br />
            <span className="accent-red">de diseño.</span>
          </h2>
        </div>
        <div className="line-box border-l-0 border-t-0 px-6 py-6">
          <p className="body-copy">
            Los dark patterns, las políticas ilegibles y los banners de cookies
            confusos no son accidentales. Son decisiones de diseño gráfico
            que favorecen a las plataformas. Prometeo usa el diseño para
            devolverte el control.
          </p>
        </div>
      </div>

      {/* derecha */}
      <div className="grid md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid md:grid-rows-[auto_1fr]">
          {/* stat */}
          <div className="panel-red border-l-0 border-t-0 px-6 py-8">
            <div className="small-label mb-4" style={{color:"rgba(254,255,227,.7)"}}>
              dato / Gen Z España
            </div>
            <p style={{fontFamily:'"Funnel Display",serif', fontSize:"clamp(4rem,10vw,9rem)", lineHeight:0.85, fontWeight:800, color:"#FEFFE3"}}>
              67%
            </p>
            <p className="body-copy mt-4" style={{color:"rgba(254,255,227,.9)"}}>
              acepta cookies sin leerlas, aunque declara preocuparse por su privacidad.
            </p>
          </div>

          {/* dos columnas de contexto */}
          <div className="grid sm:grid-cols-2">
            <div className="line-box border-l-0 border-t-0 px-6 py-6">
              <div className="small-label mb-4">A / el sistema</div>
              <p className="micro-copy">
                Las interfaces actuales están diseñadas para que aceptes por
                cansancio o por ambigüedad. El consentimiento es ficción.
              </p>
            </div>
            <div className="line-box border-l-0 border-t-0 px-6 py-6">
              <div className="small-label mb-4">B / la respuesta</div>
              <p className="micro-copy">
                Prometeo traduce la privacidad digital al lenguaje visual y
                cultural de los jóvenes hispanohablantes.
              </p>
            </div>
          </div>
        </div>

        {/* bloque sigilo lateral */}
        <div className="sigilo-block border border-line border-l-0 border-t-0 md:border-r-0 min-h-[280px] flex items-center justify-center">
          <SigiloSecundario />
        </div>
      </div>
    </section>
  );
}

/* ── Certificación ───────────────────────────────────── */
function Certificacion() {
  const [tab, setTab] = useState("consumer");

  return (
    <section id="certificacion" className="border-b border-line">
      {/* header */}
      <div className="grid md:grid-cols-[0.75fr_1.25fr]">
        <div className="grid">
          <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">
            Certification system
          </div>
          <div className="line-box border-l-0 border-t-0 px-6 py-8 flex items-end min-h-[180px]">
            <h2 className="section-title">
              Una señal<br />que la gente<br />
              <span className="accent-red">puede leer.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr]">
          <div className="line-box border-l-0 border-t-0 px-6 py-6">
            <p className="body-copy">
              El sello Prometeo identifica las empresas que respetan tus datos.
              A diferencia de Europrivacy o TrustArc — compliance puro, estética
              de auditoría — Prometeo está diseñado para que tu usuario de 22 años
              lo entienda y lo busque.
            </p>
          </div>
          {/* tabs */}
          <div className="line-box border-l-0 border-t-0 md:border-r-0 px-6 py-6 flex flex-col gap-3">
            <div className="small-label mb-2">Perspectiva</div>
            <button
              onClick={() => setTab("consumer")}
              className={`text-left px-4 py-3 border text-sm font-bold tracking-widest uppercase transition-all ${
                tab === "consumer"
                  ? "bg-negro text-crema border-negro"
                  : "border-line hover:border-rojo"
              }`}
            >
              → Consumidor
            </button>
            <button
              onClick={() => setTab("empresa")}
              className={`text-left px-4 py-3 border text-sm font-bold tracking-widest uppercase transition-all ${
                tab === "empresa"
                  ? "bg-rojo text-crema border-rojo"
                  : "border-line hover:border-rojo"
              }`}
            >
              → Empresa
            </button>
          </div>
        </div>
      </div>

      {/* contenido condicional */}
      {tab === "consumer" ? (
        <CertConsumer />
      ) : (
        <CertEmpresa />
      )}
    </section>
  );
}

function CertConsumer() {
  return (
    <div className="grid md:grid-cols-3 border-t border-line">
      {niveles.map((n, i) => (
        <div
          key={n.key}
          className={`border-l-0 border-t-0 px-6 py-8 flex flex-col justify-between min-h-[280px] ${
            i === 2 ? "panel-dark" : "panel"
          } ${i < 2 ? "" : "md:border-r-0"}`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="nivel-badge"
                style={{
                  color: i === 0 ? "#8B6914" : i === 1 ? "#666" : "#F2CD5C",
                  borderColor: i === 0 ? "#8B6914" : i === 1 ? "#666" : "#F2CD5C",
                }}
              >
                {n.key}
              </span>
              <span className="small-label opacity-40">{n.en}</span>
            </div>
            <p
              className="section-title mb-4"
              style={{ color: i === 2 ? "#F2CD5C" : "#212121" }}
            >
              {n.desc.split("+")[0]}
            </p>
            {n.desc.includes("+") && (
              <p className={`section-title ${i === 2 ? "accent-yellow" : "accent-red"}`}>
                + {n.desc.split("+")[1]}
              </p>
            )}
          </div>
          <p
            className="micro-copy mt-6 max-w-[28ch]"
            style={{ color: i === 2 ? "rgba(254,255,227,.7)" : "#666" }}
          >
            {n.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function CertEmpresa() {
  return (
    <div className="grid md:grid-cols-[1fr_1fr] border-t border-line">
      {/* izquierda: diferencial */}
      <div className="panel-dark border-l-0 border-t-0 px-8 py-8">
        <div className="small-label mb-6 accent-yellow">Para empresas</div>
        <h3 className="sub-title mb-6" style={{color:"#FEFFE3"}}>
          El sello que tus<br />usuarios sí reconocen.
        </h3>

        <div className="grid grid-cols-2 gap-px border border-line/20 mb-8">
          {[
            ["Audiencia",      "Solo B2B",   "B2B + B2C"],
            ["Reconocimiento", "Técnico",    "Gen Z lo busca"],
            ["Niveles",        "Binario",    "Bronce/Plata/Oro"],
            ["Idioma",         "Inglés",     "Español nativo"],
          ].map(([label, them, us]) => (
            <div key={label} className="col-span-2 grid grid-cols-3 border-b border-line/20 last:border-0">
              <div className="px-4 py-3 micro-copy opacity-40">{label}</div>
              <div className="px-4 py-3 micro-copy opacity-40 line-through">{them}</div>
              <div className="px-4 py-3 micro-copy accent-yellow font-bold">{us}</div>
            </div>
          ))}
        </div>

        <a
          href="#contacto"
          className="inline-block px-6 py-3 bg-rojo text-crema small-label hover:bg-amarillo hover:text-negro transition-colors"
        >
          Solicitar certificación →
        </a>
      </div>

      {/* derecha: proceso */}
      <div className="line-box border-l-0 border-t-0 md:border-r-0 px-8 py-8">
        <div className="small-label mb-8">Proceso / 3 pasos</div>
        <div className="flex flex-col gap-0">
          {[
            ["01", "Solicitud + diagnóstico", "Auditoría inicial gratuita: cookies, dark patterns, política de datos."],
            ["02", "Evaluación Prometeo",      "Revisamos según criterios de cada nivel. Informe con mejoras concretas."],
            ["03", "Sello + directorio",       "Recibes el sello para web y app. Apareces en el directorio público Prometeo."],
          ].map(([n, title, desc], i) => (
            <div key={n} className={`flex gap-6 py-6 ${i < 2 ? "border-b border-line" : ""}`}>
              <div
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-rojo accent-red small-label"
              >
                {n}
              </div>
              <div>
                <p className="sub-title mb-1" style={{fontSize:"1.1rem"}}>{title}</p>
                <p className="micro-copy text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-line">
          <a href="#" className="small-label hover:accent-red transition-colors">
            ↓ Descargar dossier para empresas
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Producto / USB Joya ─────────────────────────────── */
function Producto() {
  return (
    <section id="producto" className="grid lg:grid-cols-[0.65fr_1.35fr] border-b border-line">
      {/* izquierda */}
      <div className="grid">
        <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">
          Output / objeto
        </div>
        <div className="line-box border-l-0 border-t-0 px-6 py-8 flex items-end min-h-[200px]">
          <h2 className="section-title">
            Protección<br />que llevas<br />
            <span className="accent-red">puesta.</span>
          </h2>
        </div>
        <div className="line-box border-l-0 border-t-0 px-6 py-6">
          <p className="body-copy">
            El USB Joya es la materialización física de Prometeo: cifrado por
            hardware, diseño como declaración, símbolo político portátil.
          </p>
        </div>
      </div>

      {/* derecha */}
      <div className="grid md:grid-cols-[1.2fr_0.8fr]">
        {/* featured product */}
        <div className="panel-dark border-l-0 border-t-0 px-8 py-8 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="small-label mb-6 accent-yellow">Featured / USB-01</div>
            <h3 className="section-title" style={{color:"#FEFFE3"}}>
              USB<br />Joya
            </h3>
          </div>

          {/* visual placeholder con sigilo */}
          <div className="my-6 flex items-center justify-center min-h-[120px]">
            <SigiloUSB />
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              {["Cifrado hardware", "Diseño joya", "Símbolo político"].map(attr => (
                <div key={attr} className="flex items-center gap-2 mb-1">
                  <span className="accent-red">→</span>
                  <span className="micro-copy" style={{color:"rgba(254,255,227,.8)"}}>{attr}</span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <p style={{fontFamily:'"Funnel Display",serif', fontSize:"3.5rem", fontWeight:800, lineHeight:1, color:"#F2CD5C"}}>39€</p>
              <p className="micro-copy mt-1" style={{color:"rgba(254,255,227,.5)"}}>Ed. limitada</p>
            </div>
          </div>
        </div>

        {/* especificaciones */}
        <div className="grid border-l-0 border-t-0 md:border-r-0">
          {[
            { code: "P/USJ-01", spec: "Capacidad",   val: "64 GB" },
            { code: "P/USJ-01", spec: "Cifrado",     val: "AES-256" },
            { code: "P/USJ-01", spec: "Material",    val: "Acero + resina" },
            { code: "P/USJ-01", spec: "Compatible",  val: "USB-A / C" },
          ].map((item, i) => (
            <div
              key={item.spec}
              className="line-box border-l-0 border-t-0 px-5 py-5 flex items-center justify-between gap-4"
            >
              <div>
                <div className="small-label mb-1 opacity-40">{item.spec}</div>
                <p className="font-bold text-lg uppercase" style={{fontFamily:'"Funnel Display",serif'}}>
                  {item.val}
                </p>
              </div>
              <span className="small-label opacity-20">{item.code}</span>
            </div>
          ))}
          <div className="line-box border-l-0 border-t-0 px-5 py-5 flex items-center">
            <a
              href="#contacto"
              className="w-full text-center py-3 bg-rojo text-crema small-label hover:bg-negro transition-colors"
            >
              Conseguir el USB →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Educativo ───────────────────────────────────────── */
function Educativo() {
  return (
    <section id="educativo" className="border-b border-line">
      <div className="grid md:grid-cols-[0.68fr_1.32fr]">
        <div className="grid">
          <div className="line-box border-l-0 border-t-0 px-6 py-4 small-label">
            Education system
          </div>
          <div className="line-box border-l-0 border-t-0 px-6 py-8 flex items-end min-h-[180px]">
            <h2 className="section-title">
              Aprende a<br />protegerte.<br />
              <span className="accent-red">Gratis.</span>
            </h2>
          </div>
          <div className="line-box border-l-0 border-t-0 px-6 py-6">
            <p className="body-copy">
              Todo el contenido vive en Instagram y TikTok. Sin tecnicismos,
              sin alarmar, en tu idioma.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="nav-link hover:accent-red transition-colors">
                → @prometeo.digital — Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"
                className="nav-link hover:accent-red transition-colors">
                → @prometeo — TikTok
              </a>
            </div>
          </div>
        </div>

        {/* cards educativas */}
        <div className="grid md:grid-cols-3">
          {educCards.map((card, i) => (
            <div
              key={card.id}
              className={`border-l-0 border-t-0 px-6 py-8 flex flex-col justify-between min-h-[280px] ${
                i === 2 ? "panel-dark md:border-r-0" : "line-box"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="small-label opacity-40">{card.id}</span>
                  <span
                    className="nivel-badge"
                    style={{color: i === 2 ? "#F2CD5C" : "#FF4545", borderColor: i === 2 ? "#F2CD5C" : "#FF4545"}}
                  >
                    {card.tag}
                  </span>
                </div>
                <h3
                  className="sub-title mb-4"
                  style={{color: i === 2 ? "#FEFFE3" : "#212121"}}
                >
                  {card.title}
                </h3>
                <p
                  className="micro-copy"
                  style={{color: i === 2 ? "rgba(254,255,227,.7)" : "#666"}}
                >
                  {card.copy}
                </p>
              </div>
              <div className="mt-6">
                <span
                  className="small-label hover:accent-red cursor-pointer transition-colors"
                  style={{color: i === 2 ? "rgba(254,255,227,.4)" : "#999"}}
                >
                  Ver en RRSS →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contacto ────────────────────────────────────────── */
function Contacto() {
  return (
    <section id="contacto" className="grid md:grid-cols-[1fr_1fr] border-b border-line">
      {/* izquierda: RRSS */}
      <div className="panel-dark border-l-0 border-t-0 px-8 py-10">
        <div className="small-label mb-6 accent-yellow">Comunidad</div>
        <h2 className="section-title mb-4" style={{color:"#FEFFE3"}}>
          Únete al<br />
          <span style={{color:"#FF4545"}}>movimiento.</span>
        </h2>
        <p className="body-copy mb-8" style={{color:"rgba(254,255,227,.7)"}}>
          La privacidad digital se construye en comunidad. Síguenos,
          comparte, exige el sello a las marcas que usas.
        </p>

        <div className="flex flex-col gap-3">
          {[
            { platform: "Instagram", handle: "@prometeo.digital", href: "https://instagram.com" },
            { platform: "TikTok",    handle: "@prometeo",         href: "https://tiktok.com" },
          ].map(({ platform, handle, href }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-5 py-4 border border-line/30 hover:border-rojo transition-colors"
            >
              <span className="small-label" style={{color:"rgba(254,255,227,.5)"}}>{platform}</span>
              <span className="small-label accent-yellow">{handle} →</span>
            </a>
          ))}
        </div>
      </div>

      {/* derecha: formulario */}
      <div className="line-box border-l-0 border-t-0 md:border-r-0 px-8 py-10">
        <div className="small-label mb-6">Contacto directo</div>
        <p className="body-copy mb-8">
          ¿Eres empresa y quieres certificarte? ¿Quieres colaborar?
          Escríbenos.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="small-label mb-2 block opacity-60">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-rojo transition-colors font-sans"
            />
          </div>
          <div>
            <label className="small-label mb-2 block opacity-60">Mensaje</label>
            <textarea
              rows={4}
              placeholder="Cuéntanos..."
              className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-rojo transition-colors font-sans resize-none"
            />
          </div>
          <button className="w-full py-3 bg-rojo text-crema small-label hover:bg-negro transition-colors">
            Enviar mensaje →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="grid md:grid-cols-[1fr_auto_auto]">
      <div className="line-box border-l-0 border-t-0 px-6 py-5">
        <div className="small-label mb-2">
          Prometeo — Valeria Cabrera · UDIT Grado Diseño Multimedia 2025/26
        </div>
        <p className="micro-copy opacity-50">
          proyectoprometeo.info · Trabajo de Fin de Grado
        </p>
      </div>
      <div className="line-box border-l-0 border-t-0 px-6 py-5 flex items-center">
        <span className="small-label accent-red">FF4545</span>
      </div>
      <div className="line-box border-l-0 border-t-0 md:border-r-0 px-6 py-5 flex items-center">
        <span className="small-label opacity-40">v4</span>
      </div>
    </footer>
  );
}

/* ── SVG Sigilos ─────────────────────────────────────── */
function SigiloMini() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#212121" strokeWidth="0.8"/>
      <circle cx="16" cy="16" r="8"  stroke="#212121" strokeWidth="0.5"/>
      <path d="M16 2 Q22 9 16 16 Q10 23 16 30" stroke="#FF4545" strokeWidth="0.9" fill="none"/>
      <path d="M2 16 Q9 10 16 16 Q23 22 30 16" stroke="#FF4545" strokeWidth="0.6" fill="none"/>
      <circle cx="16" cy="16" r="2.5" fill="#FF4545"/>
    </svg>
  );
}

function SigiloHero() {
  return (
    <svg width="140" height="160" viewBox="0 0 140 160" fill="none">
      <circle cx="70" cy="80" r="65" stroke="#FEFFE3" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="70" cy="80" r="40" stroke="#FEFFE3" strokeWidth="0.4" opacity="0.2"/>
      <path d="M70 15 Q95 47 70 80 Q45 113 70 145" stroke="#FF4545" strokeWidth="1.2" fill="none"/>
      <path d="M5 80 Q38 55 70 80 Q102 105 135 80" stroke="#FF4545" strokeWidth="0.8" fill="none"/>
      <path d="M70 15 L100 80 L70 145 L40 80 Z" stroke="rgba(254,255,227,0.15)" strokeWidth="0.5" fill="none"/>
      <path d="M25 30 L115 130 M115 30 L25 130" stroke="rgba(254,255,227,0.08)" strokeWidth="0.4"/>
      <circle cx="70" cy="80" r="10" stroke="#F2CD5C" strokeWidth="0.7" opacity="0.6"/>
      <circle cx="70" cy="80" r="3"  fill="#F2CD5C" opacity="0.8"/>
      <path d="M70 15 L78 78 L70 145 L62 78 Z" fill="rgba(255,69,69,0.08)"/>
    </svg>
  );
}

function SigiloSecundario() {
  return (
    <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
      <circle cx="50" cy="60" r="46" stroke="#FEFFE3" strokeWidth="0.4" opacity="0.2"/>
      <path d="M50 14 Q68 37 50 60 Q32 83 50 106" stroke="#FF4545" strokeWidth="1" fill="none"/>
      <path d="M4 60 Q27 43 50 60 Q73 77 96 60" stroke="rgba(242,205,92,0.6)" strokeWidth="0.7" fill="none"/>
      <path d="M14 20 L86 100 M86 20 L14 100" stroke="rgba(254,255,227,0.07)" strokeWidth="0.4"/>
      <circle cx="50" cy="60" r="7" stroke="#F2CD5C" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="50" cy="60" r="2.5" fill="#FF4545" opacity="0.9"/>
    </svg>
  );
}

function SigiloUSB() {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
      <circle cx="40" cy="45" r="36" stroke="rgba(254,255,227,0.15)" strokeWidth="0.5"/>
      <path d="M40 9 Q56 27 40 45 Q24 63 40 81" stroke="#FF4545" strokeWidth="1.2" fill="none"/>
      <path d="M4 45 Q22 33 40 45 Q58 57 76 45" stroke="#F2CD5C" strokeWidth="0.8" fill="none"/>
      <circle cx="40" cy="45" r="6" stroke="#F2CD5C" strokeWidth="0.8" opacity="0.7"/>
      <circle cx="40" cy="45" r="2" fill="#F2CD5C"/>
    </svg>
  );
}

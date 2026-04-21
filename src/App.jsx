// Rentor v2 — main app (light mode, teal + terra system)
import { useState, useEffect, useRef } from 'react';
import { RENTOR_COPY } from './data';
import { HeroSummaryCard, StepListVisual, StepVisitVisual, StepSignVisual, DashboardMock, formatCLP } from './mocks';
import './styles.css';

function useLocalState(key, initial) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

function Nav({ audience, setAudience, locale, setLocale, t }) {
  const b2cRef = useRef(null), b2bRef = useRef(null);
  const [slider, setSlider] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const el = audience === "b2c" ? b2cRef.current : b2bRef.current;
    if (el) setSlider({ x: el.offsetLeft, w: el.offsetWidth });
  }, [audience, locale]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#"><span className="mark" /><span>Rentor</span></a>
        <nav className="nav-links">
          <a href="#product">{t.nav.product}</a>
          <a href="#how">{t.nav.how}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setAudience("b2b"); }}>{t.nav.brokers}</a>
        </nav>
        <div className="nav-right">
          <div className="aud-toggle">
            <span className="slider" style={{ left: slider.x, width: slider.w }} />
            <button ref={b2cRef} className={audience === "b2c" ? "on" : ""} onClick={() => setAudience("b2c")}>{t.audienceToggle.b2c}</button>
            <button ref={b2bRef} className={audience === "b2b" ? "on" : ""} onClick={() => setAudience("b2b")}>{t.audienceToggle.b2b}</button>
          </div>
          <div className="locale">
            <button className={locale === "es" ? "on" : ""} onClick={() => setLocale("es")}>ES</button>
            <span className="sep">/</span>
            <button className={locale === "en" ? "on" : ""} onClick={() => setLocale("en")}>EN</button>
          </div>
          <a className="nav-sign" href="#">{t.nav.signin}</a>
          <a className="btn primary sm" href="#pricing">{t.nav.cta} <span className="arrow">→</span></a>
        </div>
      </div>
    </header>
  );
}

function Hero({ audience, copy }) {
  const h = copy.hero;
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-dots" />
      <div className="container hero-inner">
        <div>
          <div className="eyebrow">{h.eyebrow}</div>
          {audience === "b2c" ? (
            <h1 className="h-display">
              {h.title1}<br />
              <span className="mut">{h.title2}, </span>
              <span className="underline">{h.title3}</span>
              <span className="mut">{h.title4}</span>
            </h1>
          ) : (
            <h1 className="h-display">
              {h.title1}<br /><span className="underline">{h.title2}</span>
            </h1>
          )}
          <p className="lead">{h.sub}</p>
          <div className="hero-ctas">
            <a className="btn primary" href="#pricing">{h.ctaPrimary} <span className="arrow">→</span></a>
            <a className="btn ghost" href="#product">{h.ctaSecondary}</a>
          </div>
          <div className="hero-metrics">
            {h.metrics.map((m, i) => (
              <div key={i} className="hero-metric">
                <div className="k">{m.k}</div>
                <span className="v">{m.v}</span>
                <span className="d">{m.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual"><HeroSummaryCard audience={audience} /></div>
      </div>
    </section>
  );
}

function Steps({ copy, locale }) {
  const s = copy.steps;
  const visuals = [StepListVisual, StepVisitVisual, StepSignVisual];
  const hoverHint = locale === "es" ? "hover para explorar" : "hover to explore";
  return (
    <section className="section" id="how" style={{ background: "var(--surface2)" }}>
      <div className="container">
        <div className="steps-head">
          <div>
            <div className="eyebrow">{s.eyebrow}</div>
            <h2 className="h-2">{s.title1} <span style={{ color: "var(--teal)" }}>{s.title2}</span></h2>
            <p className="lead" style={{ marginTop: 14 }}>{s.sub}</p>
          </div>
          <div className="right">01 ─── 02 ─── 03<br /><span style={{ opacity: 0.6 }}>{hoverHint}</span></div>
        </div>
        <div className="steps-grid">
          {s.items.map((it, i) => {
            const V = visuals[i];
            return (
              <article key={i} className="step-card">
                <div className="step-num">PASO {it.n}</div>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
                <div className="step-visual"><V /></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DashboardSection({ audience, copy, t }) {
  const d = copy.dash;
  return (
    <section className="section dash-section" id="product">
      <div className="container">
        <div className="eyebrow">{d.eyebrow}</div>
        <h2 className="h-2" style={{ maxWidth: 700 }}>{d.title}</h2>
        <p className="lead">{d.sub}</p>
        <DashboardMock audience={audience} t={t} />
        <div className="feat-row">
          {d.feat.map((f, i) => (
            <div key={i} className="feat">
              <div className="num">0{i + 1}</div>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function B2CPricing({ copy, locale }) {
  const [billing, setBilling] = useLocalState("rentor-v2-billing", "monthly");
  const monthlyRef = useRef(null), annualRef = useRef(null);
  const [slider, setSlider] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const el = billing === "monthly" ? monthlyRef.current : annualRef.current;
    if (el) setSlider({ x: el.offsetLeft, w: el.offsetWidth });
  }, [billing, locale]);

  const p = copy.pricing;
  const currency = locale === "es" ? "$" : "US$";
  const unit = locale === "es" ? "CLP / mes" : "/ month";

  return (
    <section className="section" id="pricing" style={{ background: "var(--surface2)" }}>
      <div className="container">
        <div className="pricing-head">
          <div>
            <div className="eyebrow">{p.eyebrow}</div>
            <h2 className="h-2">{p.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{p.sub}</p>
          </div>
          <div className="right">
            <div className="billing-toggle">
              <span className="slider" style={{ left: slider.x, width: slider.w }} />
              <button ref={monthlyRef} className={billing === "monthly" ? "on" : ""} onClick={() => setBilling("monthly")}>{p.monthly}</button>
              <button ref={annualRef} className={billing === "annual" ? "on" : ""} onClick={() => setBilling("annual")}>{p.annual}</button>
            </div>
          </div>
        </div>
        <div className="pricing-grid">
          {p.plans.map((plan, i) => {
            const price = billing === "annual" && plan.priceAnnual ? plan.priceAnnual : plan.price;
            return (
              <div key={i} className={`plan ${plan.featured ? "featured" : ""}`}>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">
                  {plan.contact ? <span className="v contact">{locale === "es" ? "Hablemos" : "Let's talk"}</span> : (
                    <><span className="curr">{currency}</span><span className="v">{locale === "es" ? formatCLP(price) : price.toLocaleString()}</span><span className="u">{unit}</span></>
                  )}
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <ul className="plan-feats">{plan.feats.map((f, j) => <li key={j}>{f}</li>)}</ul>
                <a className={`btn ${plan.featured ? "" : plan.contact ? "secondary" : "ghost"}`} href="#">
                  {plan.cta} {plan.contact ? "→" : ""}
                </a>
              </div>
            );
          })}
        </div>
        <div className="pricing-note">
          <span>{p.note}</span>
          <a href="#">→ {locale === "es" ? "comparar planes" : "compare plans"}</a>
        </div>
      </div>
    </section>
  );
}

function B2BPricing({ copy, locale }) {
  const p = copy.pricing;
  const tiers = locale === "es"
    ? [{ n:"Starter",r:"10–25 prop.",p:"$5.000 / prop / mes"},{n:"Professional",r:"25–75 prop.",p:"$4.000 / prop / mes"},{n:"Business",r:"75–150 prop.",p:"$3.500 / prop / mes"},{n:"Enterprise",r:"150+ prop.",p:"desde $3.000 · custom"}]
    : [{ n:"Starter",r:"10–25 units",p:"$5 / unit / mo"},{n:"Professional",r:"25–75 units",p:"$4 / unit / mo"},{n:"Business",r:"75–150 units",p:"$3.50 / unit / mo"},{n:"Enterprise",r:"150+ units",p:"from $3 · custom"}];
  return (
    <section className="section" id="pricing" style={{ background: "var(--surface2)" }}>
      <div className="container">
        <div className="eyebrow">{p.eyebrow}</div>
        <h2 className="h-2" style={{ maxWidth: 720 }}>{p.title}</h2>
        <p className="lead" style={{ marginTop: 14, marginBottom: 48 }}>{p.sub}</p>
        <div className="b2b-contact">
          <div>
            <h3 className="h-3" style={{ marginBottom: 10 }}>{locale === "es" ? "Plan a la medida de tu cartera." : "A plan tailored to your portfolio."}</h3>
            <p className="lead" style={{ fontSize: 14 }}>{locale === "es" ? "Te mostramos el producto, calculamos el ahorro y diseñamos juntos el pricing que hace sentido para tu volumen." : "We show you the product, calculate savings, and design pricing that fits your volume."}</p>
            <div style={{ marginTop: 22, display:"flex", gap:10, flexWrap:"wrap" }}>
              <a className="btn primary" href="#">{locale === "es" ? "Agendar demo · 20 min" : "Book a 20-min demo"} <span className="arrow">→</span></a>
              <a className="btn ghost" href="#">{locale === "es" ? "Descargar one-pager" : "Download one-pager"}</a>
            </div>
          </div>
          <div className="tiers">
            {tiers.map((ti, i) => (
              <div key={i} className="b2b-tier">
                <div><div className="tname">{ti.n}</div><div className="trange">{ti.r}</div></div>
                <div className="tprice">{ti.p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function B2BSavings({ copy }) {
  return (
    <section className="section tight">
      <div className="container">
        <div className="b2b-savings">
          {copy.hero.metrics.map((m, i) => (
            <div key={i} className="b2b-sav">
              <div className="v">{m.v}</div>
              <div className="k">{m.k}</div>
              <div className="d">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ copy, locale }) {
  const c = copy.cta;
  return (
    <section className="cta-section">
      <div className="hero-dots" />
      <div className="container cta-inner" style={{ position: "relative" }}>
        <div>
          <div className="eyebrow">{locale === "es" ? "EMPEZAR HOY" : "GET STARTED TODAY"}</div>
          <h2>{c.title}</h2>
          <p className="lead">{c.sub}</p>
          <div className="btns">
            <a className="btn primary" href="#">{c.primary} <span className="arrow">→</span></a>
            <a className="btn ghost" style={{ color:"white", borderColor:"rgba(255,255,255,0.2)" }} href="#">{c.secondary}</a>
          </div>
        </div>
        <div className="cta-mark">R.</div>
      </div>
    </section>
  );
}

function Footer({ copy, locale }) {
  const f = copy.footer;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand"><span className="mark" /><span>Rentor</span></div>
            <p>{f.tagline}</p>
            <div className="contact">hola@rentor.cl · +56 2 2xxx xxxx</div>
          </div>
          <div className="footer-col"><h5>{f.col.product}</h5><ul>{f.product.map((it,i)=><li key={i}><a href="#">{it}</a></li>)}</ul></div>
          <div className="footer-col"><h5>{f.col.resources}</h5><ul>{f.resources.map((it,i)=><li key={i}><a href="#">{it}</a></li>)}</ul></div>
          <div className="footer-col"><h5>{f.col.legal}</h5><ul>{f.legal.map((it,i)=><li key={i}><a href="#">{it}</a></li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Rentor SpA · {locale === "es" ? "Santiago de Chile" : "Santiago, Chile"}</span>
          <span><span className="status-dot">●</span> {locale === "es" ? "Todos los sistemas operando" : "All systems operational"}</span>
        </div>
      </div>
    </footer>
  );
}

function TweaksPanel({ open, settings, setSettings }) {
  const palettes = [
    { name: "teal", primary: "#0B8F7E", secondary: "#D9623E" },
    { name: "indigo", primary: "#4F46E5", secondary: "#F59E0B" },
    { name: "rose", primary: "#E11D48", secondary: "#0891B2" },
    { name: "violet", primary: "#7C3AED", secondary: "#10B981" },
  ];
  if (!open) return null;
  return (
    <div className="tweaks-panel on">
      <h5>TWEAKS</h5>
      <div className="tweak-row">
        <label>PALETA</label>
        <div className="tweak-swatch-row">
          {palettes.map((p) => (
            <div key={p.name} className={`tweak-swatch ${settings.palette === p.name ? "on" : ""}`}
              style={{ background: `linear-gradient(135deg, ${p.primary} 50%, ${p.secondary} 50%)` }}
              onClick={() => setSettings({ ...settings, palette: p.name, primary: p.primary, secondary: p.secondary })}
              title={p.name} />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>HERO TONE</label>
        <select style={{ background:"white", color:"var(--text)", border:"1.5px solid var(--border)", borderRadius:6, padding:"7px 10px", fontSize:12, fontFamily:"inherit" }}
          value={settings.heroTone}
          onChange={(e) => setSettings({ ...settings, heroTone: e.target.value })}>
          <option value="emocional">Emocional · "Deja de perseguir"</option>
          <option value="directo">Directo · "Publica, visita, firma"</option>
          <option value="producto">Producto · "Sistema operativo"</option>
        </select>
      </div>
      <div className="tweak-row">
        <label>DENSIDAD · {settings.density}×</label>
        <input type="range" min="0.85" max="1.15" step="0.05"
          value={settings.density}
          onChange={(e) => setSettings({ ...settings, density: parseFloat(e.target.value) })} />
      </div>
    </div>
  );
}

export default function App() {
  const [audience, setAudience] = useLocalState("rentor-v2-audience", "b2c");
  const [locale, setLocale] = useLocalState("rentor-v2-locale", "es");
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const TWEAK_DEFAULTS = {
    "palette": "teal",
    "primary": "#0B8F7E",
    "secondary": "#D9623E",
    "heroTone": "emocional",
    "density": 1
  };
  const [settings, setSettings] = useLocalState("rentor-v2-tweaks-v2", TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty("--teal", settings.primary);
    document.documentElement.style.setProperty("--teal-dark", settings.primary);
    document.documentElement.style.setProperty("--teal-light", settings.primary + "1a");
    document.documentElement.style.setProperty("--terra", settings.secondary);
    document.documentElement.style.setProperty("--terra-light", settings.secondary + "1a");
    document.documentElement.style.fontSize = `${15 * settings.density}px`;
  }, [settings]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: settings }, "*");
  }, [settings]);

  const COPY = RENTOR_COPY[locale];
  const t = COPY.b2c;
  const audCopy = audience === "b2b" ? COPY.b2b : COPY.b2c;

  let displayCopy = audCopy;
  if (audience === "b2c" && settings.heroTone !== "emocional") {
    const overrides = {
      directo: locale === "es"
        ? { title1:"Publica, visita, firma.", title2:"Todo el ciclo del arriendo", title3:"en un lugar", title4:"." }
        : { title1:"List, show, sign.", title2:"The full rental cycle", title3:"in one place", title4:"." },
      producto: locale === "es"
        ? { title1:"El sistema operativo", title2:"de tu", title3:"cartera", title4:" de arriendos." }
        : { title1:"The operating system", title2:"for your", title3:"rental", title4:" portfolio." },
    };
    displayCopy = { ...audCopy, hero: { ...audCopy.hero, ...overrides[settings.heroTone] } };
  }

  return (
    <>
      <Nav audience={audience} setAudience={setAudience} locale={locale} setLocale={setLocale} t={t} />
      <main>
        <Hero audience={audience} copy={displayCopy} />
        {audience === "b2b" && <B2BSavings copy={audCopy} />}
        <Steps copy={audCopy} locale={locale} />
        <DashboardSection audience={audience} copy={audCopy} t={t} />
        {audience === "b2c" ? <B2CPricing copy={audCopy} locale={locale} /> : <B2BPricing copy={audCopy} locale={locale} />}
        <FinalCTA copy={audCopy} locale={locale} />
      </main>
      <Footer copy={COPY.b2c} locale={locale} />
      <TweaksPanel open={tweaksOpen} settings={settings} setSettings={setSettings} />
    </>
  );
}

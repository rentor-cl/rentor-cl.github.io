// Mock product screenshots — rendered as real DOM so they feel alive
import { useState, useEffect } from 'react';

// Small utility
export function formatCLP(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// --- Hero mini card: summary of the current month ---
export function HeroSummaryCard({ audience }) {
  const b2c = {
    title: "RENTOR · RESUMEN",
    period: "OCT 2026",
    amount: "2.850.000",
    currency: "CLP",
    label: "Cobrado este mes · 5 unidades",
    rows: [
      ["Depto 1204 · Providencia", "PAGADO", "paid"],
      ["Casa Ñuñoa", "PAGADO", "paid"],
      ["Oficina Las Condes", "2 DÍAS ATRASO", "late"],
      ["Depto 806 · Ñuñoa", "PAGADO", "paid"],
      ["Depto Estudio · Stgo", "PAGADO", "paid"],
    ],
  };
  const b2b = {
    title: "CORREDORA VISTA · CARTERA",
    period: "OCT 2026",
    amount: "38.420.000",
    currency: "CLP",
    label: "Cobrado · 54 unidades · 3 agentes",
    rows: [
      ["Cartera · Juan Pérez", "18 / 20", "paid"],
      ["Cartera · Ana Reyes", "17 / 17", "paid"],
      ["Cartera · M. Soto", "15 / 17", "late"],
      ["Liquidación propietarios", "EN CURSO", "pend"],
      ["Nuevos contratos mes", "3 FIRMADOS", "paid"],
    ],
  };
  const d = audience === "b2b" ? b2b : b2c;

  return (
    <div className="mock-hero-card">
      <div className="mhc-head">
        <span>{d.title}</span>
        <span>{d.period}</span>
      </div>
      <div className="mhc-amt">
        <span className="curr">$</span>
        {d.amount}
      </div>
      <div className="mhc-lbl">{d.label}</div>
      <div className="mhc-rows">
        {d.rows.map(([label, status, kind], i) => (
          <div key={i} className="mhc-row">
            <span className="mhc-addr">{label}</span>
            <span className={`mhc-status ${kind}`}>{status}</span>
          </div>
        ))}
      </div>
      <div className="mhc-foot">
        <span className="mhc-live"><span className="dot" /> en vivo</span>
        <span>próxima actualización en 02:14</span>
      </div>
    </div>
  );
}

// --- Step 1 visual: Property listing form ---
export function StepListVisual() {
  return (
    <div className="s1">
      <div className="s1-card">
        <div className="s1-ph">
          <div className="s1-camera" />
          <span>arrastra fotos aquí · 4 portales</span>
        </div>
        <div className="s1-fields">
          <div className="s1-field">
            <span className="s1-label">CANON</span>
            <span className="s1-value">$650.000</span>
          </div>
          <div className="s1-field">
            <span className="s1-label">METROS</span>
            <span className="s1-value">64 m²</span>
          </div>
          <div className="s1-field">
            <span className="s1-label">DORM.</span>
            <span className="s1-value">2</span>
          </div>
        </div>
        <div className="s1-chips">
          <span className="s1-chip on">✓ Portal Inmobiliario</span>
          <span className="s1-chip on">✓ Yapo</span>
          <span className="s1-chip on">✓ Toctoc</span>
          <span className="s1-chip">MercadoLibre</span>
        </div>
      </div>
    </div>
  );
}

// --- Step 2 visual: Booking calendar ---
export function StepVisitVisual() {
  const days = [];
  for (let i = 1; i <= 28; i++) {
    let state = "";
    if ([7, 10, 14].includes(i)) state = "hover";
    if ([8, 17].includes(i)) state = "active";
    if (i === 22) state = "today";
    days.push({ n: i, state });
  }
  return (
    <div className="s2">
      <div className="s2-head">
        <span>OCTUBRE 2026</span>
        <span>3 visitas</span>
      </div>
      <div className="s2-wk">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="s2-grid">
        {days.map((d, i) => (
          <span key={i} className={`s2-d ${d.state}`}>{d.n}</span>
        ))}
      </div>
      <div className="s2-slots">
        <div className="s2-slot"><span>10:00</span><span className="n">María G.</span><span className="tag">✓ verificada</span></div>
        <div className="s2-slot"><span>16:30</span><span className="n">Andrés P.</span><span className="tag">✓ verificado</span></div>
      </div>
    </div>
  );
}

// --- Step 3 visual: Contract with signature ---
export function StepSignVisual() {
  return (
    <div className="s3">
      <div className="s3-doc">
        <div className="s3-doc-head">
          <span>CONTRATO DE ARRIENDO</span>
          <span className="s3-badge">FIRMADO</span>
        </div>
        <div className="s3-lines">
          <div className="s3-line" />
          <div className="s3-line s" />
          <div className="s3-line" />
          <div className="s3-line" />
          <div className="s3-line s" />
          <div className="s3-line" />
          <div className="s3-line s" />
        </div>
        <div className="s3-sig-area">
          <div className="s3-sig">
            <span className="s3-name">M. González</span>
            <span className="s3-role">ARRENDATARIA</span>
          </div>
          <div className="s3-sig">
            <span className="s3-name">J. Rivas</span>
            <span className="s3-role">PROPIETARIO</span>
          </div>
        </div>
        <div className="s3-meta">
          <span>Hash · a84f...e291</span>
          <span>08 oct 2026 · 14:23</span>
        </div>
      </div>
    </div>
  );
}

// --- Big dashboard mock ---
export function DashboardMock({ audience, t }) {
  const isB2B = audience === "b2b";
  const kpis = isB2B
    ? [
        { k: "COBRADO", v: "$38.4M", d: "↑ 6.1% vs sept", g: true },
        { k: "OCUPACIÓN", v: "52/54", d: "96%" },
        { k: "MOROSIDAD", v: "2.1%", d: "2 atrasos", r: true },
        { k: "VACANTES", v: "2", d: "promedio 11 días" },
      ]
    : [
        { k: "COBRADO", v: "$2.85M", d: "↑ 4.2% vs sept", g: true },
        { k: "OCUPACIÓN", v: "5/5", d: "100%" },
        { k: "MOROSIDAD", v: "1.8%", d: "1 atraso", r: true },
        { k: "MANTENCIONES", v: "2", d: "pendientes" },
      ];

  const rows = isB2B
    ? [
        ["Cartera Juan P. · 20 unidades", "Depto 1204 Providencia · María G.", "PAGADO", "$650.000"],
        ["Cartera Juan P. · 20 unidades", "Casa Ñuñoa · Andrés P.", "PAGADO", "$820.000"],
        ["Cartera Ana R. · 17 unidades", "Oficina Las Condes · Constructora Rojas", "2 DÍAS", "$950.000"],
        ["Cartera M. Soto · 17 unidades", "Depto 806 Ñuñoa · Camila F.", "EN FIRMA", "$520.000"],
        ["Cartera Ana R. · 17 unidades", "Local Recoleta · Pharma SpA", "PAGADO", "$1.240.000"],
      ]
    : [
        ["Depto 1204 · Providencia", "María G.", "PAGADO", "$650.000"],
        ["Casa · Ñuñoa", "Andrés P.", "PAGADO", "$820.000"],
        ["Oficina · Las Condes", "Constructora Rojas", "2 DÍAS", "$950.000"],
        ["Depto 806 · Ñuñoa", "Camila F.", "EN FIRMA", "$520.000"],
        ["Depto Estudio · Stgo", "Patricia L.", "PAGADO", "$380.000"],
      ];

  const navItems = isB2B
    ? ["Resumen", "Cartera", "Agentes", "Propietarios", "Arrendatarios", "Pagos", "Contratos", "Liquidación", "Reportes", "Configuración"]
    : ["Resumen", "Propiedades", "Arrendatarios", "Pagos", "Contratos", "Mantenciones", "Reportes", "Configuración"];

  return (
    <div className="dash-mock">
      <div className="dash-chrome">
        <div className="dc-dots"><span /><span /><span /></div>
        <div className="dc-url">
          <span className="mono">{isB2B ? "app.corredorasantiago.cl" : "app.rentor.cl"}</span>
          <span className="dc-lock">●</span>
        </div>
        <div className="dc-user">JR</div>
      </div>

      <div className="dash-body">
        <aside className="dm-side">
          <div className="dm-brand">
            <div className="dm-mark" />
            <span>{isB2B ? "Corredora Santiago" : "Rentor"}</span>
          </div>
          <div className="dm-search mono">⌘K  buscar</div>
          <div className="dm-nav-label">NAVEGACIÓN</div>
          {navItems.map((n, i) => (
            <div key={i} className={`dm-nav-item ${i === 0 ? "on" : ""}`}>
              <span className="dm-ico" />
              {n}
            </div>
          ))}
          <div className="dm-footer">
            <div className="dm-user">
              <div className="dm-avatar">JR</div>
              <div>
                <div>Juan Rivas</div>
                <div className="mono dim">{isB2B ? "Admin" : "Propietario"}</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="dm-main">
          <div className="dm-head">
            <div>
              <div className="dm-breadcrumb mono">{isB2B ? "corredora / resumen" : "inicio / resumen"}</div>
              <h3>Resumen · Octubre 2026</h3>
            </div>
            <div className="dm-actions">
              <span className="dm-btn ghost">Exportar</span>
              <span className="dm-btn primary">+ Nueva propiedad</span>
            </div>
          </div>

          <div className="dm-kpis">
            {kpis.map((k, i) => (
              <div key={i} className="dm-kpi">
                <div className="dm-kpi-lbl mono">{k.k}</div>
                <div className={`dm-kpi-v ${k.g ? "green" : ""}`}>{k.v}</div>
                <div className={`dm-kpi-d mono ${k.g ? "green" : k.r ? "warn" : ""}`}>{k.d}</div>
              </div>
            ))}
          </div>

          <div className="dm-table">
            <div className="dm-tbl-head mono">
              <span>{isB2B ? "CARTERA / PROPIEDAD" : "PROPIEDAD"}</span>
              <span>{isB2B ? "" : "ARRENDATARIO"}</span>
              <span>ESTADO</span>
              <span>CANON</span>
            </div>
            {rows.map((r, i) => {
              const statusClass = r[2].includes("PAGADO") ? "paid" : r[2].includes("DÍAS") ? "late" : "pend";
              return (
                <div key={i} className="dm-tbl-row">
                  <span className="dm-prop">
                    <span className="dm-thumb" />
                    <span className="dm-prop-text">{r[0]}</span>
                  </span>
                  <span className="dm-tenant">{r[1]}</span>
                  <span className={`dm-status ${statusClass}`}>{r[2]}</span>
                  <span className="dm-amount mono">{r[3]}</span>
                </div>
              );
            })}
          </div>

          <div className="dm-chart">
            <div className="dm-chart-head">
              <span className="mono dim">INGRESOS 2026 · CLP</span>
              <span className="mono green">+28% YoY</span>
            </div>
            <div className="dm-bars">
              {[40, 52, 48, 60, 58, 66, 72, 70, 78, 82].map((h, i) => (
                <div key={i} className="dm-bar" style={{ height: `${h}%` }} />
              ))}
              {[85].map((h, i) => (
                <div key={"c" + i} className="dm-bar current" style={{ height: `${h}%` }} />
              ))}
              {[0, 0].map((h, i) => (
                <div key={"f" + i} className="dm-bar future" />
              ))}
            </div>
            <div className="dm-bars-x mono">
              <span>ENE</span><span>FEB</span><span>MAR</span><span>ABR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AGO</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DIC</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

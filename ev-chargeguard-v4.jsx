import { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black:      #111111;
    --charcoal:   #1e1e1e;
    --dark-grey:  #2c2c2c;
    --mid-grey:   #5a5a5a;
    --grey:       #8a8a8a;
    --light-grey: #d4d4d4;
    --pale:       #f0f0f0;
    --surface:    #f7f6f4;
    --white:      #ffffff;
    --orange:     #f26419;
    --orange-hi:  #ff7a2f;
    --orange-dim: #c94e0e;
    --orange-bg:  rgba(242,100,25,0.08);
    --border:     rgba(0,0,0,0.09);
    --font:       'Space Grotesk', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font); background: var(--white); color: var(--black); overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 64px;
    background: rgba(255,255,255,0.96); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-size: 18px; font-weight: 700; letter-spacing: 1.5px; color: var(--black); display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
  .nav-logo .bolt { width: 28px; height: 28px; background: var(--orange); border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #fff; }
  .nav-logo span { color: var(--orange); }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link { font-family: var(--font); font-size: 13px; font-weight: 500; color: var(--mid-grey); cursor: pointer; transition: color 0.18s; background: none; border: none; padding: 8px 14px; border-radius: 6px; }
  .nav-link:hover, .nav-link.active { color: var(--black); background: var(--pale); }
  .nav-btn { font-family: var(--font); font-size: 13px; font-weight: 600; padding: 9px 20px; cursor: pointer; border-radius: 6px; transition: all 0.2s; background: var(--black); color: var(--white); border: none; margin-left: 8px; }
  .nav-btn:hover { background: var(--orange); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(242,100,25,0.3); }

  /* HERO */
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 120px 48px 80px; position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 55% at 50% -5%, rgba(242,100,25,0.09) 0%, transparent 65%), radial-gradient(ellipse 35% 30% at 90% 70%, rgba(242,100,25,0.05) 0%, transparent 55%); }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.032) 1px, transparent 1px); background-size: 54px 54px; mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 25%, transparent 100%); }
  .hero-content { position: relative; z-index: 1; text-align: center; max-width: 860px; }
  .hero-tag { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 28px; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); padding: 6px 16px; border-radius: 20px; border: 1px solid rgba(242,100,25,0.28); background: rgba(242,100,25,0.06); }
  .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.75)} }
  .hero h1 { font-size: clamp(48px,7.5vw,92px); font-weight: 700; line-height: 0.96; letter-spacing: -2px; margin-bottom: 24px; color: var(--black); }
  .hero h1 em { font-style: normal; color: var(--orange); }
  .hero p { font-size: clamp(16px,2vw,19px); color: var(--mid-grey); max-width: 540px; margin: 0 auto 44px; line-height: 1.65; }
  .hero-btns { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }

  /* BUTTONS */
  .btn { font-family: var(--font); font-size: 14px; font-weight: 600; padding: 13px 28px; border-radius: 7px; cursor: pointer; border: none; transition: all 0.22s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-orange { background: var(--orange); color: #fff; box-shadow: 0 4px 20px rgba(242,100,25,0.28); }
  .btn-orange:hover { background: var(--orange-hi); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(242,100,25,0.4); }
  .btn-outline { background: transparent; color: var(--black); border: 1.5px solid var(--light-grey); }
  .btn-outline:hover { border-color: var(--orange); color: var(--orange); }
  .btn-black { background: var(--black); color: #fff; }
  .btn-black:hover { background: var(--charcoal); box-shadow: 0 4px 14px rgba(0,0,0,0.18); }
  .btn-full { width: 100%; justify-content: center; }
  .btn-sm { font-size: 12px; padding: 9px 18px; }

  /* STATS BAR */
  .stats-bar { display: grid; grid-template-columns: repeat(3,1fr); background: var(--black); }
  .stat { padding: 32px 48px; border-right: 1px solid rgba(255,255,255,0.07); }
  .stat:last-child { border-right: none; }
  .stat-num { font-size: 44px; font-weight: 700; color: var(--white); line-height: 1; }
  .stat-num span { color: var(--orange); }
  .stat-label { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--grey); margin-top: 6px; }

  /* SECTIONS */
  section { padding: 96px 48px; }
  .section-tag { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 14px; }
  .section-title { font-size: clamp(32px,4.5vw,54px); font-weight: 700; line-height: 1.02; letter-spacing: -1px; color: var(--black); margin-bottom: 20px; }
  .max-w { max-width: 1200px; margin: 0 auto; }

  /* HOW IT WORKS */
  .how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .how-text p { color: var(--mid-grey); font-size: 16px; line-height: 1.72; margin-bottom: 28px; }
  .steps { display: flex; flex-direction: column; }
  .step { display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--border); }
  .step:last-child { border-bottom: none; }
  .step-num { font-size: 30px; font-weight: 700; color: var(--light-grey); min-width: 44px; line-height: 1; }
  .step h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  .step p { color: var(--grey); font-size: 13px; line-height: 1.58; }

  /* SAMPLE MAP */
  @keyframes popIn { from{opacity:0;transform:scale(0.92)translateY(4px)} to{opacity:1;transform:scale(1)translateY(0)} }
  .map-legend-bar { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; padding: 12px 20px; background: var(--black); }
  .mli { display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 500; color: var(--grey); }
  .mli-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

  /* LOCATIONS */
  .loc-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(268px,1fr)); gap: 16px; margin-top: 44px; }
  .loc-card { border: 1px solid var(--border); border-radius: 8px; padding: 22px; background: var(--white); transition: all 0.22s; cursor: pointer; position: relative; overflow: hidden; }
  .loc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--orange),#f5a623); transform:scaleX(0); transition:transform 0.28s; transform-origin:left; }
  .loc-card:hover::before { transform:scaleX(1); }
  .loc-card:hover { border-color:rgba(242,100,25,0.25); transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
  .loc-status { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; letter-spacing:1.2px; text-transform:uppercase; margin-bottom:10px; }
  .loc-dot { width:6px; height:6px; border-radius:50%; }
  .loc-dot.on { background:#22c55e; box-shadow:0 0 5px #22c55e; animation:pulse 2s infinite; }
  .loc-name { font-size:20px; font-weight:700; margin-bottom:4px; }
  .loc-meta { font-size:12px; color:var(--grey); }
  .loc-stats { display:flex; gap:16px; margin-top:14px; padding-top:14px; border-top:1px solid var(--border); }
  .loc-stat { font-size:11px; color:var(--grey); }
  .loc-stat strong { display:block; font-size:18px; font-weight:700; color:var(--black); }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
  .contact-info h3 { font-size: 28px; font-weight: 700; margin-bottom: 22px; }
  .contact-detail { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); }
  .ci-icon { width: 34px; height: 34px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .ci-label { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--grey); }
  .ci-val { font-size: 14px; font-weight: 500; }

  /* FORMS */
  .form { display: flex; flex-direction: column; gap: 14px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .fg { display: flex; flex-direction: column; gap: 5px; }
  .fg label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--mid-grey); }
  .fg input, .fg textarea, .fg select { font-family: var(--font); background: var(--surface); border: 1.5px solid var(--border); border-radius: 6px; padding: 11px 14px; color: var(--black); font-size: 14px; transition: border-color 0.18s, box-shadow 0.18s; outline: none; }
  .fg input:focus, .fg textarea:focus, .fg select:focus { border-color: var(--orange); box-shadow: 0 0 0 3px rgba(242,100,25,0.09); }
  .fg textarea { resize: vertical; min-height: 110px; }
  .form-success { text-align: center; padding: 32px 20px; border: 1.5px solid rgba(34,197,94,0.3); border-radius: 8px; background: rgba(34,197,94,0.05); }
  .form-success .check { font-size: 40px; margin-bottom: 12px; }
  .form-success h4 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
  .form-success p { font-size: 13px; color: var(--grey); }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; z-index: 500; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal { background: var(--white); border-radius: 12px; width: 100%; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.15); animation: modalIn 0.22s ease; }
  .modal-sm { max-width: 480px; }
  .modal-md { max-width: 580px; }
  @keyframes modalIn { from{opacity:0;transform:scale(0.96)translateY(8px)} to{opacity:1;transform:scale(1)translateY(0)} }
  .modal-head { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-head h3 { font-size: 18px; font-weight: 700; }
  .modal-close { background: none; border: none; font-size: 20px; color: var(--grey); cursor: pointer; }
  .modal-close:hover { color: var(--black); }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 14px 24px; border-top: 1px solid var(--border); text-align: center; font-size: 13px; color: var(--grey); }
  .modal-footer a { color: var(--orange); cursor: pointer; font-weight: 500; }

  /* MULTI-STEP */
  .step-indicator { display: flex; align-items: flex-start; margin-bottom: 24px; }
  .step-circle { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--light-grey); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--grey); transition: all 0.2s; flex-shrink: 0; }
  .step-circle.done { background: var(--orange); border-color: var(--orange); color: #fff; }
  .step-circle.active { border-color: var(--orange); color: var(--orange); }
  .step-line { height: 2px; flex: 1; background: var(--light-grey); margin-top: 13px; transition: background 0.2s; }
  .step-line.done { background: var(--orange); }

  /* PORTAL */
  .portal-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 100px 24px 40px; background: var(--surface); }
  .login-box { background: var(--white); border: 1px solid var(--border); border-radius: 12px; width: 100%; max-width: 420px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.07); }
  .login-head { padding: 30px 30px 22px; border-bottom: 1px solid var(--border); text-align: center; }
  .login-icon { width: 52px; height: 52px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin: 0 auto 14px; }
  .login-head h2 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
  .login-head p { font-size: 13px; color: var(--grey); }
  .login-body { padding: 24px 30px; display: flex; flex-direction: column; gap: 14px; }
  .login-foot { padding: 14px 30px; border-top: 1px solid var(--border); text-align: center; font-size: 13px; color: var(--grey); }
  .login-foot a { color: var(--orange); cursor: pointer; font-weight: 500; }

  /* DASHBOARD */
  .dashboard { min-height: 100vh; padding-top: 64px; background: var(--surface); }
  .dash-head { padding: 20px 36px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--white); }
  .dash-head h2 { font-size: 22px; font-weight: 700; }
  .dash-head p { font-size: 12px; color: var(--grey); margin-top: 2px; }
  .toggle-wrap { display: flex; align-items: center; gap: 10px; font-size: 13px; }
  .toggle-pill { width: 42px; height: 23px; border-radius: 12px; border: none; cursor: pointer; position: relative; transition: background 0.2s; }
  .toggle-pill.on { background: #22c55e; }
  .toggle-pill.off { background: var(--light-grey); }
  .toggle-pill::after { content:''; position:absolute; top:2px; width:19px; height:19px; border-radius:50%; background:#fff; transition:left 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.15); }
  .toggle-pill.on::after { left:21px; }
  .toggle-pill.off::after { left:2px; }
  .dash-body { display: grid; grid-template-columns: 1fr 320px; height: calc(100vh - 64px - 65px); }
  .dash-main { padding: 24px 28px; overflow-y: auto; }
  .dash-side { border-left: 1px solid var(--border); overflow-y: auto; background: var(--white); }
  .sec-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .sec-hdr h3 { font-size: 16px; font-weight: 700; }
  .badge { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
  .badge-red { background:rgba(239,68,68,0.1); color:#dc2626; border:1px solid rgba(239,68,68,0.22); }
  .badge-orange { background:rgba(242,100,25,0.1); color:var(--orange-dim); border:1px solid rgba(242,100,25,0.22); }
  .badge-green { background:rgba(34,197,94,0.1); color:#16a34a; border:1px solid rgba(34,197,94,0.22); }
  .job-wrap { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--white); }
  .job-tbl { width: 100%; border-collapse: collapse; }
  .job-tbl th { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--grey); text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--border); background: var(--surface); }
  .job-tbl td { padding: 13px 14px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--charcoal); vertical-align: middle; }
  .job-tbl tr:last-child td { border-bottom: none; }
  .job-tbl tr:hover td { background: var(--surface); }
  .fault-pill { font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 4px; }
  .fault-crit { background:rgba(239,68,68,0.08); color:#dc2626; }
  .fault-warn { background:rgba(242,100,25,0.08); color:var(--orange-dim); }
  .accept-btn { font-family:var(--font); font-size:11px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; padding:6px 14px; border-radius:5px; cursor:pointer; border:1.5px solid var(--orange); background:rgba(242,100,25,0.06); color:var(--orange); transition:all 0.18s; }
  .accept-btn:hover { background:var(--orange); color:#fff; }
  .payout-val { font-size:15px; font-weight:700; }
  .side-sec { padding: 18px 18px 0; }
  .side-sec h4 { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--grey); margin-bottom: 12px; }
  .metric-card { border: 1px solid var(--border); border-radius: 7px; padding: 14px 16px; margin-bottom: 9px; background: var(--surface); }
  .metric-val { font-size: 28px; font-weight: 700; line-height: 1; }
  .metric-val.orange { color: var(--orange); }
  .metric-val.green { color: #16a34a; }
  .metric-label { font-size: 11px; color: var(--grey); margin-top: 3px; }

  /* ADMIN */
  .admin-layout { display: grid; grid-template-columns: 220px 1fr; min-height: calc(100vh - 64px); }
  .admin-side { background: var(--white); border-right: 1px solid var(--border); padding: 20px 0; }
  .admin-nav-btn { width:100%; display:flex; align-items:center; gap:10px; padding:10px 20px; font-family:var(--font); font-size:13px; font-weight:500; color:var(--grey); background:none; border:none; border-left:3px solid transparent; cursor:pointer; transition:all 0.15s; text-align:left; }
  .admin-nav-btn:hover { color:var(--black); background:var(--surface); }
  .admin-nav-btn.active { color:var(--black); border-left-color:var(--orange); background:rgba(242,100,25,0.04); font-weight:600; }
  .admin-main { padding: 28px 36px; overflow-y: auto; background: var(--surface); }
  .admin-card { background:var(--white); border:1px solid var(--border); border-radius:8px; padding:24px; margin-bottom:18px; }
  .admin-card h3 { font-size:16px; font-weight:700; margin-bottom:18px; display:flex; align-items:center; gap:8px; }
  .admin-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
  .admin-metric { background:var(--white); border:1px solid var(--border); border-radius:7px; padding:18px; position:relative; overflow:hidden; }
  .admin-metric::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; }
  .admin-metric.orange::after { background:var(--orange); }
  .admin-metric.black::after { background:var(--black); }
  .admin-metric.red::after { background:#ef4444; }
  .admin-metric .amt { font-size:36px; font-weight:700; line-height:1; margin-bottom:4px; }
  .admin-metric .lbl { font-size:11px; color:var(--grey); letter-spacing:0.5px; text-transform:uppercase; font-weight:600; }
  .sub-item { padding:14px; border:1px solid var(--border); border-radius:6px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between; background:var(--surface); }
  .sub-info h4 { font-size:13px; font-weight:600; }
  .sub-info p { font-size:11px; color:var(--grey); margin-top:2px; }
  .sub-acts { display:flex; gap:8px; }
  .act-btn { font-family:var(--font); font-size:11px; font-weight:700; padding:6px 13px; border-radius:5px; cursor:pointer; transition:all 0.18s; }
  .act-approve { background:rgba(34,197,94,0.08); color:#16a34a; border:1px solid rgba(34,197,94,0.25); }
  .act-approve:hover { background:#22c55e; color:#fff; border-color:#22c55e; }
  .act-deny { background:rgba(239,68,68,0.06); color:#dc2626; border:1px solid rgba(239,68,68,0.2); }
  .act-deny:hover { background:#ef4444; color:#fff; border-color:#ef4444; }
  .loc-manager-grid { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  .loc-mgr-item { border:1px solid var(--border); border-radius:5px; padding:11px 14px; display:flex; align-items:center; justify-content:space-between; background:var(--surface); font-size:12px; }
  .rm-btn { font-size:11px; color:#dc2626; background:none; border:none; cursor:pointer; font-family:var(--font); }

  /* EV STATS */
  .evstats-page { min-height: 100vh; padding-top: 64px; background: var(--surface); }
  .evstats-hero { padding: 48px 48px 32px; background: var(--black); }
  .evstats-hero h1 { font-size: clamp(32px,4vw,52px); font-weight: 700; color: var(--white); letter-spacing: -1px; margin-bottom: 10px; }
  .evstats-hero p { font-size: 14px; color: var(--grey); max-width: 540px; line-height: 1.6; }
  .evstats-badge { display:inline-flex; align-items:center; gap:7px; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--orange); background:rgba(242,100,25,0.12); border:1px solid rgba(242,100,25,0.25); padding:5px 12px; border-radius:20px; margin-bottom:18px; }
  .evstats-body { padding: 32px 48px; }
  .evstats-kpis { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 28px; }
  .kpi-card { background:var(--white); border:1px solid var(--border); border-radius:8px; padding:20px; position:relative; overflow:hidden; }
  .kpi-card::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--orange); }
  .kpi-val { font-size:34px; font-weight:700; line-height:1; margin-bottom:4px; }
  .kpi-label { font-size:11px; font-weight:600; color:var(--grey); text-transform:uppercase; letter-spacing:1px; }
  .evstats-tabs { display:flex; border-bottom:1px solid var(--border); background:var(--white); border-radius:8px 8px 0 0; overflow:hidden; }
  .ev-tab { font-family:var(--font); font-size:13px; font-weight:600; padding:14px 22px; color:var(--grey); background:none; border:none; border-bottom:2px solid transparent; cursor:pointer; transition:all 0.15s; margin-bottom:-1px; }
  .ev-tab:hover { color:var(--black); }
  .ev-tab.active { color:var(--orange); border-bottom-color:var(--orange); }
  .evstats-panel { background:var(--white); border:1px solid var(--border); border-top:none; border-radius:0 0 8px 8px; padding:24px; }
  .bar-chart { display: flex; flex-direction: column; gap: 7px; }
  .bar-row { display: grid; grid-template-columns: 56px 1fr 72px; align-items: center; gap: 10px; }
  .bar-state { font-size: 11px; font-weight: 700; color: var(--mid-grey); text-align: right; }
  .bar-track { height: 20px; background: var(--pale); border-radius: 4px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg,var(--orange),#f5a623); transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
  .bar-num { font-size: 11px; font-weight: 700; color: var(--mid-grey); text-align: right; }
  .us-map-wrap { position: relative; }
  .state-rect { stroke: #fff; stroke-width: 0.8; cursor: pointer; transition: opacity 0.15s; }
  .state-rect:hover { opacity: 0.75; }
  .map-tooltip { position: absolute; background: var(--black); color: var(--white); padding: 9px 13px; border-radius: 7px; font-size: 12px; font-weight: 600; pointer-events: none; white-space: nowrap; z-index: 10; box-shadow: 0 4px 16px rgba(0,0,0,0.25); transform: translate(-50%,-110%); }
  .choropleth-legend { display: flex; flex-direction: column; margin-top: 14px; }
  .legend-gradient { height: 10px; border-radius: 3px; background: linear-gradient(90deg,#fde8d6,#f26419,#8b2500); }
  .legend-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--grey); margin-top: 4px; }
  .stats-table-wrap { overflow-x: auto; }
  .stats-tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
  .stats-tbl th { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--grey); padding:10px 14px; border-bottom:2px solid var(--border); text-align:left; background:var(--surface); cursor:pointer; }
  .stats-tbl th:hover { color:var(--orange); }
  .stats-tbl td { padding:11px 14px; border-bottom:1px solid var(--border); }
  .stats-tbl tr:hover td { background:var(--surface); }
  .stats-tbl tr:last-child td { border-bottom:none; }
  .growth-pos { color:#16a34a; font-weight:600; }
  .search-bar { display:flex; gap:10px; margin-bottom:16px; }
  .search-bar input { font-family:var(--font); background:var(--surface); border:1.5px solid var(--border); border-radius:6px; padding:9px 14px; font-size:13px; color:var(--black); outline:none; flex:1; transition:border-color 0.18s; }
  .search-bar input:focus { border-color:var(--orange); }
  .sort-select { font-family:var(--font); background:var(--surface); border:1.5px solid var(--border); border-radius:6px; padding:9px 12px; font-size:12px; color:var(--black); outline:none; cursor:pointer; }

  /* FOOTER */
  .footer { background:var(--black); padding:32px 48px; display:flex; align-items:center; justify-content:space-between; }
  .footer-logo { font-size:16px; font-weight:700; color:rgba(255,255,255,0.4); letter-spacing:1.5px; }
  .footer-logo span { color:var(--orange); }
  .footer-copy { font-size:12px; color:var(--grey); }
  .footer-admin { font-size:11px; color:rgba(255,255,255,0.15); cursor:pointer; transition:color 0.2s; background:none; border:none; font-family:var(--font); }
  .footer-admin:hover { color:var(--grey); }

  @media(max-width:900px){
    .nav{padding:0 16px;} .nav-links .nav-link{display:none;}
    .how-grid,.contact-grid{grid-template-columns:1fr;gap:40px;}
    .stats-bar{grid-template-columns:1fr;} section{padding:60px 20px;}
    .dash-body{grid-template-columns:1fr;} .admin-layout{grid-template-columns:1fr;}
    .admin-metrics{grid-template-columns:1fr;} .form-row{grid-template-columns:1fr;}
    .evstats-kpis{grid-template-columns:1fr 1fr;} .evstats-body,.evstats-hero{padding-left:20px;padding-right:20px;}
  }
`;

/* ─── Station data ─── */
const STATIONS = [
  {id:"EVC-1042",name:"Austin Downtown Lot 4",   city:"Austin",     x:310,y:365,severity:"critical",fault:"Connector pin damage",  payout:"$145"},
  {id:"EVC-1039",name:"Silicon Valley CalTrain", city:"San Jose",   x:78, y:290,severity:"critical",fault:"Power supply failure",  payout:"$220"},
  {id:"EVC-1051",name:"Seattle Capitol Hill",    city:"Seattle",    x:95, y:130,severity:"warning", fault:"Connectivity drop",     payout:"$95"},
  {id:"EVC-1044",name:"Denver Union Station",    city:"Denver",     x:250,y:300,severity:"critical",fault:"Vandalism — cable cut", payout:"$310"},
  {id:"EVC-1057",name:"Miami Brickell Hub",      city:"Miami",      x:430,y:430,severity:"warning", fault:"Display malfunction",   payout:"$75"},
  {id:"EVC-1033",name:"Chicago Millennium Pk",   city:"Chicago",    x:395,y:225,severity:"ok",      fault:"",                      payout:""},
  {id:"EVC-1061",name:"Austin Domain Mall",      city:"Austin",     x:300,y:355,severity:"ok",      fault:"",                      payout:""},
  {id:"EVC-1065",name:"Seattle SLU",             city:"Seattle",    x:88, y:120,severity:"warning", fault:"Cable worn",            payout:"$88"},
  {id:"EVC-1070",name:"LA Convention Center",   city:"Los Angeles", x:100,y:330,severity:"ok",      fault:"",                      payout:""},
  {id:"EVC-1074",name:"Phoenix Sky Harbor",      city:"Phoenix",    x:175,y:370,severity:"warning", fault:"Overheating sensor",    payout:"$110"},
];

const SEVERITY_COLOR = { critical:"#ef4444", warning:"#f26419", ok:"#22c55e" };

/* ─────────────────────────────────────────────
   SAMPLE MAP COMPONENT
   A self-contained SVG map of the US with
   draggable pan, zoom buttons, animated pins,
   and click-to-popup — zero dependencies.
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   SAMPLE MAP  — pure SVG, zero dependencies.
   viewBox: 0 0 720 460. All pins + roads are
   SVG elements. Popup is a React overlay div.
   Click a pin → popup. Click map → deselect.
───────────────────────────────────────────── */

// Interstate-style routes between station hubs
const ROADS = [
  [88,125,78,288],[78,288,100,328],[100,328,176,368],
  [176,368,250,298],[250,298,310,362],[310,362,396,223],
  [396,223,432,428],[250,298,396,223],[396,223,532,208],
  [532,208,546,172],[88,125,216,116],[216,116,303,116],
  [303,116,361,133],[361,133,411,158],[411,158,441,163],
  [441,163,532,208],[176,368,432,428],
];

// State abbreviation labels (x,y = centre of label)
const STATE_LABELS = [
  {t:"WA",x:88, y:98 },{t:"OR",x:82, y:155},{t:"CA",x:68, y:278},
  {t:"NV",x:112,y:238},{t:"ID",x:148,y:163},{t:"MT",x:218,y:116},
  {t:"WY",x:230,y:188},{t:"UT",x:170,y:253},{t:"AZ",x:170,y:333},
  {t:"CO",x:242,y:256},{t:"NM",x:228,y:346},{t:"TX",x:296,y:383},
  {t:"ND",x:303,y:116},{t:"SD",x:303,y:160},{t:"NE",x:306,y:208},
  {t:"KS",x:306,y:256},{t:"OK",x:303,y:306},{t:"MN",x:361,y:133},
  {t:"IA",x:371,y:198},{t:"MO",x:376,y:256},{t:"AR",x:376,y:308},
  {t:"LA",x:369,y:376},{t:"WI",x:411,y:158},{t:"IL",x:411,y:223},
  {t:"MS",x:409,y:346},{t:"MI",x:441,y:163},{t:"IN",x:439,y:223},
  {t:"TN",x:433,y:298},{t:"AL",x:433,y:356},{t:"KY",x:456,y:270},
  {t:"OH",x:473,y:208},{t:"WV",x:491,y:253},{t:"GA",x:473,y:353},
  {t:"FL",x:471,y:416},{t:"SC",x:506,y:323},{t:"NC",x:511,y:288},
  {t:"VA",x:523,y:256},{t:"PA",x:531,y:208},{t:"NY",x:546,y:173},
  {t:"ME",x:583,y:138},
];

function SampleMap({ height = 340, compact = false }) {
  const [selected, setSelected] = useState(null);
  const [hovered,  setHovered]  = useState(null);

  // SVG viewBox dimensions — all coords reference these
  const VW = 720, VH = 460;

  return (
    <div
      style={{ position:"relative", height, background:"#1a2535", overflow:"hidden",
               fontFamily:"var(--font)" }}
      onClick={() => setSelected(null)}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width:"100%", height:"100%", display:"block" }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="mgrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0L0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          </pattern>
          {/* Glow filters for critical pins */}
          <filter id="glow-red" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-orange" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Radial zone gradients */}
          {STATIONS.map(s => (
            <radialGradient key={s.id+"g"} id={"zone-"+s.id} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={SEVERITY_COLOR[s.severity]} stopOpacity="0.18"/>
              <stop offset="100%" stopColor={SEVERITY_COLOR[s.severity]} stopOpacity="0"/>
            </radialGradient>
          ))}
        </defs>

        {/* Ocean background */}
        <rect width={VW} height={VH} fill="#1e3050"/>

        {/* Grid overlay */}
        <rect width={VW} height={VH} fill="url(#mgrid)"/>

        {/* US land mass (continental) */}
        <rect x="52" y="46" width="568" height="392" rx="10" fill="#263549"/>
        {/* Alaska inset */}
        <rect x="8"  y="352" width="118" height="88"  rx="8"  fill="#263549"/>
        {/* Hawaii inset */}
        <ellipse cx="172" cy="432" rx="32" ry="13" fill="#263549"/>

        {/* Faint state-grid lines */}
        {[200,290,380,470].map(x => (
          <line key={x} x1={x} y1="46" x2={x} y2="438" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        ))}
        {[148,248,338].map(y => (
          <line key={y} x1="52" y1={y} x2="620" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        ))}

        {/* Route lines */}
        {ROADS.map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(242,100,25,0.20)" strokeWidth="1.2"
            strokeDasharray="4 6"/>
        ))}

        {/* State labels */}
        {!compact && STATE_LABELS.map(({t,x,y}) => (
          <text key={t} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.20)"
            fontFamily="Space Grotesk, sans-serif">
            {t}
          </text>
        ))}

        {/* Service zone glows */}
        {STATIONS.map(s => (
          <circle key={s.id+"z"} cx={s.x} cy={s.y} r="44"
            fill={`url(#zone-${s.id})`} pointerEvents="none"/>
        ))}

        {/* Pins */}
        {STATIONS.map(s => {
          const c   = SEVERITY_COLOR[s.severity];
          const isSel = selected?.id === s.id;
          const isHov = hovered === s.id;
          const r   = isSel || isHov ? 9 : 7;
          const filt = s.severity === "critical" ? "url(#glow-red)"
                     : s.severity === "warning"  ? "url(#glow-orange)" : "none";
          return (
            <g key={s.id}
              style={{ cursor:"pointer" }}
              onClick={e => { e.stopPropagation(); setSelected(isSel ? null : s); }}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring for critical/warning */}
              {s.severity !== "ok" && (
                <circle cx={s.x} cy={s.y} r={r + 7} fill="none"
                  stroke={c} strokeWidth="1.5" strokeOpacity="0.4"
                  filter={filt}>
                  <animate attributeName="r" values={`${r+4};${r+13};${r+4}`}
                    dur={s.severity==="critical"?"1.6s":"2.4s"} repeatCount="indefinite"/>
                  <animate attributeName="stroke-opacity" values="0.5;0;0.5"
                    dur={s.severity==="critical"?"1.6s":"2.4s"} repeatCount="indefinite"/>
                </circle>
              )}
              {/* Main circle */}
              <circle cx={s.x} cy={s.y} r={r} fill={c} stroke="#fff" strokeWidth="2"
                filter={filt}/>
              {/* Inner dot */}
              <circle cx={s.x} cy={s.y} r={r * 0.32} fill="rgba(255,255,255,0.75)"/>
            </g>
          );
        })}
      </svg>

      {/* Zoom / reset controls */}
      <div style={{ position:"absolute", bottom:14, right:14, display:"flex",
                    flexDirection:"column", gap:4 }}>
        {["⌂"].map(label => (
          <button key={label}
            style={{ width:30, height:30, background:"rgba(255,255,255,0.92)",
                     border:"none", borderRadius:5, fontSize:14, cursor:"pointer",
                     display:"flex", alignItems:"center", justifyContent:"center",
                     boxShadow:"0 2px 8px rgba(0,0,0,0.3)", color:"#111",
                     fontFamily:"var(--font)" }}
            onClick={() => setSelected(null)}>
            {label}
          </button>
        ))}
      </div>

      {/* Watermark */}
      <div style={{ position:"absolute", bottom:6, left:10, fontSize:9,
                    color:"rgba(255,255,255,0.25)", letterSpacing:"0.5px" }}>
        Sample Network · EV-ChargeGuard
      </div>

      {/* Popup — positioned via percentage of SVG viewBox mapped to container */}
      {selected && (() => {
        // Map SVG coords → percentage so popup follows the pin responsively
        const pctX = (selected.x / VW) * 100;
        const pctY = (selected.y / VH) * 100;
        const flipX = pctX > 70;  // flip left if near right edge
        const flipY = pctY > 65;  // flip below if near bottom
        return (
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position:"absolute",
              left:`${pctX}%`, top:`${pctY}%`,
              transform: `translate(${flipX?"-110%":"-50%"}, ${flipY?"8px":"-110%"})`,
              background:"#fff", borderRadius:8, padding:"12px 14px",
              minWidth:185, pointerEvents:"auto",
              boxShadow:"0 8px 28px rgba(0,0,0,0.22)",
              border:"1px solid rgba(0,0,0,0.09)",
              fontFamily:"var(--font)", zIndex:20,
              animation:"popIn 0.15s ease",
            }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px",
                          textTransform:"uppercase", color:"#8a8a8a", marginBottom:4 }}>
              {selected.id}
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:"#111", marginBottom:6 }}>
              {selected.name}
            </div>
            <div style={{ fontSize:12, fontWeight:600,
                          color: SEVERITY_COLOR[selected.severity] }}>
              {selected.severity === "ok" ? "✓ Operational" : `⚠ ${selected.fault}`}
            </div>
            {selected.payout && (
              <div style={{ fontSize:12, color:"#8a8a8a", marginTop:4 }}>
                Est. payout: <strong style={{color:"#111"}}>{selected.payout}</strong>
              </div>
            )}
            <button
              style={{ marginTop:10, fontSize:11, color:"#8a8a8a", background:"none",
                       border:"none", cursor:"pointer", padding:0,
                       fontFamily:"var(--font)" }}
              onClick={() => setSelected(null)}>
              ✕ Close
            </button>
          </div>
        );
      })()}
    </div>
  );
}

/* ─── EV STATE DATA ─── */
const EV_STATE_DATA = [
  {state:"California",abbr:"CA",total:15441,per100k:39.0,growth:18.2,dcFast:2891},
  {state:"Texas",abbr:"TX",total:5621,per100k:19.0,growth:22.4,dcFast:1203},
  {state:"Florida",abbr:"FL",total:5203,per100k:23.7,growth:19.8,dcFast:987},
  {state:"New York",abbr:"NY",total:4532,per100k:23.1,growth:15.6,dcFast:804},
  {state:"Washington",abbr:"WA",total:3891,per100k:50.2,growth:21.3,dcFast:712},
  {state:"Colorado",abbr:"CO",total:3204,per100k:54.8,growth:24.1,dcFast:634},
  {state:"Massachusetts",abbr:"MA",total:2987,per100k:42.8,growth:16.9,dcFast:521},
  {state:"Oregon",abbr:"OR",total:2341,per100k:54.1,growth:19.4,dcFast:498},
  {state:"Virginia",abbr:"VA",total:2198,per100k:25.2,growth:20.7,dcFast:423},
  {state:"New Jersey",abbr:"NJ",total:2134,per100k:23.4,growth:17.3,dcFast:387},
  {state:"Arizona",abbr:"AZ",total:2089,per100k:28.1,growth:23.5,dcFast:412},
  {state:"Georgia",abbr:"GA",total:1987,per100k:18.4,growth:25.2,dcFast:398},
  {state:"Illinois",abbr:"IL",total:1876,per100k:14.7,growth:14.8,dcFast:334},
  {state:"Pennsylvania",abbr:"PA",total:1654,per100k:12.8,growth:16.2,dcFast:298},
  {state:"Michigan",abbr:"MI",total:1543,per100k:15.4,growth:18.9,dcFast:287},
  {state:"Nevada",abbr:"NV",total:1432,per100k:45.1,growth:21.6,dcFast:312},
  {state:"North Carolina",abbr:"NC",total:1387,per100k:13.1,growth:22.8,dcFast:267},
  {state:"Maryland",abbr:"MD",total:1298,per100k:21.1,growth:17.4,dcFast:234},
  {state:"Minnesota",abbr:"MN",total:1187,per100k:20.8,growth:19.1,dcFast:223},
  {state:"Ohio",abbr:"OH",total:1143,per100k:9.7,growth:15.3,dcFast:198},
  {state:"Utah",abbr:"UT",total:1098,per100k:33.0,growth:26.4,dcFast:209},
  {state:"Connecticut",abbr:"CT",total:987,per100k:27.4,growth:14.7,dcFast:178},
  {state:"Tennessee",abbr:"TN",total:876,per100k:12.6,growth:20.1,dcFast:167},
  {state:"Wisconsin",abbr:"WI",total:821,per100k:13.9,growth:16.8,dcFast:154},
  {state:"Missouri",abbr:"MO",total:754,per100k:12.2,growth:17.5,dcFast:143},
  {state:"Indiana",abbr:"IN",total:698,per100k:10.2,growth:18.3,dcFast:132},
  {state:"South Carolina",abbr:"SC",total:654,per100k:12.5,growth:21.9,dcFast:123},
  {state:"New Mexico",abbr:"NM",total:601,per100k:28.2,growth:23.7,dcFast:118},
  {state:"Idaho",abbr:"ID",total:567,per100k:30.4,growth:24.8,dcFast:112},
  {state:"Kansas",abbr:"KS",total:498,per100k:16.9,growth:19.2,dcFast:98},
  {state:"Hawaii",abbr:"HI",total:487,per100k:34.3,growth:12.4,dcFast:89},
  {state:"Iowa",abbr:"IA",total:456,per100k:14.3,growth:20.6,dcFast:87},
  {state:"Arkansas",abbr:"AR",total:398,per100k:13.1,growth:22.3,dcFast:76},
  {state:"Nebraska",abbr:"NE",total:367,per100k:18.8,growth:21.4,dcFast:71},
  {state:"New Hampshire",abbr:"NH",total:354,per100k:25.7,growth:15.8,dcFast:68},
  {state:"Maine",abbr:"ME",total:332,per100k:24.5,growth:18.6,dcFast:64},
  {state:"Montana",abbr:"MT",total:298,per100k:27.3,growth:25.1,dcFast:61},
  {state:"Delaware",abbr:"DE",total:287,per100k:28.9,growth:16.4,dcFast:54},
  {state:"Mississippi",abbr:"MS",total:243,per100k:8.1,growth:19.7,dcFast:47},
  {state:"Alaska",abbr:"AK",total:198,per100k:26.9,growth:20.2,dcFast:42},
  {state:"Rhode Island",abbr:"RI",total:187,per100k:17.6,growth:14.3,dcFast:36},
  {state:"Vermont",abbr:"VT",total:176,per100k:27.8,growth:13.9,dcFast:34},
  {state:"Wyoming",abbr:"WY",total:164,per100k:28.1,growth:23.4,dcFast:39},
  {state:"South Dakota",abbr:"SD",total:143,per100k:16.0,growth:24.6,dcFast:31},
  {state:"North Dakota",abbr:"ND",total:121,per100k:15.7,growth:22.1,dcFast:27},
  {state:"West Virginia",abbr:"WV",total:112,per100k:6.2,growth:18.8,dcFast:23},
  {state:"Oklahoma",abbr:"OK",total:543,per100k:13.5,growth:21.0,dcFast:104},
  {state:"Kentucky",abbr:"KY",total:467,per100k:10.3,growth:20.4,dcFast:89},
  {state:"Louisiana",abbr:"LA",total:412,per100k:8.8,growth:19.6,dcFast:78},
  {state:"Alabama",abbr:"AL",total:389,per100k:7.8,growth:21.2,dcFast:74},
].sort((a,b)=>b.total-a.total);

const TOTAL = EV_STATE_DATA.reduce((s,d)=>s+d.total,0);
const TOTAL_DC = EV_STATE_DATA.reduce((s,d)=>s+d.dcFast,0);
const AVG_GROWTH = (EV_STATE_DATA.reduce((s,d)=>s+d.growth,0)/EV_STATE_DATA.length).toFixed(1);

/* ─── CHOROPLETH SVG positions ─── */
const STATE_RECTS = {
  CA:{x:28,y:150,w:48,h:110},WA:{x:42,y:30,w:50,h:50},OR:{x:40,y:82,w:52,h:58},
  NV:{x:68,y:130,w:42,h:82},AZ:{x:88,y:205,w:46,h:72},TX:{x:160,y:255,w:90,h:100},
  CO:{x:142,y:178,w:58,h:55},UT:{x:96,y:155,w:44,h:62},ID:{x:84,y:58,w:46,h:82},
  MT:{x:120,y:28,w:78,h:70},WY:{x:140,y:115,w:64,h:60},ND:{x:200,y:30,w:64,h:52},
  SD:{x:200,y:84,w:64,h:54},NE:{x:200,y:145,w:70,h:50},KS:{x:200,y:198,w:70,h:52},
  OK:{x:202,y:254,w:76,h:52},MN:{x:262,y:30,w:64,h:80},IA:{x:262,y:125,w:64,h:52},
  MO:{x:262,y:188,w:64,h:62},AR:{x:262,y:260,w:64,h:52},LA:{x:264,y:322,w:60,h:58},
  WI:{x:316,y:55,w:58,h:78},IL:{x:316,y:146,w:48,h:72},MS:{x:316,y:268,w:48,h:68},
  MI:{x:352,y:42,w:68,h:88},IN:{x:352,y:148,w:48,h:70},TN:{x:332,y:228,w:82,h:46},
  AL:{x:348,y:282,w:48,h:72},GA:{x:380,y:258,w:58,h:82},FL:{x:368,y:348,w:62,h:92},
  OH:{x:395,y:118,w:58,h:72},KY:{x:362,y:208,w:76,h:48},SC:{x:426,y:252,w:52,h:52},
  NC:{x:406,y:212,w:78,h:48},VA:{x:428,y:172,w:74,h:52},WV:{x:412,y:152,w:46,h:52},
  PA:{x:442,y:92,w:76,h:58},NY:{x:466,y:42,w:76,h:78},MD:{x:480,y:138,w:50,h:30},
  DE:{x:504,y:122,w:22,h:30},NJ:{x:510,y:95,w:26,h:42},CT:{x:528,y:80,w:28,h:30},
  RI:{x:554,y:78,w:18,h:24},MA:{x:534,y:55,w:42,h:30},VT:{x:530,y:28,w:24,h:42},
  NH:{x:552,y:22,w:22,h:48},ME:{x:566,y:8,w:38,h:62},
  AK:{x:18,y:382,w:80,h:68},HI:{x:150,y:400,w:56,h:36},
};

function getChoroplethColor(val, max) {
  const t = val / max;
  if (t > 0.6) return "#8b2500";
  if (t > 0.35) return "#c94e0e";
  if (t > 0.18) return "#f26419";
  if (t > 0.07) return "#f5a623";
  if (t > 0.02) return "#fdd0a8";
  return "#fde8d6";
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);
  const [elecOnline, setElecOnline] = useState(true);
  const [adminTab, setAdminTab] = useState("overview");
  const [locations, setLocations] = useState([
    {city:"Downtown Austin",state:"TX",sensors:42,active:true,faults:2},
    {city:"Silicon Valley",state:"CA",sensors:87,active:true,faults:5},
    {city:"Greater Seattle",state:"WA",sensors:63,active:true,faults:1},
    {city:"Denver Metro",state:"CO",sensors:31,active:true,faults:3},
    {city:"Miami Beach",state:"FL",sensors:28,active:true,faults:0},
    {city:"Chicago Loop",state:"IL",sensors:55,active:true,faults:4},
  ]);
  const [submissions, setSubmissions] = useState([
    {zip:"78701",site:"Q2 Stadium Parking",reason:"High commuter traffic"},
    {zip:"94025",site:"Menlo Park CalTrain",reason:"2,000+ daily commuters"},
    {zip:"98004",site:"Bellevue Square Mall",reason:"Mall management interested"},
  ]);
  const [acceptedJobs, setAcceptedJobs] = useState({});
  const [aboutText, setAboutText] = useState("We install proprietary smart-monitors directly onto EV charging ports. The moment a fault, vandalism, or connectivity drop is detected, our system automatically pings the nearest certified electrician in our network. No more stranded drivers.");

  return (
    <>
      <style>{CSS}</style>
      <Nav page={page} setPage={setPage} setModal={setModal} />
      {page==="home"             && <HomePage setModal={setModal} locations={locations} aboutText={aboutText} />}
      {page==="ev-stats"         && <EVStatsPage />}
      {page==="electrician-login"&& <LoginPage icon="⚡" iconBg="rgba(242,100,25,0.1)" iconColor="var(--orange)" title="Electrician Portal" subtitle="Access your maintenance dashboard" onLogin={()=>setPage("electrician-dash")} onRegister={()=>setModal("register")} />}
      {page==="electrician-dash" && <ElectricianDash online={elecOnline} setOnline={setElecOnline} acceptedJobs={acceptedJobs} setAcceptedJobs={setAcceptedJobs} />}
      {page==="admin-login"      && <LoginPage icon="🔐" iconBg="rgba(0,0,0,0.06)" iconColor="var(--black)" title="Admin Access" subtitle="Restricted — authorized personnel only" onLogin={()=>setPage("admin")} />}
      {page==="admin"            && <AdminDash tab={adminTab} setTab={setAdminTab} locations={locations} setLocations={setLocations} submissions={submissions} setSubmissions={setSubmissions} aboutText={aboutText} setAboutText={setAboutText} />}

      {page==="home" && (
        <footer className="footer">
          <div className="footer-logo">EV-CHARGE<span>GUARD</span></div>
          <div className="footer-copy">© 2025 EV-ChargeGuard Inc.</div>
          <button className="footer-admin" onClick={()=>setPage("admin-login")}>Admin Login</button>
        </footer>
      )}

      {modal==="recommend" && <RecommendModal onClose={()=>setModal(null)} />}
      {modal==="register"  && <RegisterModal  onClose={()=>setModal(null)} onSuccess={()=>{setModal(null);setPage("electrician-login");}} />}
    </>
  );
}

function Nav({ page, setPage, setModal }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={()=>setPage("home")}>
        <div className="bolt">⚡</div>EV-CHARGE<span>GUARD</span>
      </div>
      <div className="nav-links">
        {page==="home" ? <>
          <button className="nav-link" onClick={()=>document.getElementById("about")?.scrollIntoView({behavior:"smooth"})}>About</button>
          <button className="nav-link" onClick={()=>document.getElementById("locations")?.scrollIntoView({behavior:"smooth"})}>Locations</button>
          <button className="nav-link" onClick={()=>document.getElementById("mapSection")?.scrollIntoView({behavior:"smooth"})}>Live Map</button>
          <button className="nav-link" onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>Contact</button>
        </> : <button className="nav-link" onClick={()=>setPage("home")}>← Home</button>}
        <button className={`nav-link ${page==="ev-stats"?"active":""}`} onClick={()=>setPage("ev-stats")}>EV Stats</button>
        <button className="nav-btn" onClick={()=>setPage("electrician-login")}>Electrician Portal</button>
      </div>
    </nav>
  );
}

function HomePage({ setModal, locations, aboutText }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-bg"/><div className="hero-grid"/>
        <div className="hero-content">
          <div className="hero-tag"><span className="live-dot"/>Live Network Active — 6 Cities</div>
          <h1>Zero Downtime<br/>for the <em>EV Grid.</em></h1>
          <p>Smart monitoring sensors that instantly connect broken EV charging stations with certified local electricians.</p>
          <div className="hero-btns">
            <button className="btn btn-orange" onClick={()=>setModal("recommend")}>⚡ Recommend a Location</button>
            <button className="btn btn-outline" onClick={()=>document.getElementById("mapSection")?.scrollIntoView({behavior:"smooth"})}>View Live Map →</button>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat"><div className="stat-num">247<span>+</span></div><div className="stat-label">Active Sensors</div></div>
        <div className="stat"><div className="stat-num"><span>&lt;</span>4<span>min</span></div><div className="stat-label">Avg. Response Time</div></div>
        <div className="stat"><div className="stat-num">99<span>.7%</span></div><div className="stat-label">Network Uptime</div></div>
      </div>

      {/* HOW IT WORKS */}
      <section id="about"><div className="max-w">
        <div className="how-grid">
          <div className="how-text">
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Instant fault detection. Automated dispatch.</h2>
            <p>{aboutText}</p>
            <div className="steps">
              {[["01","Sensor Installation","Smart monitors are installed directly on each EV charging port."],
                ["02","Fault Detection","Any fault, vandalism, or connectivity issue triggers an instant alert."],
                ["03","Automated Dispatch","The nearest certified electrician receives a ping automatically."],
                ["04","Rapid Resolution","Electrician repairs the station and closes the ticket."],
              ].map(([n,h,p])=>(
                <div key={n} className="step"><div className="step-num">{n}</div><div><h4>{h}</h4><p>{p}</p></div></div>
              ))}
            </div>
          </div>
          {/* Small map in How It Works */}
          <div style={{borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.12)"}}>
            <div style={{background:"#111",padding:"12px 18px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",gap:8}}>
              {["#ef4444","#f26419","#22c55e"].map(c=><span key={c} style={{width:9,height:9,borderRadius:"50%",background:c,display:"block"}}/>)}
              <span style={{fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",color:"#8a8a8a",marginLeft:4}}>Live Fault Network</span>
            </div>
            <SampleMap height={320} compact={false} />
            <div className="map-legend-bar">
              {[["#ef4444","Critical"],["#f26419","Warning"],["#22c55e","Operational"]].map(([c,l])=>(
                <div key={l} className="mli"><span className="mli-dot" style={{background:c}}/>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </div></section>

      {/* LOCATIONS */}
      <section id="locations" style={{background:"var(--surface)"}}><div className="max-w">
        <div className="section-tag">Service Areas</div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <h2 className="section-title">Current Locations</h2>
          <span style={{fontSize:14,color:"var(--grey)"}}>Don't see your city? <a style={{color:"var(--orange)",cursor:"pointer",fontWeight:600}} onClick={()=>setModal("recommend")}>Recommend one →</a></span>
        </div>
        <div className="loc-grid">
          {locations.map((loc,i)=>(
            <div key={i} className="loc-card">
              <div className="loc-status"><span className={`loc-dot ${loc.active?"on":""}`}/><span style={{color:loc.active?"#16a34a":"var(--grey)"}}>{loc.active?"Active":"Offline"}</span></div>
              <div className="loc-name">{loc.city}</div>
              <div className="loc-meta">{loc.state}</div>
              <div className="loc-stats">
                <div className="loc-stat"><strong>{loc.sensors}</strong>Sensors</div>
                <div className="loc-stat"><strong style={{color:loc.faults>0?"var(--orange)":"#16a34a"}}>{loc.faults}</strong>Active Faults</div>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      {/* FULL MAP SECTION */}
      <div id="mapSection">
        <div style={{padding:"48px 48px 24px",background:"var(--white)"}}>
          <div className="section-tag">Live Network Map</div>
          <h2 className="section-title">Active Stations & Fault Alerts</h2>
          <p style={{color:"var(--mid-grey)",fontSize:14,marginBottom:0}}>Click any pin to view station details. Drag to pan. Zoom with +/− buttons.</p>
        </div>
        <SampleMap height={480} />
        <div className="map-legend-bar">
          {[["#ef4444","Critical Fault"],["#f26419","Warning"],["#22c55e","Operational"]].map(([c,l])=>(
            <div key={l} className="mli"><span className="mli-dot" style={{background:c}}/>{l}</div>
          ))}
          <span style={{marginLeft:"auto",fontSize:11,color:"rgba(255,255,255,0.3)"}}>Sample network data · EV-ChargeGuard</span>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact"><div className="max-w">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-tag">Contact Us</div>
            <h2 className="section-title" style={{fontSize:"clamp(28px,3.5vw,44px)"}}>Get in Touch</h2>
            {[["✉️","Email","support@evchargeguard.com"],["📞","Phone","+1 (800) 555-0EV2"],["📍","HQ","800 Congress Ave, Austin, TX 78701"]].map(([ic,l,v])=>(
              <div key={l} className="contact-detail">
                <div className="ci-icon">{ic}</div>
                <div><div className="ci-label">{l}</div><div className="ci-val">{v}</div></div>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </div></section>
    </main>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  if (sent) return <div className="form-success"><div className="check">✅</div><h4>Message Sent!</h4><p>We'll get back to you within one business day.</p></div>;
  return (
    <div className="form">
      <div className="form-row">
        <div className="fg"><label>Name</label><input placeholder="Jane Smith" value={form.name} onChange={set("name")}/></div>
        <div className="fg"><label>Email</label><input placeholder="jane@example.com" value={form.email} onChange={set("email")}/></div>
      </div>
      <div className="fg"><label>Subject</label><input placeholder="Partnership inquiry" value={form.subject} onChange={set("subject")}/></div>
      <div className="fg"><label>Message</label><textarea placeholder="How can we help?" value={form.message} onChange={set("message")}/></div>
      <button className="btn btn-orange" onClick={()=>{if(form.name&&form.email&&form.message)setSent(true);}}>Send Message</button>
    </div>
  );
}

function RecommendModal({ onClose }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({zip:"",site:"",reason:""});
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-sm">
        <div className="modal-head"><h3>📍 Recommend a Location</h3><button className="modal-close" onClick={onClose}>✕</button></div>
        <div className="modal-body">
          {done ? <div className="form-success"><div className="check">✅</div><h4>Submission Received!</h4><p>Our team will review your recommendation and follow up soon.</p><button className="btn btn-black" style={{marginTop:16}} onClick={onClose}>Close</button></div>
          : <div className="form">
              <div className="fg"><label>ZIP Code</label><input placeholder="e.g. 78701" value={form.zip} onChange={set("zip")}/></div>
              <div className="fg"><label>Site Name</label><input placeholder="e.g. Central Station Parking" value={form.site} onChange={set("site")}/></div>
              <div className="fg"><label>Why does this location need ChargeGuard?</label><textarea placeholder="High traffic, no current EV infrastructure..." value={form.reason} onChange={set("reason")}/></div>
              <button className="btn btn-orange" onClick={()=>{if(form.zip&&form.site)setDone(true);}}>Submit Recommendation</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

function RegisterModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({firstName:"",lastName:"",email:"",phone:"",certNum:"",password:"",confirm:"",city:"",state:""});
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const next = () => {
    if(step===0 && (!form.firstName||!form.lastName||!form.email)) return;
    if(step===1 && !form.certNum) return;
    if(step===2 && (!form.password||form.password!==form.confirm)) return;
    setStep(s=>s+1);
  };
  const stepLabels = ["Personal","Certification","Account"];
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-md">
        <div className="modal-head"><h3>⚡ Apply as a Certified Electrician</h3><button className="modal-close" onClick={onClose}>✕</button></div>
        <div className="modal-body">
          {step<3 && (
            <div className="step-indicator" style={{gap:0,marginBottom:24}}>
              {stepLabels.map((l,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",flex:i<2?1:"none"}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div className={`step-circle ${i<step?"done":i===step?"active":""}`}>{i<step?"✓":i+1}</div>
                    <span style={{fontSize:9,fontWeight:600,color:i===step?"var(--orange)":"var(--grey)",letterSpacing:"0.5px",whiteSpace:"nowrap"}}>{l}</span>
                  </div>
                  {i<2 && <div className={`step-line ${i<step?"done":""}`} style={{marginBottom:14}}/>}
                </div>
              ))}
            </div>
          )}
          {step===0 && <div className="form">
            <div className="form-row">
              <div className="fg"><label>First Name</label><input placeholder="Alex" value={form.firstName} onChange={set("firstName")}/></div>
              <div className="fg"><label>Last Name</label><input placeholder="Rivera" value={form.lastName} onChange={set("lastName")}/></div>
            </div>
            <div className="fg"><label>Email</label><input type="email" placeholder="alex@example.com" value={form.email} onChange={set("email")}/></div>
            <div className="fg"><label>Phone</label><input placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")}/></div>
            <div className="form-row">
              <div className="fg"><label>City</label><input placeholder="Austin" value={form.city} onChange={set("city")}/></div>
              <div className="fg"><label>State</label><input placeholder="TX" value={form.state} onChange={set("state")}/></div>
            </div>
            <button className="btn btn-orange" onClick={next}>Continue →</button>
          </div>}
          {step===1 && <div className="form">
            <div className="fg"><label>Certification Number</label><input placeholder="e.g. EC-TX-088421" value={form.certNum} onChange={set("certNum")}/></div>
            <div className="fg"><label>Years of Experience</label><select><option>Select...</option><option>1–2 years</option><option>3–5 years</option><option>6–10 years</option><option>10+ years</option></select></div>
            <div className="fg"><label>Specialization</label><select><option>Select...</option><option>EV Charging Systems</option><option>Commercial Electrical</option><option>General Electrical</option></select></div>
            <p style={{fontSize:12,color:"var(--grey)",lineHeight:1.5}}>Your certification will be verified before activation (1–2 business days).</p>
            <div style={{display:"flex",gap:10}}><button className="btn btn-outline" onClick={()=>setStep(0)}>← Back</button><button className="btn btn-orange" style={{flex:1}} onClick={next}>Continue →</button></div>
          </div>}
          {step===2 && <div className="form">
            <div className="fg"><label>Create Password</label><input type="password" placeholder="Min. 8 characters" value={form.password} onChange={set("password")}/></div>
            <div className="fg"><label>Confirm Password</label><input type="password" placeholder="Repeat password" value={form.confirm} onChange={set("confirm")}/></div>
            {form.password&&form.confirm&&form.password!==form.confirm&&<p style={{fontSize:12,color:"#dc2626"}}>Passwords do not match.</p>}
            <div style={{display:"flex",gap:10}}><button className="btn btn-outline" onClick={()=>setStep(1)}>← Back</button><button className="btn btn-orange" style={{flex:1}} onClick={next}>Create Account</button></div>
          </div>}
          {step===3 && <div className="form-success" style={{border:"none",background:"none",padding:"8px 0 0"}}>
            <div className="check">🎉</div>
            <h4>Application Submitted!</h4>
            <p>We've received your application. Our team will verify your certification and email you within 1–2 business days.</p>
            <button className="btn btn-orange" style={{marginTop:20}} onClick={onSuccess}>Go to Login</button>
          </div>}
        </div>
        {step<3 && <div className="modal-footer">Already registered? <a onClick={onClose}>Sign in</a></div>}
      </div>
    </div>
  );
}

function LoginPage({ icon, iconBg, iconColor, title, subtitle, onLogin, onRegister }) {
  const [data, setData] = useState({email:"",password:""});
  const set = k => e => setData(p=>({...p,[k]:e.target.value}));
  return (
    <div className="portal-page">
      <div className="login-box">
        <div className="login-head">
          <div className="login-icon" style={{background:iconBg,color:iconColor}}>{icon}</div>
          <h2>{title}</h2><p>{subtitle}</p>
        </div>
        <div className="login-body">
          <div className="fg"><label>Email</label><input type="email" placeholder="you@example.com" value={data.email} onChange={set("email")}/></div>
          <div className="fg"><label>Password</label><input type="password" placeholder="••••••••" value={data.password} onChange={set("password")}/></div>
          <button className="btn btn-black btn-full" onClick={onLogin}>Sign In</button>
        </div>
        {onRegister && <div className="login-foot">New here? <a onClick={onRegister}>Apply as a Certified Electrician</a></div>}
      </div>
    </div>
  );
}

function ElectricianDash({ online, setOnline, acceptedJobs, setAcceptedJobs }) {
  const accept = id => setAcceptedJobs(p=>({...p,[id]:true}));
  const openJobs = STATIONS.filter(s=>s.fault);
  const dists = ["0.8 mi","1.3 mi","2.1 mi","3.4 mi","4.2 mi","5.0 mi"];
  return (
    <div className="dashboard">
      <div className="dash-head">
        <div><h2>Welcome back, Alex Rivera</h2><p>Certified Electrician · Austin, TX</p></div>
        <div className="toggle-wrap">
          <span style={{color:online?"#16a34a":"var(--grey)",fontWeight:600}}>Status: {online?"Available":"Offline"}</span>
          <button className={`toggle-pill ${online?"on":"off"}`} onClick={()=>setOnline(v=>!v)}/>
        </div>
      </div>
      <div className="dash-body">
        <div className="dash-main">
          <div className="sec-hdr"><h3>Live Fault Map</h3><span className="badge badge-red">{openJobs.filter(j=>j.severity==="critical").length} Critical</span></div>
          <div style={{marginBottom:20,borderRadius:8,overflow:"hidden",border:"1px solid var(--border)"}}>
            <SampleMap height={240} compact={true} />
          </div>
          <div className="sec-hdr"><h3>Active Requests</h3><span className="badge badge-orange">{openJobs.length} Open</span></div>
          <div className="job-wrap">
            <table className="job-tbl">
              <thead><tr><th>Station</th><th>Distance</th><th>Fault</th><th>Payout</th><th/></tr></thead>
              <tbody>
                {openJobs.map((s,i)=>(
                  <tr key={s.id}>
                    <td style={{fontWeight:700}}>{s.id}</td>
                    <td style={{color:"var(--grey)"}}>{dists[i]||"5.0 mi"}</td>
                    <td><span className={`fault-pill ${s.severity==="critical"?"fault-crit":"fault-warn"}`}>{s.fault}</span></td>
                    <td><span className="payout-val">{s.payout}</span></td>
                    <td>{acceptedJobs[s.id]?<span className="badge badge-green">Accepted ✓</span>:<button className="accept-btn" onClick={()=>accept(s.id)}>Accept</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dash-side">
          <div className="side-sec">
            <h4>Your Stats</h4>
            {[["$3,240","orange","Earnings This Month"],["18","green","Jobs Completed"],["4.9 ⭐","","Avg. Rating"],["< 22min","","Avg. Response"]].map(([v,c,l])=>(
              <div key={l} className="metric-card"><div className={`metric-val ${c}`}>{v}</div><div className="metric-label">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDash({ tab, setTab, locations, setLocations, submissions, setSubmissions, aboutText, setAboutText }) {
  const [newLoc, setNewLoc] = useState("");
  const approve = i => { setLocations(p=>[...p,{city:submissions[i].site,state:submissions[i].zip,sensors:0,active:true,faults:0}]); setSubmissions(p=>p.filter((_,idx)=>idx!==i)); };
  const deny = i => setSubmissions(p=>p.filter((_,idx)=>idx!==i));
  const navItems=[{id:"overview",icon:"📡",label:"Network Overview"},{id:"cms",icon:"✏️",label:"Website Editor"},{id:"locations",icon:"📍",label:"Locations Manager"},{id:"submissions",icon:"📬",label:"Location Requests"}];
  const addLoc = () => { if(newLoc.trim()){setLocations(p=>[...p,{city:newLoc,state:"—",sensors:0,active:true,faults:0}]);setNewLoc("");} };
  return (
    <div className="dashboard">
      <div className="dash-head">
        <div><h2>Admin Dashboard</h2><p>Content & Network Management</p></div>
        <span className="badge badge-red" style={{fontSize:12,padding:"6px 14px"}}>🔴 Admin Session</span>
      </div>
      <div className="admin-layout">
        <div className="admin-side">{navItems.map(item=><button key={item.id} className={`admin-nav-btn ${tab===item.id?"active":""}`} onClick={()=>setTab(item.id)}><span>{item.icon}</span>{item.label}</button>)}</div>
        <div className="admin-main">
          {tab==="overview" && <>
            <div style={{marginBottom:20}}><div className="section-tag">Real-Time</div><h2 style={{fontSize:26,fontWeight:700}}>Network Overview</h2></div>
            <div className="admin-metrics">
              <div className="admin-metric orange"><div className="amt">247</div><div className="lbl">Active Sensors</div></div>
              <div className="admin-metric red"><div className="amt">15</div><div className="lbl">Broken Stations</div></div>
              <div className="admin-metric black"><div className="amt">34</div><div className="lbl">Active Electricians</div></div>
            </div>
            <div className="admin-card"><h3>📊 Platform Health</h3>
              {[["Sensor Uptime","99.7%"],["Avg. Response","3m 42s"],["Open Faults","15"],["Resolved Today","8"],["Electricians","92"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid var(--border)",fontSize:14}}>
                  <span style={{color:"var(--grey)"}}>{l}</span><span style={{fontWeight:700}}>{v}</span>
                </div>
              ))}
            </div>
          </>}
          {tab==="cms" && <>
            <div style={{marginBottom:20}}><div className="section-tag">CMS</div><h2 style={{fontSize:26,fontWeight:700}}>Website Editor</h2></div>
            <div className="admin-card"><h3>✏️ About Text</h3><div className="fg"><label>Description</label><textarea style={{minHeight:150}} value={aboutText} onChange={e=>setAboutText(e.target.value)}/></div><button className="btn btn-orange" style={{marginTop:14}}>Save</button></div>
            <div className="admin-card"><h3>📞 Contact Info</h3>
              {[["Support Email","support@evchargeguard.com"],["Phone","+1 (800) 555-0EV2"],["HQ Address","800 Congress Ave, Austin, TX"]].map(([l,def])=>(
                <div className="fg" key={l} style={{marginBottom:12}}><label>{l}</label><input defaultValue={def}/></div>
              ))}
              <button className="btn btn-orange" style={{marginTop:4}}>Update</button>
            </div>
          </>}
          {tab==="locations" && <>
            <div style={{marginBottom:20}}><div className="section-tag">Service Areas</div><h2 style={{fontSize:26,fontWeight:700}}>Locations Manager</h2></div>
            <div className="admin-card"><h3>➕ Add New Location</h3>
              <div style={{display:"flex",gap:10}}>
                <div className="fg" style={{flex:1}}><input placeholder="e.g. Phoenix Metro" value={newLoc} onChange={e=>setNewLoc(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addLoc()}/></div>
                <button className="btn btn-orange" onClick={addLoc}>Add</button>
              </div>
            </div>
            <div className="admin-card"><h3>📍 Active Locations</h3>
              <div className="loc-manager-grid">{locations.map((loc,i)=>(
                <div key={i} className="loc-mgr-item"><div><div style={{fontWeight:600,fontSize:13}}>{loc.city}</div><div style={{fontSize:11,color:"var(--grey)"}}>{loc.sensors} sensors</div></div><button className="rm-btn" onClick={()=>setLocations(p=>p.filter((_,idx)=>idx!==i))}>✕ Remove</button></div>
              ))}</div>
            </div>
          </>}
          {tab==="submissions" && <>
            <div style={{marginBottom:20}}><div className="section-tag">Submissions</div><h2 style={{fontSize:26,fontWeight:700}}>Location Requests</h2></div>
            <div className="admin-card"><h3>📬 Pending <span className="badge badge-orange" style={{marginLeft:8}}>{submissions.length}</span></h3>
              {submissions.length===0?<div style={{textAlign:"center",padding:32,color:"var(--grey)"}}>No pending submissions ✓</div>
              :submissions.map((s,i)=>(
                <div key={i} className="sub-item"><div className="sub-info"><h4>{s.site} <span style={{color:"var(--grey)",fontWeight:400,fontSize:11}}>· {s.zip}</span></h4><p>"{s.reason}"</p></div>
                  <div className="sub-acts"><button className="act-btn act-approve" onClick={()=>approve(i)}>Approve</button><button className="act-btn act-deny" onClick={()=>deny(i)}>Deny</button></div>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

function EVStatsPage() {
  const [activeTab, setActiveTab] = useState("bar");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("total");
  const [tooltip, setTooltip] = useState(null);
  const maxTotal = EV_STATE_DATA[0].total;

  const filtered = EV_STATE_DATA
    .filter(d=>d.state.toLowerCase().includes(search.toLowerCase())||d.abbr.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
      if(sortBy==="total") return b.total-a.total;
      if(sortBy==="per100k") return b.per100k-a.per100k;
      if(sortBy==="growth") return b.growth-a.growth;
      if(sortBy==="dcfast") return b.dcFast-a.dcFast;
      return 0;
    });

  return (
    <div className="evstats-page">
      <div className="evstats-hero">
        <div className="evstats-badge">📊 2024 AFDC Data</div>
        <h1>EV Charging Infrastructure<br/>Across America</h1>
        <p>Real data from the U.S. Department of Energy's Alternative Fuels Data Center — covering all 50 states as of December 2024.</p>
      </div>
      <div className="evstats-body">
        <div className="evstats-kpis">
          {[{val:TOTAL.toLocaleString(),label:"Total Public Chargers"},{val:TOTAL_DC.toLocaleString(),label:"DC Fast Chargers"},{val:`${AVG_GROWTH}%`,label:"Avg. Annual Growth"},{val:"California",label:"#1 State by Volume"}].map(({val,label})=>(
            <div key={label} className="kpi-card"><div className="kpi-val">{val}</div><div className="kpi-label">{label}</div></div>
          ))}
        </div>
        <div className="evstats-tabs">
          {[["bar","📊 Bar Chart"],["map","🗺️ Density Map"],["table","📋 Data Table"]].map(([id,label])=>(
            <button key={id} className={`ev-tab ${activeTab===id?"active":""}`} onClick={()=>setActiveTab(id)}>{label}</button>
          ))}
        </div>
        <div className="evstats-panel">
          {activeTab==="bar" && <>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>Top 20 States — Total Public Chargers</h3>
            <p style={{fontSize:12,color:"var(--grey)",marginBottom:20}}>Source: AFDC · December 2024</p>
            <div className="bar-chart">
              {EV_STATE_DATA.slice(0,20).map(d=>(
                <div key={d.abbr} className="bar-row">
                  <div className="bar-state">{d.abbr}</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:`${(d.total/maxTotal)*100}%`}}/></div>
                  <div className="bar-num">{d.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </>}
          {activeTab==="map" && <>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>EV Charger Density by State</h3>
            <p style={{fontSize:12,color:"var(--grey)",marginBottom:16}}>Hover any state for details.</p>
            <div className="us-map-wrap" style={{position:"relative"}}>
              <svg viewBox="0 0 640 480" style={{width:"100%",height:"auto",background:"#e8f4f8",borderRadius:8,display:"block"}}>
                {/* Ocean */}
                <rect x="0" y="0" width="640" height="480" fill="#c8dff0"/>
                {/* States */}
                {Object.entries(STATE_RECTS).map(([abbr,{x,y,w,h}])=>{
                  const d=EV_STATE_DATA.find(s=>s.abbr===abbr);
                  const fill=d?getChoroplethColor(d.total,maxTotal):"#e5e5e5";
                  return (
                    <g key={abbr}>
                      <rect x={x} y={y} width={w} height={h} rx={2} fill={fill} className="state-rect"
                        onMouseEnter={e=>{
                          const svgRect=e.target.closest("svg").getBoundingClientRect();
                          const wrapRect=e.target.closest(".us-map-wrap").getBoundingClientRect();
                          setTooltip({abbr,d,x:e.clientX-wrapRect.left,y:e.clientY-wrapRect.top});
                        }}
                        onMouseLeave={()=>setTooltip(null)}/>
                      <text x={x+w/2} y={y+h/2+3} textAnchor="middle" fontSize={w>30?9:7} fontWeight="600" fill={d&&d.total>5000?"#fff":"#444"} fontFamily="Space Grotesk" pointerEvents="none">{abbr}</text>
                    </g>
                  );
                })}
              </svg>
              {tooltip&&(
                <div className="map-tooltip" style={{left:tooltip.x,top:tooltip.y}}>
                  <div style={{fontWeight:700}}>{tooltip.d?.state||tooltip.abbr}</div>
                  {tooltip.d&&<>
                    <div style={{color:"var(--orange)",fontSize:14}}>{tooltip.d.total.toLocaleString()} chargers</div>
                    <div style={{fontSize:11,opacity:0.75}}>{tooltip.d.per100k} per 100k · +{tooltip.d.growth}% YoY</div>
                  </>}
                </div>
              )}
            </div>
            <div className="choropleth-legend"><div className="legend-gradient"/><div className="legend-labels"><span>Fewer</span><span>More chargers</span></div></div>
          </>}
          {activeTab==="table" && <>
            <div className="search-bar">
              <input placeholder="🔍 Search state..." value={search} onChange={e=>setSearch(e.target.value)}/>
              <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="total">Total Chargers</option>
                <option value="per100k">Per 100k People</option>
                <option value="growth">YoY Growth</option>
                <option value="dcfast">DC Fast Count</option>
              </select>
            </div>
            <div className="stats-table-wrap">
              <table className="stats-tbl">
                <thead><tr><th>#</th><th>State</th><th>Total</th><th>DC Fast</th><th>Per 100k</th><th>Growth</th></tr></thead>
                <tbody>
                  {filtered.map((d)=>{
                    const rank=EV_STATE_DATA.findIndex(s=>s.abbr===d.abbr)+1;
                    return <tr key={d.abbr}>
                      <td style={{fontWeight:700,color:rank<=3?"var(--orange)":"var(--grey)"}}>{rank}</td>
                      <td style={{fontWeight:600}}>{d.state} <span style={{color:"var(--grey)",fontWeight:400,fontSize:11}}>({d.abbr})</span></td>
                      <td style={{fontWeight:700}}>{d.total.toLocaleString()}</td>
                      <td>{d.dcFast.toLocaleString()}</td>
                      <td>{d.per100k}</td>
                      <td className="growth-pos">+{d.growth}%</td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          </>}
        </div>
        <p style={{fontSize:11,color:"var(--light-grey)",marginTop:12,textAlign:"right"}}>Data source: U.S. Department of Energy AFDC · December 2024</p>
      </div>
    </div>
  );
}

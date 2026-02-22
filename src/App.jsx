import { useEffect, useMemo, useState } from "react";

const API_URL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json";

function project(lat, lon) {
	const minLon = -125, maxLon = -66.5;
	const minLat = 24, maxLat = 49.5;
	const xNorm = (Math.min(maxLon, Math.max(minLon, lon)) - minLon) / (maxLon - minLon);
	const yNorm = (maxLat - Math.min(maxLat, Math.max(minLat, lat))) / (maxLat - minLat);
	return { x: 30 + xNorm * 580, y: 30 + yNorm * 340 };
}

export default function App() {
	const [stations, setStations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		let cancelled = false;
		const apiKey = import.meta.env.VITE_NREL_API_KEY || "DEMO_KEY";

		async function load() {
			setLoading(true);
			setError("");
			try {
				const params = new URLSearchParams({
					api_key: apiKey,
					fuel_type: "ELEC",
					status: "E",
					country: "US",
					limit: "1000",
				});
				const res = await fetch(`${API_URL}?${params.toString()}`);
				if (!res.ok) throw new Error(`API request failed (${res.status})`);
				const data = await res.json();
				const rows = Array.isArray(data?.fuel_stations) ? data.fuel_stations : [];
				if (!cancelled) setStations(rows);
			} catch (e) {
				if (!cancelled) setError(e?.message || "Unable to load NREL API data.");
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		load();
		return () => { cancelled = true; };
	}, []);

	const points = useMemo(
		() => stations
			.map((s) => {
				const lat = Number(s.latitude);
				const lon = Number(s.longitude);
				if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
				return {
					id: s.id,
					name: s.station_name || `Station ${s.id}`,
					city: s.city || "",
					state: s.state || "",
					network: s.ev_network || "Unknown",
					level2: Number(s.ev_level2_evse_num || 0),
					dcFast: Number(s.ev_dc_fast_num || 0),
					access: s.access_days_time || "Access info unavailable",
					...project(lat, lon),
				};
			})
			.filter(Boolean),
		[stations]
	);

	const byState = useMemo(() => {
		const map = new Map();
		points.forEach((p) => map.set(p.state, (map.get(p.state) || 0) + 1));
		return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
	}, [points]);

	return (
		<div style={{ fontFamily: "Inter, system-ui, Arial", background: "#0f172a", color: "#e2e8f0", minHeight: "100vh", padding: 24 }}>
			<h1 style={{ margin: 0, fontSize: 30 }}>ChargeGuard Live EV Map</h1>
			<p style={{ color: "#94a3b8", marginTop: 8 }}>Powered by NREL Alternative Fuel Stations API</p>

			{error && <div style={{ marginTop: 12, background: "#7f1d1d", padding: 10, borderRadius: 8 }}>Error: {error}</div>}

			<div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, marginTop: 16 }}>
				<div style={{ background: "#111827", borderRadius: 12, padding: 12, position: "relative" }}>
					<svg viewBox="0 0 640 400" style={{ width: "100%", height: "auto", display: "block", background: "#1e293b", borderRadius: 10 }} onClick={() => setSelected(null)}>
						<rect x="20" y="20" width="600" height="360" rx="10" fill="#334155" />
						{points.map((p) => (
							<circle
								key={p.id}
								cx={p.x}
								cy={p.y}
								r={selected?.id === p.id ? 4 : 2.2}
								fill="#f97316"
								stroke="#fff"
								strokeWidth={selected?.id === p.id ? 1 : 0.4}
								style={{ cursor: "pointer" }}
								onClick={(e) => {
									e.stopPropagation();
									setSelected(p);
								}}
							/>
						))}
					</svg>

					{loading && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,23,0.45)", borderRadius: 12 }}>Loading stations…</div>}

					{selected && (
						<div style={{ marginTop: 10, background: "#0b1220", border: "1px solid #334155", borderRadius: 10, padding: 10 }}>
							<div style={{ fontWeight: 700 }}>{selected.name}</div>
							<div style={{ color: "#94a3b8", fontSize: 13 }}>{selected.city}, {selected.state}</div>
							<div style={{ fontSize: 13, marginTop: 6 }}>Network: {selected.network}</div>
							<div style={{ fontSize: 13 }}>Level 2: {selected.level2} · DC Fast: {selected.dcFast}</div>
							<div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{selected.access}</div>
						</div>
					)}
				</div>

				<aside style={{ background: "#111827", borderRadius: 12, padding: 12 }}>
					<div style={{ fontWeight: 700, marginBottom: 8 }}>Top States by Stations</div>
					{byState.map(([state, count]) => (
						<div key={state} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1f2937" }}>
							<span>{state || "N/A"}</span>
							<strong>{count}</strong>
						</div>
					))}
					<div style={{ marginTop: 12, color: "#94a3b8", fontSize: 12 }}>Loaded: {points.length.toLocaleString()} mapped stations</div>
				</aside>
			</div>
		</div>
	);
}

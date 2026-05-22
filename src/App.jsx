import { useState, useRef, useEffect } from "react";
const SYSTEM_PROMPT = `Você é o sistema de inteligência do MULTIUNIVERSE STUDIO — o primeiro SOBRE O ESTÚDIO:
20 IPs originais. Mini filmes de 7 minutos. Referências: Disney, Pixar e Netflix. IP ativo: OOS BABOS — IP Nº1:
15 personagens pequenos e coloridos. Camiseta preta com logo Multiuniverse. Cueca de herói prPERSONAGENS:
BOLZÃO (líder), ZIPPI (velocidade), GRUMBA (força), FOFUXA (choro estratégico), TECHÃO (tecnoSTACK: Claude + N8N + Veo 3 + Kling + Runway + ElevenLabs + Suno + Premiere + Sprinklr + ManyMETAS USD: Ano 1: $8k–25k/mês | Ano 2: $40k–100k/mês | Ano 3: $150k–500k/mês | Ano 5: $500k–2REGRAS DE COMPORTAMENTO:
- Seja direto e honesto sempre
- Nunca dê sugestões genéricas
- Sempre conectado ao universo do estúdio
- Pense em escala de franquia e cinema
- 1 IP por vez até o limite máximo
- Avalie limites reais com honestidade
- Quando perguntado sobre próximo passo: dê 1 ação clara, sem sugestões`;
const IPs = [
 { nome: "OS BABOS", status: "ATIVO", ep: 13, temp: 1, cor: "#FF3366", progresso: 100 },
 { nome: "THE BREAK", status: "DEV", ep: 0, temp: 0, cor: "#A855F7", progresso: 35 },
 { nome: "NORTHWALL", status: "DEV", ep: 0, temp: 0, cor: "#3B82F6", progresso: 20 },
 { nome: "ERA DA COPA", status: "AGUARD", ep: 0, temp: 0, cor: "#10B981", progresso: 10 },
 { nome: "DUTY", status: "AGUARD", ep: 0, temp: 0, cor: "#666", progresso: 5 },
 { nome: "JULGO", status: "AGUARD", ep: 0, temp: 0, cor: "#E8C547", progresso: 5 },
 { nome: "NILO PINGUIM", status: "AGUARD", ep: 0, temp: 0, cor: "#06B6D4", progresso: 5 },
 { nome: "GRANDE OCEANO", status: "AGUARD", ep: 0, temp: 0, cor: "#FF6B35", progresso: 0 },
];
const PIPELINE = [
 { etapa: "ROTEIRO", ferramenta: "Claude", status: "ok" },
 { etapa: "CENAS", ferramenta: "Veo 3 + Kling", status: "ok" },
 { etapa: "VOZ", ferramenta: "ElevenLabs", status: "ok" },
 { etapa: "TRILHA", ferramenta: "Suno AI", status: "pendente" },
 { etapa: "EDIÇÃO", ferramenta: "Premiere Pro", status: "pendente" },
 { etapa: "POST", ferramenta: "Sprinklr", status: "aguard" },
];
const TAREFAS_INIT = [
 { texto: "Criar 15 personagens OS BABOS", prioridade: "alta", feito: true },
 { texto: "Subir documentos no Claude Projects", prioridade: "alta", feito: true },
 { texto: "Criar perfil @multiuniverse Instagram", prioridade: "alta", feito: false },
 { texto: "Finalizar roteiro EP 01", prioridade: "alta", feito: false },
 { texto: "Configurar bot Telegram", prioridade: "media", feito: false },
 { texto: "Configurar N8N", prioridade: "media", feito: false },
 { texto: "Definir cores dos 15 personagens", prioridade: "media", feito: false },
 { texto: "Criar visual EP 01 no Veo 3", prioridade: "media", feito: false },
];
export default function Painel() {
 const [aba, setAba] = useState("chat");
 const [tarefas, setTarefas] = useState(TAREFAS_INIT);
 const [msgs, setMsgs] = useState([
 { role: "assistant", content: "Sistema ativo. Sou o CEO do Multiuniverse Studio. IP ativo ]);
 const [input, setInput] = useState("");
 const [loading, setLoading] = useState(false);
 const chatRef = useRef(null);
 useEffect(() => {
 if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
 }, [msgs]);
 const enviar = async () => {
 if (!input.trim() || loading) return;
 const novaMsg = { role: "user", content: input };
 const novasMsgs = [...msgs, novaMsg];
 setMsgs(novasMsgs);
 setInput("");
 setLoading(true);
 try {
 const res = await fetch("https://api.anthropic.com/v1/messages", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 model: "claude-sonnet-4-20250514",
 max_tokens: 1000,
 system: SYSTEM_PROMPT,
 messages: novasMsgs.map(m => ({ role: m.role, content: m.content }))
 })
 });
 const data = await res.json();
 const resposta = data.content?.[0]?.text || "Erro na resposta.";
 setMsgs(m => [...m, { role: "assistant", content: resposta }]);
 } catch (e) {
 setMsgs(m => [...m, { role: "assistant", content: "Erro de conexão. Tente novamente." } }
 setLoading(false);
 };
 const feitas = tarefas.filter(t => t.feito).length;
 return (
 <div style={{ height: "100vh", background: "#030303", color: "#D8D8D0", fontFamily: "'Cou {/* Topbar */}
 <div style={{ background: "#080808", borderBottom: "1px solid #141414", padding: "10px  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
 <div>
 <div style={{ fontSize: "7px", letterSpacing: "4px", color: "#E8C547" }}>PAINEL D <div style={{ fontSize: "15px", fontWeight: "700", color: "#FFF", letterSpacing:  </div>
 <div style={{ width: "1px", height: "28px", background: "#1A1A1A" }} />
 <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
 <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B <div style={{ fontSize: "8px", color: "#10B981", letterSpacing: "2px" }}>SISTEMA  </div>
 </div>
 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
 <div style={{ textAlign: "right" }}>
 <div style={{ fontSize: "7px", color: "#444", letterSpacing: "2px" }}>IP ATIVO</d <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF3366" }}>OS BABOS ★ </div>
 </div>
 </div>
 {/* Nav */}
 <div style={{ display: "flex", background: "#060606", borderBottom: "1px solid #111", f {[
 { id: "chat", label: "⬡ CHAT" },
 { id: "dashboard", label: "◈ DASHBOARD" },
 { id: "ips", label: "▣ IPs" },
 { id: "pipeline", label: "◎ PIPELINE" },
 { id: "tarefas", label: "◇ TAREFAS" },
 ].map(n => (
 <button key={n.id} onClick={() => setAba(n.id)} style={{
 background: "transparent", border: "none",
 borderBottom: `2px solid ${aba === n.id ? "#E8C547" : "transparent"}`,
 padding: "10px 16px", color: aba === n.id ? "#E8C547" : "#444",
 fontSize: "8px", letterSpacing: "2px", cursor: "pointer",
 fontFamily: "'Courier New', monospace", fontWeight: "700", whiteSpace: "nowrap"
 }}>{n.label}</button>
 ))}
 </div>
 {/* Conteúdo */}
 <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
 {/* CHAT */}
 {aba === "chat" && (
 <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px", display: {msgs.map((m, i) => (
 <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "f <div style={{
 maxWidth: "75%",
 background: m.role === "user" ? "#FF336620" : "#0F0F0F",
 border: `1px solid ${m.role === "user" ? "#FF336640" : "#1A1A1A"}`,
 borderRadius: m.role === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0" padding: "12px 14px"
 }}>
 {m.role === "assistant" && (
 <div style={{ fontSize: "7px", color: "#E8C547", letterSpacing: "2px",  )}
 <div style={{ fontSize: "11px", color: m.role === "user" ? "#FF9999" : "# {m.content}
 </div>
 </div>
 </div>
 ))}
 {loading && (
 <div style={{ display: "flex", justifyContent: "flex-start" }}>
 <div style={{ background: "#0F0F0F", border: "1px solid #1A1A1A", borderRad <div style={{ fontSize: "7px", color: "#E8C547", letterSpacing: "2px", ma <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
 {[0, 1, 2].map(i => (
 <div key={i} style={{
 width: "6px", height: "6px", borderRadius: "50%", background: "#E8C animation: "pulse 1s infinite", animationDelay: `${i * 0.2}s`, opac }} />
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 {/* Input */}
 <div style={{ padding: "12px 16px", background: "#080808", borderTop: "1px solid  <input
 value={input}
 onChange={e => setInput(e.target.value)}
 onKeyDown={e => e.key === "Enter" && !e.shiftKey && enviar()}
 placeholder="Digite aqui..."
 style={{
 flex: 1, background: "#0F0F0F", border: "1px solid #1A1A1A",
 borderRadius: "8px", padding: "10px 14px", color: "#CCC",
 fontSize: "11px", fontFamily: "'Courier New', monospace", outline: "none"
 }}
 />
 <button onClick={enviar} disabled={loading} style={{
 background: loading ? "#111" : "#E8C547", border: "none", borderRadius: "8px" padding: "10px 20px", color: loading ? "#444" : "#000", fontSize: "10px",
 fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
 fontFamily: "'Courier New', monospace", letterSpacing: "2px", transition: "al }}>
 {loading ? "..." : "ENVIAR"}
 </button>
 </div>
 </div>
 )}
 {/* DASHBOARD */}
 {aba === "dashboard" && (
 <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "grid", gap: "1 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" {[
 { l: "EPISÓDIOS", v: "13", sub: "T1 OS BABOS", cor: "#FF3366" },
 { l: "IPs TOTAL", v: "20", sub: "No universo", cor: "#A855F7" },
 { l: "PERSONAGENS", v: "15", sub: "OS BABOS", cor: "#10B981" },
 { l: "META ANO 1", v: "$25k", sub: "USD/mês", cor: "#E8C547" },
 ].map((m, i) => (
 <div key={i} style={{ background: "#0A0A0A", border: `1px solid ${m.cor}25`,  <div style={{ fontSize: "8px", color: "#555", letterSpacing: "2px", marginB <div style={{ fontSize: "26px", fontWeight: "700", color: m.cor }}>{m.v}</d <div style={{ fontSize: "8px", color: "#444", marginTop: "2px" }}>{m.sub}</ </div>
 ))}
 </div>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
 <div style={{ background: "#0A0A0A", border: "1px solid #141414", borderRadius: <div style={{ fontSize: "8px", color: "#555", letterSpacing: "3px", marginBot
 {PIPELINE.map((p, i) => (
 <div key={i} style={{ display: "flex", justifyContent: "space-between", ali <div style={{ fontSize: "10px", color: "#CCC" }}>{p.etapa} <span style={{ <div style={{ fontSize: "7px", color: p.status === "ok" ? "#10B981" : p.s {p.status === "ok" ? "✓ OK" : p.status === "pendente" ? "ANDAMENTO" : " </div>
 </div>
 ))}
 </div>
 <div style={{ background: "#0A0A0A", border: "1px solid #141414", borderRadius: <div style={{ display: "flex", justifyContent: "space-between", marginBottom: <div style={{ fontSize: "8px", color: "#555", letterSpacing: "3px" }}>TAREF <div style={{ fontSize: "9px", color: "#444" }}>{feitas}/{tarefas.length}</ </div>
 <div style={{ height: "4px", background: "#111", borderRadius: "4px", marginB <div style={{ height: "100%", width: `${(feitas / tarefas.length) * 100}%`, </div>
 {tarefas.slice(0, 6).map((t, i) => (
 <div key={i} onClick={() => setTarefas(ts => ts.map((item, idx) => idx ===  <div style={{ width: "12px", height: "12px", borderRadius: "3px", border: {t.feito && <span style={{ fontSize: "7px", color: "#000", fontWeight:  </div>
 <div style={{ fontSize: "10px", color: t.feito ? "#444" : "#CCC", textDec </div>
 ))}
 </div>
 </div>
 </div>
 )}
 {/* IPs */}
 {aba === "ips" && (
 <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "grid", gap: "8 <div style={{ fontSize: "8px", color: "#555", letterSpacing: "3px", marginBottom: {IPs.map((ip, i) => (
 <div key={i} style={{ background: "#0A0A0A", border: `1px solid ${ip.cor}20`, b <div style={{ display: "flex", justifyContent: "space-between", alignItems: " <div style={{ fontSize: "12px", fontWeight: "700", color: "#FFF" }}>{ip.nom <div style={{ fontSize: "8px", color: ip.status === "ATIVO" ? "#10B981" : i </div>
 <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
 <div style={{ fontSize: "9px", color: "#555" }}>EPS: <span style={{ color:  <div style={{ fontSize: "9px", color: "#555" }}>TEMPS: <span style={{ color </div>
 <div style={{ height: "3px", background: "#111", borderRadius: "3px" }}>
 <div style={{ height: "100%", width: `${ip.progresso}%`, background: ip.cor
 </div>
 </div>
 ))}
 </div>
 )}
 {/* PIPELINE */}
 {aba === "pipeline" && (
 <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "grid", gap: "1 <div style={{ fontSize: "8px", color: "#555", letterSpacing: "3px", marginBottom: {PIPELINE.map((p, i) => (
 <div key={i} style={{ background: "#0A0A0A", border: `1px solid ${p.status ===  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
 <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroun <div>
 <div style={{ fontSize: "12px", fontWeight: "700", color: "#FFF" }}>{p.et <div style={{ fontSize: "9px", color: "#555", marginTop: "2px" }}>{p.ferr </div>
 </div>
 <div style={{ fontSize: "8px", letterSpacing: "2px", fontWeight: "700", color {p.status === "ok" ? "✓ CONCLUÍDO" : p.status === "pendente" ? "EM ANDAMENT </div>
 </div>
 ))}
 </div>
 )}
 {/* TAREFAS */}
 {aba === "tarefas" && (
 <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10 <div style={{ fontSize: "8px", color: "#555", letterSpacing: "3px" }}>TODAS AS  <div style={{ fontSize: "9px", color: "#444" }}>{feitas}/{tarefas.length} concl </div>
 <div style={{ height: "6px", background: "#0A0A0A", borderRadius: "4px", marginBo <div style={{ height: "100%", width: `${(feitas / tarefas.length) * 100}%`, bac </div>
 {tarefas.map((t, i) => (
 <div key={i} onClick={() => setTarefas(ts => ts.map((item, idx) => idx === i ?  <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: `1p {t.feito && <span style={{ fontSize: "9px", color: "#000", fontWeight: "700 </div>
 <div style={{ flex: 1, fontSize: "11px", color: t.feito ? "#555" : "#CCC", te <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: t </div>
 ))}
 </div>
 )}
 </div>
 {/* Footer */}
 <div style={{ background: "#060606", borderTop: "1px solid #0F0F0F", padding: "8px 20px <div style={{ fontSize: "7px", color: "#222", letterSpacing: "3px" }}>MULTIUNIVERSE S <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
 <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10B98 <div style={{ fontSize: "7px", color: "#2A2A2A", letterSpacing: "2px" }}>CLAUDE API </div>
 <div style={{ fontSize: "7px", color: "#222", letterSpacing: "3px" }}>PAINEL v2.0</di </div>
 </div>
 );

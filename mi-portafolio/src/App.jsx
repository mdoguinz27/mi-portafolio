import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bug, 
  User, 
  Trash2, 
  Plus, 
  Mail, 
  MapPin, 
  GraduationCap, 
  ShieldCheck,
  Camera,
  Cpu,
  Globe,
  Database,
  Layers,
  Zap,
  Terminal,
  Code2,
  Box,
  Workflow,
  Settings,
  Activity,
  Linkedin,
  Github,
  Link as LinkIcon,
  Twitter,
  Gitlab,
  Smartphone,
  Lock,
  Unlock,
  Download,
  X,
  Palette,
  BookOpen
} from 'lucide-react';

const MASTER_PIN = "1234";

const themes = {
  oscuro: { primary: "blue-500", bg: "#020617", accent: "text-blue-400", border: "border-blue-500/20", btn: "bg-blue-600", shadow: "shadow-blue-500/20", card: "bg-slate-950" },
  claro: { primary: "blue-600", bg: "#f8fafc", accent: "text-blue-600", border: "border-blue-200", btn: "bg-blue-600", shadow: "shadow-blue-200/50", card: "bg-white" }
};

const availableIcons = [
  { id: 'Mail', icon: Mail, label: 'Email' },
  { id: 'Github', icon: Github, label: 'GitHub' },
  { id: 'Gitlab', icon: Gitlab, label: 'GitLab' },
  { id: 'Linkedin', icon: Linkedin, label: 'LinkedIn' },
  { id: 'MapPin', icon: MapPin, label: 'Ubicación' },
  { id: 'Globe', icon: Globe, label: 'Web' },
  { id: 'Twitter', icon: Twitter, label: 'Twitter' },
  { id: 'Smartphone', icon: Smartphone, label: 'Teléfono' },
  { id: 'LinkIcon', icon: LinkIcon, label: 'Enlace' }
];

const techIcons = {
  Code2: <Code2 size={16} />,
  Terminal: <Terminal size={16} />,
  Database: <Database size={16} />,
  Globe: <Globe size={16} />,
  Cpu: <Cpu size={16} />,
  Layers: <Layers size={16} />,
  Box: <Box size={16} />,
  Workflow: <Workflow size={16} />,
  Zap: <Zap size={16} />,
  Activity: <Activity size={16} />,
  Settings: <Settings size={16} />,
  Bug: <Bug size={14} />
};

const defaultData = {
  name: "Maria Gabriela Doguinz",
  role: "Ingeniera Líder de QA Automation",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=300&h=300",
  currentTheme: "oscuro",
  contactInfo: [
    { id: 1, type: 'Mail', value: 'gabriela.qa@dev.io', label: 'Email' },
    { id: 2, type: 'MapPin', value: 'Buenos Aires, Argentina', label: 'Ubicación' },
    { id: 3, type: 'Linkedin', value: 'linkedin.com/in/gabriela-qa', label: 'LinkedIn' },
    { id: 4, type: 'Github', value: 'github.com/gabriela-dev', label: 'GitHub' }
  ],
  experience: [
    { id: 1, company: "Fravega", position: "Líder de QA Automation", period: "2022 - Actualidad", desc: "Diseño de frameworks con Playwright y Cypress.\n- Liderazgo de equipo de 5 ingenieros QA." },
    { id: 2, company: "Accenture", position: "Ingeniera de Automatización", period: "2019 - 2022", desc: "Pruebas de rendimiento y automatización de servicios REST." }
  ],
  education: [
    { id: 1, degree: "Licenciatura en Sistemas", school: "UTN FRBA", year: "2020", type: 'degree' },
    { id: 2, degree: "Certificación ISTQB Foundation", school: "ISTQB", year: "2021", type: 'course' }
  ],
  skills: [
    { id: 1, name: "Cypress", level: 95, icon: "Zap" },
    { id: 2, name: "Playwright", level: 90, icon: "Activity" },
    { id: 3, name: "Jenkins", level: 85, icon: "Workflow" },
    { id: 4, name: "Appium", level: 80, icon: "Box" }
  ]
};

const IconRenderer = ({ iconName, size = 14, className = "" }) => {
  const iconObj = availableIcons.find(i => i.id === iconName);
  if (!iconObj) return <LinkIcon size={size} className={className} />;
  const IconTag = iconObj.icon;
  return <IconTag size={size} className={className} />;
};

const EditableText = ({ value, onUpdate, className, isTextArea = false, isEditMode }) => {
  const [localValue, setLocalValue] = useState(value || "");
  useEffect(() => setLocalValue(value), [value]);

  if (!isEditMode) {
    return <div className={`${className} ${isTextArea ? 'whitespace-pre-wrap' : ''}`}>{value || "---"}</div>;
  }

  const inputClasses = `
    ${className} bg-blue-500/10 border border-blue-500/30 text-blue-100 
    rounded-md px-2 py-1 outline-none focus:border-blue-400 transition-all w-full
  `;

  return isTextArea ? (
    <textarea 
      value={localValue} 
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => onUpdate(localValue)}
      className={`${inputClasses} min-h-[100px] resize-none font-sans text-xs`}
    />
  ) : (
    <input 
      type="text" 
      value={localValue} 
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => onUpdate(localValue)}
      className={inputClasses}
    />
  );
};

const App = () => {
  const [data, setData] = useState(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const currentTheme = themes[data.currentTheme];

  const handleToggleEdit = () => {
    if (!isEditMode) {
      const pin = prompt("Introduce el PIN de acceso:");
      if (pin === MASTER_PIN) setIsEditMode(true);
      else alert("PIN Incorrecto");
    } else {
      setIsEditMode(false);
    }
  };

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownloadPDF = () => window.print();

  return (
    <div className={`min-h-screen relative font-mono transition-colors duration-500 print:bg-white`} style={{ backgroundColor: currentTheme.bg, color: data.currentTheme === 'oscuro' ? '#94a3b8' : '#475569' }}>
      
      {/* Fondo Grilla */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 print:hidden`} style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${data.currentTheme === 'oscuro' ? '#3b82f6' : '#cbd5e1'} 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 border-b ${data.currentTheme === 'oscuro' ? 'border-white/10 bg-black/80' : 'border-slate-200 bg-white/80'} backdrop-blur-xl px-8 py-4 flex justify-between items-center shadow-sm print:hidden`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 ${currentTheme.accent}`}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className={`font-black ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} text-sm tracking-tighter uppercase`}>QA_CONSOLE_PRO</span>
            <span className="block text-[8px] opacity-50 tracking-[0.2em]">ESTADO: SISTEMA_ESTABLE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all shadow-lg flex items-center gap-2">
            <Download size={14}/> EXPORTAR_PDF
          </button>

          <button 
            onClick={handleToggleEdit}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${isEditMode ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-500/10 border-slate-500/30 text-slate-500'}`}
          >
            {isEditMode ? <Unlock size={14}/> : <Lock size={14}/>} {isEditMode ? 'CERRAR_EDITOR' : 'MODO_EDITOR'}
          </button>

          <div className="flex bg-slate-500/10 p-1 rounded-full gap-1">
            {['oscuro', 'claro'].map(t => (
              <button key={t} onClick={() => updateField('currentTheme', t)} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${data.currentTheme === t ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-32 pb-24 px-8 relative z-10 print:pt-0">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className={`${currentTheme.card} border ${currentTheme.border} p-1 rounded-3xl shadow-xl print:border-none print:shadow-none`}>
              <div className="p-8 rounded-[1.4rem]">
                <div className="relative w-32 h-32 mx-auto mb-6 group">
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed ${currentTheme.primary === 'blue-500' ? 'border-blue-500' : 'border-blue-300'} animate-spin-slow print:hidden`} />
                  <img src={data.photo} className="w-full h-full rounded-full object-cover p-1.5" alt="Perfil" />
                  {isEditMode && (
                    <button onClick={() => {
                      const url = prompt("URL de la foto:", data.photo);
                      if (url) updateField('photo', url);
                    }} className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <Camera size={24} />
                    </button>
                  )}
                </div>
                
                <div className="text-center space-y-3">
                  <EditableText isEditMode={isEditMode} value={data.name} onUpdate={(v) => updateField('name', v)} className={`text-xl font-black ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} tracking-tighter`} />
                  <EditableText isEditMode={isEditMode} value={data.role} onUpdate={(v) => updateField('role', v)} className={`${currentTheme.accent} font-black text-[9px] uppercase tracking-[0.2em]`} />
                  
                  {/* Info Personal Dinámica */}
                  <div className="pt-6 space-y-2 text-[10px] text-left">
                    {data.contactInfo.map((info, idx) => (
                      <div key={info.id} className={`${data.currentTheme === 'oscuro' ? 'bg-white/5' : 'bg-slate-100'} p-2 rounded-lg border border-transparent flex items-center gap-3 relative group`}>
                        {isEditMode ? (
                          <div className="flex flex-col w-full gap-2 p-1">
                            <div className="flex gap-2">
                              <select 
                                value={info.type}
                                onChange={(e) => {
                                  const newList = [...data.contactInfo];
                                  newList[idx].type = e.target.value;
                                  updateField('contactInfo', newList);
                                }}
                                className="bg-black/50 border border-white/10 rounded px-1 text-[9px] text-blue-300 outline-none"
                              >
                                {availableIcons.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                              </select>
                              <button onClick={() => updateField('contactInfo', data.contactInfo.filter(c => c.id !== info.id))} className="text-red-500 hover:text-red-400 ml-auto">
                                <Trash2 size={12}/>
                              </button>
                            </div>
                            <input 
                              className="bg-transparent border-b border-blue-500/30 text-[10px] outline-none focus:border-blue-500 w-full"
                              value={info.value}
                              onChange={(e) => {
                                const newList = [...data.contactInfo];
                                newList[idx].value = e.target.value;
                                updateField('contactInfo', newList);
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            <span className={`${currentTheme.accent} w-4 flex-shrink-0`}>
                              <IconRenderer iconName={info.type} />
                            </span>
                            <span className="truncate">{info.value}</span>
                          </>
                        )}
                      </div>
                    ))}
                    
                    {isEditMode && (
                      <button 
                        onClick={() => updateField('contactInfo', [...data.contactInfo, { id: Date.now(), type: 'LinkIcon', value: 'nuevo-dato', label: 'Nuevo' }])}
                        className="w-full py-2 border-2 border-dashed border-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-500/5 transition-colors"
                      >
                        <Plus size={14} /> AGREGAR_CAMPO
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className={`${currentTheme.card} border ${currentTheme.border} p-6 rounded-3xl print:border-none`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-2 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`}>
                  <Terminal size={12}/> PILA_TECNOLÓGICA
                </h3>
                {isEditMode && (
                  <button onClick={() => updateField('skills', [...data.skills, { id: Date.now(), name: "Nueva Skill", level: 50, icon: "Code2" }])} className="text-blue-500 hover:text-blue-400">
                    <Plus size={14} />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {data.skills.map((s, idx) => (
                  <div key={s.id} className="group relative">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2 flex-1">
                        {isEditMode ? (
                          <select 
                            value={s.icon}
                            onChange={(e) => {
                              const ns = [...data.skills]; ns[idx].icon = e.target.value; updateField('skills', ns);
                            }}
                            className="bg-black/20 border border-white/10 rounded text-[9px] text-blue-300"
                          >
                            {Object.keys(techIcons).map(iconKey => <option key={iconKey} value={iconKey}>{iconKey}</option>)}
                          </select>
                        ) : (
                          <span className={currentTheme.accent}>{techIcons[s.icon] || <Code2 size={14}/>}</span>
                        )}
                        <EditableText isEditMode={isEditMode} value={s.name} onUpdate={(v) => {
                          const ns = [...data.skills]; ns[idx].name = v; updateField('skills', ns);
                        }} className="text-[10px] font-black uppercase tracking-wider" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold ${currentTheme.accent}`}>{s.level}%</span>
                        {isEditMode && (
                          <button onClick={() => updateField('skills', data.skills.filter(sk => sk.id !== s.id))} className="text-red-500/50 hover:text-red-500">
                            <Trash2 size={10}/>
                          </button>
                        )}
                      </div>
                    </div>
                    {isEditMode ? (
                      <input type="range" className="w-full accent-blue-500 h-1" value={s.level} onChange={(e) => {
                        const ns = [...data.skills]; ns[idx].level = e.target.value; updateField('skills', ns);
                      }} />
                    ) : (
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} className={`h-full ${currentTheme.btn}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Contenido Principal */}
          <section className="lg:col-span-8 space-y-10">
             <div className={`${currentTheme.card} border ${currentTheme.border} p-8 rounded-3xl print:border-none`}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-3 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`}>
                    <Terminal size={14} className={currentTheme.accent}/> HISTORIAL_DE_TRABAJO
                  </h2>
                  {isEditMode && (
                    <button onClick={() => updateField('experience', [...data.experience, { id: Date.now(), company: 'Nueva Co', position: 'Rol', period: '2024', desc: 'Logros...' }])} className="text-[10px] font-black text-blue-500 flex items-center gap-1 border border-blue-500/30 px-2 py-1 rounded">
                      <Plus size={12}/> AÑADIR_EXP
                    </button>
                  )}
                </div>
                
                <div className="space-y-8">
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-blue-500/20 group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500" />
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-full">
                          <EditableText isEditMode={isEditMode} value={exp.position} onUpdate={(v) => {
                            const ne = [...data.experience]; ne[idx].position = v; updateField('experience', ne);
                          }} className="font-bold text-white text-sm" />
                          <EditableText isEditMode={isEditMode} value={exp.company} onUpdate={(v) => {
                            const ne = [...data.experience]; ne[idx].company = v; updateField('experience', ne);
                          }} className={`${currentTheme.accent} text-[10px] font-bold`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <EditableText isEditMode={isEditMode} value={exp.period} onUpdate={(v) => {
                            const ne = [...data.experience]; ne[idx].period = v; updateField('experience', ne);
                          }} className="text-[9px] opacity-50 whitespace-nowrap" />
                          {isEditMode && (
                            <button onClick={() => updateField('experience', data.experience.filter(e => e.id !== exp.id))} className="text-red-500/40 hover:text-red-500">
                              <Trash2 size={12}/>
                            </button>
                          )}
                        </div>
                      </div>
                      <EditableText isEditMode={isEditMode} value={exp.desc} onUpdate={(v) => {
                        const ne = [...data.experience]; ne[idx].desc = v; updateField('experience', ne);
                      }} isTextArea className="text-xs leading-relaxed" />
                    </div>
                  ))}
                </div>
             </div>

             {/* Formación */}
             <div className={`${currentTheme.card} border ${currentTheme.border} p-8 rounded-3xl border-dashed print:border-none`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={14} className={currentTheme.accent}/> FORMACIÓN_Y_CURSOS
                  </h2>
                  {isEditMode && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateField('education', [...data.education, { id: Date.now(), degree: 'Nuevo Título', school: 'Institución', year: '2024', type: 'degree' }])}
                        className="text-[9px] font-black text-blue-500 flex items-center gap-1 border border-blue-500/20 px-2 py-1 rounded hover:bg-blue-500/5"
                      >
                        <GraduationCap size={12}/> + TÍTULO
                      </button>
                      <button 
                        onClick={() => updateField('education', [...data.education, { id: Date.now(), degree: 'Nuevo Curso', school: 'Plataforma', year: '2024', type: 'course' }])}
                        className="text-[9px] font-black text-emerald-500 flex items-center gap-1 border border-emerald-500/20 px-2 py-1 rounded hover:bg-emerald-500/5"
                      >
                        <BookOpen size={12}/> + CURSO
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {data.education.map((ed, idx) => (
                    <div key={ed.id} className={`relative border-l-2 ${ed.type === 'degree' ? 'border-blue-500/30' : 'border-emerald-500/20'} pl-4 space-y-1 group`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <EditableText isEditMode={isEditMode} value={ed.degree} onUpdate={(v) => {
                            const ne = [...data.education]; ne[idx].degree = v; updateField('education', ne);
                          }} className={`font-bold text-xs ${ed.type === 'degree' ? 'text-white' : 'text-slate-300 italic'}`} />
                          <EditableText isEditMode={isEditMode} value={ed.school} onUpdate={(v) => {
                            const ne = [...data.education]; ne[idx].school = v; updateField('education', ne);
                          }} className="text-[9px] uppercase font-black opacity-50" />
                          <EditableText isEditMode={isEditMode} value={ed.year} onUpdate={(v) => {
                            const ne = [...data.education]; ne[idx].year = v; updateField('education', ne);
                          }} className="text-[9px] opacity-30" />
                        </div>
                        {isEditMode && (
                          <button onClick={() => updateField('education', data.education.filter(item => item.id !== ed.id))} className="text-red-500/30 hover:text-red-500 ml-2">
                            <Trash2 size={12}/>
                          </button>
                        )}
                      </div>
                      {ed.type === 'course' && !isEditMode && (
                        <div className="text-[8px] text-emerald-500/60 font-black tracking-widest uppercase mt-1">CURSO_OPCIONAL</div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          </section>
        </div>
      </main>

      {/* Footer Terminal */}
      <footer className={`fixed bottom-0 w-full ${data.currentTheme === 'oscuro' ? 'bg-black/90' : 'bg-slate-900 text-white'} border-t border-white/10 px-8 py-3 flex justify-between items-center text-[9px] font-black tracking-[0.2em] z-50 print:hidden`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            <span className="text-blue-400">SESIÓN_ACTIVA</span>
          </div>
        </div>
        <div className="opacity-40">{isEditMode ? 'MODO: EDITOR_HABILITADO' : 'SISTEMA: MODO_LECTURA'}</div>
      </footer>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        @media print { .print\\:hidden { display: none !important; } }
      `}</style>
    </div>
  );
};

export default App;
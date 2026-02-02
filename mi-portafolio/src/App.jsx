import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Link as LinkIcon
} from 'lucide-react';

const themes = {
  oscuro: { primary: "blue-500", bg: "#020617", accent: "text-blue-400", border: "border-blue-500/20", btn: "bg-blue-600", shadow: "shadow-blue-500/20", card: "bg-slate-950" },
  claro: { primary: "blue-600", bg: "#f8fafc", accent: "text-blue-600", border: "border-blue-200", btn: "bg-blue-600", shadow: "shadow-blue-200/50", card: "bg-white" }
};

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
  Bug: <Bug size={16} />
};

const personalFields = [
  { label: "Correo Electrónico", icon: <Mail size={14} />, key: "email" },
  { label: "Ubicación", icon: <MapPin size={14} />, key: "location" },
  { label: "LinkedIn", icon: <Linkedin size={14} />, key: "linkedin" },
  { label: "GitHub", icon: <Github size={14} />, key: "github" },
  { label: "Sitio Web", icon: <LinkIcon size={14} />, key: "website" }
];

const defaultData = {
  name: "Maria Gabriela Doguinz",
  role: "Ingeniera Líder de QA Automation",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=300&h=300",
  currentTheme: "oscuro",
  contact: { 
    email: "gabriela.qa@dev.io", 
    location: "Buenos Aires, Argentina",
    linkedin: "linkedin.com/in/gabriela-qa",
    github: "github.com/gabriela-dev"
  },
  experience: [
    { id: 1, company: "Fravega", position: "Líder de QA Automation", period: "2022 - Actualidad", desc: "Diseño de frameworks con Playwright y Cypress. Implementación de pipelines de CI/CD para pruebas distribuidas." },
    { id: 2, company: "Accenture", position: "Ingeniera de Automatización", period: "2019 - 2022", desc: "Pruebas de rendimiento y automatización de servicios REST en entornos cloud." }
  ],
  education: [{ id: 1, degree: "Licenciatura en Sistemas", school: "UTN FRBA", year: "2020" }],
  skills: [
    { id: 1, name: "Cypress", level: 95, icon: "Zap" },
    { id: 2, name: "Playwright", level: 90, icon: "Activity" },
    { id: 3, name: "Jenkins", level: 85, icon: "Workflow" },
    { id: 4, name: "Appium", level: 80, icon: "Box" }
  ]
};

const App = () => {
  const [data, setData] = useState(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const currentTheme = themes[data.currentTheme];

  const updateField = (path, value) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const addItem = (collection) => {
    const newItem = collection === 'experience' 
      ? { id: Date.now(), company: "Nueva Empresa", position: "Nuevo Rol", period: "2024", desc: "Descripción de responsabilidades..." }
      : collection === 'skills' 
      ? { id: Date.now(), name: "Nueva Tecnología", level: 50, icon: "Code2" }
      : { id: Date.now(), degree: "Título o Certificación", school: "Institución", year: "2024" };
    setData({ ...data, [collection]: [...data[collection], newItem] });
  };

  const removeItem = (collection, id) => {
    setData({ ...data, [collection]: data[collection].filter(item => item.id !== id) });
  };

  const EditableText = ({ value, onUpdate, className, isTextArea = false }) => {
    const [localValue, setLocalValue] = useState(value || "");
    useEffect(() => setLocalValue(value), [value]);

    if (!isEditMode) return <span className={className}>{value || "---"}</span>;

    return isTextArea ? (
      <textarea 
        value={localValue} 
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onUpdate(localValue)}
        className={`${className} bg-blue-500/5 border border-blue-500/20 rounded-lg p-2 w-full outline-none focus:border-blue-500 backdrop-blur-sm`}
      />
    ) : (
      <input 
        type="text" 
        value={localValue} 
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onUpdate(localValue)}
        className={`${className} bg-blue-500/5 border border-blue-500/20 rounded-lg p-1 px-3 outline-none focus:border-blue-500 backdrop-blur-sm`}
      />
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-mono transition-colors duration-500" style={{ backgroundColor: currentTheme.bg, color: data.currentTheme === 'oscuro' ? '#94a3b8' : '#475569' }}>
      
      {/* Fondo con Rejilla */}
      <div className={`absolute inset-0 pointer-events-none opacity-20`} style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${data.currentTheme === 'oscuro' ? '#3b82f6' : '#cbd5e1'} 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

      {/* Navegación */}
      <nav className={`fixed top-0 w-full z-50 border-b ${data.currentTheme === 'oscuro' ? 'border-white/10 bg-black/80' : 'border-slate-200 bg-white/80'} backdrop-blur-xl px-8 py-4 flex justify-between items-center shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 ${currentTheme.accent}`}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className={`font-black ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} text-sm tracking-tighter`}>QA_CONSOLE_PRO</span>
            <span className="block text-[8px] opacity-50 tracking-[0.2em]">ESTADO: SISTEMA_ESTABLE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isEditMode ? 'text-blue-500' : 'opacity-40'}`}>
              {isEditMode ? 'Modo_Edición' : 'Solo_Lectura'}
            </span>
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`w-12 h-6 rounded-full p-1 border transition-all ${isEditMode ? 'bg-blue-500/20 border-blue-500/50' : 'bg-slate-200 border-slate-300'}`}
            >
              <motion.div 
                animate={{ x: isEditMode ? 24 : 0 }}
                className={`w-4 h-4 rounded-full ${isEditMode ? 'bg-blue-500 shadow-lg' : 'bg-slate-500'}`}
              />
            </button>
          </div>
          
          <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full gap-1">
            {Object.keys(themes).map(t => (
              <button 
                key={t} 
                onClick={() => setData({...data, currentTheme: t})} 
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${data.currentTheme === t ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-32 pb-24 px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* PERFIL E INFO PERSONAL */}
          <aside className="lg:col-span-4 space-y-8">
            <div className={`relative ${currentTheme.card} border ${currentTheme.border} p-1 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md`}>
              <div className="p-8 rounded-[1.4rem]">
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed ${currentTheme.primary === 'blue-500' ? 'border-blue-500' : 'border-blue-300'} animate-spin-slow`} />
                  <img src={data.photo} className="w-full h-full rounded-full object-cover p-2" alt="Foto Perfil" />
                  {isEditMode && (
                    <button onClick={() => {
                      const url = prompt("URL de la imagen:", data.photo);
                      if(url) updateField('photo', url);
                    }} className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-all shadow-xl">
                      <Camera size={18} />
                    </button>
                  )}
                </div>
                
                <div className="text-center space-y-4">
                  <div className="space-y-1">
                    <EditableText value={data.name} onUpdate={(v) => updateField('name', v)} className={`text-2xl font-black ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} block tracking-tighter`} />
                    <EditableText value={data.role} onUpdate={(v) => updateField('role', v)} className={`${currentTheme.accent} font-black text-[10px] uppercase tracking-[0.3em] block`} />
                  </div>
                  
                  {/* Campos Personales Dinámicos */}
                  <div className="pt-6 grid grid-cols-1 gap-2 text-[10px] text-left">
                    {personalFields.map(field => (
                      <div key={field.key} className={`${data.currentTheme === 'oscuro' ? 'bg-white/5' : 'bg-slate-100'} p-3 rounded-xl border border-transparent hover:border-blue-500/30 flex items-center gap-3 transition-colors group`}>
                        <span className={currentTheme.accent}>{field.icon}</span>
                        <EditableText 
                          value={data.contact[field.key]} 
                          onUpdate={(v) => updateField(`contact.${field.key}`, v)} 
                          className="flex-1 overflow-hidden text-ellipsis"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades Técnicas */}
            <div className={`${currentTheme.card} border ${currentTheme.border} p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-lg`}>
              <div className="flex justify-between items-center mb-8">
                <h3 className={`font-black text-xs uppercase tracking-widest flex items-center gap-2 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`}>
                  <Terminal size={14} className={currentTheme.accent}/> PILA_TECNOLÓGICA
                </h3>
                {isEditMode && <button onClick={() => addItem('skills')} className="text-blue-500 hover:rotate-90 transition-all"><Plus size={18}/></button>}
              </div>
              
              <div className="space-y-6">
                {data.skills.map((s, idx) => (
                  <div key={s.id} className="relative group/skill">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${data.currentTheme === 'oscuro' ? 'bg-white/5' : 'bg-slate-100'} ${currentTheme.accent} border border-transparent group-hover/skill:border-blue-500/50 transition-colors`}>
                          {isEditMode ? (
                            <select 
                              value={s.icon} 
                              onChange={(e) => {
                                const ns = [...data.skills];
                                ns[idx].icon = e.target.value;
                                setData({...data, skills: ns});
                              }}
                              className="bg-transparent text-[10px] outline-none"
                            >
                              {Object.keys(techIcons).map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
                            </select>
                          ) : techIcons[s.icon] || <Code2 size={16}/>}
                        </div>
                        <EditableText value={s.name} onUpdate={(v) => {
                          const ns = [...data.skills];
                          ns[idx].name = v;
                          setData({...data, skills: ns});
                        }} className="text-xs font-black uppercase tracking-wider" />
                      </div>
                      <div className="flex items-center gap-2">
                        {isEditMode && <button onClick={() => removeItem('skills', s.id)} className="text-red-500 mb-1"><Trash2 size={12}/></button>}
                        <span className={`text-[10px] font-bold ${currentTheme.accent}`}>{s.level}%</span>
                      </div>
                    </div>
                    <div className={`h-1.5 ${data.currentTheme === 'oscuro' ? 'bg-white/5' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${s.level}%` }}
                        className={`h-full ${currentTheme.btn}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL: Experiencia y Educación */}
          <section className="lg:col-span-8 space-y-12">
            
            <div className="space-y-8">
              <div className="flex justify-between items-center px-4">
                <h2 className={`font-black text-xs uppercase tracking-widest flex items-center gap-3 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`}>
                  <span className={`w-8 h-[1px] ${currentTheme.btn}`} /> HISTORIAL_DE_DESPLIEGUE
                </h2>
                {isEditMode && <button onClick={() => addItem('experience')} className="text-blue-500 font-black text-[10px] border border-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-500/10 transition-all">+ NUEVO_REGISTRO</button>}
              </div>

              <div className="grid gap-6">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className={`group relative ${currentTheme.card} border ${currentTheme.border} hover:border-blue-500/40 p-8 rounded-3xl transition-all duration-500 shadow-sm`}>
                    <div className={`absolute left-0 top-0 w-1 h-full ${currentTheme.btn} shadow-[0_0_15px_rgba(59,130,246,0.5)] opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <EditableText value={exp.position} onUpdate={(v) => {
                              const ne = [...data.experience];
                              ne[idx].position = v;
                              setData({...data, experience: ne});
                            }} className={`font-black text-xl tracking-tighter block ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`} />
                            {isEditMode && <button onClick={() => removeItem('experience', exp.id)} className="text-red-500"><Trash2 size={16}/></button>}
                          </div>
                          <EditableText value={exp.company} onUpdate={(v) => {
                            const ne = [...data.experience];
                            ne[idx].company = v;
                            setData({...data, experience: ne});
                          }} className={`${currentTheme.accent} font-black text-[10px] uppercase tracking-widest block`} />
                        </div>
                        <EditableText value={exp.desc} onUpdate={(v) => {
                          const ne = [...data.experience];
                          ne[idx].desc = v;
                          setData({...data, experience: ne});
                        }} isTextArea className="text-sm leading-relaxed opacity-80 block font-sans" />
                      </div>
                      
                      <div className="text-right">
                        <EditableText value={exp.period} onUpdate={(v) => {
                          const ne = [...data.experience];
                          ne[idx].period = v;
                          setData({...data, experience: ne});
                        }} className={`text-[10px] font-black ${data.currentTheme === 'oscuro' ? 'text-white/40 bg-white/5' : 'text-slate-500 bg-slate-100'} border ${currentTheme.border} px-4 py-1.5 rounded-full block whitespace-nowrap`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Educación */}
            <div className={`${currentTheme.card} border ${currentTheme.border} p-10 rounded-3xl border-dashed shadow-inner`}>
              <div className="flex justify-between items-center mb-10">
                <h2 className={`font-black text-xs uppercase tracking-widest flex items-center gap-3 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`}>
                  <GraduationCap size={16} className={currentTheme.accent}/> VALIDACIÓN_DE_SISTEMA
                </h2>
                {isEditMode && <button onClick={() => addItem('education')} className="text-blue-500"><Plus size={18}/></button>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {data.education.map((ed, idx) => (
                  <div key={ed.id} className="relative group">
                    <div className={`space-y-1 border-l-2 ${data.currentTheme === 'oscuro' ? 'border-white/10' : 'border-slate-200'} pl-6 group-hover:border-blue-500 transition-colors`}>
                      <EditableText value={ed.degree} onUpdate={(v) => {
                        const ne = [...data.education];
                        ne[idx].degree = v;
                        setData({...data, education: ne});
                      }} className={`font-bold text-sm block ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'}`} />
                      <div className="flex justify-between text-[10px] uppercase font-black opacity-50">
                        <EditableText value={ed.school} onUpdate={(v) => {
                          const ne = [...data.education];
                          ne[idx].school = v;
                          setData({...data, education: ne});
                        }} />
                        <EditableText value={ed.year} onUpdate={(v) => {
                          const ne = [...data.education];
                          ne[idx].year = v;
                          setData({...data, education: ne});
                        }} />
                      </div>
                      {isEditMode && <button onClick={() => removeItem('education', ed.id)} className="text-red-500 mt-2"><Trash2 size={12}/></button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </main>

      {/* Footer Estilo Terminal */}
      <footer className={`fixed bottom-0 w-full ${data.currentTheme === 'oscuro' ? 'bg-black/90' : 'bg-slate-900 text-white'} border-t border-white/10 px-8 py-3 flex justify-between items-center text-[9px] font-black tracking-[0.2em] z-50`}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-blue-400">SESIÓN_ACTIVA</span>
          </div>
          <span className="opacity-30 border-l border-white/10 pl-6 uppercase">UBICACIÓN: {data.contact.location}</span>
        </div>
        <div className="flex gap-4 opacity-40">
          <span>{data.contact.github?.toUpperCase() || 'GITHUB'}</span>
          <span>BUILD_VER: 2.0.4-LTS</span>
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
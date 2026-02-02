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
  Link as LinkIcon,
  Lock,
  Unlock,
  Download,
  FileText
} from 'lucide-react';

// Clave maestra para habilitar edición
const MASTER_PIN = "1234";

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
  { label: "Correo Electrónico", icon: <Mail size={14} />, key: "email", type: "email" },
  { label: "Ubicación", icon: <MapPin size={14} />, key: "location", type: "text" },
  { label: "LinkedIn", icon: <Linkedin size={14} />, key: "linkedin", type: "url" },
  { label: "GitHub", icon: <Github size={14} />, key: "github", type: "url" },
  { label: "Sitio Web", icon: <LinkIcon size={14} />, key: "website", type: "url" }
];

const defaultData = {
  name: "Maria Gabriela Doguinz",
  role: "Ingeniera Líder de QA Automation",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=300&h=300",
  currentTheme: "oscuro",
  contact: { 
    email: "gabriela.qa@dev.io", 
    location: "Buenos Aires, Argentina",
    linkedin: "https://linkedin.com/in/gabriela-qa",
    github: "https://github.com/gabriela-dev"
  },
  experience: [
    { 
      id: 1, 
      company: "Fravega", 
      position: "Líder de QA Automation", 
      period: "2022 - Actualidad", 
      desc: "Diseño de frameworks con Playwright y Cypress.\n- Implementación de pipelines de CI/CD para pruebas distribuidas.\n- Liderazgo de equipo de 5 ingenieros QA." 
    },
    { 
      id: 2, 
      company: "Accenture", 
      position: "Ingeniera de Automatización", 
      period: "2019 - 2022", 
      desc: "Pruebas de rendimiento y automatización de servicios REST.\n- Optimización de scripts de JMeter.\n- Integración con AWS Device Farm." 
    }
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

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleToggleEdit = () => {
    if (!isEditMode) {
      const pin = prompt("Introduce el PIN de acceso para editar:");
      if (pin === MASTER_PIN) {
        setIsEditMode(true);
      } else {
        alert("Acceso denegado");
      }
    } else {
      setIsEditMode(false);
    }
  };

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
      ? { id: Date.now(), company: "Nueva Empresa", position: "Nuevo Rol", period: "2024", desc: "Descripción...\n- Item 1" }
      : collection === 'skills' 
      ? { id: Date.now(), name: "Nueva Tech", level: 50, icon: "Code2" }
      : { id: Date.now(), degree: "Título", school: "Institución", year: "2024" };
    setData({ ...data, [collection]: [...data[collection], newItem] });
  };

  const removeItem = (collection, id) => {
    setData({ ...data, [collection]: data[collection].filter(item => item.id !== id) });
  };

  const EditableText = ({ value, onUpdate, className, isTextArea = false, isLink = false }) => {
    const [localValue, setLocalValue] = useState(value || "");
    useEffect(() => setLocalValue(value), [value]);

    if (!isEditMode) {
      if (isLink && value && (value.startsWith('http') || value.includes('.com'))) {
        return (
          <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className={`${className} hover:underline`}>
            {value}
          </a>
        );
      }
      if (isTextArea) {
        return (
          <div className={`${className} whitespace-pre-wrap`}>
            {value?.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                return (
                  <div key={i} className="flex gap-2 ml-1 my-0.5">
                    <span className="text-blue-500">•</span>
                    <span>{trimmed.substring(1).trim()}</span>
                  </div>
                );
              }
              return <div key={i}>{line}</div>;
            })}
          </div>
        );
      }
      return <span className={className}>{value || "---"}</span>;
    }

    return isTextArea ? (
      <textarea 
        value={localValue} 
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onUpdate(localValue)}
        className={`${className} bg-blue-500/5 border border-blue-500/20 rounded-lg p-2 w-full outline-none min-h-[100px]`}
      />
    ) : (
      <input 
        type="text" 
        value={localValue} 
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onUpdate(localValue)}
        className={`${className} bg-blue-500/5 border border-blue-500/20 rounded-lg p-1 px-3 outline-none w-full`}
      />
    );
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-mono transition-colors duration-500 print:bg-white print:text-black`} style={{ backgroundColor: currentTheme.bg, color: data.currentTheme === 'oscuro' ? '#94a3b8' : '#475569' }}>
      
      {/* Fondo Rejilla - Oculto en Impresión */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 print:hidden`} style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${data.currentTheme === 'oscuro' ? '#3b82f6' : '#cbd5e1'} 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

      {/* Navegación - Oculto en Impresión */}
      <nav className={`fixed top-0 w-full z-50 border-b ${data.currentTheme === 'oscuro' ? 'border-white/10 bg-black/80' : 'border-slate-200 bg-white/80'} backdrop-blur-xl px-8 py-4 flex justify-between items-center shadow-sm print:hidden`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 ${currentTheme.accent}`}>
            <ShieldCheck size={20} />
          </div>
          <div className="hidden sm:block">
            <span className={`font-black ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} text-sm tracking-tighter`}>QA_CONSOLE_PRO</span>
            <span className="block text-[8px] opacity-50 tracking-[0.2em]">ESTADO: SISTEMA_ESTABLE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all shadow-lg shadow-blue-500/20"
          >
            <Download size={14} /> EXPORTAR_PDF
          </button>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={handleToggleEdit}
              className={`w-12 h-6 rounded-full p-1 border transition-all flex items-center ${isEditMode ? 'bg-blue-500/20 border-blue-500/50' : 'bg-slate-200 border-slate-300'}`}
            >
              <motion.div animate={{ x: isEditMode ? 24 : 0 }} className={`w-4 h-4 rounded-full flex items-center justify-center ${isEditMode ? 'bg-blue-500' : 'bg-slate-500'}`}>
                {isEditMode ? <Unlock size={8} className="text-white"/> : <Lock size={8} className="text-white"/>}
              </motion.div>
            </button>
          </div>
          
          <div className="hidden lg:flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full gap-1">
            {Object.keys(themes).map(t => (
              <button 
                key={t} 
                onClick={() => setData({...data, currentTheme: t})} 
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${data.currentTheme === t ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-32 pb-24 px-8 relative z-10 print:pt-0 print:pb-0 print:max-w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Izquierdo: Perfil */}
          <aside className="lg:col-span-4 space-y-8 print:col-span-4">
            <div className={`${currentTheme.card} border ${currentTheme.border} p-1 rounded-3xl shadow-xl backdrop-blur-md print:shadow-none print:border-none print:p-0`}>
              <div className="p-8 rounded-[1.4rem] print:p-0">
                <div className="relative w-32 h-32 mx-auto mb-6 print:w-24 print:h-24 print:mb-4">
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed ${currentTheme.primary === 'blue-500' ? 'border-blue-500' : 'border-blue-300'} animate-spin-slow print:hidden`} />
                  <img src={data.photo} className="w-full h-full rounded-full object-cover p-1.5" alt="Perfil" />
                </div>
                
                <div className="text-center space-y-3">
                  <EditableText value={data.name} onUpdate={(v) => updateField('name', v)} className={`text-xl font-black ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} block tracking-tighter print:text-black`} />
                  <EditableText value={data.role} onUpdate={(v) => updateField('role', v)} className={`${currentTheme.accent} font-black text-[9px] uppercase tracking-[0.2em] block print:text-blue-600`} />
                  
                  <div className="pt-6 space-y-2 text-[10px] text-left print:pt-2">
                    {personalFields.map(field => (
                      <div key={field.key} className={`${data.currentTheme === 'oscuro' ? 'bg-white/5' : 'bg-slate-100'} p-2 rounded-lg border border-transparent flex items-center gap-3 print:bg-transparent print:p-0 print:text-black`}>
                        <span className={`${currentTheme.accent} print:text-black`}>{field.icon}</span>
                        <EditableText value={data.contact[field.key]} onUpdate={(v) => updateField(`contact.${field.key}`, v)} isLink={field.type === 'url' || field.type === 'email'} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className={`${currentTheme.card} border ${currentTheme.border} p-6 rounded-3xl print:border-none print:p-0`}>
              <h3 className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-6 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} print:text-black print:mb-2`}>
                <Terminal size={12}/> PILA_TECNOLÓGICA
              </h3>
              <div className="space-y-4">
                {data.skills.map((s, idx) => (
                  <div key={s.id} className="relative">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span className={currentTheme.accent}>{techIcons[s.icon] || <Code2 size={14}/>}</span>
                        <EditableText value={s.name} onUpdate={(v) => {
                          const ns = [...data.skills]; ns[idx].name = v; setData({...data, skills: ns});
                        }} className="text-[10px] font-black uppercase tracking-wider print:text-black" />
                      </div>
                      <span className={`text-[9px] font-bold ${currentTheme.accent} print:hidden`}>{s.level}%</span>
                    </div>
                    <div className={`h-1 ${data.currentTheme === 'oscuro' ? 'bg-white/5' : 'bg-slate-200'} rounded-full overflow-hidden print:hidden`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} className={`h-full ${currentTheme.btn}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Lado Derecho: Contenido */}
          <section className="lg:col-span-8 space-y-10 print:col-span-8">
            <div className="space-y-6">
              <h2 className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-3 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} print:text-black`}>
                <span className={`w-6 h-[1px] ${currentTheme.btn} print:hidden`} /> HISTORIAL_DE_TRABAJO
              </h2>

              <div className="grid gap-4">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className={`${currentTheme.card} border ${currentTheme.border} p-6 rounded-3xl print:border-none print:p-0 print:mb-4`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="space-y-1">
                          <EditableText value={exp.position} onUpdate={(v) => {
                            const ne = [...data.experience]; ne[idx].position = v; setData({...data, experience: ne});
                          }} className={`font-black text-lg tracking-tight block ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} print:text-black`} />
                          <EditableText value={exp.company} onUpdate={(v) => {
                            const ne = [...data.experience]; ne[idx].company = v; setData({...data, experience: ne});
                          }} className={`${currentTheme.accent} font-black text-[9px] uppercase tracking-widest block print:text-blue-600`} />
                        </div>
                        <EditableText value={exp.desc} onUpdate={(v) => {
                          const ne = [...data.experience]; ne[idx].desc = v; setData({...data, experience: ne});
                        }} isTextArea className="text-xs leading-relaxed opacity-80 font-sans print:text-black print:opacity-100" />
                      </div>
                      <EditableText value={exp.period} onUpdate={(v) => {
                        const ne = [...data.experience]; ne[idx].period = v; setData({...data, experience: ne});
                      }} className={`text-[9px] font-black ${data.currentTheme === 'oscuro' ? 'text-white/40 bg-white/5' : 'text-slate-500 bg-slate-100'} border ${currentTheme.border} px-3 py-1 rounded-full print:bg-transparent print:border-none print:text-slate-500`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Educación */}
            <div className={`${currentTheme.card} border ${currentTheme.border} p-8 rounded-3xl border-dashed print:border-none print:p-0`}>
              <h2 className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-3 mb-6 ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} print:text-black print:mb-2`}>
                <GraduationCap size={14} className={currentTheme.accent}/> FORMACIÓN_ACADÉMICA
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.education.map((ed, idx) => (
                  <div key={ed.id} className={`border-l-2 ${data.currentTheme === 'oscuro' ? 'border-white/10' : 'border-slate-200'} pl-4`}>
                    <EditableText value={ed.degree} onUpdate={(v) => {
                      const ne = [...data.education]; ne[idx].degree = v; setData({...data, education: ne});
                    }} className={`font-bold text-xs block ${data.currentTheme === 'oscuro' ? 'text-white' : 'text-slate-900'} print:text-black`} />
                    <div className="flex justify-between text-[9px] uppercase font-black opacity-50 print:opacity-80">
                      <EditableText value={ed.school} onUpdate={(v) => {
                        const ne = [...data.education]; ne[idx].school = v; setData({...data, education: ne});
                      }} />
                      <EditableText value={ed.year} onUpdate={(v) => {
                        const ne = [...data.education]; ne[idx].year = v; setData({...data, education: ne});
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Terminal - Oculto en Impresión */}
      <footer className={`fixed bottom-0 w-full ${data.currentTheme === 'oscuro' ? 'bg-black/90' : 'bg-slate-900 text-white'} border-t border-white/10 px-8 py-3 flex justify-between items-center text-[9px] font-black tracking-[0.2em] z-50 print:hidden`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            <span className="text-blue-400">SESIÓN_ACTIVA</span>
          </div>
        </div>
        <div className="opacity-40">SYSTEM_BUILD_V.2.5</div>
      </footer>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        
        @media print {
          @page { margin: 15mm; }
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          aside, section { float: none !important; width: 100% !important; }
          .grid { display: block !important; }
          aside { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
        }
      `}</style>
    </div>
  );
};

export default App;
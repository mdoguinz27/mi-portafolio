import React, { useState, useEffect } from 'react';
import {
  Bug, Trash2, Plus, Mail, MapPin, GraduationCap,
  Terminal, Activity, Linkedin, Github, Lock, Unlock,
  Sun, Moon, Award,
  Monitor, Phone, Link as LinkIcon,
  ArrowUp, ArrowDown,
  Code, Image as ImageIcon,
  ChevronDown, Globe, MessageSquare, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MASTER_PIN = "1234";

const themes = {
  oscuro: {
    name: 'oscuro',
    bg: "bg-slate-950",
    text: "text-slate-400",
    textBold: "text-slate-100",
    accent: "text-indigo-400",
    border: "border-slate-800",
    card: "bg-slate-900/50 backdrop-blur-xl border-slate-800/50 shadow-2xl shadow-black/20",
    input: "bg-slate-900 text-white border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300",
    glass: "backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/50 supports-[backdrop-filter]:bg-slate-950/60",
    hover: "hover:bg-slate-800/50",
  },
  claro: {
    name: 'claro',
    bg: "bg-slate-50",
    text: "text-slate-600",
    textBold: "text-slate-900",
    accent: "text-indigo-600",
    border: "border-slate-200",
    card: "bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl shadow-slate-200/50",
    input: "bg-white text-slate-900 border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all duration-300",
    glass: "backdrop-blur-xl bg-white/70 border-b border-slate-200/50 supports-[backdrop-filter]:bg-white/60",
    hover: "hover:bg-slate-100",
  }
};

const CONTACT_TYPES = [
  { label: 'Email', icon: Mail, color: 'text-blue-500' },
  { label: 'Linkedin', icon: Linkedin, color: 'text-blue-400' },
  { label: 'Github', icon: Github, color: 'text-slate-500' },
  { label: 'Ubicación', icon: MapPin, color: 'text-red-500' },
  { label: 'Web', icon: Globe, color: 'text-emerald-500' },
  { label: 'WhatsApp', icon: MessageSquare, color: 'text-green-500' }
];

const EDU_TYPES = {
  career: {
    display: 'Carrera',
    icon: GraduationCap,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-500'
  },
  course: {
    display: 'Curso',
    icon: Award,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    badge: 'bg-blue-500/20 text-blue-500'
  }
};

const defaultData = {
  "name": "Maria Gabriela Doguinz",
  "role": "QA Automation Engineer",
  "photo": "https://media.licdn.com/dms/image/v2/D4D03AQG5a67KZZjfFw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731807714558?e=1771459200&v=beta&t=CNwDTMr5HbxvZV52qAO6i8W5SxZmp_KYmuBfsLNESzk",
  "currentTheme": "oscuro",
  "contactInfo": [
    {
      "id": "c1",
      "type": "Email",
      "value": "mdoguinz@gmail.com"
    },
    {
      "id": "c2",
      "type": "Linkedin",
      "value": "https://www.linkedin.com/in/mgabynunez"
    },
    {
      "id": "c3",
      "type": "Ubicación",
      "value": "Buenos Aires, Argentina"
    }
  ],
  "experience": [
    {
      "id": "e1",
      "company": "Fravega Tech",
      "position": "QA Automation SR",
      "period": "2024 - Actual",
      "desc": "- Gestión de versionado (GitLab, GitHub, Bitbucket) y estrategias de branching.\n- Participación en refinamientos y revisión de historias de usuario para asegurar calidad temprana.\n- Diseño y ejecución de pruebas manuales (Xray, JIRA) y automatización mobile (React Native, WebdriverIO).\n- Desarrollo de framework de automatización Back-end para APIs REST (Cypress, JS).\n- Ejecución continua de pruebas via CI/CD (Argo, GitLab CI, Kubernetes) y validación de contratos API.\n- Monitoreo de logs y métricas (Grafana, Flipper, Reactotron) y soporte en incidentes.\n- Trabajo ágil en equipo multidisciplinario (Scrum/Kanban)."
    },
    {
      "id": "e2",
      "company": "Contractor",
      "position": "QA Automation SR",
      "period": "2022 - 2024",
      "desc": "- Diseño y mantenimiento de casos de prueba (Zephyr Scale) y gestión en JIRA.\n- Automatización de pruebas web con Selenium, Cypress, Playwright y Pytest.\n- Pruebas de Back-end y APIs REST (Postman, Swagger) validando lógica de negocio.\n- Análisis de requerimientos y creación de casos de prueba funcionales alineados al producto.\n- Validación responsive en entornos web y simulaciones mobile.\n- Lectura y debugging de código en Python, TypeScript y JavaScript."
    },
    {
      "id": "1770138327765",
      "company": "ank",
      "position": "QA Automation Lead",
      "period": "2021 - 2022",
      "desc": "- Liderazgo técnico: definición de estándares, arquitecturas y mentoring del equipo QA.\n- Desarrollo de frameworks E2E (Backend/Frontend) con Python, Selenium y Appium.\n- Estrategia de pruebas multi-plataforma y gestión del ciclo de vida de defectos (Jira, Zephyr).\n- Implementación de flujos CI/CD y buenas prácticas de versionado con Git.\n- Planificación y ejecución de pruebas de Smoke, Regresión e Integración."
    },
    {
      "id": "1770139816174",
      "company": "Nosis",
      "position": "Lider QA",
      "period": "2018 - 2021",
      "desc": "- Análisis de requerimientos y Casos de Uso para validar criterios de aceptación.\n- Automatización de pruebas web y mobile (Java, Python, Selenium).\n- Estrategias de testing: smoke, funcional, regresión y performance (JMeter).\n- Pruebas cross-browser y validación de compatibilidad en dispositivos móviles.\n- Gestión de defectos en JIRA y comunicación efectiva de reportes al equipo."
    }
  ],
  "projects": [
    {
      "id": "1770138705251",
      "title": "Fravega pay - billetera virtual",
      "type": "MOBILE",
      "image": "https://play-lh.googleusercontent.com/52COUlt8lPWeu6y8JAJBzACEP7uKAoc4DtZVErvmUhyeHY74n46UUi24n9n3h-1dTz4=w2560-h1440-rw"
    },
    {
      "id": "p2",
      "title": "ank - billetera virtual",
      "type": "MOBILE",
      "image": "https://www.roadshow.com.ar/wp-content/uploads/ank.jpg"
    },
    {
      "id": "1770138808089",
      "title": "tiendanimal - tienda de mascotas",
      "type": "WEB",
      "image": "https://marketing4ecommerce.net/wp-content/uploads/2019/10/tiendanimal.jpg"
    },
    {
      "id": "1770138846495",
      "title": "bumeran - portal de empleos",
      "type": "WEB",
      "image": "https://www.jobboardfinder.com/upload/425870ac1e198237f2ab7232515fc7599dc34aa2/printscreen_jobboard_fond"
    },
    {
      "id": "1770138752681",
      "title": "Cocha - agencia de viajes",
      "type": "WEB",
      "image": "https://www.turismointegral.net/wp-content/uploads/2023/04/Plataforma-etraveler.jpg"
    },
    {
      "id": "p1",
      "title": "Nosis - información crediticia",
      "type": "WEB",
      "image": "https://www.nosis.com/es/content/images/landings/compliance/slide012.jpg"
    }
  ],
  "education": [
    {
      "id": "1770141439555",
      "category": "career",
      "degree": "Ingeniería en Sistemas",
      "school": "CULTCA",
      "year": "2015"
    },
    {
      "id": "1770136614443",
      "category": "course",
      "degree": " Javascript ",
      "school": "SoloLearn",
      "year": "2021"
    },
    {
      "id": "1770141394273",
      "category": "course",
      "degree": "WebdriverIO + node.js",
      "school": "Academia QA",
      "year": "2020"
    },
    {
      "id": "1770141521124",
      "category": "course",
      "degree": "Git",
      "school": "Devcode.la",
      "year": "2020"
    }
  ],
  "skills": [
    {
      "id": "1770141586732",
      "name": "Git",
      "level": 70
    },
    {
      "id": "1770139100474",
      "name": "Postman",
      "level": 48
    },
    {
      "id": "1770139079835",
      "name": "API REST",
      "level": 85
    },
    {
      "id": "1770139067025",
      "name": "Appium",
      "level": 90
    },
    {
      "id": "1770139049835",
      "name": "Javascript",
      "level": 70
    },
    {
      "id": "s1",
      "name": "Cypress",
      "level": 80
    },
    {
      "id": "s2",
      "name": "Playwright",
      "level": 50
    },
    {
      "id": "s3",
      "name": "Python",
      "level": 65
    }
  ]
}
// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 }
  }
};

// Componente de texto formateado con viñetas
const FormattedText = ({ text }) => {
  if (!text) return null;

  return (
    <div className="text-sm leading-relaxed space-y-1">
      {text.split('\n').map((line, i) => {
        if (line.trim().startsWith('-')) {
          return (
            <div key={i} className="flex gap-2 items-start mb-2">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              <span className="opacity-90">{line.trim().substring(1).trim()}</span>
            </div>
          );
        }
        return <p key={i} className="mb-2 opacity-90">{line}</p>;
      })}
    </div>
  );
};

// Componente de controles
const EditToolbar = ({ onUp, onDown, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 shadow-lg mb-2 w-fit ml-auto z-10 relative"
  >
    {onUp && <button onClick={onUp} className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"><ArrowUp size={14} /></button>}
    {onDown && <button onClick={onDown} className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"><ArrowDown size={14} /></button>}
    <button onClick={onDelete} className="p-1.5 hover:bg-red-900/40 text-red-400 rounded-md transition-colors"><Trash2 size={14} /></button>
  </motion.div>
);

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('qa_pro_v7_5');
      return saved ? JSON.parse(saved) : defaultData;
    } catch (e) { return defaultData; }
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const currentTheme = themes[data.currentTheme] || themes.oscuro;

  useEffect(() => {
    localStorage.setItem('qa_pro_v7_5', JSON.stringify(data));
  }, [data]);

  const updateField = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const moveItem = (collection, index, direction) => {
    const newList = [...data[collection]];
    const target = index + direction;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    updateField(collection, newList);
  };

  const deleteItem = (collection, id) => updateField(collection, data[collection].filter(item => item.id !== id));

  const addItem = (collection, defaultObj) => updateField(collection, [defaultObj, ...data[collection]]);

  const updateListItem = (collection, id, field, value) => {
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };



  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500 font-sans selection:bg-indigo-500/30`}>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-[100] ${currentTheme.glass} px-6 py-4 flex justify-between items-center print:hidden`}
      >
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500/10 p-2 rounded-xl">
            <Bug size={20} className="text-indigo-500" />
          </div>
          <span className={`font-black text-lg ${currentTheme.textBold} tracking-tight`}>QA CONSOLE</span>
        </div>

        <div className="flex items-center gap-4">
          {/* MODO EDICION */}
          {/* <button
            onClick={() => {
              if (!isEditMode) {
                if (prompt("PIN de Seguridad:") === MASTER_PIN) setIsEditMode(true);
              } else {
                setIsEditMode(false);
              }
            }}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${isEditMode ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300'}`}
          >
            {isEditMode ? <><Unlock size={14} /></> : <><Lock size={14} /></>}
          </button> */}
          <button
            onClick={() => updateField('currentTheme', data.currentTheme === 'oscuro' ? 'claro' : 'oscuro')}
            className={`p-2 rounded-full transition-all duration-300 ${currentTheme.hover} ${data.currentTheme === 'oscuro' ? 'text-amber-400' : 'text-indigo-600'}`}
          >
            <AnimatePresence mode="wait">
              {data.currentTheme === 'oscuro' ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto pt-28 px-6 pb-20 grid md:grid-cols-12 gap-8"
      >

        {/* COLUMNA IZQUIERDA */}
        <aside className="md:col-span-4 space-y-6">
          <motion.section variants={itemVariants} className={`${currentTheme.card} p-8 rounded-[2rem] border ${currentTheme.border}`}>
            <div className="flex flex-col items-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-full bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                <img src={data.photo} className="relative w-40 h-40 rounded-full object-cover ring-4 ring-indigo-500/20 mb-6 shadow-2xl" />
              </motion.div>

              {isEditMode && (
                <input
                  className={`w-full text-[10px] p-2 rounded-lg border ${currentTheme.input} mb-4`}
                  placeholder="URL Foto"
                  value={data.photo}
                  onChange={e => updateField('photo', e.target.value)}
                />
              )}
            </div>

            {isEditMode ? (
              <div className="space-y-3">
                <input className={`w-full text-2xl font-black p-2 rounded-lg ${currentTheme.input}`} value={data.name} onChange={e => updateField('name', e.target.value)} />
                <input className={`w-full text-sm font-bold p-2 rounded-lg text-indigo-500 ${currentTheme.input}`} value={data.role} onChange={e => updateField('role', e.target.value)} />
              </div>
            ) : (
              <div className="text-center">
                <h1 className={`text-3xl font-black ${currentTheme.textBold} tracking-tight mb-2`}>{data.name}</h1>
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 mb-4">
                  <p className="text-indigo-500 font-bold uppercase tracking-widest text-[10px]">{data.role}</p>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Contacto</span>
                {isEditMode && <button onClick={() => addItem('contactInfo', { id: Date.now().toString(), type: 'Email', value: '' })} className="text-indigo-500"><Plus size={16} /></button>}
              </div>
              {data.contactInfo.map((info, idx) => (
                <motion.div
                  key={info.id}
                  whileHover={{ x: 5 }}
                  className={`group relative ${currentTheme.hover} p-3 rounded-xl transition-colors duration-200`}
                >
                  {isEditMode ? (
                    <div className="space-y-2">
                      <EditToolbar onUp={idx > 0 ? () => moveItem('contactInfo', idx, -1) : null} onDown={idx < data.contactInfo.length - 1 ? () => moveItem('contactInfo', idx, 1) : null} onDelete={() => deleteItem('contactInfo', info.id)} />
                      <div className="flex gap-2">
                        <select className="bg-slate-800 text-[10px] p-1 rounded text-white" value={info.type} onChange={e => updateListItem('contactInfo', info.id, 'type', e.target.value)}>
                          {CONTACT_TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                        </select>
                        <input className={`flex-1 text-xs p-1 rounded ${currentTheme.input}`} value={info.value} onChange={e => updateListItem('contactInfo', info.id, 'value', e.target.value)} />
                      </div>
                    </div>
                  ) : (
                    info.type === 'Ubicación' ? (
                      <div className="flex items-center gap-4 cursor-default">
                        <div className={`p-2 rounded-lg ${currentTheme.bg} shadow-sm group-hover:scale-110 transition-transform`}>
                          {React.createElement(CONTACT_TYPES.find(c => c.label === info.type)?.icon || Globe, { size: 16, className: currentTheme.accent })}
                        </div>
                        <span className="text-xs font-medium truncate opacity-80 group-hover:opacity-100">{info.value}</span>
                      </div>
                    ) : (
                      <a
                        href={info.type === 'Email' ? `mailto:${info.value}` : info.value}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4"
                      >
                        <div className={`p-2 rounded-lg ${currentTheme.bg} shadow-sm group-hover:scale-110 transition-transform`}>
                          {React.createElement(CONTACT_TYPES.find(c => c.label === info.type)?.icon || Globe, { size: 16, className: currentTheme.accent })}
                        </div>
                        <span className="text-xs font-medium truncate opacity-80 group-hover:opacity-100">{info.value}</span>
                        <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SKILLS */}
          <motion.section variants={itemVariants} className={`${currentTheme.card} p-8 rounded-[2rem] border ${currentTheme.border}`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className={`text-xs font-black uppercase tracking-widest ${currentTheme.textBold}`}>Tech Stack</h3>
              {isEditMode && <button onClick={() => addItem('skills', { id: Date.now().toString(), name: 'Nueva Skill', level: 80 })} className="text-indigo-500"><Plus size={16} /></button>}
            </div>
            <div className="space-y-6">
              {data.skills.map((skill, idx) => (
                <div key={skill.id} className="relative">
                  {isEditMode && <EditToolbar onUp={idx > 0 ? () => moveItem('skills', idx, -1) : null} onDown={idx < data.skills.length - 1 ? () => moveItem('skills', idx, 1) : null} onDelete={() => deleteItem('skills', skill.id)} />}
                  <div className="flex justify-between text-xs font-bold mb-2">
                    {isEditMode ? (
                      <>
                        <input className={`bg-transparent border-b border-slate-700 outline-none w-2/3 ${currentTheme.textBold}`} value={skill.name} onChange={e => updateListItem('skills', skill.id, 'name', e.target.value)} />
                        <input type="number" className="w-12 bg-slate-800 text-center rounded" value={skill.level} onChange={e => updateListItem('skills', skill.id, 'level', parseInt(e.target.value))} />
                      </>
                    ) : (
                      <>
                        <span className="opacity-90">{skill.name}</span>
                        <span className="text-indigo-500 font-mono">{skill.level}%</span>
                      </>
                    )}
                  </div>
                  <div className={`h-2 ${data.currentTheme === 'oscuro' ? 'bg-slate-800' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </aside>

        {/* COLUMNA DERECHA */}
        <div className="md:col-span-8 space-y-8">

          {/* EXPERIENCIA */}
          <motion.section variants={itemVariants} className={`${currentTheme.card} p-8 md:p-10 rounded-[2.5rem] border ${currentTheme.border} overflow-hidden`}>
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl">
                  <Terminal size={24} className="text-indigo-500" />
                </div>
                <h2 className={`text-xl font-black ${currentTheme.textBold} uppercase tracking-tight`}>Experiencia</h2>
              </div>
              {isEditMode && <button onClick={() => addItem('experience', { id: Date.now().toString(), company: 'Empresa', position: 'QA Engineer', period: '2024', desc: '' })} className="bg-indigo-500 p-2 rounded-lg text-white"><Plus size={18} /></button>}
            </div>

            <div className="space-y-16">
              {data.experience.map((exp, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={exp.id}
                  className="relative pl-8 md:pl-10 border-l-2 border-indigo-500/10"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] ring-4 ring-slate-900"></div>

                  {isEditMode && <EditToolbar onUp={idx > 0 ? () => moveItem('experience', idx, -1) : null} onDown={idx < data.experience.length - 1 ? () => moveItem('experience', idx, 1) : null} onDelete={() => deleteItem('experience', exp.id)} />}

                  {isEditMode ? (
                    <div className="space-y-3 bg-slate-500/5 p-4 rounded-2xl">
                      <input className={`w-full font-black text-lg p-2 rounded ${currentTheme.input}`} value={exp.position} onChange={e => updateListItem('experience', exp.id, 'position', e.target.value)} />
                      <input className="w-full text-indigo-500 font-bold text-xs p-2 bg-transparent border-b border-slate-700 outline-none" value={exp.company} onChange={e => updateListItem('experience', exp.id, 'company', e.target.value)} />
                      <input className="w-full text-[10px] p-2 bg-transparent outline-none" value={exp.period} onChange={e => updateListItem('experience', exp.id, 'period', e.target.value)} />
                      <textarea className={`w-full text-sm p-3 rounded h-32 ${currentTheme.input}`} value={exp.desc} onChange={e => updateListItem('experience', exp.id, 'desc', e.target.value)} placeholder="Usa '-' para listas..." />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                        <div>
                          <h4 className={`text-xl font-black ${currentTheme.textBold}`}>{exp.position}</h4>
                          <p className="text-indigo-400 font-bold text-xs uppercase tracking-wide mt-1">{exp.company}</p>
                        </div>
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${data.currentTheme === 'oscuro' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'} w-fit`}>
                          {exp.period}
                        </span>
                      </div>
                      <div className="mt-4">
                        <FormattedText text={exp.desc} />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* EDUCACIÓN */}
          <motion.section variants={itemVariants} className={`${currentTheme.card} p-8 rounded-[2.5rem] border ${currentTheme.border}`}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <GraduationCap size={24} className="text-emerald-500" />
                </div>
                <h2 className={`text-xl font-black ${currentTheme.textBold} uppercase tracking-tight`}>Educación</h2>
              </div>
              {isEditMode && <button onClick={() => addItem('education', { id: Date.now().toString(), category: 'career', degree: 'Grado', school: 'Universidad', year: '2024' })} className="bg-emerald-600 p-2 rounded-lg text-white"><Plus size={18} /></button>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.education.map((edu, idx) => {
                const config = EDU_TYPES[edu.category] || EDU_TYPES.career;
                return (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={edu.id}
                    className={`relative p-6 rounded-3xl ${currentTheme.bg} border-2 border-transparent hover:border-indigo-500/10 transition-colors shadow-sm`}
                  >
                    {isEditMode ? (
                      <div className="space-y-2">
                        <EditToolbar onUp={idx > 0 ? () => moveItem('education', idx, -1) : null} onDown={idx < data.education.length - 1 ? () => moveItem('education', idx, 1) : null} onDelete={() => deleteItem('education', edu.id)} />
                        <select className="w-full bg-slate-800 text-[10px] p-1 rounded" value={edu.category} onChange={e => updateListItem('education', edu.id, 'category', e.target.value)}>
                          <option value="career">Carrera</option>
                          <option value="course">Curso</option>
                        </select>
                        <input className={`w-full font-black text-xs p-1 rounded ${currentTheme.input}`} value={edu.degree} onChange={e => updateListItem('education', edu.id, 'degree', e.target.value)} />
                        <input className={`w-full text-[10px] text-emerald-500 p-1 rounded ${currentTheme.input}`} value={edu.school} onChange={e => updateListItem('education', edu.id, 'school', e.target.value)} />
                        <input className={`w-full text-[10px] p-1 rounded ${currentTheme.input}`} value={edu.year} onChange={e => updateListItem('education', edu.id, 'year', e.target.value)} />
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-2.5 ${config.bg} ${config.color} rounded-2xl`}>
                            {React.createElement(config.icon, { size: 20 })}
                          </div>
                          <span className="text-[10px] font-black opacity-60 bg-slate-500/10 px-2 py-1 rounded-full">{edu.year}</span>
                        </div>
                        <h4 className={`font-black text-sm mb-1 ${currentTheme.textBold} line-clamp-2`}>{edu.degree}</h4>
                        <p className={`text-[10px] font-bold uppercase ${edu.category === 'career' ? 'text-emerald-500' : 'text-blue-500'}`}>{edu.school}</p>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* PROYECTOS */}
          <motion.section variants={itemVariants}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-xl">
                  <Code size={24} className="text-purple-500" />
                </div>
                <h2 className={`text-xl font-black ${currentTheme.textBold} uppercase tracking-tight`}>Proyectos</h2>
              </div>
              {isEditMode && <button onClick={() => addItem('projects', { id: Date.now().toString(), title: 'Nuevo Proyecto', type: 'WEB', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' })} className="bg-purple-600 p-2 rounded-lg text-white"><Plus size={18} /></button>}
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {data.projects.map((proj, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  key={proj.id}
                  className="group space-y-4"
                >
                  {isEditMode && (
                    <div className="bg-slate-900 p-2 rounded-t-xl border border-slate-700 flex justify-between items-center">
                      <div className="flex gap-2">
                        <button onClick={() => updateListItem('projects', proj.id, 'type', 'WEB')} className={`text-[9px] font-black px-2 py-1 rounded ${proj.type === 'WEB' ? 'bg-purple-600' : 'bg-slate-800 text-slate-500'}`}>WEB</button>
                        <button onClick={() => updateListItem('projects', proj.id, 'type', 'MOBILE')} className={`text-[9px] font-black px-2 py-1 rounded ${proj.type === 'MOBILE' ? 'bg-purple-600' : 'bg-slate-800 text-slate-500'}`}>MOBILE</button>
                      </div>
                      <EditToolbar
                        onUp={idx > 0 ? () => moveItem('projects', idx, -1) : null}
                        onDown={idx < data.projects.length - 1 ? () => moveItem('projects', idx, 1) : null}
                        onDelete={() => deleteItem('projects', proj.id)}
                      />
                    </div>
                  )}

                  <div className={`relative group-hover:transform group-hover:scale-[1.02] transition-all duration-500`}>
                    {proj.type === 'MOBILE' ? (
                      /* MARCO MOBILE */
                      <div className="relative w-3/4 mx-auto aspect-[9/19] bg-slate-900 rounded-[3rem] shadow-2xl border-4 border-slate-700/50 overflow-hidden ring-1 ring-white/10">
                        {/* Notch simulation */}
                        <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-20 flex justify-center">
                          <div className="w-1/3 h-full bg-slate-950 rounded-b-xl"></div>
                        </div>
                        {/* Screen */}
                        <div className="relative h-full w-full bg-black rounded-[2.5rem] overflow-hidden border-[6px] border-slate-900">
                          <img src={proj.image} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Mobile App</span>
                            <h4 className="text-white font-black text-lg leading-tight">{proj.title}</h4>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* MARCO WEB */
                      <div className={`relative overflow-hidden rounded-2xl shadow-2xl bg-slate-900 ring-1 ring-white/10`}>
                        {/* Browser Header */}
                        <div className="h-8 bg-slate-800/80 backdrop-blur-md flex items-center px-4 gap-2 border-b border-white/5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                          <div className="ml-4 flex-1 h-4 bg-slate-700/50 rounded-full max-w-[200px]"></div>
                        </div>
                        {/* Screen */}
                        <div className="aspect-video relative overflow-hidden group">
                          <img src={proj.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Web Development</span>
                            <h4 className="text-white font-black text-xl leading-tight">{proj.title}</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {isEditMode && (
                    <div className="space-y-2 bg-slate-900/50 p-4 rounded-b-xl border-x border-b border-slate-700">
                      <input className={`w-full text-xs p-2 rounded ${currentTheme.input}`} placeholder="Nombre del proyecto" value={proj.title} onChange={e => updateListItem('projects', proj.id, 'title', e.target.value)} />
                      <input className={`w-full text-[10px] p-2 rounded ${currentTheme.input}`} placeholder="URL de imagen" value={proj.image} onChange={e => updateListItem('projects', proj.id, 'image', e.target.value)} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </motion.main>

      <footer className="mt-20 py-8 border-t border-slate-800/50 text-center text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
        BUILD V.3.0 MODERN
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');
        .glass-panel { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
        @media print { .print\\:hidden { display: none !important; } }
      `}} />
    </div>
  );
}
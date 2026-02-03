import React, { useState, useEffect } from 'react';
import { 
  Bug, Trash2, Plus, Mail, MapPin, GraduationCap, 
  Terminal, Activity, Linkedin, Github, Lock, Unlock, 
  Sun, Moon, Award, 
  Monitor, Phone, Link as LinkIcon,
  ArrowUp, ArrowDown,
  Code, Image as ImageIcon,
  ChevronDown, Globe, MessageSquare
} from 'lucide-react';

const MASTER_PIN = "1234";

const themes = {
  oscuro: { 
    name: 'oscuro',
    bg: "bg-[#020617]", 
    text: "text-slate-400",
    textBold: "text-white",
    accent: "text-blue-400", 
    border: "border-slate-800", 
    card: "bg-slate-900/40 backdrop-blur-md border-slate-800/50",
    input: "bg-slate-950 text-white border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500", 
    glass: "backdrop-blur-xl bg-[#020617]/80 border-b border-slate-800",
  },
  claro: { 
    name: 'claro',
    bg: "bg-slate-50", 
    text: "text-slate-600",
    textBold: "text-slate-900",
    accent: "text-blue-700", 
    border: "border-slate-200", 
    card: "bg-white border-slate-200 shadow-xl shadow-slate-200/50",
    input: "bg-white text-slate-900 border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600",
    glass: "backdrop-blur-md bg-white/90 border-b border-slate-200",
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
    display: 'Curso/Cert', 
    icon: Award, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10', 
    badge: 'bg-blue-500/20 text-blue-500' 
  }
};

const defaultData = {
  name: "Maria Gabriela Doguinz",
  role: "Lead QA Automation Engineer",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400",
  currentTheme: "oscuro",
  contactInfo: [
    { id: 'c1', type: 'Email', value: 'gabriela.qa@dev.io' },
    { id: 'c2', type: 'Linkedin', value: 'linkedin.com/in/gabriela-qa' },
    { id: 'c3', type: 'Ubicación', value: 'Buenos Aires, Argentina' }
  ],
  experience: [
    { id: 'e1', company: "Fravega Tech", position: "QA Automation Lead", period: "2022 - Actualidad", desc: "- Diseño y arquitectura de frameworks con Playwright.\n- Liderazgo de equipo Senior.\n- Implementación de CI/CD." },
    { id: 'e2', company: "Accenture", position: "Senior QA Automation", period: "2019 - 2022", desc: "- Automatización de pruebas de regresión.\n- Integración con Jira y XRay." }
  ],
  projects: [
    { id: 'p1', title: "E-Commerce Core", type: "WEB", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
    { id: 'p2', title: "Banking App", type: "MOBILE", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop" }
  ],
  education: [
    { id: 'ed1', category: 'career', degree: "Ingeniería en Sistemas", school: "UTN FRBA", year: "2020" },
    { id: 'ed2', category: 'course', degree: "Certified Tester Foundation Level", school: "ISTQB", year: "2021" }
  ],
  skills: [
    { id: 's1', name: "Cypress", level: 95 },
    { id: 's2', name: "Playwright", level: 90 },
    { id: 's3', name: "Jenkins", level: 85 }
  ]
};

// Componente de controles limpio para no obstruir
const EditToolbar = ({ onUp, onDown, onDelete }) => (
  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-md border border-slate-700 shadow-xl mb-2 w-fit ml-auto">
    {onUp && <button onClick={onUp} className="p-1 hover:bg-slate-700 text-slate-300 rounded"><ArrowUp size={14}/></button>}
    {onDown && <button onClick={onDown} className="p-1 hover:bg-slate-700 text-slate-300 rounded"><ArrowDown size={14}/></button>}
    <button onClick={onDelete} className="p-1 hover:bg-red-900/40 text-red-400 rounded"><Trash2 size={14}/></button>
  </div>
);

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('qa_pro_v7_4');
      return saved ? JSON.parse(saved) : defaultData;
    } catch (e) { return defaultData; }
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const currentTheme = themes[data.currentTheme] || themes.oscuro;

  useEffect(() => {
    localStorage.setItem('qa_pro_v7_4', JSON.stringify(data));
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

  const renderFormattedText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.trim().startsWith('-')) {
        return (
          <div key={i} className="flex gap-2 items-start mb-1">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }
      return <p key={i} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300 font-sans pb-20`}>
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] ${currentTheme.glass} px-6 py-3 flex justify-between items-center print:hidden`}>
        <div className="flex items-center gap-2">
          <Bug size={20} className="text-blue-500" />
          <span className={`font-black text-lg ${currentTheme.textBold}`}>QA CONSOLE</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (!isEditMode) {
                if (prompt("PIN de Seguridad:") === MASTER_PIN) setIsEditMode(true);
              } else {
                setIsEditMode(false);
              }
            }} 
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${isEditMode ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300'}`}
          >
            {isEditMode ? <><Unlock size={14}/> GUARDAR CAMBIOS</> : <><Lock size={14}/> MODO EDICIÓN</>}
          </button>
          <button onClick={() => updateField('currentTheme', data.currentTheme === 'oscuro' ? 'claro' : 'oscuro')} className="p-2 text-blue-500">
            {data.currentTheme === 'oscuro' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-24 px-6 grid md:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA */}
        <aside className="md:col-span-4 space-y-6">
          <section className={`${currentTheme.card} p-6 rounded-3xl border ${currentTheme.border}`}>
            <div className="flex flex-col items-center mb-6">
              <img src={data.photo} className="w-40 h-40 rounded-2xl object-cover ring-4 ring-blue-500/20 mb-4" />
              {isEditMode && (
                <input 
                  className={`w-full text-[10px] p-2 rounded border ${currentTheme.input}`} 
                  placeholder="URL Foto" 
                  value={data.photo} 
                  onChange={e => updateField('photo', e.target.value)} 
                />
              )}
            </div>

            {isEditMode ? (
              <div className="space-y-2">
                <input className={`w-full text-xl font-black p-2 rounded ${currentTheme.input}`} value={data.name} onChange={e => updateField('name', e.target.value)} />
                <input className={`w-full text-xs font-bold p-2 rounded text-blue-500 ${currentTheme.input}`} value={data.role} onChange={e => updateField('role', e.target.value)} />
              </div>
            ) : (
              <div className="text-center">
                <h1 className={`text-2xl font-black ${currentTheme.textBold}`}>{data.name}</h1>
                <p className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mt-1">{data.role}</p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase opacity-40">Contacto</span>
                {isEditMode && <button onClick={()=>addItem('contactInfo', {id:Date.now().toString(), type:'Email', value:''})} className="text-blue-500"><Plus size={16}/></button>}
              </div>
              {data.contactInfo.map((info, idx) => (
                <div key={info.id} className="group relative bg-slate-500/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  {isEditMode ? (
                    <div className="space-y-2">
                      <EditToolbar onUp={idx > 0 ? ()=>moveItem('contactInfo', idx, -1) : null} onDown={idx < data.contactInfo.length-1 ? ()=>moveItem('contactInfo', idx, 1) : null} onDelete={()=>deleteItem('contactInfo', info.id)} />
                      <div className="flex gap-2">
                        <select className="bg-slate-800 text-[10px] p-1 rounded text-white" value={info.type} onChange={e => updateListItem('contactInfo', info.id, 'type', e.target.value)}>
                          {CONTACT_TYPES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                        </select>
                        <input className={`flex-1 text-xs p-1 rounded ${currentTheme.input}`} value={info.value} onChange={e => updateListItem('contactInfo', info.id, 'value', e.target.value)} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {React.createElement(CONTACT_TYPES.find(c => c.label === info.type)?.icon || Globe, { size: 14, className: "text-blue-500" })}
                      <span className="text-xs font-medium truncate">{info.value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section className={`${currentTheme.card} p-6 rounded-3xl border ${currentTheme.border}`}>
            <div className="flex justify-between items-center mb-6">
               <h3 className={`text-[10px] font-black uppercase tracking-widest ${currentTheme.textBold}`}>Tech Stack</h3>
               {isEditMode && <button onClick={() => addItem('skills', {id:Date.now().toString(), name:'Nueva Skill', level:80})} className="text-blue-500"><Plus size={16}/></button>}
            </div>
            <div className="space-y-6">
              {data.skills.map((skill, idx) => (
                <div key={skill.id} className="relative">
                  {isEditMode && <EditToolbar onUp={idx > 0 ? ()=>moveItem('skills', idx, -1) : null} onDown={idx < data.skills.length-1 ? ()=>moveItem('skills', idx, 1) : null} onDelete={()=>deleteItem('skills', skill.id)} />}
                  <div className="flex justify-between text-xs font-bold mb-2">
                    {isEditMode ? (
                      <>
                        <input className={`bg-transparent border-b border-slate-700 outline-none w-2/3 ${currentTheme.textBold}`} value={skill.name} onChange={e => updateListItem('skills', skill.id, 'name', e.target.value)} />
                        <input type="number" className="w-12 bg-slate-800 text-center rounded" value={skill.level} onChange={e => updateListItem('skills', skill.id, 'level', parseInt(e.target.value))} />
                      </>
                    ) : (
                      <><span>{skill.name}</span><span className="text-blue-500">{skill.level}%</span></>
                    )}
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{width: `${skill.level}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* COLUMNA DERECHA */}
        <div className="md:col-span-8 space-y-8">
          
          {/* EXPERIENCIA */}
          <section className={`${currentTheme.card} p-8 rounded-[2.5rem] border ${currentTheme.border}`}>
            <div className="flex justify-between items-center mb-10">
              <h2 className={`text-xl font-black ${currentTheme.textBold} uppercase`}>Experiencia</h2>
              {isEditMode && <button onClick={() => addItem('experience', {id:Date.now().toString(), company:'Empresa', position:'QA Engineer', period:'2024', desc:''})} className="bg-blue-500 p-2 rounded-lg text-white"><Plus size={18}/></button>}
            </div>
            
            <div className="space-y-12">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="relative pl-8 border-l-2 border-blue-500/20">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  
                  {isEditMode && <EditToolbar onUp={idx > 0 ? ()=>moveItem('experience', idx, -1) : null} onDown={idx < data.experience.length-1 ? ()=>moveItem('experience', idx, 1) : null} onDelete={()=>deleteItem('experience', exp.id)} />}
                  
                  {isEditMode ? (
                    <div className="space-y-3 bg-slate-500/5 p-4 rounded-2xl">
                      <input className={`w-full font-black text-lg p-2 rounded ${currentTheme.input}`} value={exp.position} onChange={e => updateListItem('experience', exp.id, 'position', e.target.value)} />
                      <input className="w-full text-blue-500 font-bold text-xs p-2 bg-transparent border-b border-slate-700 outline-none" value={exp.company} onChange={e => updateListItem('experience', exp.id, 'company', e.target.value)} />
                      <input className="w-full text-[10px] p-2 bg-transparent outline-none" value={exp.period} onChange={e => updateListItem('experience', exp.id, 'period', e.target.value)} />
                      <textarea className={`w-full text-sm p-3 rounded h-32 ${currentTheme.input}`} value={exp.desc} onChange={e => updateListItem('experience', exp.id, 'desc', e.target.value)} placeholder="Usa '-' para listas..." />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-xl font-black ${currentTheme.textBold}`}>{exp.position}</h4>
                        <span className="text-[10px] font-black opacity-30">{exp.period}</span>
                      </div>
                      <p className="text-blue-500 font-black text-xs mb-4 uppercase">{exp.company}</p>
                      <div className="text-sm leading-relaxed opacity-80">{renderFormattedText(exp.desc)}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PROYECTOS */}
          <section className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-black ${currentTheme.textBold} uppercase`}>Proyectos Web & Mobile</h2>
              {isEditMode && <button onClick={() => addItem('projects', {id:Date.now().toString(), title:'Nuevo Proyecto', type:'WEB', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f'})} className="bg-purple-600 p-2 rounded-lg text-white"><Plus size={18}/></button>}
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="space-y-4">
                  {isEditMode && (
                    <div className="bg-slate-900 p-2 rounded-t-xl border border-slate-700 flex justify-between items-center">
                      <div className="flex gap-2">
                         <button onClick={()=>updateListItem('projects', proj.id, 'type', 'WEB')} className={`text-[9px] font-black px-2 py-1 rounded ${proj.type === 'WEB' ? 'bg-purple-600' : 'bg-slate-800 text-slate-500'}`}>WEB</button>
                         <button onClick={()=>updateListItem('projects', proj.id, 'type', 'MOBILE')} className={`text-[9px] font-black px-2 py-1 rounded ${proj.type === 'MOBILE' ? 'bg-purple-600' : 'bg-slate-800 text-slate-500'}`}>MOBILE</button>
                      </div>
                      <EditToolbar 
                        onUp={idx > 0 ? ()=>moveItem('projects', idx, -1) : null} 
                        onDown={idx < data.projects.length-1 ? ()=>moveItem('projects', idx, 1) : null} 
                        onDelete={()=>deleteItem('projects', proj.id)} 
                      />
                    </div>
                  )}

                  <div className={`relative overflow-hidden border ${currentTheme.border} ${proj.type === 'MOBILE' ? 'aspect-[9/16] rounded-[2rem] w-3/4 mx-auto ring-4 ring-slate-800' : 'aspect-video rounded-xl shadow-lg'}`}>
                    <img src={proj.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">{proj.type}</span>
                      <h4 className="text-white font-black text-lg">{proj.title}</h4>
                    </div>
                  </div>

                  {isEditMode && (
                    <div className="space-y-2 bg-slate-900/50 p-4 rounded-b-xl border-x border-b border-slate-700">
                      <input className={`w-full text-xs p-2 rounded ${currentTheme.input}`} placeholder="Nombre del proyecto" value={proj.title} onChange={e => updateListItem('projects', proj.id, 'title', e.target.value)} />
                      <input className={`w-full text-[10px] p-2 rounded ${currentTheme.input}`} placeholder="URL de imagen" value={proj.image} onChange={e => updateListItem('projects', proj.id, 'image', e.target.value)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* EDUCACIÓN - COLORES CORREGIDOS */}
          <section className={`${currentTheme.card} p-8 rounded-[2.5rem] border ${currentTheme.border}`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-xl font-black ${currentTheme.textBold} uppercase`}>Educación</h2>
              {isEditMode && <button onClick={() => addItem('education', {id:Date.now().toString(), category:'career', degree:'Grado', school:'Universidad', year:'2024'})} className="bg-emerald-600 p-2 rounded-lg text-white"><Plus size={18}/></button>}
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {data.education.map((edu, idx) => {
                const config = EDU_TYPES[edu.category] || EDU_TYPES.career;
                return (
                  <div key={edu.id} className="relative p-6 rounded-2xl bg-slate-500/5 border border-transparent hover:border-emerald-500/20">
                    {isEditMode ? (
                      <div className="space-y-2">
                        <EditToolbar onUp={idx > 0 ? ()=>moveItem('education', idx, -1) : null} onDown={idx < data.education.length-1 ? ()=>moveItem('education', idx, 1) : null} onDelete={()=>deleteItem('education', edu.id)} />
                        <select className="w-full bg-slate-800 text-[10px] p-1 rounded" value={edu.category} onChange={e => updateListItem('education', edu.id, 'category', e.target.value)}>
                          <option value="career">Carrera</option>
                          <option value="course">Certificación</option>
                        </select>
                        <input className={`w-full font-black text-xs p-1 rounded ${currentTheme.input}`} value={edu.degree} onChange={e => updateListItem('education', edu.id, 'degree', e.target.value)} />
                        <input className={`w-full text-[10px] text-emerald-500 p-1 rounded ${currentTheme.input}`} value={edu.school} onChange={e => updateListItem('education', edu.id, 'school', e.target.value)} />
                        <input className={`w-full text-[10px] p-1 rounded ${currentTheme.input}`} value={edu.year} onChange={e => updateListItem('education', edu.id, 'year', e.target.value)} />
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-2 ${config.bg} ${config.color} rounded-lg`}>
                            {React.createElement(config.icon, { size: 16 })}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] font-black opacity-30">{edu.year}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${config.badge}`}>
                              {config.display}
                            </span>
                          </div>
                        </div>
                        <h4 className={`font-black text-sm mb-1 ${currentTheme.textBold}`}>{edu.degree}</h4>
                        <p className={`text-[10px] font-bold uppercase ${edu.category === 'career' ? 'text-emerald-500' : 'text-blue-500'}`}>{edu.school}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-20 py-10 border-t border-slate-800 text-center opacity-20 text-[9px] font-black uppercase tracking-[0.4em]">
        QA CONSOLE // REAL-TIME RENDERING // V7.4
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @media print { .print\\:hidden { display: none !important; } }
      `}} />
    </div>
  );
}
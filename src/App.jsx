import React, { useState, useRef, useEffect } from 'react';

// ==========================================
// ÍCONES NATIVOS (Zero Dependências Externas)
// ==========================================
const Icon = ({ name, className, title }) => {
  const icons = {
    FilePlus: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></>,
    Trash2: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>,
    List: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    Settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    Cloud: <><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></>,
    RefreshCw: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
    Edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    Save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>,
    Copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    FileAudio: <><path d="M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"/><polyline points="14 2 14 8 20 8"/><path d="M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0Z"/><path d="M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0Z"/><path d="M2 19v-3a6 6 0 0 1 12 0v3"/></>,
    FileImage: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m20 17-1.29-1.29a2.24 2.24 0 0 0-3.27 0L8 23"/></>,
    FileVideo: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 11 5 3-5 3v-6Z"/></>,
    FileText: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></>,
    Loader2: <><path d="M21 12a9 9 0 1 1-6.219-8.56"/></>,
    BookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    Printer: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
    X: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    Search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    Filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    Sparkles: <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></>,
    UploadCloud: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><polyline points="16 16 12 12 8 16"/></>,
    FolderTree: <><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></>,
    Folder: <><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></>,
    Wand2: <><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></>,
    ArrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    CheckCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    AlertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    Info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {title && <title>{title}</title>}
      {icons[name] || icons.Info}
    </svg>
  );
};

// --- UTILITÁRIO PARA LOCALSTORAGE SEGURO ---
const safeStorage = {
  getItem: (key) => {
    try { return localStorage.getItem(key); } 
    catch (e) { return null; }
  },
  setItem: (key, value) => {
    try { localStorage.setItem(key, value); } 
    catch (e) { console.warn('Acesso ao localStorage bloqueado neste ambiente.'); }
  }
};

// --- CONFIGURAÇÕES NOBRADE ---
const classificationPlan = {
  "1_Vida_Pessoal": {
    label: "1. Vida Pessoal",
    subclasses: { "IDE": "1.1 Identificação", "FAM": "1.2 Família", "FIN": "1.3 Financeiro", "SAU": "1.4 Saúde", "COL": "1.5 Colecionismo" }
  },
  "2_Vida_Profissional": {
    label: "2. Vida Profissional",
    groups: {
      "2.1 Pré Rádio": { "BAR": "2.1.1 Barbearia Do Re Mi", "CAR": "2.1.2 Carro de Som Tabajara" },
      "2.2 Rádio e Produção": { "GUA": "2.2.1 Rádio Guarujá", "RDM": "2.2.2 Rádio Diário Da Manhã", "CAB": "2.2.3 Cláudio Alvim Barbosa Produções", "CMF": "2.2.4 Câmara Municipal de Florianópolis" },
      "2.3 Músico": { "CON": "2.3.1 Concursos", "MUS": "2.3.2 Músicas para Rádio", "JIN": "2.3.3 Jingles", "REC": "2.3.4 Reconhecimento Público" }
    }
  }
};

// --- DATAS AUTOMÁTICAS BASEADAS NA BIOGRAFIA ---
const bioAutoDates = {
  "BAR": "Até 1948",
  "CAR": "Até 1948",
  "GUA": "1948 - 1954",
  "RDM": "1955 - 1965",
  "CAB": "1966 - 1974"
};

const getSubclassLabel = (classKey, subclassKey) => {
  const cls = classificationPlan[classKey];
  if (!cls) return '';
  if (cls.subclasses && cls.subclasses[subclassKey]) return cls.subclasses[subclassKey];
  if (cls.groups) {
    for (const group of Object.values(cls.groups)) {
      if (group[subclassKey]) return group[subclassKey];
    }
  }
  return subclassKey;
};

const supportTypes = ["Fita Cassete", "Fita de Rolo", "VHS", "Película", "Disco de Vinil", "Disco de Cera", "Fotografia", "Documento Textual", "Digital nato"];
const levelTypes = ["Fundo", "Grupo", "Subgrupo", "Série", "Subsérie", "Dossiê", "Item"];

export default function App() {
  const [rows, setRows] = useState([]);
  const [gasUrl, setGasUrl] = useState('');
  const [knownPeople, setKnownPeople] = useState('Cláudio Alvim Barbosa (Zininho), Neide Maria Rosa');
  const [showSettings, setShowSettings] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle');
  
  // UI Modal Global
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });
  
  // Navegação
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState(1);
  const [viewingRecord, setViewingRecord] = useState(null);
  
  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formId, setFormId] = useState('');
  const [formOriginalName, setFormOriginalName] = useState('');
  const [formClass, setFormClass] = useState('');
  const [formSubclass, setFormSubclass] = useState('');
  
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formLevel, setFormLevel] = useState('Item');
  const [formExtent, setFormExtent] = useState('');
  const [formCreator, setFormCreator] = useState('Cláudio Alvim Barbosa (Zininho)');
  const [formArchivalHistory, setFormArchivalHistory] = useState('');
  const [formScope, setFormScope] = useState('');
  const [formArrangement, setFormArrangement] = useState('');
  const [formAccess, setFormAccess] = useState('Sem restrição');
  const [formReproduction, setFormReproduction] = useState('Permitida com citação da fonte');
  const [formLanguage, setFormLanguage] = useState('Português do Brasil');
  const [formPhysical, setFormPhysical] = useState('');
  const [formRelated, setFormRelated] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formArchivistNote, setFormArchivistNote] = useState('');
  const [formDescDate, setFormDescDate] = useState(new Date().toLocaleDateString('pt-BR'));

  // Arquivo & IA State (Individual)
  const [analyzingFile, setAnalyzingFile] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const fileInputRef = useRef(null);

  // IA State (Lote/Listagem Preliminar)
  const [batchText, setBatchText] = useState('');
  const [analyzingBatch, setAnalyzingBatch] = useState(false);
  const [batchResults, setBatchResults] = useState([]);
  const [batchError, setBatchError] = useState('');
  const batchFileInputRef = useRef(null);
  const [batchFileName, setBatchFileName] = useState('');
  const [batchFileData, setBatchFileData] = useState('');
  const [batchFileMime, setBatchFileMime] = useState('');

  // Funções de Modal Seguras
  const showAlert = (title, message) => {
    setModal({ isOpen: true, title, message, type: 'alert' });
  };

  const showConfirm = (title, message, onConfirm) => {
    setModal({ isOpen: true, title, message, type: 'confirm', onConfirm });
  };

  useEffect(() => {
    const savedUrl = safeStorage.getItem('zininho_gas_url');
    const savedPeople = safeStorage.getItem('zininho_known_people');
    if (savedPeople) setKnownPeople(savedPeople);
    
    if (savedUrl) { 
      setGasUrl(savedUrl); 
      fetchData(savedUrl); 
    } else {
      setFormId('AZ_0001');
    }
  }, []);

  const fetchData = async (url) => {
    setSyncStatus('loading');
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRows(data);
      setSyncStatus('success');
      if (!isEditing && data.length > 0) setFormId(getNextId(data));
      else if (data.length === 0) setFormId('AZ_0001');
    } catch (error) { setSyncStatus('error'); }
  };

  const getNextId = (currentRows) => {
    let maxNum = 0;
    currentRows.forEach(r => {
      const match = r.id.match(/AZ_(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    return `AZ_${(maxNum + 1).toString().padStart(4, '0')}`;
  };

  const saveSettings = () => {
    safeStorage.setItem('zininho_gas_url', gasUrl);
    safeStorage.setItem('zininho_known_people', knownPeople);
    setShowSettings(false);
    if (gasUrl) fetchData(gasUrl);
  };

  const goToAcervo = (filter) => {
    setActiveFilter(filter || null);
    setCurrentView('acervo');
    if (!filter) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Lógica de Cores Dinâmicas para o Dashboard
  const getHoverTheme = (idx) => {
    const themes = [
      { // Amarelo
        wrapper: "hover:bg-yellow-400 border-black",
        text: "text-black group-hover:text-black",
        icon: "text-blue-600 group-hover:text-black",
        badgeFilled: "bg-blue-600 text-white border-black group-hover:bg-black group-hover:text-yellow-400 group-hover:border-black",
        badgeEmpty: "bg-white text-black border-black group-hover:bg-black group-hover:text-yellow-400 group-hover:border-black"
      },
      { // Azul
        wrapper: "hover:bg-blue-600 border-black",
        text: "text-black group-hover:text-white",
        icon: "text-blue-600 group-hover:text-white",
        badgeFilled: "bg-blue-600 text-white border-black group-hover:bg-white group-hover:text-blue-600 group-hover:border-transparent",
        badgeEmpty: "bg-white text-black border-black group-hover:bg-transparent group-hover:text-white group-hover:border-white"
      },
      { // Vermelho
        wrapper: "hover:bg-red-600 border-black",
        text: "text-black group-hover:text-white",
        icon: "text-blue-600 group-hover:text-white",
        badgeFilled: "bg-blue-600 text-white border-black group-hover:bg-white group-hover:text-red-600 group-hover:border-transparent",
        badgeEmpty: "bg-white text-black border-black group-hover:bg-transparent group-hover:text-white group-hover:border-white"
      }
    ];
    return themes[idx % 3];
  };

  // --- ANÁLISE MULTIMODAL (INDIVIDUAL) ---
  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setFormOriginalName(file.name);
    setAnalyzingFile(true);
    setAiAnalysisResult('');
    setActiveTab(2); 
    
    const type = file.type;
    if (type.includes('audio')) setFormPhysical('Arquivo Digital (Áudio)');
    else if (type.includes('video')) setFormPhysical('Arquivo Digital (Vídeo)');
    else if (type.includes('image')) setFormPhysical('Arquivo Digital (Imagem)');
    else setFormPhysical('Arquivo Digital nato');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(',')[1];
          const apiKey = ""; 
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
          
          let prompt = `Você é um arquivista especialista (Padrão NOBRADE). Analise este arquivo digital do acervo Zininho. 
Banco de rostos/pessoas recorrentes para tentar identificar: ${knownPeople}.
Instruções estritas:
1. Se for ÁUDIO/VÍDEO: Transcreva a fala principal. Tente identificar que estilo de música ou qual música está a tocar (se houver).
2. Se for IMAGEM: Descreva a cena, os objetos em destaque, as roupas e tente nomear as pessoas caso correspondam ao banco de rostos.
Forneça a resposta em formato de texto limpo, pronto para ser copiado para o campo "Âmbito e Conteúdo" do sistema arquivístico.`;

          const payload = {
            contents: [{ parts: [ { text: prompt }, { inlineData: { mimeType: file.type || 'application/octet-stream', data: base64Data } } ] }]
          };

          let resultText = "";
          let success = false;
          let retries = 0;
          const delays = [1000, 2000, 4000, 8000, 16000];

          while (!success && retries <= 4) {
            try {
              const response = await fetch(url, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payload) 
              });
              
              if (response.ok) {
                const result = await response.json();
                resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
                success = true;
              } else {
                throw new Error(`HTTP Error ${response.status}`);
              }
            } catch (err) {
              if (retries === 4) {
                setAiAnalysisResult("Erro de ligação à Inteligência Artificial. O ficheiro pode ser demasiado grande.");
                setAnalyzingFile(false);
                return;
              }
              await new Promise(r => setTimeout(r, delays[retries]));
              retries++;
            }
          }
          
          if (success && resultText) {
            setAiAnalysisResult(resultText);
            if (!formScope) setFormScope(resultText); 
          } else if (success) {
            setAiAnalysisResult("Não foi possível analisar o conteúdo deste ficheiro.");
          }
        } catch (err) { 
          setAiAnalysisResult("Erro ao contactar a Inteligência Artificial. O ficheiro pode ser demasiado grande."); 
        } finally { 
          setAnalyzingFile(false); 
        }
      };
      reader.readAsDataURL(file);
    } catch (err) { 
      setAnalyzingFile(false); 
      setAiAnalysisResult("Erro ao ler o ficheiro localmente."); 
    }
  };

  // --- ANÁLISE DE LISTAGEM PRELIMINAR EM LOTE (NOVO MÓDULO) ---
  const handleBatchFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setBatchFileName(file.name);
    setBatchText('');
    setBatchError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      setBatchFileData(base64);
      
      let mime = file.type;
      if (!mime) {
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') mime = 'application/pdf';
        else if (ext === 'docx') mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        else if (ext === 'odt') mime = 'application/vnd.oasis.opendocument.text';
        else if (ext === 'txt') mime = 'text/plain';
        else mime = 'application/octet-stream';
      }
      setBatchFileMime(mime);
    };
    reader.readAsDataURL(file);
  };

  const handleBatchAnalysis = async () => {
    if (!batchText.trim() && !batchFileData) return;
    setAnalyzingBatch(true);
    setBatchError('');
    setBatchResults([]);

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const planContext = JSON.stringify(classificationPlan, null, 2);
    
    const promptText = `Você é um arquivista processando um passivo documental do acervo "Zininho" (Cláudio Alvim Barbosa).
O usuário forneceu um texto ou documento vindo de fichas antigas ou listas inacabadas.
Sua tarefa é extrair os itens individuais descritos neste material e sugerir a classificação arquivística apropriada baseada no seguinte Quadro de Arranjo:
${planContext}

DICA DE DATAS (BASEADA NA BIOGRAFIA):
Se o item pertencer a uma destas séries e não tiver data explícita no texto, assuma o período abaixo automaticamente:
- BAR (Barbearia Do Re Mi) ou CAR (Carro de Som): "Até 1948"
- GUA (Rádio Guarujá): "1948 - 1954"
- RDM (Rádio Diário Da Manhã): "1955 - 1965"
- CAB (Cláudio Alvim Barbosa Produções / Curitiba): "1966 - 1974"

Retorne ESTRITAMENTE um array JSON onde cada objeto represente um documento/item encontrado no texto/arquivo, seguindo o schema fornecido. Não adicione crases de markdown.
Seja inteligente: se o texto falar de "Fotos da família no sítio em 1980", o título será "Fotos da família no sítio", a data "1980", classe "1_Vida_Pessoal", subclasse "FAM".
Se não encontrar data, coloque "s.d.". Extraia um pequeno resumo para "descricao".

${batchText ? `Texto colado pelo usuário:\n"""\n${batchText}\n"""` : 'Por favor, analise o documento em anexo e extraia a listagem de acervo nele contida.'}`;

    const parts = [{ text: promptText }];
    
    if (batchFileData) {
      parts.push({ inlineData: { mimeType: batchFileMime, data: batchFileData } });
    }

    const payload = {
      contents: [{ parts: parts }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              titulo: { type: "STRING", description: "Título sugerido para o documento" },
              data: { type: "STRING", description: "Ano, período ou 's.d.'" },
              descricao: { type: "STRING", description: "Resumo do conteúdo (irá para Âmbito e Conteúdo)" },
              classe: { type: "STRING", description: "Chave da classe ex: 1_Vida_Pessoal ou 2_Vida_Profissional" },
              subclasse: { type: "STRING", description: "Código da subclasse ex: IDE, FAM, BAR, etc." }
            },
            required: ["titulo", "data", "descricao", "classe", "subclasse"]
          }
        }
      }
    };

    let resultText = "";
    let success = false;
    let retries = 0;
    const delays = [1000, 2000, 4000, 8000, 16000];

    while (!success && retries <= 4) {
      try {
        const response = await fetch(url, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(payload) 
        });
        
        if (response.ok) {
          const result = await response.json();
          resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
          success = true;
        } else {
          throw new Error(`HTTP Error ${response.status}`);
        }
      } catch (err) {
        if (retries === 4) {
          setBatchError("Erro de ligação ou processamento. Verifique a rede e tente novamente.");
          setAnalyzingBatch(false);
          return;
        }
        await new Promise(r => setTimeout(r, delays[retries]));
        retries++;
      }
    }

    if (success && resultText) {
      try {
        const cleanText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedData = JSON.parse(cleanText);
        setBatchResults(parsedData);
      } catch (e) {
        setBatchError("A IA não retornou um formato de dados válido.");
      }
    }
    setAnalyzingBatch(false);
  };

  const importBatchItemToForm = (item) => {
    resetForm(rows);
    setFormTitle(item.titulo);
    setFormDate(item.data);
    setFormScope(item.descricao);
    
    if (item.classe && classificationPlan[item.classe]) {
      setFormClass(item.classe);
      const cls = classificationPlan[item.classe];
      let validSub = false;
      if (cls.subclasses && cls.subclasses[item.subclasse]) validSub = true;
      if (cls.groups) {
         for (const grp of Object.values(cls.groups)) {
            if (grp[item.subclasse]) validSub = true;
         }
      }
      if (validSub) setFormSubclass(item.subclasse);
    }
    
    setCurrentView('acervo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sanitizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 30) : 'ND';
  
  const generateNewFilename = () => {
    if (!formOriginalName || !formSubclass) return '';
    let ext = formOriginalName.includes('.') ? formOriginalName.split('.').pop() : '';
    ext = ext ? `.${ext}` : '';
    return `${formId}_${formSubclass}_${formDate || 'SD'}_${sanitizeString(formTitle)}${ext}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formOriginalName || !formClass || !formSubclass) {
      showAlert("Atenção", "Faltam dados obrigatórios (Classe, Subclasse) ou um Ficheiro Original associado!");
      return;
    }
    
    setSyncStatus('loading');

    const newRow = {
      id: formId, originalName: formOriginalName,
      className: classificationPlan[formClass].label,
      subclassName: getSubclassLabel(formClass, formSubclass),
      title: formTitle, date: formDate || 's.d.', level: formLevel, extent: formExtent,
      creator: formCreator, archivalHistory: formArchivalHistory, scope: formScope,
      arrangement: formArrangement, accessConditions: formAccess, reproductionConditions: formReproduction,
      language: formLanguage, physicalCharacteristics: formPhysical, relatedUnits: formRelated,
      notes: formNotes, archivistNote: formArchivistNote, descriptionDate: formDescDate,
      newName: generateNewFilename()
    };

    const updatedRows = isEditing 
      ? rows.map(r => r.id === formId ? newRow : r) 
      : [...rows, newRow];
      
    setRows(updatedRows);

    if (gasUrl) {
      try {
        await fetch(gasUrl, { method: 'POST', body: JSON.stringify({ action: 'save', row: newRow }), headers: { 'Content-Type': 'text/plain' } });
        setSyncStatus('success');
        showAlert("Sucesso", "O registo foi sincronizado com sucesso no ficheiro externo!");
      } catch (err) { 
        setSyncStatus('error'); 
        showAlert("Aviso de Sincronização", "Houve um erro a sincronizar com a Planilha, mas o registo foi guardado localmente na sua sessão!"); 
      }
    } else {
      setSyncStatus('idle');
      showAlert("Modo Local", "Registo guardado localmente (em memória). Para persistir permanentemente, configure a Planilha Apps Script nas definições.");
    }

    resetForm(updatedRows);
  };

  const resetForm = (currentRows) => {
    setIsEditing(false); setActiveTab(1);
    setFormId(getNextId(currentRows));
    setFormOriginalName(''); setFormTitle(''); setFormExtent(''); setFormArchivalHistory('');
    setFormScope(''); setFormArrangement(''); setFormPhysical(''); setFormRelated(''); setFormNotes('');
    setFormArchivistNote(''); setAiAnalysisResult(''); setFormClass(''); setFormSubclass('');
    setFormDate('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const editRow = (row) => {
    setIsEditing(true); setViewingRecord(null); setActiveTab(1);
    setFormId(row.id); setFormOriginalName(row.originalName); setFormTitle(row.title);
    setFormDate(row.date === 's.d.' ? '' : row.date); setFormLevel(row.level || 'Item');
    setFormExtent(row.extent || ''); setFormCreator(row.creator || 'Cláudio Alvim Barbosa (Zininho)');
    setFormArchivalHistory(row.archivalHistory || ''); setFormScope(row.scope || '');
    setFormArrangement(row.arrangement || ''); setFormAccess(row.accessConditions || 'Sem restrição');
    setFormReproduction(row.reproductionConditions || 'Permitida com citação da fonte');
    setFormLanguage(row.language || 'Português do Brasil'); setFormPhysical(row.physicalCharacteristics || '');
    setFormRelated(row.relatedUnits || ''); setFormNotes(row.notes || '');
    setFormArchivistNote(row.archivistNote || ''); setFormDescDate(row.descriptionDate || new Date().toLocaleDateString('pt-BR'));
    
    const classEntry = Object.entries(classificationPlan).find(([, data]) => data.label === row.className);
    if (classEntry) {
      setFormClass(classEntry[0]);
      let foundSubclassKey = '';
      if (classEntry[1].subclasses) {
        const subEntry = Object.entries(classEntry[1].subclasses).find(([, label]) => label === row.subclassName);
        if (subEntry) foundSubclassKey = subEntry[0];
      }
      if (!foundSubclassKey && classEntry[1].groups) {
        for (const group of Object.values(classEntry[1].groups)) {
          const subEntry = Object.entries(group).find(([, label]) => label === row.subclassName);
          if (subEntry) { foundSubclassKey = subEntry[0]; break; }
        }
      }
      if (foundSubclassKey) setFormSubclass(foundSubclassKey);
    }
    setCurrentView('acervo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = async (id) => {
    const updatedRows = rows.filter(r => r.id !== id);
    setRows(updatedRows);
    setModal({ ...modal, isOpen: false });
    
    if (gasUrl) {
      setSyncStatus('loading');
      try {
        await fetch(gasUrl, { method: 'POST', body: JSON.stringify({ action: 'delete', id: id }), headers: { 'Content-Type': 'text/plain' } });
        setSyncStatus('success');
      } catch (err) { 
        setSyncStatus('error'); 
        showAlert("Aviso", "O registo foi apagado localmente, mas não conseguimos contactar o servidor para apagar na Planilha.");
      }
    }
  };

  const deleteRow = (id) => {
    showConfirm("Apagar Registo", `Tem a certeza que deseja apagar o registo ${id}?`, () => confirmDelete(id));
  };

  // Filtros
  const uniqueCategories = Array.from(new Set([ ...rows.map(r => r.className), ...rows.map(r => r.subclassName) ])).filter(Boolean);
  const filteredRows = rows.filter(r => {
    const matchCategory = activeFilter ? (r.className === activeFilter || r.subclassName === activeFilter) : true;
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = searchQuery ? (
      r.title.toLowerCase().includes(searchLower) || r.scope.toLowerCase().includes(searchLower) ||
      r.archivalHistory.toLowerCase().includes(searchLower) || r.creator.toLowerCase().includes(searchLower)
    ) : true;
    return matchCategory && matchSearch;
  });

  const getFileIcon = (filename) => {
    const l = filename.toLowerCase();
    if (l.match(/\.(mp3|wav|flac|ogg)$/)) return <Icon name="FileAudio" className="w-8 h-8 text-blue-600" />;
    if (l.match(/\.(mp4|avi|mov|mkv)$/)) return <Icon name="FileVideo" className="w-8 h-8 text-red-600" />;
    if (l.match(/\.(jpg|jpeg|png|gif)$/)) return <Icon name="FileImage" className="w-8 h-8 text-yellow-400" />;
    return <Icon name="FileText" className="w-8 h-8 text-black" />;
  };

  // ===== RENDERIZAÇÃO DA FRONTPAGE (DASHBOARD) =====
  const renderDashboard = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Banner Mondrian */}
        <div className="bg-white border-2 border-black p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative rounded-none">
          <div className="hidden md:block absolute top-0 left-0 w-3 h-full bg-red-600 border-r-2 border-black"></div>
          <div className="hidden md:block absolute top-0 right-0 w-32 h-3 bg-yellow-400 border-b-2 border-l-2 border-black"></div>
          <div className="hidden md:block absolute bottom-0 right-16 w-24 h-3 bg-blue-600 border-t-2 border-x-2 border-black"></div>

          <div className="relative z-10 md:ml-6">
            <h2 className="text-4xl font-black text-black mb-3 uppercase tracking-tighter">Arquivo Zininho</h2>
            <p className="text-black max-w-2xl text-sm leading-relaxed font-medium">
              Acervo histórico de Cláudio Alvim Barbosa (Zininho). Navegue pelo quadro de arranjo estruturado para explorar documentos, áudios e fotografias.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="text-center p-4 bg-white border-2 border-black min-w-[120px]">
              <p className="text-4xl font-black text-blue-600">{rows.length}</p>
              <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">Registos</p>
            </div>
            <button onClick={() => { resetForm(rows); goToAcervo(); }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 border-2 border-black transition flex items-center justify-center gap-2 uppercase tracking-wide text-sm">
              <Icon name="FilePlus" className="w-5 h-5"/> Novo
            </button>
          </div>
        </div>

        {/* Grelha de Classificação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(classificationPlan).map(([classKey, classData]) => {
            const classItemCount = rows.filter(r => r.className === classData.label).length;

            return (
              <div key={classKey} className="bg-white border-2 border-black flex flex-col rounded-none">
                <div 
                  className="bg-black p-4 border-b-2 border-black flex justify-between items-center cursor-pointer hover:bg-gray-900 transition" 
                  onClick={() => goToAcervo(classData.label)}
                >
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                    <Icon name="FolderTree" className="w-5 h-5 text-yellow-400"/> {classData.label}
                  </h3>
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold border-2 border-black">
                    {classItemCount} itens
                  </span>
                </div>
                
                <div className="p-4 flex-1 bg-white">
                  <ul className="space-y-3">
                    {classData.subclasses && Object.entries(classData.subclasses).map(([subKey, subLabel], idx) => {
                      const subCount = rows.filter(r => r.subclassName === subLabel).length;
                      const theme = getHoverTheme(idx);
                      
                      return (
                        <li key={subKey}>
                          <button 
                            onClick={() => goToAcervo(subLabel)} 
                            className={`w-full text-left p-3 bg-white ${theme.wrapper} border-2 transition-colors flex justify-between items-center group rounded-none`}
                          >
                            <span className={`text-sm font-bold ${theme.text} flex items-center gap-2 transition-colors`}>
                              <Icon name="Folder" className={`w-4 h-4 ${theme.icon} transition-colors`}/> {subLabel}
                            </span>
                            {subCount > 0 ? (
                              <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 transition-colors ${theme.badgeFilled}`}>
                                {subCount}
                              </span>
                            ) : (
                              <span className={`px-2 py-1 text-[10px] font-bold uppercase border-2 transition-colors ${theme.badgeEmpty}`}>
                                Vazio
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                    {classData.groups && Object.entries(classData.groups).map(([groupLabel, groupSubs]) => (
                      <li key={groupLabel} className="space-y-2 mt-4 first:mt-0">
                        <div className="text-xs font-black uppercase text-black bg-gray-100 p-2 border-2 border-black border-dashed">
                          {groupLabel}
                        </div>
                        <ul className="space-y-2 pl-3 border-l-4 border-blue-600">
                          {Object.entries(groupSubs).map(([subKey, subLabel], idx) => {
                            const subCount = rows.filter(r => r.subclassName === subLabel).length;
                            const theme = getHoverTheme(idx);
                            
                            return (
                              <li key={subKey}>
                                <button 
                                  onClick={() => goToAcervo(subLabel)} 
                                  className={`w-full text-left p-2.5 bg-white ${theme.wrapper} border-2 transition-colors flex justify-between items-center group rounded-none`}
                                >
                                  <span className={`text-sm font-bold ${theme.text} flex items-center gap-2 transition-colors`}>
                                    <Icon name="Folder" className={`w-3.5 h-3.5 ${theme.icon} transition-colors`}/> {subLabel}
                                  </span>
                                  {subCount > 0 ? (
                                    <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 transition-colors ${theme.badgeFilled}`}>
                                      {subCount}
                                    </span>
                                  ) : (
                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase border-2 transition-colors ${theme.badgeEmpty}`}>
                                      Vazio
                                    </span>
                                  )}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  // ===== RENDERIZAÇÃO DA IMPORTAÇÃO EM LOTE =====
  const renderBatchImport = () => {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-white border-2 border-black rounded-none">
          <div className="bg-blue-600 p-5 text-white border-b-2 border-black flex items-center gap-3">
            <div className="p-2 bg-white border-2 border-black"><Icon name="Wand2" className="w-6 h-6 text-black" /></div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-wide">Listagem Preliminar (IA)</h2>
              <p className="text-white text-xs mt-0.5 font-medium">Extraia e classifique itens automaticamente a partir de ficheiros ou textos brutos.</p>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-black text-black uppercase">1. Fornecer Passivo Documental</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                <button 
                  onClick={() => batchFileInputRef.current?.click()}
                  className="px-4 py-2 bg-white text-black hover:bg-yellow-400 border-2 border-black text-sm font-bold transition flex items-center gap-2 uppercase rounded-none whitespace-nowrap"
                >
                  <Icon name="UploadCloud" className="w-4 h-4" />
                  Carregar Ficheiro (PDF/DOC)
                </button>
                {batchFileName && (
                  <div className="flex items-center gap-2 text-sm bg-yellow-400 px-3 py-2 border-2 border-black w-full overflow-hidden">
                    <Icon name="FileText" className="w-4 h-4 text-black shrink-0"/>
                    <span className="font-bold text-black truncate">{batchFileName}</span>
                    <button onClick={() => {setBatchFileName(''); setBatchFileData('');}} className="ml-auto text-black hover:text-red-600 shrink-0"><Icon name="X" className="w-4 h-4"/></button>
                  </div>
                )}
              </div>
              <input type="file" ref={batchFileInputRef} onChange={handleBatchFileChange} className="hidden" accept=".pdf,.doc,.docx,.odt,.txt,.rtf" />

              <div className="relative">
                <textarea 
                  value={batchText}
                  onChange={(e) => { setBatchText(e.target.value); if (batchFileName) { setBatchFileName(''); setBatchFileData(''); } }}
                  placeholder={batchFileName ? "Ficheiro ativo." : "Cole aqui o texto (ex: listas, notas, índices)."}
                  disabled={!!batchFileName}
                  className={`w-full h-56 p-4 border-2 rounded-none text-sm outline-none resize-none transition-colors ${batchFileName ? 'bg-gray-100 border-black text-gray-500' : 'bg-white border-black focus:border-blue-600'}`}
                />
                {batchFileName && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                    <div className="bg-white p-4 border-2 border-black flex flex-col items-center gap-2 text-center max-w-[80%]">
                      <Icon name="FileText" className="w-8 h-8 text-blue-600 mb-1" />
                      <p className="text-sm font-black text-black uppercase">Pronto para IA</p>
                      <p className="text-xs text-black font-medium">{batchFileName}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleBatchAnalysis}
                disabled={analyzingBatch || (!batchText.trim() && !batchFileData)}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400 text-white font-black uppercase tracking-widest border-2 border-black transition flex items-center justify-center gap-2 rounded-none relative z-20"
              >
                {analyzingBatch ? <><Icon name="Loader2" className="w-5 h-5 animate-spin" /> A Processar...</> : <><Icon name="Sparkles" className="w-5 h-5" /> Extrair Estrutura (IA)</>}
              </button>
              {batchError && <p className="text-white text-xs font-bold p-3 bg-red-600 border-2 border-black">{batchError}</p>}
            </div>

            <div className="bg-white border-2 border-black p-5 flex flex-col rounded-none">
              <h3 className="text-sm font-black text-black mb-4 uppercase">2. Lista Resultante</h3>
              
              {batchResults.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-black text-center px-8 opacity-50">
                  <Icon name="List" className="w-12 h-12 mb-3" />
                  <p className="text-sm font-bold">Aguardando Extração</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {batchResults.map((item, idx) => {
                    const classData = classificationPlan[item.classe];
                    let subLabel = 'Desconhecida';
                    if (classData) {
                      if (classData.subclasses && classData.subclasses[item.subclasse]) {
                        subLabel = classData.subclasses[item.subclasse];
                      } else if (classData.groups) {
                        for (const group of Object.values(classData.groups)) {
                          if (group[item.subclasse]) { subLabel = group[item.subclasse]; break; }
                        }
                      }
                    }
                    const isValidClass = !!classData && subLabel !== 'Desconhecida';

                    return (
                      <div key={idx} className="bg-white p-4 border-2 border-black hover:border-blue-600 transition rounded-none relative group">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-black text-sm leading-tight">{item.titulo}</h4>
                            <p className="text-xs text-blue-600 mt-1 mb-2 font-black uppercase">{item.data}</p>
                            <p className="text-xs text-black line-clamp-2 border-l-4 border-yellow-400 pl-2">{item.descricao}</p>
                            
                            <div className="mt-3 flex items-center gap-2">
                              {isValidClass ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-black border-2 border-black text-[10px] font-bold uppercase">
                                  <Icon name="CheckCircle" className="w-3 h-3 text-red-600" /> {subLabel}
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-red-600 text-white border-2 border-black text-[10px] font-bold uppercase">
                                  Inválido: {item.classe}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => importBatchItemToForm(item)}
                            className="shrink-0 p-3 bg-white text-black border-2 border-black hover:bg-yellow-400 transition font-black uppercase text-xs flex flex-col items-center gap-1 rounded-none"
                            title="Revisar"
                          >
                            <Icon name="ArrowRight" className="w-4 h-4" />
                            <span>Revisar</span>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===== RENDERIZAÇÃO DO ACERVO (FORM + TABELA) =====
  const renderAcervo = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
        
        {/* LADO ESQUERDO: GESTÃO E INSERÇÃO DE DADOS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Módulo 1: Upload */}
          <div className="bg-white border-2 border-black rounded-none">
            <div className="bg-black p-4 border-b-2 border-black flex items-center justify-between text-white">
              <h2 className="text-sm font-black uppercase flex items-center gap-2">
                <span className="bg-yellow-400 text-black px-1">1</span> Ficheiro Digital
              </h2>
            </div>
            
            <div className="p-6 text-center border-b-2 border-black border-dashed bg-white">
              {!formOriginalName ? (
                <div className="py-6 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center">
                    <Icon name="UploadCloud" className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black uppercase">Associar Ficheiro</p>
                    <p className="text-xs text-black mt-1 mb-4 font-medium">Requisito para gravação.</p>
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} type="button" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold border-2 border-black transition uppercase">
                    Selecionar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-2">
                  <div className="p-3 bg-white border-2 border-black">
                    {getFileIcon(formOriginalName)}
                  </div>
                  <p className="text-sm font-black text-black max-w-[250px] truncate">{formOriginalName}</p>
                  
                  {analyzingFile ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-black bg-yellow-400 px-3 py-1.5 border-2 border-black uppercase">
                      <Icon name="Loader2" className="w-4 h-4 animate-spin" /> A Analisar...
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => fileInputRef.current?.click()} type="button" className="text-xs text-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 border-2 border-transparent hover:border-black font-bold uppercase transition">Trocar</button>
                      {isEditing && <span className="text-xs text-black font-bold px-2 py-1 bg-yellow-400 border-2 border-black uppercase">Edição ({formId})</span>}
                    </div>
                  )}
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
            
            {aiAnalysisResult && (
              <div className="p-4 bg-white border-t-2 border-black">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase text-black bg-yellow-400 px-2 border-2 border-black">Análise IA</span>
                  <button onClick={() => {setFormScope(aiAnalysisResult); setActiveTab(2);}} type="button" className="text-[10px] bg-white border-2 border-black px-2 py-1 text-black font-bold flex items-center gap-1 hover:bg-blue-600 hover:text-white transition uppercase">
                    <Icon name="Copy" className="w-3 h-3"/> Copiar p/ Âmbito
                  </button>
                </div>
                <p className="text-xs text-black leading-relaxed max-h-32 overflow-y-auto pr-2 border-l-4 border-blue-600 pl-2">{aiAnalysisResult}</p>
              </div>
            )}
          </div>

          {/* Módulo 2: Ficha NOBRADE */}
          <div className={`bg-white border-2 ${isEditing ? 'border-yellow-400' : 'border-black'} transition-colors rounded-none ${!formOriginalName && !isEditing ? 'opacity-80 border-dashed' : ''}`}>
            <div className={`p-4 border-b-2 border-black flex justify-between items-center ${isEditing ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}>
              <h2 className="text-sm font-black uppercase flex items-center gap-2">
                <span className={`${isEditing ? 'bg-black text-yellow-400' : 'bg-red-600 text-white'} px-1`}>2</span> Descrição
              </h2>
              {isEditing && <button onClick={() => resetForm(rows)} type="button" className="text-[10px] px-2 py-1 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black uppercase">Cancelar</button>}
            </div>
            
            <div className="flex border-b-2 border-black text-xs font-black text-black bg-white">
              {[ {id: 1, label: 'Identif.'}, {id: 2, label: 'Contexto'}, {id: 3, label: 'Físico'}, {id: 4, label: 'Notas'} ].map(t => (
                <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} className={`flex-1 py-3 border-r-2 border-black last:border-r-0 transition-colors uppercase ${activeTab === t.id ? 'bg-blue-600 text-white border-b-0' : 'bg-white text-black hover:bg-yellow-400'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-5 bg-white">
              {/* ABA 1: Identificação */}
              <div className={activeTab === 1 ? 'space-y-4' : 'hidden'}>
                <div className="flex gap-3">
                  <div className="w-1/3">
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Cód. (ID)</label>
                    <input type="text" value={formId} readOnly className="w-full p-2 border-2 border-black bg-gray-100 font-mono text-sm text-black outline-none rounded-none" />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Título *</label>
                    <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full p-2 border-2 border-black bg-white text-sm font-bold focus:border-blue-600 outline-none rounded-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-white border-2 border-black border-dashed">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Fundo *</label>
                    <select value={formClass} onChange={(e) => {setFormClass(e.target.value); setFormSubclass('');}} className="w-full p-2 border-2 border-black text-xs bg-white focus:border-blue-600 outline-none rounded-none" required>
                      <option value="">Selecione...</option>
                      {Object.entries(classificationPlan).map(([k, d]) => <option key={k} value={k}>{d.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Série *</label>
                    <select 
                      value={formSubclass} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormSubclass(val);
                        if (bioAutoDates[val] && (!formDate || formDate === 's.d.')) {
                          setFormDate(bioAutoDates[val]);
                        }
                      }} 
                      className="w-full p-2 border-2 border-black text-xs bg-white focus:border-blue-600 outline-none rounded-none" required
                    >
                      <option value="">Selecione...</option>
                      {formClass && classificationPlan[formClass]?.subclasses && Object.entries(classificationPlan[formClass].subclasses).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                      {formClass && classificationPlan[formClass]?.groups && Object.entries(classificationPlan[formClass].groups).map(([groupLabel, groupSubs]) => (
                        <optgroup label={groupLabel} key={groupLabel}>
                          {Object.entries(groupSubs).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Datas</label>
                    <input type="text" value={formDate} onChange={(e) => setFormDate(e.target.value)} placeholder="1960" className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Nível</label>
                    <select value={formLevel} onChange={(e) => setFormLevel(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none">
                      {levelTypes.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Dimensão</label>
                    <input type="text" value={formExtent} onChange={(e) => setFormExtent(e.target.value)} placeholder="1 item" className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                  </div>
                </div>
              </div>

              {/* ABA 2: Contexto e Conteúdo */}
              <div className={activeTab === 2 ? 'space-y-4' : 'hidden'}>
                <div className="bg-white p-3 border-2 border-black">
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Âmbito e Conteúdo *</label>
                  <textarea value={formScope} onChange={(e) => setFormScope(e.target.value)} className="w-full p-2 border-2 border-black text-sm h-32 resize-none focus:border-blue-600 outline-none rounded-none" placeholder="Resumo do assunto..." required />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Nome do Produtor</label>
                  <input type="text" value={formCreator} onChange={(e) => setFormCreator(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">História Arquivística</label>
                  <input type="text" value={formArchivalHistory} onChange={(e) => setFormArchivalHistory(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Sistema de Arranjo</label>
                  <input type="text" value={formArrangement} onChange={(e) => setFormArrangement(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                </div>
              </div>

              {/* ABA 3: Físico e Acesso */}
              <div className={activeTab === 3 ? 'space-y-4' : 'hidden'}>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Caract. Físicas/Conservação</label>
                  <input type="text" value={formPhysical} onChange={(e) => setFormPhysical(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Condições Acesso</label>
                    <input type="text" value={formAccess} onChange={(e) => setFormAccess(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase mb-1">Condições Reprodução</label>
                    <input type="text" value={formReproduction} onChange={(e) => setFormReproduction(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Idioma</label>
                  <input type="text" value={formLanguage} onChange={(e) => setFormLanguage(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                </div>
              </div>

              {/* ABA 4: Notas e Controle */}
              <div className={activeTab === 4 ? 'space-y-4' : 'hidden'}>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Unidades Relacionadas</label>
                  <input type="text" value={formRelated} onChange={(e) => setFormRelated(e.target.value)} className="w-full p-2 border-2 border-black text-sm focus:border-blue-600 outline-none rounded-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Notas Gerais</label>
                  <textarea value={formNotes} onChange={(e) => setFormNotes(e.target.value)} className="w-full p-2 border-2 border-black text-sm h-12 resize-none focus:border-blue-600 outline-none rounded-none" />
                </div>
                <div className="bg-white p-3 border-2 border-black border-dashed mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-black uppercase">Nota Arquivista</label>
                      <input type="text" value={formArchivistNote} onChange={(e) => setFormArchivistNote(e.target.value)} className="w-full p-1.5 border-b-2 border-black text-xs bg-white outline-none rounded-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-black uppercase">Data Descrição</label>
                      <input type="text" value={formDescDate} onChange={(e) => setFormDescDate(e.target.value)} className="w-full p-1.5 border-b-2 border-black text-xs bg-white outline-none rounded-none" />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className={`w-full font-black py-3 px-4 border-2 border-black mt-6 transition flex justify-center items-center gap-2 uppercase rounded-none tracking-widest ${isEditing ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                {isEditing ? <><Icon name="Save" className="w-5 h-5"/> Atualizar Registo</> : <><Icon name="FilePlus" className="w-5 h-5"/> Gravar no Acervo</>}
              </button>
              
              {!formOriginalName && !isEditing && (
                <p className="text-center text-xs text-red-600 mt-3 font-bold uppercase border-t-2 border-black pt-2 border-dashed">⚠️ Selecione o ficheiro antes de gravar.</p>
              )}
            </form>
          </div>
        </div>

        {/* LADO DIREITO: BUSCA E TABELA DO ACERVO */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* PAINEL DE FILTRAGEM */}
          <div className="bg-white p-5 border-2 border-black rounded-none">
            <div className="relative mb-4">
              <Icon name="Search" className="w-5 h-5 text-black absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Pesquisar (ex: Alma Sertaneja, Neide...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 p-3 bg-white border-2 border-black text-sm focus:border-blue-600 outline-none transition rounded-none font-bold" 
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Icon name="Filter" className="w-4 h-4 text-red-600" />
              <span className="text-xs font-black text-black uppercase tracking-wider">Filtros</span>
            </div>
            
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2 pb-1">
              <button onClick={() => setActiveFilter(null)} className={`px-3 py-1.5 text-[10px] uppercase font-black border-2 transition-colors rounded-none ${!activeFilter ? 'bg-black text-white border-black' : 'bg-white text-black border-black hover:bg-yellow-400'}`}>
                Todos
              </button>
              {uniqueCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveFilter(cat)} 
                  className={`px-3 py-1.5 text-[10px] uppercase font-black border-2 transition-colors rounded-none ${activeFilter === cat ? 'bg-blue-600 text-white border-black' : 'bg-white text-black border-black hover:bg-yellow-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* TABELA DE RESULTADOS */}
          <div className="bg-white border-2 border-black flex flex-col flex-1 overflow-hidden rounded-none">
            <div className="bg-black text-white px-5 py-4 border-b-2 border-black flex justify-between items-center">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                Acervo <span className="px-2 py-0.5 bg-white text-black text-xs border-2 border-black">{filteredRows.length} / {rows.length}</span>
              </h2>
              <div className="flex gap-2">
                <button onClick={() => gasUrl && fetchData(gasUrl)} className="p-1.5 bg-white text-black border-2 border-black hover:bg-yellow-400 rounded-none"><Icon name="RefreshCw" className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto min-h-[400px] max-h-[700px] bg-white">
              {rows.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-black p-8 text-center font-bold uppercase">
                  {!gasUrl ? "Conecte a Planilha nas Definições." : "Sem registos."}
                </div>
              ) : filteredRows.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-black p-8 text-center font-bold uppercase">
                  Nenhum resultado.
                </div>
              ) : (
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-white text-black sticky top-0 z-10 border-b-2 border-black">
                    <tr>
                      <th className="p-3 border-r-2 border-black text-center w-28 font-black uppercase">Ações</th>
                      <th className="p-3 border-r-2 border-black font-black uppercase text-[10px]">Cód.</th>
                      <th className="p-3 border-r-2 border-black font-black uppercase text-[10px]">Título</th>
                      <th className="p-3 border-r-2 border-black font-black uppercase text-[10px]">Série</th>
                      <th className="p-3 font-black uppercase text-[10px]">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((r) => (
                      <tr key={r.id} className={`border-b-2 border-black transition-colors ${formId === r.id && isEditing ? 'bg-yellow-400' : 'hover:bg-gray-100'}`}>
                        <td className="p-2 border-r-2 border-black text-center flex gap-1 justify-center">
                          <button onClick={() => setViewingRecord(r)} className="px-2 py-1.5 bg-white text-black border-2 border-black hover:bg-blue-600 hover:text-white rounded-none font-bold transition" title="Ver"><Icon name="FileText" className="w-3.5 h-3.5"/></button>
                          <button onClick={() => editRow(r)} className="px-2 py-1.5 bg-white text-black border-2 border-black hover:bg-yellow-400 rounded-none transition" title="Editar"><Icon name="Edit" className="w-3.5 h-3.5" /></button>
                          <button onClick={() => deleteRow(r.id)} className="px-2 py-1.5 bg-white text-black border-2 border-black hover:bg-red-600 hover:text-white rounded-none transition" title="Apagar"><Icon name="Trash2" className="w-3.5 h-3.5" /></button>
                        </td>
                        <td className="p-3 border-r-2 border-black font-mono font-bold text-blue-600">{r.id}</td>
                        <td className="p-3 border-r-2 border-black max-w-[150px] truncate font-black text-black" title={r.title}>{r.title}</td>
                        <td className="p-3 border-r-2 border-black max-w-[120px] truncate text-black font-medium uppercase text-[10px]" title={r.subclassName}>{r.subclassName}</td>
                        <td className="p-3 text-black font-bold">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===== RENDERIZAÇÃO DA HISTÓRIA (BIOGRAFIA) =====
  const renderHistoria = () => {
    const tccText = `Cláudio Alvim Barbosa, conhecido como Zininho, nasceu em 8 de maio de 1929, em Três Riachos, no município de Biguaçu, Santa Catarina. Filho de Alvim Godofredo Barbosa, apelidado de Camisa, jogador de futebol profissional reconhecido, e de Teodora Silva Barbosa (Medeiros; Oehme; Barbosa, 2000). Seu pai faleceu aos 19 anos de idade, quando Zininho tinha apenas dois, e, mais tarde, sua mãe casou-se novamente. Zininho foi criado pelos avós paternos, João Manoel dos Santos Barbosa e Maria Machado de Souza Barbosa, no centro de Florianópolis, na Rua Menino Deus, no Largo 13 de Maio (Cláudio Alvim Barbosa - Zininho, 1992, 3min25s), local que seria imortalizado em um de seus sambas. O artista iniciou seus estudos na Escola Particular da D. Rute, no Estreito, ambiente que ele descrevia como ideal para aprender a ler e escrever. Posteriormente, frequentou o Grupo Escolar Lauro Müller. Além da educação formal, Zininho desenvolveu sua 'escola da vida' na adolescência, participando de clubes, blocos carnavalescos e folguedos populares como boi de mamão e terno de reis (Caldas Filho, [s.d.], p. 9).

Em documentário produzido pela extinta TV Catarinense, preservado pelo acervo em questão, Zininho narra que começou sua trajetória como locutor dos oferecimentos musicais em parques de diversões, onde foi então descoberto pelo ator Chiquinho, que o incentivou a se apresentar publicamente (Cláudio Alvim Barbosa Zininho, 1992, 4min30s). Sua primeira interpretação nos palcos foi Vou Sambar em Madureira, de Jorge Veiga, que, segundo o próprio Zininho, foi um sucesso (Cláudio Alvim Barbosa - Zininho, 1992, 4min34s). Caldas Filho ([s.d.]) também aborda a infância de Zininho, relatando como, morando em frente à casa de Waldir Brazil, líder do grupo vocal Os Demônios do Ritmo, Zininho não perdia um ensaio da banda. Segundo o autor, foi Waldir Brazil quem o levou para se apresentar pela primeira vez, aos 8 anos de idade, no teatro da União Beneficente Recreativa Operária (UBRO). Casou-se com Ivette Vieira Barbosa em 1947, aos 18 anos, com quem teve quatro filhos e oito netos (Medeiros; Oehme; Barbosa, 2000).

Antes de ingressar no rádio, Zininho desempenhou diversos trabalhos, foi proprietário da barbearia Salão Dó-ré-mi, e operou o carro de som Tabajara, um serviço de alto-falantes (Medeiros; Oehme; Barbosa, 2000), atividades que possuem registros em fotografias e outros documentos em seu acervo. Posteriormente, em 1948, aos 18 anos, ingressou como cantor na Rádio Guarujá, a primeira estação radiofônica da capital catarinense. Na emissora, Zininho passou a ter um programa semanal e ficou conhecido como o 'Gentleman do Samba' (Caldas Filho, [s.d.]). Inicialmente localizada na Rua Felipe Schmidt, a Rádio Guarujá mudou-se mais tarde para a Rua João Pinto, ambas no Centro de Florianópolis. Nesse período, o artista compôs seu primeiro sucesso, Princesinha da Ilha (Cláudio Alvim Barbosa - Zininho, 1992, 5min55s), canção vencedora de um concurso de composições carnavalescas realizado em 1951, cujo objetivo era impulsionar artistas locais (Caldas Filho, [s.d.], p. 15).

Trabalhou na Rádio Guarujá até 1954 como apresentador, operador de som, produtor e roteirista. Depois, de 1955 a 1965, atuou na Rádio Diário da Manhã, atual CBN Diário, onde produziu programas icônicos como o matinal Sequências a Modelar, e o noturno Bar da Noite (Caldas Filho, [s.d.], p. 19), cuja estrela principal era Neide Maria Rosa. Intérprete favorita de Zininho, Neide cantava suas canções na Rádio Diário da Manhã durante as décadas de 1950 e 1960. Em 1988, ela gravou um LP intitulado "Eu Sou Assim", produzido por Norberto Depizzolatti, nomeado a partir de uma das músicas compostas por Zininho e que ela interpretava naquele período. Sobre Bar da Noite, Zininho descreveu:

"Bar da Noite era assim, um cara que escrevia legendas para enfeitar e emoldurar as canções da Neide, um pianinho que é o Aldo Gonzaga, que tá aí fazendo o mesmo som, De Maria que já foi embora, e um baterista que vez em quando mudava. E tinha mais um no Bar da Noite. Ah, sim, tinha o que apresentava, foi o Aldo Silva, foi o Antunes [Severo], foi o Gustavinho, foi o Eliazar e no final foi o Zé Valério. E tinha mais um, o cara que ia lá no Fiorino buscar o vinho, esse não parava. Coisa boa, sexta-feira, 21 e 10. Bom à beça" (Cláudio Alvim Barbosa Zininho, 1991, 21m05s).

Esta breve biografia foi elaborada, principalmente, a partir de um documentário produzido pela TV Catarinense em 1992, no qual o próprio Zininho narra aspectos de sua trajetória. O material, preservado pelo artista em VHS e posteriormente digitalizado, exemplifica a relevância do Arquivo Zininho. Ao guardar e disponibilizar informações tão valiosas, este acervo desempenha um papel crucial na preservação da memória, especialmente considerando que a emissora responsável pelo documentário já não existe. Este é um exemplo claro da importância de preservação desse acervo, que, sem tal cuidado dado pelo próprio Zininho e seus sucessores, não seriam possíveis sua recuperação e uso.

Como um marco em sua carreira, e um marco também na vida florianopolitana (Mondardo Júnior, 2007), em 1965, Zininho venceu o concurso Uma Canção Para Florianópolis, promovido pela Prefeitura Municipal. Sua marcha-canção, Rancho do Amor à Ilha, foi posteriormente oficializada como hino da capital catarinense em 1968, pela Lei nº 877/68, de autoria do vereador Waldemar Joaquim da Silva Filho, conhecido como Caruso (Caldas Filho, [s.d.], p. 23). O compositor também é autor dos hinos de outras duas cidades: Joinville, a maior cidade catarinense, com Cidade das Flores (Medeiros; Oehme; Barbosa, 2000, p. 17); e de Rio Negro, no Paraná, com Rio Negro, Botão de Rosa, em ocasião do centenário do município (Medeiros; Oehme; Barbosa, 2000, p. 13). Em seu nome há um único álbum, produzido por Aldírio Simões e gravado ao vivo no Teatro Álvaro de Carvalho (TAC), em 1994, com diversos intérpretes cantando suas músicas.

De sua passagem pelas rádios, Zininho registrou e acumulou horas da programação de Florianópolis em milhares de fitas de rolo que seriam o suficiente para compor um 'Museu de Som'. No entanto, de acordo com o próprio produtor do arquivo, ele ouvia falar sobre este projeto há anos, mas que nunca havia saído do 'papo furado' (Caldas Filho, [s.d]). De acordo com Jairo Barbosa (2025), filho de Zininho, o esforço do produtor do arquivo surgiu da percepção de que as rádios não mantinham arquivos próprios, e Zininho supria essa lacuna de forma intuitiva, mas organizada. Posteriormente, esses registros foram migrados para fitas cassete e, mais tarde, para suportes digitais, a fim de garantir a preservação desse material e facilitar seu acesso.

Em 1966, Zininho mudou-se para Curitiba, inicialmente para montar uma empresa de gravações e publicidade, a Rádio Independência, com um parente. Pouco depois, fundou sua própria empresa, a Cláudio Alvim Barbosa (CAB) - Gravações Promoções e Publicidade Ltda., que se destacou na produção de campanhas políticas e publicitárias para o governo do Paraná (Medeiros; Oehme; Barbosa, 2000). Durante os oito anos em que residiu na capital paranaense, Zininho expandiu seus trabalhos para clientes do Sul e Sudeste, ocasionalmente colaborando com seu parceiro de Rádio Diário da Manhã, o jornalista Antunes Severo. Em janeiro de 1969, nasceu sua filha Cláudia Regina, a caçula da família. A família retornou a Florianópolis em 9 de janeiro de 1974, estabelecendo-se primeiramente no Estreito e depois no bairro Bom Abrigo (Medeiros; Oehme; Barbosa, 2000). Ao retornar para Florianópolis, Zininho trouxe consigo diversos materiais, incluindo fitas, cadernos e discos, evidenciando que tudo o que produziu em Curitiba foi cuidadosamente conservado por ele (Barbosa, J., 2025).

Durante esse período de vida como jovem adulto, o artista também constituiu uma coleção particular de discos. Em entrevista pessoal para esta pesquisa, a filha caçula, Cláudia Regina Barbosa (2025), conta que em sua casa "Sempre teve quarto e parede cheio de disco". Com acesso privilegiado aos catálogos das rádios, Zininho adquiriu materiais raros em uma época em que a compra desses bens culturais era restrita. Não bastasse a relevância intrínseca dessa coleção de discos, as estações de rádio onde Zininho trabalhou, ao encerrarem suas atividades, doaram parte de seus acervos ao ex-funcionário. Por isso, atualmente, no acervo da Casa da Memória, de acordo com um relatório produzido por este pesquisador durante seu estágio não obrigatório na instituição, o Arquivo Zininho é composto por 5.073 discos, desses, 4.236 são de vinil, 835 são de cera, e outros 2 exemplares são de materiais alternativos, como um disco de papelão revestido de plástico, do compositor e humorista Juca Chaves (Almeida, 2023).

Em 1989, Zininho e a FCFFC, então denominada apenas Fundação Franklin Cascaes, firmaram um contrato voltado à organização dos materiais audiovisuais do poeta. Sua cláusula primeira estipula:

"É objeto do presente contrato a locação de estúdio e cessão, organização e transcrição, em áudio, do arquivo de gravações documentais do Contratado, o qual será responsável pela execução do trabalho, que será repassado ao acervo da Contratante." (Fundação Cultural de Florianópolis Franklin Cascaes, 1989, p. 1).

Sobre esta matéria, a FCFFC também preserva, no acervo da Casa da Memória, um vídeo que registra o momento da assinatura desse contrato, material que, mais uma vez, foi salvaguardado graças aos esforços do próprio compositor. A Casa da Memória Annita Hoepcke da Silva, onde atualmente se encontra o arquivo pessoal de Zininho, configura-se como um centro de documentação, à semelhança de outros que começaram a ser criados no Brasil a partir da década de 1960. Esses centros representam uma renovação do conceito de arquivo histórico no país, ampliando significativamente a capacidade nacional de preservação e acesso à documentação de valor histórico, conforme destacam Crivelli e Bizello (2022).

De acordo com relatório produzido por este pesquisador durante seu estágio não obrigatório na Casa da Memória Annita Hoepcke da Silva, o Arquivo Zininho encontra-se armazenado principalmente na Reserva Técnica da instituição, junto a outros fundos e em diferentes suportes. O acervo apresenta organização parcial, inventários incompletos, e ainda carece de tratamento arquivístico sistematizado. Os documentos estão acondicionados por assunto, sem observância aos princípios da proveniência e da ordem original. Ali as condições não são adequadas à preservação, não há climatização nem controle de umidade, e são visíveis focos de infiltração, mofo e fungos, comprometendo a integridade física dos materiais. Existem digitalizações, mas estas estão armazenadas em equipamentos comuns, sem padronização de nomenclatura, controle de metadados ou rotina de backups. Além disso, a Casa da Memória não dispõe de instrumentos de gestão documental, como plano de classificação ou tabela de temporalidade, o que compromete a organização e dificulta o acesso ao acervo. Apesar dessas fragilidades, a instituição reconhece a importância histórica do Arquivo Zininho, com inventários parciais que revelam potencial para avanços significativos, desde que acompanhados por investimentos estruturais e capacitação técnica (Almeida, 2024).

Este mesmo relatório identificou, entre os documentos provenientes de Zininho, um total de 5.073 discos, sendo 3.976 discos de vinil de 10" e 12", 260 compactos de vinil de 7", 514 discos de cera de 10", 321 discos de cera de 15" e 2 discos de materiais diversos. Foram contabilizadas 288 fitas VHS referentes ao Arquivo Zininho, armazenadas em estantes de aço. As fitas cassete estão acondicionadas em 15 caixas de papelão, sendo 14 lacradas no subsolo, com o rótulo "CASSETES DIGITALIZADAS 2019", e uma caixa na Reserva Técnica rotulada como "CASSETES NÃO DIGITALIZADAS 2019", contendo 105 unidades. As digitalizações dessas fitas estão armazenadas em DVDs, em uma caixa localizada na própria Reserva Técnica, e em HDs na Sala de Pesquisa. Por fim, foram registradas 1.362 fitas de rolo de 1/4 de polegada, muitas com etiquetas contendo alguma identificação de conteúdo. Essas fitas foram digitalizadas e encontram-se acondicionadas em armários fechados e em caixas de feira cobertas com tecido TNT no subsolo (Almeida, 2024).

A trajetória de Zininho, marcada por sua contribuição cultural para Florianópolis e sua atuação como compositor, radialista e um 'arquivista informal', o levou a ser considerado como "[...] um verdadeiro homem dos 7 instrumentos [...]" (Caldas Filho, [s.d.], p. 4) e evidencia a relevância histórica e social do Arquivo Zininho. Assim, ao propor a reconstrução do contexto arquivístico do Arquivo Zininho, esta pesquisa não apenas busca preencher lacunas na organização e classificação do acervo, mas também contribuir para a compreensão da vida e obra de Zininho como um testemunho essencial da história cultural de Florianópolis, afinal, como argumentam Oliveira e Gonçalves (2020, p. 661), "Não há dúvida que preservar a memória de Zininho é preservar a memória da cidade de Florianópolis."`;

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-white border-2 border-black p-6 md:p-12 relative rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Mondrian Accents */}
          <div className="hidden md:block absolute top-0 left-0 w-3 h-full bg-blue-600 border-r-2 border-black"></div>
          <div className="hidden md:block absolute top-0 right-0 w-32 h-3 bg-red-600 border-b-2 border-l-2 border-black"></div>
          
          <div className="md:ml-8 relative z-10">
             <h2 className="text-3xl font-black text-black mb-8 uppercase tracking-tighter inline-block">
               A História de Zininho
               <div className="h-2 w-full bg-yellow-400 mt-2 border-2 border-black"></div>
             </h2>
             
             <div className="max-w-4xl text-black text-sm md:text-base leading-relaxed space-y-6 font-serif text-justify border-l-4 border-black pl-6 md:pl-8 mb-12 whitespace-pre-wrap">
                {tccText}
             </div>

             <div className="bg-gray-50 p-6 border-2 border-black border-dashed mt-12 max-w-4xl">
               <h3 className="text-xs font-black uppercase text-black mb-3">Referência do Texto Base (ABNT)</h3>
               <p className="text-xs text-black leading-relaxed break-all">
                 LEHMKUHL, Camila. <strong>Arquivo Zininho</strong>. Trabalho de Conclusão de Curso (Graduação em Arquivologia) - Universidade Federal de Santa Catarina, Florianópolis, 2025. Disponível em: &lt;<a href="https://repositorio.ufsc.br/bitstream/handle/123456789/269260/LUI_BARBOSA_TCC_ARQUIVO_ZININHO_CAMILA_LEHMKUHL_2025_V02_POS_BANCA.pdf?sequence=1" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">https://repositorio.ufsc.br/bitstream/handle/123456789/269260/LUI_BARBOSA_TCC_ARQUIVO_ZININHO_CAMILA_LEHMKUHL_2025_V02_POS_BANCA.pdf?sequence=1</a>&gt;. Acesso em: 17 jun. 2026.
               </p>
               <p className="text-[10px] text-red-600 font-bold uppercase mt-4 border-t border-gray-300 pt-3">
                 * O texto biográfico apresentado nesta página é uma reprodução integral do documento citado acima (Capítulo 3).
               </p>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* ===== HEADER ===== */}
      <div className="bg-white pt-4 md:pt-8 px-4 md:px-8 print:hidden">
        <div className="max-w-[1400px] mx-auto">
          <header className="bg-white p-5 border-4 border-black flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden rounded-none">
            {/* Mondrian Accents Top */}
            <div className="absolute top-0 left-0 w-16 h-2 bg-red-600"></div>
            <div className="absolute top-0 right-0 w-8 h-full bg-yellow-400 border-l-4 border-black"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-blue-600 p-2 border-2 border-black"><Icon name="BookOpen" className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase">Sistema Zininho</h1>
                <p className="text-black text-[10px] uppercase tracking-widest font-bold">NOBRADE / Fiocruz</p>
              </div>
            </div>
            
            {/* Navegação Global */}
            <div className="flex flex-col md:flex-row bg-white border-2 border-black w-full md:w-auto relative z-10 rounded-none">
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 md:border-b-0 md:border-r-2 border-black rounded-none ${currentView === 'dashboard' ? 'bg-black text-white' : 'bg-white text-black hover:bg-yellow-400'}`}
              >
                Início
              </button>
              <button 
                onClick={() => setCurrentView('historia')} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 md:border-b-0 md:border-r-2 border-black rounded-none ${currentView === 'historia' ? 'bg-black text-white' : 'bg-white text-black hover:bg-yellow-400'}`}
              >
                <Icon name="Info" className="w-4 h-4 hidden lg:block" /> Biografia
              </button>
              <button 
                onClick={() => setCurrentView('batch')} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 md:border-b-0 md:border-r-2 border-black rounded-none ${currentView === 'batch' ? 'bg-black text-white' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
              >
                IA Lote
              </button>
              <button 
                onClick={() => goToAcervo()} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors rounded-none ${currentView === 'acervo' ? 'bg-black text-white' : 'bg-white text-black hover:bg-red-600 hover:text-white'}`}
              >
                Acervo
              </button>
            </div>

            <div className="flex items-center gap-4 hidden md:flex relative z-10 mr-10">
              <div className="flex items-center gap-2 text-[10px] uppercase font-black px-3 py-2 bg-white border-2 border-black rounded-none">
                {syncStatus === 'loading' && <><Icon name="RefreshCw" className="w-4 h-4 animate-spin text-black" /> A Sincronizar</>}
                {syncStatus === 'success' && <><Icon name="Cloud" className="w-4 h-4 text-blue-600" /> Ativo</>}
                {syncStatus === 'error' && <><Icon name="AlertCircle" className="w-4 h-4 text-red-600" /> Erro</>}
              </div>
              <button onClick={() => setShowSettings(true)} className="p-2 bg-white border-2 border-black hover:bg-yellow-400 transition rounded-none" title="Ajustes do Sistema">
                <Icon name="Settings" className="w-5 h-5 text-black" />
              </button>
            </div>
          </header>
        </div>
      </div>

      {/* RENDERIZAÇÃO DA VIEW ATIVA */}
      <div className="pb-8">
        {currentView === 'dashboard' ? (
          <div className="bg-white px-4 md:px-8 py-6">
            <div className="max-w-[1400px] mx-auto">
              {renderDashboard()}
            </div>
          </div>
        ) : currentView === 'historia' ? (
          <div className="bg-white px-4 md:px-8 py-6">
            <div className="max-w-[1400px] mx-auto">
              {renderHistoria()}
            </div>
          </div>
        ) : currentView === 'batch' ? (
          <div className="bg-white px-4 md:px-8 py-6">
            <div className="max-w-[1400px] mx-auto">
              {renderBatchImport()}
            </div>
          </div>
        ) : (
          <div className="bg-white px-4 md:px-8 py-6">
            <div className="max-w-[1400px] mx-auto">
              {renderAcervo()}
            </div>
          </div>
        )}
      </div>

      {/* ===== MODAL DE CONFIGURAÇÕES (AJUSTES) ===== */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-white w-full max-w-lg border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black p-4 flex justify-between items-center text-white border-b-4 border-red-600">
              <h2 className="text-lg font-black uppercase tracking-wider flex items-center gap-2"><Icon name="Settings" className="w-5 h-5"/> Definições</h2>
              <button onClick={() => setShowSettings(false)} className="text-white hover:text-red-600"><Icon name="X" className="w-6 h-6"/></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-black text-black uppercase mb-2 flex items-center gap-2"><Icon name="Cloud" className="w-4 h-4 text-blue-600"/> Planilha Apps Script (URL)</label>
                <input type="text" value={gasUrl} onChange={(e) => setGasUrl(e.target.value)} placeholder="https://script.google.com/macros/s/..." className="w-full p-3 border-2 border-black bg-white font-mono text-sm focus:border-blue-600 outline-none rounded-none" />
              </div>

              <div>
                <label className="block text-xs font-black text-black uppercase mb-2 flex items-center gap-2"><Icon name="Sparkles" className="w-4 h-4 text-yellow-500"/> Banco de Pessoas para IA</label>
                <textarea value={knownPeople} onChange={(e) => setKnownPeople(e.target.value)} placeholder="Ex: Zininho, Neide Maria Rosa" className="w-full p-3 border-2 border-black bg-white text-sm focus:border-blue-600 outline-none h-20 resize-none rounded-none" />
                <p className="text-[10px] text-black font-bold uppercase mt-2">Separados por vírgula para reconhecimento.</p>
              </div>

              <button onClick={saveSettings} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 border-2 border-black transition rounded-none">
                Gravar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL DE AVISO / CONFIRMAÇÃO SEGURO ===== */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-white border-4 border-black w-full max-w-sm rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className={`p-4 border-b-4 border-black flex items-center gap-2 ${modal.type === 'alert' ? 'bg-yellow-400 text-black' : 'bg-red-600 text-white'}`}>
              <Icon name="AlertCircle" className="w-6 h-6" />
              <h2 className="text-lg font-black uppercase tracking-wider">{modal.title}</h2>
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-black">{modal.message}</p>
              <div className="mt-6 flex justify-end gap-4">
                {modal.type === 'confirm' && (
                  <button onClick={() => setModal({ ...modal, isOpen: false })} className="px-4 py-2 bg-white text-black border-2 border-black font-black uppercase text-xs hover:bg-yellow-400 transition">
                    Cancelar
                  </button>
                )}
                <button onClick={() => {
                  if (modal.type === 'confirm' && modal.onConfirm) modal.onConfirm();
                  else setModal({ ...modal, isOpen: false });
                }} className="px-4 py-2 bg-blue-600 text-white border-2 border-black font-black uppercase text-xs hover:bg-blue-700 transition">
                  {modal.type === 'confirm' ? 'Confirmar' : 'OK'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL: FICHA ARQUIVÍSTICA (NOBRADE) & VISUALIZAÇÃO DE IMPRESSÃO ===== */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 print:block print:relative print:bg-white print:inset-auto p-4 md:p-8">
          
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-black relative print:w-full print:max-w-none print:max-h-none print:border-none rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
            
            <div className="sticky top-0 bg-white px-6 py-4 border-b-4 border-black flex justify-between items-center print:hidden">
              <h2 className="text-lg font-black uppercase tracking-wider text-black flex items-center gap-2"><Icon name="BookOpen" className="text-red-600"/> Ficha NOBRADE</h2>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white font-black uppercase border-2 border-black hover:bg-blue-700 flex items-center gap-2 rounded-none"><Icon name="Printer" className="w-4 h-4"/> PDF</button>
                <button onClick={() => setViewingRecord(null)} className="p-2 bg-white text-black border-2 border-black hover:bg-red-600 hover:text-white font-bold transition rounded-none"><Icon name="X" className="w-5 h-5"/></button>
              </div>
            </div>

            <div className="p-8 md:p-12 text-sm text-black font-serif print:p-0">
              <div className="text-center mb-8 border-b-4 border-black pb-4">
                <h1 className="text-3xl font-black uppercase tracking-widest text-black">Arquivo Zininho</h1>
                <h2 className="text-xl font-bold mt-2 text-black uppercase">Ficha de Descrição de Documentos</h2>
                <p className="text-xs mt-1 uppercase text-black font-black">NOBRADE / Fiocruz</p>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="font-black text-sm uppercase bg-black text-white px-3 py-2 mb-3 print:bg-white print:text-black print:border-y-2 print:border-black">1. Identificação</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 px-2">
                    <div><strong className="uppercase text-xs mr-2">1.1 Código:</strong> <span className="font-mono font-bold text-red-600">{viewingRecord.id}</span></div>
                    <div><strong className="uppercase text-xs mr-2">1.2 Título:</strong> {viewingRecord.title}</div>
                    <div><strong className="uppercase text-xs mr-2">1.3 Data:</strong> {viewingRecord.date}</div>
                    <div><strong className="uppercase text-xs mr-2">1.4 Nível:</strong> {viewingRecord.level}</div>
                    <div className="md:col-span-2"><strong className="uppercase text-xs mr-2">1.5 Dimensão:</strong> {viewingRecord.extent || '-'}</div>
                  </div>
                </section>

                <section>
                  <h3 className="font-black text-sm uppercase bg-black text-white px-3 py-2 mb-3 print:bg-white print:text-black print:border-y-2 print:border-black">2. Contextualização</h3>
                  <div className="space-y-3 px-2">
                    <div><strong className="uppercase text-xs mr-2">2.1 Produtor:</strong> {viewingRecord.creator || '-'}</div>
                    <div><strong className="uppercase text-xs block mb-1">2.2 História:</strong> <p className="text-justify">{viewingRecord.archivalHistory || '-'}</p></div>
                  </div>
                </section>

                <section>
                  <h3 className="font-black text-sm uppercase bg-black text-white px-3 py-2 mb-3 print:bg-white print:text-black print:border-y-2 print:border-black">3. Conteúdo e Estrutura</h3>
                  <div className="space-y-3 px-2">
                    <div><strong className="uppercase text-xs block mb-1">3.1 Âmbito e conteúdo:</strong> <div className="text-justify whitespace-pre-wrap leading-relaxed border-l-4 border-yellow-400 pl-3">{viewingRecord.scope || '-'}</div></div>
                    <div><strong className="uppercase text-xs mr-2">3.2 Arranjo:</strong> {viewingRecord.arrangement || '-'} (Fundo: {viewingRecord.className} / Série: {viewingRecord.subclassName})</div>
                  </div>
                </section>

                <section>
                  <h3 className="font-black text-sm uppercase bg-black text-white px-3 py-2 mb-3 print:bg-white print:text-black print:border-y-2 print:border-black">4. Condições de Acesso</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 px-2">
                    <div><strong className="uppercase text-xs mr-2">4.1 Acesso:</strong> {viewingRecord.accessConditions || '-'}</div>
                    <div><strong className="uppercase text-xs mr-2">4.2 Reprodução:</strong> {viewingRecord.reproductionConditions || '-'}</div>
                    <div><strong className="uppercase text-xs mr-2">4.3 Idioma:</strong> {viewingRecord.language || '-'}</div>
                    <div><strong className="uppercase text-xs mr-2">4.4 Características:</strong> {viewingRecord.physicalCharacteristics || '-'}</div>
                  </div>
                </section>

                <section>
                  <h3 className="font-black text-sm uppercase bg-black text-white px-3 py-2 mb-3 print:bg-white print:text-black print:border-y-2 print:border-black">5 & 6. Relacionadas e Notas</h3>
                  <div className="space-y-3 px-2">
                    <div><strong className="uppercase text-xs mr-2">5.3 Relacionadas:</strong> {viewingRecord.relatedUnits || '-'}</div>
                    <div><strong className="uppercase text-xs block mb-1">6.1 Notas:</strong> <p>{viewingRecord.notes || '-'}</p></div>
                  </div>
                </section>

                <section>
                  <h3 className="font-black text-sm uppercase bg-black text-white px-3 py-2 mb-3 print:bg-white print:text-black print:border-y-2 print:border-black">7. Controle</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 px-2">
                    <div><strong className="uppercase text-xs mr-2">7.1 Nota Arquivista:</strong> {viewingRecord.archivistNote || '-'}</div>
                    <div><strong className="uppercase text-xs mr-2">7.3 Data Descrição:</strong> {viewingRecord.descriptionDate || '-'}</div>
                  </div>
                </section>

                <div className="mt-8 pt-4 border-t-4 border-black text-xs font-black uppercase flex justify-between px-2">
                  <span>Ficheiro: <strong className="text-blue-600 print:text-black">{viewingRecord.originalName}</strong></span>
                  <span>Normalizado: <strong className="text-red-600 print:text-black">{viewingRecord.newName}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

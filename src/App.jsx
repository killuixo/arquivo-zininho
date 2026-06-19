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
    Sparkles: <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></>,
    UploadCloud: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><polyline points="16 16 12 12 8 16"/></>,
    FolderTree: <><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></>,
    Folder: <><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></>,
    Wand2: <><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></>,
    CheckCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    AlertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    Lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    Unlock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>,
    Download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {title && <title>{title}</title>}
      {icons[name] || icons.AlertCircle}
    </svg>
  );
};

// ==========================================
// UTILITÁRIOS E CONFIGURAÇÕES
// ==========================================
const safeStorage = {
  getItem: (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } },
  setItem: (key, value) => { try { localStorage.setItem(key, value); } catch (e) {} }
};

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

const bioAutoDates = { "BAR": "Até 1948", "CAR": "Até 1948", "GUA": "1948 - 1954", "RDM": "1955 - 1965", "CAB": "1966 - 1974" };
const levelTypes = ["Fundo", "Grupo", "Subgrupo", "Série", "Subsérie", "Dossiê", "Item"];

const getSubclassLabel = (classKey, subclassKey) => {
  const cls = classificationPlan[classKey];
  if (!cls) return '';
  if (cls.subclasses?.[subclassKey]) return cls.subclasses[subclassKey];
  if (cls.groups) {
    for (const group of Object.values(cls.groups)) {
      if (group[subclassKey]) return group[subclassKey];
    }
  }
  return subclassKey;
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function App() {
  // Estados de Dados
  const [rows, setRows] = useState([]);
  const [gasUrl, setGasUrl] = useState('');
  const [knownPeople, setKnownPeople] = useState('Cláudio Alvim Barbosa (Zininho), Neide Maria Rosa');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [syncStatus, setSyncStatus] = useState('idle');
  
  // Estados de Navegação e Segurança
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard | historia | explorar | gestao
  const [gestaoTab, setGestaoTab] = useState('adicionar'); // adicionar | importar | exportar | ajustes
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPassword, setAdminPassword] = useState('admin');
  const [securityPhrase, setSecurityPhrase] = useState('Só é feliz quem souber entender a alegria de viver');
  const [settingsPassword, setSettingsPassword] = useState('admin');
  const [settingsPhrase, setSettingsPhrase] = useState('Só é feliz quem souber entender a alegria de viver');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryPhraseInput, setRecoveryPhraseInput] = useState('');

  // Interface de Utilizador Global
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });
  const [viewingRecord, setViewingRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  // Estados do Formulário (Adicionar Item)
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
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

  // Estados de IA & Importação
  const [analyzingFile, setAnalyzingFile] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const fileInputRef = useRef(null);

  const [batchText, setBatchText] = useState('');
  const [analyzingBatch, setAnalyzingBatch] = useState(false);
  const [batchResults, setBatchResults] = useState([]);
  const [batchError, setBatchError] = useState('');
  const batchFileInputRef = useRef(null);
  const [batchFileName, setBatchFileName] = useState('');
  const [batchFileData, setBatchFileData] = useState('');
  const [batchFileMime, setBatchFileMime] = useState('');

  // Ações Auxiliares
  const showAlert = (title, message) => setModal({ isOpen: true, title, message, type: 'alert' });
  const showConfirm = (title, message, onConfirm) => setModal({ isOpen: true, title, message, type: 'confirm', onConfirm });

  // ==========================================
  // EFEITOS E INICIALIZAÇÃO
  // ==========================================
  useEffect(() => {
    const loadSettings = () => {
      const savedUrl = safeStorage.getItem('zininho_gas_url');
      const savedPeople = safeStorage.getItem('zininho_known_people');
      const savedApiKey = safeStorage.getItem('zininho_gemini_api_key');
      const savedPassword = safeStorage.getItem('zininho_admin_password');
      const savedPhrase = safeStorage.getItem('zininho_security_phrase');
      
      if (savedPeople) setKnownPeople(savedPeople);
      if (savedApiKey) setGeminiApiKey(savedApiKey);
      if (savedPassword) { setAdminPassword(savedPassword); setSettingsPassword(savedPassword); }
      if (savedPhrase) { setSecurityPhrase(savedPhrase); setSettingsPhrase(savedPhrase); }
      if (savedUrl) { setGasUrl(savedUrl); fetchData(savedUrl); } 
      else setFormId('AZ_0001');
    };
    loadSettings();
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

  // ==========================================
  // SEGURANÇA E ACESSOS
  // ==========================================
  const handleAdminLogin = () => {
    if (adminPasswordInput === adminPassword) {
      setIsAdminUnlocked(true); setAdminPasswordInput(''); setIsRecovering(false);
    } else { showAlert('Acesso Negado', 'Senha incorreta!'); }
  };

  const handleRecovery = () => {
    if (recoveryPhraseInput === securityPhrase) {
      setIsAdminUnlocked(true); setRecoveryPhraseInput(''); setIsRecovering(false);
      showAlert('Acesso Concedido', 'Frase de segurança correta. Reconfigure a sua senha na aba Ajustes.');
    } else { showAlert('Acesso Negado', 'Frase de segurança incorreta!'); }
  };

  const handleLogout = () => { setIsAdminUnlocked(false); setCurrentView('dashboard'); };

  const saveSettings = () => {
    safeStorage.setItem('zininho_gas_url', gasUrl);
    safeStorage.setItem('zininho_known_people', knownPeople);
    safeStorage.setItem('zininho_gemini_api_key', geminiApiKey);
    safeStorage.setItem('zininho_admin_password', settingsPassword);
    safeStorage.setItem('zininho_security_phrase', settingsPhrase);
    
    setAdminPassword(settingsPassword);
    setSecurityPhrase(settingsPhrase);
    
    showAlert('Ajustes Gravados', 'As suas definições foram atualizadas com sucesso.');
    if (gasUrl) fetchData(gasUrl);
  };

  const goToExplorar = (filter = null) => {
    setActiveFilter(filter);
    setCurrentView('explorar');
    if (!filter) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // IA: ANÁLISE INDIVIDUAL E LOTE
  // ==========================================
  const callGeminiAPI = async (payload, retries = 4) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${geminiApiKey}`;
    const delays = [1000, 2000, 4000, 8000, 16000];
    
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (response.ok) {
          const result = await response.json();
          return result?.candidates?.[0]?.content?.parts?.[0]?.text;
        }
      } catch (err) {
        if (i === retries) throw err;
        await new Promise(r => setTimeout(r, delays[i]));
      }
    }
    return null;
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setFormOriginalName(file.name); setAnalyzingFile(true); setAiAnalysisResult(''); setActiveTab(2); 
    
    if (file.type.includes('audio')) setFormPhysical('Arquivo Digital (Áudio)');
    else if (file.type.includes('video')) setFormPhysical('Arquivo Digital (Vídeo)');
    else if (file.type.includes('image')) setFormPhysical('Arquivo Digital (Imagem)');
    else setFormPhysical('Arquivo Digital nato');

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        if (!geminiApiKey) { setAiAnalysisResult("Configure a sua chave da API na aba Ajustes."); return; }
        
        const payload = { 
          contents: [{ parts: [ 
            { text: `Analise este arquivo do acervo Zininho (NOBRADE). Pessoas conhecidas: ${knownPeople}. Descreva o conteúdo, transcreva se houver áudio e identifique pessoas.` }, 
            { inlineData: { mimeType: file.type || 'application/octet-stream', data: reader.result.split(',')[1] } } 
          ]}] 
        };
        
        const resultText = await callGeminiAPI(payload);
        if (resultText) {
          setAiAnalysisResult(resultText);
          if (!formScope) setFormScope(resultText);
        } else { setAiAnalysisResult("Não foi possível analisar este ficheiro."); }
      } catch (err) { setAiAnalysisResult("Erro geral ao contactar a IA."); } finally { setAnalyzingFile(false); }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchFileChange = (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setBatchFileName(file.name); setBatchText(''); setBatchError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      setBatchFileData(reader.result.split(',')[1]);
      let mime = file.type;
      if (!mime) {
        const ext = file.name.split('.').pop()?.toLowerCase();
        mime = ext === 'pdf' ? 'application/pdf' : ext === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : ext === 'txt' ? 'text/plain' : 'application/octet-stream';
      }
      setBatchFileMime(mime);
    };
    reader.readAsDataURL(file);
  };

  const handleBatchAnalysis = async () => {
    if (!batchText.trim() && !batchFileData) return;
    setAnalyzingBatch(true); setBatchError(''); setBatchResults([]);

    if (!geminiApiKey) { setBatchError("Configure a sua chave da API na aba Ajustes."); setAnalyzingBatch(false); return; }
    
    const promptText = `Extraia itens individuais deste material do acervo "Zininho". Sugira a classificação com base neste quadro: ${JSON.stringify(classificationPlan, null, 2)}
    DICAS DATAS: BAR/CAR="Até 1948", GUA="1948 - 1954", RDM="1955 - 1965", CAB="1966 - 1974".
    Retorne ESTRITAMENTE um array JSON: [{"titulo": "...", "data": "...", "descricao": "...", "classe": "...", "subclasse": "..."}]
    ${batchText ? `Texto:\n"""\n${batchText}\n"""` : ''}`;

    const parts = [{ text: promptText }];
    if (batchFileData) parts.push({ inlineData: { mimeType: batchFileMime, data: batchFileData } });

    const payload = {
      contents: [{ parts }],
      generationConfig: { responseMimeType: "application/json" }
    };

    try {
      const resultText = await callGeminiAPI(payload);
      if (resultText) {
        const cleanJson = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
        setBatchResults(JSON.parse(cleanJson));
      } else { setBatchError("Nenhum dado retornado pela IA."); }
    } catch (err) { setBatchError("Erro ao processar o ficheiro ou contactar a IA."); }
    finally { setAnalyzingBatch(false); }
  };

  const importBatchItemToForm = (item) => {
    resetForm(rows);
    setFormTitle(item.titulo || ''); setFormDate(item.data || ''); setFormScope(item.descricao || '');
    
    if (item.classe && classificationPlan[item.classe]) {
      setFormClass(item.classe);
      const cls = classificationPlan[item.classe];
      let validSub = false;
      if (cls.subclasses?.[item.subclasse]) validSub = true;
      if (cls.groups) {
         Object.values(cls.groups).forEach(grp => { if (grp[item.subclasse]) validSub = true; });
      }
      if (validSub) setFormSubclass(item.subclasse);
    }
    setGestaoTab('adicionar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // CRUD DE FORMULÁRIO E TABELA
  // ==========================================
  const generateNewFilename = () => {
    if (!formOriginalName || !formSubclass) return '';
    const sanitize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 30) : 'ND';
    let ext = formOriginalName.includes('.') ? formOriginalName.split('.').pop() : '';
    return `${formId}_${formSubclass}_${formDate || 'SD'}_${sanitize(formTitle)}${ext ? `.${ext}` : ''}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formOriginalName || !formClass || !formSubclass) { showAlert("Atenção", "Faltam dados obrigatórios!"); return; }
    
    setSyncStatus('loading');
    const newRow = {
      id: formId, originalName: formOriginalName, className: classificationPlan[formClass].label, subclassName: getSubclassLabel(formClass, formSubclass),
      title: formTitle, date: formDate || 's.d.', level: formLevel, extent: formExtent, creator: formCreator, archivalHistory: formArchivalHistory, scope: formScope,
      arrangement: formArrangement, accessConditions: formAccess, reproductionConditions: formReproduction, language: formLanguage, physicalCharacteristics: formPhysical, relatedUnits: formRelated,
      notes: formNotes, archivistNote: formArchivistNote, descriptionDate: formDescDate, newName: generateNewFilename()
    };

    const updatedRows = isEditing ? rows.map(r => r.id === formId ? newRow : r) : [...rows, newRow];
    setRows(updatedRows);

    if (gasUrl) {
      try {
        await fetch(gasUrl, { method: 'POST', body: JSON.stringify({ action: 'save', row: newRow }), headers: { 'Content-Type': 'text/plain' } });
        setSyncStatus('success'); showAlert("Sucesso", "O registo foi sincronizado.");
      } catch (err) { setSyncStatus('error'); showAlert("Aviso", "Erro a sincronizar. Guardado localmente na sessão."); }
    } else { setSyncStatus('idle'); showAlert("Modo Local", "Registo guardado localmente. Configure a Planilha em Ajustes."); }
    resetForm(updatedRows);
  };

  const resetForm = (currentRows) => {
    setIsEditing(false); setActiveTab(1); setFormId(getNextId(currentRows));
    setFormOriginalName(''); setFormTitle(''); setFormExtent(''); setFormArchivalHistory('');
    setFormScope(''); setFormArrangement(''); setFormPhysical(''); setFormRelated(''); setFormNotes('');
    setFormArchivistNote(''); setAiAnalysisResult(''); setFormClass(''); setFormSubclass(''); setFormDate('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const editRow = (row) => {
    setIsEditing(true); setViewingRecord(null); setActiveTab(1);
    setFormId(row.id); setFormOriginalName(row.originalName); setFormTitle(row.title);
    setFormDate(row.date === 's.d.' ? '' : row.date); setFormLevel(row.level || 'Item'); setFormExtent(row.extent || ''); 
    setFormCreator(row.creator || 'Cláudio Alvim Barbosa (Zininho)'); setFormArchivalHistory(row.archivalHistory || ''); setFormScope(row.scope || '');
    setFormArrangement(row.arrangement || ''); setFormAccess(row.accessConditions || 'Sem restrição');
    setFormReproduction(row.reproductionConditions || 'Permitida com citação da fonte'); setFormLanguage(row.language || 'Português do Brasil'); setFormPhysical(row.physicalCharacteristics || '');
    setFormRelated(row.relatedUnits || ''); setFormNotes(row.notes || ''); setFormArchivistNote(row.archivistNote || ''); setFormDescDate(row.descriptionDate || new Date().toLocaleDateString('pt-BR'));
    
    const classEntry = Object.entries(classificationPlan).find(([, data]) => data.label === row.className);
    if (classEntry) {
      setFormClass(classEntry[0]);
      let foundSubclassKey = '';
      if (classEntry[1].subclasses) {
        const subEntry = Object.entries(classEntry[1].subclasses).find(([, label]) => label === row.subclassName);
        if (subEntry) foundSubclassKey = subEntry[0];
      }
      if (!foundSubclassKey && classEntry[1].groups) {
        Object.values(classEntry[1].groups).forEach(group => {
          const subEntry = Object.entries(group).find(([, label]) => label === row.subclassName);
          if (subEntry) foundSubclassKey = subEntry[0];
        });
      }
      if (foundSubclassKey) setFormSubclass(foundSubclassKey);
    }
    setCurrentView('gestao'); setGestaoTab('adicionar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteRow = (id) => {
    showConfirm("Apagar Registo", `Deseja apagar o registo ${id}?`, async () => {
      setRows(rows.filter(r => r.id !== id)); setModal({ ...modal, isOpen: false });
      if (gasUrl) {
        setSyncStatus('loading');
        try { await fetch(gasUrl, { method: 'POST', body: JSON.stringify({ action: 'delete', id }), headers: { 'Content-Type': 'text/plain' } }); setSyncStatus('success'); }
        catch (err) { setSyncStatus('error'); showAlert("Aviso", "Erro ao apagar na Planilha."); }
      }
    });
  };

  const exportToCSV = (type) => {
    if (rows.length === 0) {
      showAlert("Aviso", "Não existem registos para exportar.");
      return;
    }

    let csvContent = "";
    let filename = "";

    const escapeCSV = (val) => `"${(val || '').toString().replace(/"/g, '""')}"`;

    if (type === 'archivematica') {
      filename = "metadata.csv";
      // Formato Archivematica: filename (obrigatório) + Dublin Core
      csvContent += "filename,dc.title,dc.date,dc.creator,dc.description,dc.language,nobrade.identifier,nobrade.class\n";
      rows.forEach(r => {
        const row = [
          r.newName || r.originalName || 'sem_ficheiro',
          r.title,
          r.date,
          r.creator,
          r.scope,
          r.language,
          r.id,
          `${r.className} > ${r.subclassName}`
        ].map(escapeCSV).join(',');
        csvContent += row + "\n";
      });
    } else if (type === 'tainacan') {
      filename = "tainacan_export.csv";
      // Formato Tainacan: special_document (para o ficheiro) + Dublin Core mapeado
      csvContent += "special_document,title,date,creator,description,language,fundo,serie,identificador\n";
      rows.forEach(r => {
        const row = [
          r.newName || r.originalName || '',
          r.title,
          r.date,
          r.creator,
          r.scope,
          r.language,
          r.className,
          r.subclassName,
          r.id
        ].map(escapeCSV).join(',');
        csvContent += row + "\n";
      });
    }

    // \uFEFF forçar codificação UTF-8 (útil para abrir perfeitamente no Excel com acentos)
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert("Exportação Concluída", `O ficheiro ${filename} foi descarregado com sucesso.`);
  };

  // ==========================================
  // RENDERIZAÇÃO DE COMPONENTES DE UI
  // ==========================================

  // Filtros aplicados em Tabelas
  const uniqueCategories = Array.from(new Set([ ...rows.map(r => r.className), ...rows.map(r => r.subclassName) ])).filter(Boolean);
  const filteredRows = rows.filter(r => {
    const matchCategory = activeFilter ? (r.className === activeFilter || r.subclassName === activeFilter) : true;
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = searchQuery ? ( r.title.toLowerCase().includes(searchLower) || r.scope.toLowerCase().includes(searchLower) || r.creator.toLowerCase().includes(searchLower) ) : true;
    return matchCategory && matchSearch;
  });

  const getFileIcon = (filename) => {
    const l = filename.toLowerCase();
    if (l.match(/\.(mp3|wav|flac|ogg)$/)) return <Icon name="FileAudio" className="w-8 h-8 text-blue-600" />;
    if (l.match(/\.(mp4|avi|mov|mkv)$/)) return <Icon name="FileVideo" className="w-8 h-8 text-red-600" />;
    if (l.match(/\.(jpg|jpeg|png|gif)$/)) return <Icon name="FileImage" className="w-8 h-8 text-yellow-400" />;
    return <Icon name="FileText" className="w-8 h-8 text-black" />;
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white border-2 border-black p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative rounded-none">
        <div className="hidden md:block absolute top-0 left-0 w-3 h-full bg-red-600 border-r-2 border-black"></div>
        <div className="hidden md:block absolute top-0 right-0 w-32 h-3 bg-yellow-400 border-b-2 border-l-2 border-black"></div>
        <div className="relative z-10 md:ml-6">
          <h2 className="text-4xl font-black text-black mb-3 uppercase tracking-tighter">Zininho</h2>
          <p className="text-black max-w-3xl text-sm leading-relaxed font-medium text-justify">Cláudio Alvim Barbosa (1929-1998), conhecido como Zininho, foi radialista, músico e o compositor do hino de Florianópolis. Para além do seu legado artístico, atuou como um guardião informal da memória local. Ao navegar pelo quadro de arranjo abaixo, encontrará o seu acervo: documentos da sua vida pessoal e a sua vasta produção profissional, que inclui registos fotográficos, partituras, jingles, e gravações de rádio que preservam a história cultural catarinense.</p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="text-center p-4 bg-white border-2 border-black min-w-[120px]">
            <p className="text-4xl font-black text-blue-600">{rows.length}</p>
            <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">Registos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(classificationPlan).map(([classKey, classData]) => (
          <div key={classKey} className="bg-white border-2 border-black flex flex-col rounded-none">
            <div className="bg-black p-4 border-b-2 border-black flex justify-between items-center cursor-pointer hover:bg-gray-900" onClick={() => goToExplorar(classData.label)}>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wide"><Icon name="FolderTree" className="w-5 h-5 text-yellow-400"/> {classData.label}</h3>
              <span className="px-3 py-1 bg-white text-black text-xs font-bold border-2 border-black">{rows.filter(r => r.className === classData.label).length} itens</span>
            </div>
            <div className="p-4 flex-1 bg-white">
              <ul className="space-y-3">
                {classData.subclasses && Object.entries(classData.subclasses).map(([subKey, subLabel]) => (
                  <li key={subKey}>
                    <button onClick={() => goToExplorar(subLabel)} className="w-full text-left p-3 bg-white hover:bg-yellow-400 border-2 border-black transition-colors flex justify-between items-center group rounded-none">
                      <span className="text-sm font-bold text-black flex items-center gap-2"><Icon name="Folder" className="w-4 h-4 text-blue-600 group-hover:text-black"/> {subLabel}</span>
                      <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 border-black ${rows.filter(r => r.subclassName === subLabel).length > 0 ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>
                        {rows.filter(r => r.subclassName === subLabel).length || 'Vazio'}
                      </span>
                    </button>
                  </li>
                ))}
                {classData.groups && Object.entries(classData.groups).map(([groupLabel, groupSubs]) => (
                  <li key={groupLabel} className="space-y-2 mt-4 first:mt-0">
                    <div className="text-xs font-black uppercase text-black bg-gray-100 p-2 border-2 border-black border-dashed">{groupLabel}</div>
                    <ul className="space-y-2 pl-3 border-l-4 border-blue-600">
                      {Object.entries(groupSubs).map(([subKey, subLabel]) => (
                        <li key={subKey}>
                          <button onClick={() => goToExplorar(subLabel)} className="w-full text-left p-2.5 bg-white hover:bg-blue-600 text-black hover:text-white border-2 border-black transition-colors flex justify-between items-center group rounded-none">
                            <span className="text-sm font-bold flex items-center gap-2"><Icon name="Folder" className="w-3.5 h-3.5"/> {subLabel}</span>
                            <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 ${rows.filter(r => r.subclassName === subLabel).length > 0 ? 'bg-white text-blue-600 border-transparent' : 'bg-transparent text-white border-white'}`}>
                              {rows.filter(r => r.subclassName === subLabel).length || 'Vazio'}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTableSection = (isPublic = true) => (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white p-5 border-2 border-black rounded-none">
        <div className="relative mb-4">
          <Icon name="Search" className="w-5 h-5 text-black absolute left-3 top-3" />
          <input type="text" placeholder="Pesquisar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 p-3 bg-white border-2 border-black text-sm focus:border-blue-600 outline-none transition rounded-none font-bold" />
        </div>
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2 pb-1">
          <button onClick={() => setActiveFilter(null)} className={`px-3 py-1.5 text-[10px] uppercase font-black border-2 transition-colors rounded-none ${!activeFilter ? 'bg-black text-white border-black' : 'bg-white text-black border-black hover:bg-yellow-400'}`}>Todos</button>
          {uniqueCategories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-3 py-1.5 text-[10px] uppercase font-black border-2 transition-colors rounded-none ${activeFilter === cat ? 'bg-blue-600 text-white border-black' : 'bg-white text-black border-black hover:bg-yellow-400'}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-black flex flex-col flex-1 overflow-hidden rounded-none">
        <div className="bg-black text-white px-5 py-4 border-b-2 border-black flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            {isPublic ? 'Acervo Público' : 'Inventário Restrito'} <span className="px-2 py-0.5 bg-white text-black text-xs border-2 border-black">{filteredRows.length} / {rows.length}</span>
          </h2>
          {!isPublic && <button onClick={() => gasUrl && fetchData(gasUrl)} className="p-1.5 bg-white text-black border-2 border-black hover:bg-yellow-400 rounded-none"><Icon name="RefreshCw" className="w-4 h-4" /></button>}
        </div>
        <div className="flex-1 overflow-x-auto min-h-[400px] max-h-[700px] bg-white">
          {filteredRows.length === 0 ? (
            <div className="h-full flex items-center justify-center p-8 text-black font-bold uppercase">Sem resultados.</div>
          ) : (
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-white text-black sticky top-0 z-10 border-b-2 border-black">
                <tr>
                  <th className={`p-3 border-r-2 border-black text-center font-black uppercase ${isPublic ? 'w-16' : 'w-28'}`}>Ações</th>
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
                      <button onClick={() => setViewingRecord(r)} className="px-2 py-1.5 bg-white border-2 border-black hover:bg-blue-600 hover:text-white rounded-none font-bold" title="Ver"><Icon name="FileText" className="w-3.5 h-3.5"/></button>
                      {!isPublic && (
                        <>
                          <button onClick={() => editRow(r)} className="px-2 py-1.5 bg-white border-2 border-black hover:bg-yellow-400 rounded-none" title="Editar"><Icon name="Edit" className="w-3.5 h-3.5" /></button>
                          <button onClick={() => deleteRow(r.id)} className="px-2 py-1.5 bg-white border-2 border-black hover:bg-red-600 hover:text-white rounded-none" title="Apagar"><Icon name="Trash2" className="w-3.5 h-3.5" /></button>
                        </>
                      )}
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
  );

  const renderBatchImport = () => (
    <div className="bg-white border-2 border-black p-6 rounded-none max-w-4xl mx-auto">
      <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2 border-b-2 border-black pb-4">
        <Icon name="Wand2" className="w-6 h-6 text-blue-600"/> Importação em Lote (IA)
      </h2>
      <div className="space-y-6">
         <div className="bg-yellow-50 p-4 border-2 border-yellow-400">
            <p className="text-sm font-bold text-black">Cole um texto ou envie um arquivo (PDF, TXT, Imagem) contendo descrições de múltiplos itens. A IA tentará extrair e categorizar cada um automaticamente seguindo o quadro de arranjo NOBRADE.</p>
         </div>
         <div>
           <label className="block text-xs font-black text-black uppercase mb-2">Texto Base</label>
           <textarea value={batchText} onChange={e => setBatchText(e.target.value)} className="w-full h-32 p-3 border-2 border-black bg-white focus:border-blue-600 outline-none resize-none" placeholder="Cole o texto ou listagem aqui..."></textarea>
         </div>
         <div className="flex items-center gap-4">
           <div className="flex-1">
             <label className="block text-xs font-black text-black uppercase mb-2">Ou selecione um ficheiro local (Texto / Imagem)</label>
             <input type="file" ref={batchFileInputRef} onChange={handleBatchFileChange} className="block w-full text-sm border-2 border-black p-2 bg-white" />
           </div>
         </div>
         {batchFileName && <p className="text-xs font-bold mt-2 text-blue-600">Ficheiro selecionado: {batchFileName}</p>}
         {batchError && <div className="text-sm font-bold text-red-600 p-3 bg-red-100 border-2 border-red-600">{batchError}</div>}
         
         <button onClick={handleBatchAnalysis} disabled={analyzingBatch || (!batchText && !batchFileData)} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black py-4 uppercase border-2 border-black transition tracking-widest flex justify-center items-center gap-2">
           {analyzingBatch ? <><Icon name="Loader2" className="w-5 h-5 animate-spin"/> A analisar estrutura do documento...</> : 'Analisar Documento com IA'}
         </button>

         {batchResults.length > 0 && (
           <div className="mt-8 space-y-4">
             <h3 className="text-lg font-black uppercase border-b-2 border-black pb-2">Resultados Encontrados ({batchResults.length})</h3>
             {batchResults.map((item, idx) => (
               <div key={idx} className="p-4 border-2 border-black bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-white transition-colors">
                 <div>
                   <p className="font-black text-sm uppercase text-black">{item.titulo}</p>
                   <p className="text-xs text-black font-bold mb-1">Data: {item.data}</p>
                   <p className="text-xs text-gray-700 truncate max-w-md" title={item.descricao}>{item.descricao}</p>
                   <p className="text-[10px] font-black text-red-600 uppercase mt-2 bg-red-100 inline-block px-2 border border-red-600">{item.classe} &gt; {item.subclasse}</p>
                 </div>
                 <button onClick={() => importBatchItemToForm(item)} className="shrink-0 px-4 py-3 bg-yellow-400 text-black border-2 border-black font-black hover:bg-yellow-500 uppercase text-xs flex items-center gap-2">
                   <Icon name="FilePlus" className="w-4 h-4"/> Importar p/ Ficha
                 </button>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );

  const renderGestao = () => {
    if (!isAdminUnlocked) {
      if (isRecovering) {
        return (
          <div className="max-w-md mx-auto mt-12 bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Icon name="Lock" className="w-16 h-16 text-black mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase mb-2">Recuperar Acesso</h2>
            <p className="text-sm font-medium mb-6">Insira a sua frase de segurança para desbloquear a gestão.</p>
            <input type="text" value={recoveryPhraseInput} onChange={(e) => setRecoveryPhraseInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRecovery()} placeholder="Frase de segurança..." className="w-full p-4 border-2 border-black bg-gray-50 text-center font-bold focus:border-blue-600 focus:bg-white outline-none mb-4 rounded-none text-sm" />
            <button onClick={handleRecovery} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 border-2 border-black transition rounded-none mb-4">Validar</button>
            <button onClick={() => { setIsRecovering(false); setRecoveryPhraseInput(''); }} className="text-xs font-bold text-gray-500 hover:text-black uppercase underline">Voltar</button>
          </div>
        );
      }
      return (
        <div className="max-w-md mx-auto mt-12 bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Icon name="Lock" className="w-16 h-16 text-black mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase mb-2">Área Restrita</h2>
          <p className="text-sm font-medium mb-8">Insira a senha de administrador.</p>
          <input type="password" value={adminPasswordInput} onChange={(e) => setAdminPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} placeholder="Senha" className="w-full p-4 border-2 border-black bg-gray-50 text-center font-bold focus:border-blue-600 focus:bg-white outline-none mb-4 rounded-none text-lg tracking-widest" />
          <button onClick={handleAdminLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 border-2 border-black transition rounded-none mb-4">Desbloquear</button>
          <button onClick={() => setIsRecovering(true)} className="text-xs font-bold text-gray-500 hover:text-black uppercase underline">Esqueci a senha</button>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row bg-white border-2 border-black rounded-none">
          <button onClick={() => setGestaoTab('adicionar')} className={`flex-1 p-4 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 border-b-2 sm:border-b-0 sm:border-r-2 border-black ${gestaoTab === 'adicionar' ? 'bg-black text-white' : 'hover:bg-yellow-400 text-black'}`}><Icon name="FilePlus" className="w-4 h-4"/> Adicionar Item</button>
          <button onClick={() => setGestaoTab('importar')} className={`flex-1 p-4 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 border-b-2 sm:border-b-0 sm:border-r-2 border-black ${gestaoTab === 'importar' ? 'bg-black text-white' : 'hover:bg-blue-600 hover:text-white text-black'}`}><Icon name="Wand2" className="w-4 h-4"/> Importar (IA)</button>
          <button onClick={() => setGestaoTab('exportar')} className={`flex-1 p-4 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 border-b-2 sm:border-b-0 sm:border-r-2 border-black ${gestaoTab === 'exportar' ? 'bg-black text-white' : 'hover:bg-green-600 hover:text-white text-black'}`}><Icon name="Download" className="w-4 h-4"/> Exportar</button>
          <button onClick={() => setGestaoTab('ajustes')} className={`flex-1 p-4 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 ${gestaoTab === 'ajustes' ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}><Icon name="Settings" className="w-4 h-4"/> Ajustes</button>
        </div>

        {gestaoTab === 'importar' && renderBatchImport()}
        
        {gestaoTab === 'exportar' && (
          <div className="max-w-4xl mx-auto bg-white border-2 border-black p-8 rounded-none">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2 border-b-2 border-black pb-4"><Icon name="Download" className="w-6 h-6 text-green-600"/> Exportação e Interoperabilidade</h2>
            
            <div className="space-y-6 text-sm text-black font-medium text-justify">
              <p>Os dados do Arquivo Zininho estão estruturados com base na norma NOBRADE. Para garantir a interoperabilidade com outras plataformas, utilize as opções abaixo para gerar ficheiros CSV (Comma-Separated Values) automaticamente mapeados com o padrão Dublin Core (DC).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Card Tainacan */}
                <div className="border-2 border-black bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black uppercase mb-3 text-blue-600 border-b-2 border-black pb-2">Tainacan (Difusão)</h3>
                    <p className="mb-4">Exporte um CSV formatado para integração no Tainacan (WordPress). Ideal para publicação e exibição em repositórios abertos ao público.</p>
                    <ul className="list-disc pl-5 mb-6 text-xs space-y-1">
                      <li>Usa <code className="bg-white px-1 border border-black font-mono">special_document</code> para mapear os ficheiros.</li>
                      <li>Colunas mapeadas para <em>Dublin Core</em> (title, creator, description, etc).</li>
                    </ul>
                  </div>
                  <button onClick={() => exportToCSV('tainacan')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 uppercase border-2 border-black transition tracking-widest flex justify-center items-center gap-2">
                    <Icon name="Download" className="w-5 h-5"/> Exportar Tainacan
                  </button>
                </div>

                {/* Card Archivematica */}
                <div className="border-2 border-black bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black uppercase mb-3 text-red-600 border-b-2 border-black pb-2">Archivematica (Preservação)</h3>
                    <p className="mb-4">Gera o ficheiro <code className="bg-white px-1 border border-black font-mono">metadata.csv</code> exigido pelo Archivematica para empacotamento digital a longo prazo (geração de pacotes SIP/AIP).</p>
                    <ul className="list-disc pl-5 mb-6 text-xs space-y-1">
                      <li>Coluna obrigatória <code className="bg-white px-1 border border-black font-mono">filename</code> incluída no início.</li>
                      <li>Colunas com o prefixo <code className="bg-white px-1 border border-black font-mono">dc.</code> para compatibilidade nativa com o METS.</li>
                    </ul>
                  </div>
                  <button onClick={() => exportToCSV('archivematica')} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 uppercase border-2 border-black transition tracking-widest flex justify-center items-center gap-2">
                    <Icon name="Download" className="w-5 h-5"/> Exportar Archivematica
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {gestaoTab === 'ajustes' && (
          <div className="max-w-2xl bg-white border-2 border-black p-8 rounded-none mx-auto">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2 border-b-2 border-black pb-4"><Icon name="Settings" className="w-6 h-6"/> Configurações de Sistema</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 border-2 border-yellow-400 mb-6">
                <h3 className="text-sm font-black text-black uppercase mb-2">Credenciais (Local)</h3>
                <div className="space-y-4">
                  <div><label className="block text-xs font-black uppercase mb-1">Nova Senha de Admin</label><input type="text" value={settingsPassword} onChange={(e) => setSettingsPassword(e.target.value)} className="w-full p-3 border-2 border-black bg-white text-sm outline-none" /></div>
                  <div><label className="block text-xs font-black uppercase mb-1">Frase de Segurança</label><input type="text" value={settingsPhrase} onChange={(e) => setSettingsPhrase(e.target.value)} className="w-full p-3 border-2 border-black bg-white text-sm outline-none" /></div>
                </div>
              </div>
              <div><label className="block text-xs font-black uppercase mb-2 flex items-center gap-2"><Icon name="Cloud" className="w-4 h-4 text-blue-600"/> Planilha Apps Script (URL)</label><input type="text" value={gasUrl} onChange={(e) => setGasUrl(e.target.value)} className="w-full p-3 border-2 border-black bg-gray-50 text-sm outline-none" /></div>
              <div><label className="block text-xs font-black uppercase mb-2 flex items-center gap-2"><Icon name="Wand2" className="w-4 h-4 text-red-600"/> Chave da API (Gemini)</label><input type="password" value={geminiApiKey} onChange={(e) => setGeminiApiKey(e.target.value)} className="w-full p-3 border-2 border-black bg-gray-50 text-sm outline-none" /></div>
              <div><label className="block text-xs font-black uppercase mb-2 flex items-center gap-2"><Icon name="Sparkles" className="w-4 h-4 text-yellow-500"/> Banco de Pessoas para IA</label><textarea value={knownPeople} onChange={(e) => setKnownPeople(e.target.value)} className="w-full p-3 border-2 border-black bg-gray-50 text-sm outline-none h-20 resize-none" /></div>
              <button onClick={saveSettings} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 border-2 border-black transition">Gravar Alterações</button>
            </div>
          </div>
        )}

        {gestaoTab === 'adicionar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              {/* Módulo 1: Upload */}
              <div className="bg-white border-2 border-black rounded-none">
                <div className="bg-black p-4 border-b-2 border-black flex items-center justify-between text-white"><h2 className="text-sm font-black uppercase flex items-center gap-2"><span className="bg-yellow-400 text-black px-1">1</span> Ficheiro Digital</h2></div>
                <div className="p-6 text-center border-b-2 border-black border-dashed bg-white">
                  {!formOriginalName ? (
                    <div className="py-6 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center"><Icon name="UploadCloud" className="w-8 h-8 text-black" /></div>
                      <div><p className="text-sm font-black uppercase">Associar Ficheiro</p></div>
                      <button onClick={() => fileInputRef.current?.click()} type="button" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold border-2 border-black uppercase">Selecionar</button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-2">
                      <div className="p-3 bg-white border-2 border-black">{getFileIcon(formOriginalName)}</div>
                      <p className="text-sm font-black max-w-[250px] truncate">{formOriginalName}</p>
                      {analyzingFile ? <div className="flex items-center gap-2 text-xs font-bold bg-yellow-400 px-3 py-1.5 border-2 border-black uppercase"><Icon name="Loader2" className="w-4 h-4 animate-spin" /> A Analisar...</div> : 
                        <div className="flex gap-2">
                          <button onClick={() => fileInputRef.current?.click()} type="button" className="text-xs text-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 border-2 border-transparent hover:border-black font-bold uppercase transition">Trocar</button>
                          {isEditing && <span className="text-xs font-bold px-2 py-1 bg-yellow-400 border-2 border-black uppercase">Edição ({formId})</span>}
                        </div>
                      }
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                </div>
                {aiAnalysisResult && (
                  <div className="p-4 bg-white border-t-2 border-black">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase bg-yellow-400 px-2 border-2 border-black">Análise IA</span>
                      <button onClick={() => {setFormScope(aiAnalysisResult); setActiveTab(2);}} type="button" className="text-[10px] bg-white border-2 border-black px-2 py-1 font-bold flex items-center gap-1 hover:bg-blue-600 hover:text-white uppercase"><Icon name="Copy" className="w-3 h-3"/> Copiar</button>
                    </div>
                    <p className="text-xs leading-relaxed max-h-32 overflow-y-auto pr-2 border-l-4 border-blue-600 pl-2">{aiAnalysisResult}</p>
                  </div>
                )}
              </div>

              {/* Módulo 2: Formulário */}
              <div className={`bg-white border-2 ${isEditing ? 'border-yellow-400' : 'border-black'} transition-colors rounded-none ${!formOriginalName && !isEditing ? 'opacity-80 border-dashed' : ''}`}>
                <div className={`p-4 border-b-2 border-black flex justify-between items-center ${isEditing ? 'bg-yellow-400' : 'bg-black text-white'}`}>
                  <h2 className="text-sm font-black uppercase flex items-center gap-2"><span className={`${isEditing ? 'bg-black text-yellow-400' : 'bg-red-600 text-white'} px-1`}>2</span> Descrição</h2>
                  {isEditing && <button onClick={() => resetForm(rows)} type="button" className="text-[10px] px-2 py-1 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black uppercase">Cancelar</button>}
                </div>
                <div className="flex border-b-2 border-black text-xs font-black bg-white">
                  {[{id:1, lbl:'Identif.'}, {id:2, lbl:'Contexto'}, {id:3, lbl:'Físico'}, {id:4, lbl:'Notas'}].map(t => (
                    <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} className={`flex-1 py-3 border-r-2 border-black last:border-r-0 uppercase ${activeTab === t.id ? 'bg-blue-600 text-white border-b-0' : 'hover:bg-yellow-400'}`}>{t.lbl}</button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="p-5 bg-white">
                  <div className={activeTab === 1 ? 'space-y-4' : 'hidden'}>
                    <div className="flex gap-3">
                      <div className="w-1/3"><label className="block text-[10px] font-black uppercase mb-1">Cód.</label><input type="text" value={formId} readOnly className="w-full p-2 border-2 border-black bg-gray-100 font-mono text-sm outline-none" /></div>
                      <div className="w-2/3"><label className="block text-[10px] font-black uppercase mb-1">Título *</label><input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full p-2 border-2 border-black bg-white text-sm font-bold outline-none" required /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-3 bg-white border-2 border-black border-dashed">
                      <div><label className="block text-[10px] font-black uppercase mb-1">Fundo *</label><select value={formClass} onChange={(e) => {setFormClass(e.target.value); setFormSubclass('');}} className="w-full p-2 border-2 border-black text-xs bg-white outline-none" required><option value="">Selecione...</option>{Object.entries(classificationPlan).map(([k, d]) => <option key={k} value={k}>{d.label}</option>)}</select></div>
                      <div>
                        <label className="block text-[10px] font-black uppercase mb-1">Série *</label>
                        <select value={formSubclass} onChange={(e) => { const val = e.target.value; setFormSubclass(val); if (bioAutoDates[val] && (!formDate || formDate === 's.d.')) setFormDate(bioAutoDates[val]); }} className="w-full p-2 border-2 border-black text-xs bg-white outline-none" required>
                          <option value="">Selecione...</option>
                          {formClass && classificationPlan[formClass]?.subclasses && Object.entries(classificationPlan[formClass].subclasses).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                          {formClass && classificationPlan[formClass]?.groups && Object.entries(classificationPlan[formClass].groups).map(([groupLabel, groupSubs]) => (<optgroup label={groupLabel} key={groupLabel}>{Object.entries(groupSubs).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</optgroup>))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div><label className="block text-[10px] font-black uppercase mb-1">Datas</label><input type="text" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                      <div><label className="block text-[10px] font-black uppercase mb-1">Nível</label><select value={formLevel} onChange={(e) => setFormLevel(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none">{levelTypes.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                      <div><label className="block text-[10px] font-black uppercase mb-1">Dimensão</label><input type="text" value={formExtent} onChange={(e) => setFormExtent(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                    </div>
                  </div>
                  <div className={activeTab === 2 ? 'space-y-4' : 'hidden'}>
                    <div className="bg-white p-3 border-2 border-black"><label className="block text-[10px] font-black uppercase mb-1">Âmbito e Conteúdo *</label><textarea value={formScope} onChange={(e) => setFormScope(e.target.value)} className="w-full p-2 border-2 border-black text-sm h-32 resize-none outline-none" required /></div>
                    <div><label className="block text-[10px] font-black uppercase mb-1">Produtor</label><input type="text" value={formCreator} onChange={(e) => setFormCreator(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                    <div><label className="block text-[10px] font-black uppercase mb-1">História Arquiv.</label><input type="text" value={formArchivalHistory} onChange={(e) => setFormArchivalHistory(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                    <div><label className="block text-[10px] font-black uppercase mb-1">Sistema Arranjo</label><input type="text" value={formArrangement} onChange={(e) => setFormArrangement(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                  </div>
                  <div className={activeTab === 3 ? 'space-y-4' : 'hidden'}>
                    <div><label className="block text-[10px] font-black uppercase mb-1">Físico/Conservação</label><input type="text" value={formPhysical} onChange={(e) => setFormPhysical(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[10px] font-black uppercase mb-1">Acesso</label><input type="text" value={formAccess} onChange={(e) => setFormAccess(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                      <div><label className="block text-[10px] font-black uppercase mb-1">Reprodução</label><input type="text" value={formReproduction} onChange={(e) => setFormReproduction(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                    </div>
                    <div><label className="block text-[10px] font-black uppercase mb-1">Idioma</label><input type="text" value={formLanguage} onChange={(e) => setFormLanguage(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                  </div>
                  <div className={activeTab === 4 ? 'space-y-4' : 'hidden'}>
                    <div><label className="block text-[10px] font-black uppercase mb-1">Unid. Relacionadas</label><input type="text" value={formRelated} onChange={(e) => setFormRelated(e.target.value)} className="w-full p-2 border-2 border-black text-sm outline-none" /></div>
                    <div><label className="block text-[10px] font-black uppercase mb-1">Notas Gerais</label><textarea value={formNotes} onChange={(e) => setFormNotes(e.target.value)} className="w-full p-2 border-2 border-black text-sm h-12 resize-none outline-none" /></div>
                    <div className="grid grid-cols-2 gap-3 p-3 border-2 border-black border-dashed mt-4">
                      <div><label className="block text-[10px] font-black uppercase">Nota Arquivista</label><input type="text" value={formArchivistNote} onChange={(e) => setFormArchivistNote(e.target.value)} className="w-full border-b-2 border-black text-xs outline-none" /></div>
                      <div><label className="block text-[10px] font-black uppercase">Data Descrição</label><input type="text" value={formDescDate} onChange={(e) => setFormDescDate(e.target.value)} className="w-full border-b-2 border-black text-xs outline-none" /></div>
                    </div>
                  </div>
                  <button type="submit" className={`w-full font-black py-3 px-4 border-2 border-black mt-6 uppercase tracking-widest flex items-center justify-center gap-2 transition ${isEditing ? 'bg-yellow-400 text-black' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                    {isEditing ? <><Icon name="Save" className="w-5 h-5"/> Atualizar</> : <><Icon name="FilePlus" className="w-5 h-5"/> Gravar</>}
                  </button>
                </form>
              </div>
            </div>
            {/* Tabela do Inventário (Restrito) */}
            <div className="lg:col-span-7">{renderTableSection(false)}</div>
          </div>
        )}
      </div>
    );
  };

  const renderHistoria = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white border-2 border-black p-6 md:p-12 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="hidden md:block absolute top-0 left-0 w-3 h-full bg-blue-600 border-r-2 border-black"></div>
        <div className="md:ml-8 relative z-10">
           <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter inline-block">A História de Zininho<div className="h-2 w-full bg-yellow-400 mt-2 border-2 border-black"></div></h2>
           <div className="max-w-4xl text-sm md:text-base leading-relaxed space-y-4 font-serif text-justify border-l-4 border-black pl-6 md:pl-8 mb-12">
              <p>Cláudio Alvim Barbosa, conhecido como Zininho, nasceu em 8 de maio de 1929, em Três Riachos, município de Biguaçu, Santa Catarina.</p>
              <p>Antes de ingressar no rádio, Zininho desempenhou diversos trabalhos, foi proprietário da barbearia Salão Dó-ré-mi, e operou o carro de som Tabajara, um serviço de alto-falantes, atividades que possuem registros em fotografias e outros documentos em seu acervo.</p>
              <p>Como um marco em sua carreira, e na vida florianopolitana, em 1965, Zininho venceu o concurso Uma Canção Para Florianópolis, promovido pela Prefeitura Municipal. Sua marcha-canção, Rancho do Amor à Ilha, foi posteriormente oficializada como hino da capital catarinense em 1968.</p>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HEADER GERAL */}
      <div className="bg-white pt-4 md:pt-8 px-4 md:px-8 print:hidden">
        <div className="max-w-[1400px] mx-auto">
          <header className="bg-white p-5 border-4 border-black flex flex-col xl:flex-row justify-between items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-2 bg-red-600"></div>
            <div className="absolute top-0 right-0 w-8 h-full bg-yellow-400 border-l-4 border-black"></div>

            <div className="flex items-center gap-4 relative z-10 shrink-0">
              <div className="bg-blue-600 p-2 border-2 border-black"><Icon name="BookOpen" className="w-6 h-6 text-white" /></div>
              <div><h1 className="text-2xl font-black tracking-tighter uppercase">Arquivo Zininho</h1><p className="text-[10px] uppercase tracking-widest font-bold">Gestão e Descrição Arquivística (NOBRADE)</p></div>
            </div>
            
            <div className="flex flex-wrap justify-center border-2 border-black w-full xl:w-auto relative z-10 overflow-hidden">
              <button onClick={() => setCurrentView('dashboard')} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase border-b-2 xl:border-b-0 xl:border-r-2 border-black ${currentView === 'dashboard' ? 'bg-black text-white' : 'hover:bg-yellow-400'}`}>Início</button>
              <button onClick={() => setCurrentView('historia')} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase border-b-2 xl:border-b-0 xl:border-r-2 border-black ${currentView === 'historia' ? 'bg-black text-white' : 'hover:bg-yellow-400'}`}>Biografia</button>
              <button onClick={() => goToExplorar()} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase border-b-2 xl:border-b-0 xl:border-r-2 border-black ${currentView === 'explorar' ? 'bg-black text-white' : 'hover:bg-yellow-400'}`}><Icon name="Search" className="w-4 h-4 hidden sm:block" /> Explorar Acervo</button>
              <button onClick={() => setCurrentView('gestao')} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase ${currentView === 'gestao' ? 'bg-red-600 text-white border-black' : 'bg-black text-white hover:bg-gray-800'}`}>{isAdminUnlocked ? <Icon name="Unlock" className="w-4 h-4"/> : <Icon name="Lock" className="w-4 h-4"/>} Gestão do Arquivo</button>
            </div>

            <div className="flex items-center gap-4 relative z-10 xl:mr-10">
              <div className="flex items-center gap-2 text-[10px] uppercase font-black px-3 py-2 border-2 border-black">
                {syncStatus === 'loading' && <><Icon name="RefreshCw" className="w-4 h-4 animate-spin" /> A Sincronizar</>}
                {syncStatus === 'success' && <><Icon name="Cloud" className="w-4 h-4 text-blue-600" /> Ativo</>}
                {syncStatus === 'error' && <><Icon name="AlertCircle" className="w-4 h-4 text-red-600" /> Erro</>}
                {syncStatus === 'idle' && <><Icon name="Cloud" className="w-4 h-4 text-gray-400" /> Local</>}
              </div>
              {isAdminUnlocked && <button onClick={handleLogout} className="p-2 border-2 border-black hover:bg-red-600 hover:text-white transition text-xs font-black uppercase" title="Sair da Área de Gestão">Sair</button>}
            </div>
          </header>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO */}
      <div className="pb-8">
        <div className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'historia' && renderHistoria()}
          {currentView === 'explorar' && renderExplorar()}
          {currentView === 'gestao' && renderGestao()}
        </div>
      </div>

      {/* MODAL PADRÃO */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 print:hidden">
          <div className="bg-white border-4 border-black w-full max-w-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className={`p-4 border-b-4 border-black flex items-center gap-2 ${modal.type === 'alert' ? 'bg-yellow-400' : 'bg-red-600 text-white'}`}><Icon name="AlertCircle" className="w-6 h-6" /><h2 className="text-lg font-black uppercase">{modal.title}</h2></div>
            <div className="p-6">
              <p className="text-sm font-bold">{modal.message}</p>
              <div className="mt-6 flex justify-end gap-4">
                {modal.type === 'confirm' && <button onClick={() => setModal({ ...modal, isOpen: false })} className="px-4 py-2 border-2 border-black font-black uppercase text-xs hover:bg-yellow-400 transition">Cancelar</button>}
                <button onClick={() => { if (modal.type === 'confirm' && modal.onConfirm) modal.onConfirm(); else setModal({ ...modal, isOpen: false }); }} className="px-4 py-2 bg-blue-600 text-white border-2 border-black font-black uppercase text-xs hover:bg-blue-700 transition">{modal.type === 'confirm' ? 'Confirmar' : 'OK'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE FICHA NOBRADE COMPLETA */}
      {viewingRecord && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 print:block print:relative print:bg-white print:inset-auto p-4 md:p-8">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-black relative print:w-full print:max-w-none print:max-h-none print:border-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
            <div className="sticky top-0 bg-white px-6 py-4 border-b-4 border-black flex justify-between items-center print:hidden">
              <h2 className="text-lg font-black uppercase tracking-wider flex items-center gap-2"><Icon name="BookOpen" className="text-red-600"/> Ficha NOBRADE</h2>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white font-black uppercase border-2 border-black hover:bg-blue-700 flex items-center gap-2"><Icon name="Printer" className="w-4 h-4"/> PDF</button>
                <button onClick={() => setViewingRecord(null)} className="p-2 bg-white border-2 border-black hover:bg-red-600 hover:text-white font-bold transition"><Icon name="X" className="w-5 h-5"/></button>
              </div>
            </div>
            <div className="p-8 md:p-12 text-sm font-serif print:p-0">
              <div className="text-center mb-8 border-b-4 border-black pb-4">
                <h1 className="text-3xl font-black uppercase tracking-widest">Arquivo Zininho</h1>
                <h2 className="text-xl font-bold mt-2 uppercase">Ficha de Descrição de Documentos</h2>
                <p className="text-xs mt-1 uppercase font-black">NOBRADE / Fiocruz</p>
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

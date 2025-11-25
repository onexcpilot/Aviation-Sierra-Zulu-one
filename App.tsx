
import React, { useState, useEffect, useRef } from 'react';
import { User, Question, Category, ExamResult, AppView, AnswerRecord, Language } from './types';
import { MOCK_DATABASE, UI_TEXT } from './constants';
import { explainAnswerWithAI, generateNewQuestionAI } from './services/geminiService';
import { exportResultToPDF } from './services/pdfService';
import { hashPassword } from './services/security';
import { 
    CheckCircle, 
    XCircle, 
    AlertTriangle, 
    Settings, 
    BrainCircuit,
    ChevronRight,
    ChevronLeft,
    LogOut,
    Download,
    UploadCloud,
    Lock,
    ListTodo,
    History,
    Coffee,
    Globe,
    Image as ImageIcon
} from 'lucide-react';

// --- Utility Functions ---

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const prepareExamQuestionsWithShuffledOptions = (selectedQuestions: Question[]): Question[] => {
    return selectedQuestions.map(q => {
        // Identify the correct answer text before shuffling
        const correctAnswerText = q.options[q.correctAnswerIndex];
        
        // Shuffle options
        const shuffledOptions = shuffleArray(q.options);
        
        // Find new index of the correct answer
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
        
        return {
            ...q,
            options: shuffledOptions,
            correctAnswerIndex: newCorrectIndex
        };
    });
};

const generateExamQuestions = (allQuestions: Question[]): Question[] => {
    // Logic: 2 from each of 9 categories = 18. + 2 random wildcards = 20.
    const categories = Object.values(Category);
    let selectedIds = new Set<string>();
    let examQuestions: Question[] = [];

    // 1. Pick 2 from each category
    categories.forEach(cat => {
        const catQuestions = allQuestions.filter(q => q.category === cat);
        // Shuffle category questions
        const shuffled = shuffleArray(catQuestions);
        const selected = shuffled.slice(0, 2);
        selected.forEach(q => {
            examQuestions.push(q);
            selectedIds.add(q.id);
        });
    });

    // 2. Pick remaining pool
    const remainingPool = allQuestions.filter(q => !selectedIds.has(q.id));
    const shuffledPool = shuffleArray(remainingPool);
    
    // 3. Add 2 wildcards (or fill up to 20 if logic missed something due to lack of qs)
    const needed = 20 - examQuestions.length;
    if (needed > 0) {
        examQuestions.push(...shuffledPool.slice(0, needed));
    }

    // Shuffle final exam order
    const finalSelection = shuffleArray(examQuestions);
    
    // Shuffle options for each question so "A" isn't always correct
    return prepareExamQuestionsWithShuffledOptions(finalSelection);
};

// --- Components ---

const GliderLogo = ({ className = "w-32 h-32", customSrc }: { className?: string, customSrc?: string | null }) => {
    if (customSrc) {
        return <img src={customSrc} alt="Logo" className={`${className} object-contain rounded-full`} />;
    }

    return (
        <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <path id="curveTop" d="M 28,100 A 72,72 0 0 1 172,100" />
                <path id="curveBottom" d="M 28,100 A 72,72 0 0 0 172,100" />
            </defs>
            <circle cx="100" cy="100" r="95" fill="white" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="#7f1d1d" strokeWidth="3" strokeDasharray="10 40" strokeOpacity="0.3" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#991b1b" strokeWidth="8" />
            <circle cx="100" cy="100" r="71" fill="#1e3a8a" />
            <g transform="translate(100,100) scale(0.65) rotate(-5)">
                <path d="M -90,10 Q 0,30 90,-10 L 95,-5 Q 0,45 -90,20 Z" fill="white" />
                <path d="M -60,-5 C -20,-5 20,-5 70,0 L 72,5 C 20,10 -20,5 -60,5 Z" fill="white" />
                <path d="M -55,0 L -65,-30 L -40,-32 L -45,0 Z" fill="white" />
            </g>
            <text fontSize="22" fontWeight="800" fill="#7f1d1d" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="1">
                <textPath href="#curveTop" startOffset="50%" textAnchor="middle">AVIATION</textPath>
            </text>
            <text fontSize="22" fontWeight="800" fill="#7f1d1d" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="1">
                <textPath href="#curveBottom" startOffset="50%" textAnchor="middle">SIERRA ZULU</textPath>
            </text>
        </svg>
    );
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = "button" }: any) => {
    const baseStyle = "px-6 py-4 md:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 touch-manipulation";
    const variants = {
        primary: "bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-600/20 border-b-4 border-sky-800 active:border-b-0 active:translate-y-1",
        secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1",
        danger: "bg-red-500 hover:bg-red-600 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1",
        outline: "border-2 border-slate-300 hover:border-sky-500 text-slate-600 hover:text-sky-600"
    };
    return (
        <button 
            type={type}
            onClick={onClick} 
            disabled={disabled}
            className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${disabled ? 'opacity-50 cursor-not-allowed active:scale-100 active:translate-y-0 active:border-b-4' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

const Input = ({ label, value, onChange, type = "text", required = false, placeholder = "" }: any) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-slate-200 mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors placeholder-slate-500"
        />
    </div>
);

const AdminInput = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
        />
    </div>
);

// --- Main App ---

export default function App() {
    const [view, setView] = useState<AppView>('WELCOME');
    const [language, setLanguage] = useState<Language>('PL');
    const [user, setUser] = useState<User>({ firstName: '', lastName: '', email: '' });
    
    // Settings
    const [customLogo, setCustomLogo] = useState<string | null>(null);
    const [adminPasswordHash, setAdminPasswordHash] = useState<string | null>(null);
    const [newAdminPass, setNewAdminPass] = useState("");

    // Database State
    const [questionBank, setQuestionBank] = useState<Question[]>(MOCK_DATABASE);
    
    // Exam State
    const [currentExamQuestions, setCurrentExamQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userSelections, setUserSelections] = useState<{[questionId: string]: number}>({});
    const [examResult, setExamResult] = useState<ExamResult | null>(null);
    const [showFinishConfirm, setShowFinishConfirm] = useState(false);

    // Admin & History State
    const [allResults, setAllResults] = useState<ExamResult[]>([]);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);
    const [aiExplanation, setAiExplanation] = useState<string>("");
    const [explainingId, setExplainingId] = useState<string | null>(null);

    // Initialize Auth (Hash password)
    useEffect(() => {
        const initAuth = async () => {
            const storedHash = localStorage.getItem('asz_admin_hash');
            const legacyPass = localStorage.getItem('asz_admin_password');

            if (storedHash) {
                setAdminPasswordHash(storedHash);
            } else if (legacyPass) {
                // Migrate legacy plain text to hash
                const hash = await hashPassword(legacyPass);
                localStorage.setItem('asz_admin_hash', hash);
                localStorage.removeItem('asz_admin_password');
                setAdminPasswordHash(hash);
            } else {
                // Default 'Admin1'
                const hash = await hashPassword('Admin1');
                setAdminPasswordHash(hash);
            }
        };

        const storedLogo = localStorage.getItem('asz_logo');
        if (storedLogo) setCustomLogo(storedLogo);
        
        const storedResults = localStorage.getItem('asz_results');
        if (storedResults) setAllResults(JSON.parse(storedResults));

        // Load custom questions
        const storedQs = localStorage.getItem('asz_questions');
        if (storedQs) {
            const parsedQs = JSON.parse(storedQs);
            setQuestionBank([...MOCK_DATABASE, ...parsedQs]);
        }

        initAuth();
    }, []);

    const t = UI_TEXT[language];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (user.firstName.toLowerCase() === 'admin') {
            const inputHash = await hashPassword(user.lastName);
            
            // 1. Check against current stored password
            if (inputHash === adminPasswordHash) {
                setView('ADMIN');
                return;
            } 
            
            // 2. Recovery: Check against "Admin1" specifically to allow reset/initial access
            // This ensures if local storage has old "Admin" hash, "Admin1" still works.
            const recoveryHash = await hashPassword('Admin1');
            if (inputHash === recoveryHash) {
                setAdminPasswordHash(recoveryHash);
                localStorage.setItem('asz_admin_hash', recoveryHash);
                setView('ADMIN');
                return;
            }

            alert("Incorrect Admin Password");
            return;
        }

        if (user.firstName && user.lastName && user.email) {
            startExam();
        }
    };

    const startExam = () => {
        const questions = generateExamQuestions(questionBank);
        setCurrentExamQuestions(questions);
        setCurrentQuestionIndex(0);
        setUserSelections({});
        setExamResult(null);
        setView('EXAM');
        setShowFinishConfirm(false);
    };

    const handleAnswerSelect = (optionIndex: number) => {
        const currentQ = currentExamQuestions[currentQuestionIndex];
        setUserSelections(prev => ({
            ...prev,
            [currentQ.id]: optionIndex
        }));
    };

    const calculateResult = () => {
        let score = 0;
        const answers: AnswerRecord[] = [];

        currentExamQuestions.forEach(q => {
            const selected = userSelections[q.id] ?? -1;
            const isCorrect = selected === q.correctAnswerIndex;
            if (isCorrect) score++;
            answers.push({
                questionId: q.id,
                selectedOptionIndex: selected,
                isCorrect
            });
        });

        const passed = (score / currentExamQuestions.length) >= 0.75; // 75% pass rate

        const result: ExamResult = {
            id: Date.now().toString(),
            user,
            date: new Date().toISOString(),
            score,
            passed,
            answers,
            totalQuestions: currentExamQuestions.length
        };

        setExamResult(result);
        
        const newResults = [result, ...allResults];
        setAllResults(newResults);
        localStorage.setItem('asz_results', JSON.stringify(newResults));
        
        setView('RESULT');
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setCustomLogo(base64);
                localStorage.setItem('asz_logo', base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const changeAdminPassword = async () => {
        if (!newAdminPass) return;
        const hash = await hashPassword(newAdminPass);
        setAdminPasswordHash(hash);
        localStorage.setItem('asz_admin_hash', hash);
        setNewAdminPass("");
        alert("Password updated!");
    };

    const handleExplainAI = async (qId: string) => {
        const q = questionBank.find(qu => qu.id === qId);
        const ans = examResult?.answers.find(a => a.questionId === qId);
        
        if (!q || !ans) return;

        setExplainingId(qId);
        setAiExplanation("AI analizuje odpowiedź...");
        
        const explanation = await explainAnswerWithAI(
            q.text,
            q.options[q.correctAnswerIndex],
            ans.selectedOptionIndex === -1 ? "Brak odpowiedzi" : q.options[ans.selectedOptionIndex]
        );
        
        setAiExplanation(explanation);
        setExplainingId(null);
    };

    const handleGenerateAIQuestion = async () => {
        setAiGenerating(true);
        // Random category
        const cats = Object.values(Category);
        const randomCat = cats[Math.floor(Math.random() * cats.length)];
        
        const newQ = await generateNewQuestionAI(randomCat);
        if (newQ) {
            const updatedBank = [...questionBank, newQ];
            setQuestionBank(updatedBank);
            // Save only the new generic questions to local storage to persist them
            // In a real app, this would go to a backend
            const currentCustom = JSON.parse(localStorage.getItem('asz_questions') || '[]');
            localStorage.setItem('asz_questions', JSON.stringify([...currentCustom, newQ]));
            alert(`Dodano nowe pytanie AI z kategorii: ${randomCat}`);
        } else {
            alert("Nie udało się wygenerować pytania.");
        }
        setAiGenerating(false);
    };

    // --- Views ---

    if (view === 'WELCOME') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col items-center mb-8 relative z-10">
                        <GliderLogo className="w-28 h-28 mb-4 drop-shadow-lg" customSrc={customLogo} />
                        <h1 className="text-3xl font-bold text-white text-center mb-2">{t.appTitle}</h1>
                        <p className="text-slate-400 text-sm text-center">v2.1 • Powered by Gemini AI</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                        <Input 
                            label={t.loginLabel}
                            value={user.firstName} 
                            onChange={(e: any) => setUser({...user, firstName: e.target.value})}
                            required
                        />
                        <Input 
                            label={t.passLabel}
                            value={user.lastName} 
                            onChange={(e: any) => setUser({...user, lastName: e.target.value})}
                            required
                            type="password"
                        />
                        <Input 
                            label={t.emailLabel}
                            value={user.email} 
                            onChange={(e: any) => setUser({...user, email: e.target.value})}
                            required
                            type="email"
                        />
                        
                        <div className="pt-2 gap-3 flex flex-col">
                            <Button type="submit" className="w-full text-lg shadow-sky-900/20">
                                {t.startBtn} <ChevronRight size={20} />
                            </Button>
                            
                            <Button variant="secondary" onClick={() => setShowHistoryModal(true)} className="w-full">
                                <History size={18} /> {t.historyBtn}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={() => setLanguage(l => l === 'PL' ? 'EN' : 'PL')} className="text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-1 text-xs">
                            <Globe size={14} /> {language}
                        </button>
                        <a href="https://buycoffee.to/sierrazulu" target="_blank" className="text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 text-xs">
                            <Coffee size={14} /> {t.coffeeBtn}
                        </a>
                    </div>
                </div>

                {/* History Modal */}
                {showHistoryModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">{t.myHistoryTitle}</h2>
                                <button onClick={() => setShowHistoryModal(false)}><XCircle className="text-slate-400 hover:text-slate-600" /></button>
                            </div>
                            
                            {/* Filter input */}
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder={t.enterEmailHint}
                                    className="w-full p-3 border rounded-lg bg-slate-50"
                                    onChange={(e) => {
                                        // Simple client side filter implementation if needed
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                {allResults.filter(r => r.user.email === user.email || user.email === '').slice(0, 10).map(r => (
                                    <div key={r.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div>
                                            <div className="font-bold text-slate-700">{new Date(r.date).toLocaleDateString()}</div>
                                            <div className="text-sm text-slate-500">{r.user.firstName} {r.user.lastName}</div>
                                        </div>
                                        <div className={`px-4 py-2 rounded-lg font-bold ${r.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {r.score}/{r.totalQuestions}
                                        </div>
                                    </div>
                                ))}
                                {allResults.length === 0 && <p className="text-center text-slate-500 py-8">{t.noResults}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (view === 'EXAM') {
        const question = currentExamQuestions[currentQuestionIndex];
        const isLast = currentQuestionIndex === currentExamQuestions.length - 1;
        const progress = ((Object.keys(userSelections).length) / currentExamQuestions.length) * 100;

        return (
            <div className="min-h-screen bg-slate-100 flex flex-col">
                {/* Header */}
                <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <GliderLogo className="w-8 h-8" customSrc={customLogo} />
                        <span className="font-bold text-slate-700 hidden md:block">{t.examTitle}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-slate-600">
                            {currentQuestionIndex + 1} / {currentExamQuestions.length}
                        </div>
                        <Button variant="danger" className="!py-1 !px-3 !text-sm" onClick={() => setShowFinishConfirm(true)}>
                            {t.finishBtn}
                        </Button>
                    </div>
                </div>

                {/* Progress Line */}
                <div className="h-1 bg-slate-200 w-full">
                    <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4 pb-24">
                    <div className="max-w-2xl mx-auto space-y-6">
                        {/* Category Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
                            {question.category}
                        </div>

                        {/* Question Text */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug mb-4">
                                {question.text}
                            </h2>
                            
                            <div className="space-y-3">
                                {question.options.map((opt, idx) => {
                                    const isSelected = userSelections[question.id] === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswerSelect(idx)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative group
                                                ${isSelected 
                                                    ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-md shadow-sky-500/10' 
                                                    : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                                    ${isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <span className="text-lg">{opt}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 safe-area-bottom">
                    <div className="max-w-2xl mx-auto flex justify-between gap-4">
                        <Button 
                            variant="secondary" 
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestionIndex === 0}
                            className="flex-1"
                        >
                            <ChevronLeft size={20} /> {t.prevBtn}
                        </Button>

                        {isLast ? (
                            <Button 
                                variant="primary"
                                onClick={() => setShowFinishConfirm(true)}
                                className="flex-[2] bg-emerald-600 hover:bg-emerald-700 border-emerald-800 shadow-emerald-600/20"
                            >
                                {t.finishBtn} <CheckCircle size={20} />
                            </Button>
                        ) : (
                            <Button 
                                variant="primary"
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(currentExamQuestions.length - 1, prev + 1))}
                                className="flex-[2]"
                            >
                                {t.nextBtn} <ChevronRight size={20} />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Confirm Modal */}
                {showFinishConfirm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl scale-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.modalTitle}</h3>
                            <p className="text-slate-600 mb-6">
                                {t.modalBody1} <strong className="text-sky-600">{Object.keys(userSelections).length}</strong> / {currentExamQuestions.length} {t.modalBody2}
                                <br/><br/>
                                {t.modalBody3}
                            </p>
                            <div className="flex gap-3">
                                <Button variant="secondary" onClick={() => setShowFinishConfirm(false)} className="flex-1">
                                    {t.modalCancel}
                                </Button>
                                <Button variant="primary" onClick={calculateResult} className="flex-1">
                                    {t.modalConfirm}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (view === 'RESULT' && examResult) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                {/* Compacted Header */}
                <div className={`p-6 pb-12 text-center text-white relative overflow-hidden transition-colors ${examResult.passed ? 'bg-emerald-600' : 'bg-red-600'}`}>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-block p-2 rounded-full bg-white/20 backdrop-blur-md mb-2 shadow-sm">
                            {examResult.passed ? <CheckCircle size={28} /> : <AlertTriangle size={28} />}
                        </div>
                        <h1 className="text-2xl font-bold mb-1">{examResult.passed ? t.passTitle : t.failTitle}</h1>
                        <p className="opacity-90 text-sm font-medium">{t.yourScore}: {examResult.score} / {examResult.totalQuestions}</p>
                    </div>
                    {/* Simplified decorations */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-3xl mx-auto w-full -mt-6 px-4 pb-12 flex-1 relative z-20">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm md:text-base">
                                <ListTodo size={18} className="text-sky-500" /> {t.analysisTitle}
                            </h2>
                            <button 
                                onClick={() => exportResultToPDF(examResult, questionBank, customLogo, language)}
                                className="text-sky-600 hover:text-sky-700 text-xs md:text-sm font-medium flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100"
                            >
                                <Download size={14} /> PDF
                            </button>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {examResult.answers.map((ans, idx) => {
                                const question = questionBank.find(q => q.id === ans.questionId);
                                if (!question) return null;
                                
                                if (ans.isCorrect) return null; // Only show errors

                                return (
                                    <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-3 mb-2">
                                            <span className="font-mono text-xs text-slate-400 mt-1">#{idx + 1}</span>
                                            <div className="font-medium text-slate-800 text-sm md:text-base">{question.text}</div>
                                        </div>

                                        <div className="ml-7 space-y-2 text-sm">
                                            <div className="flex items-start gap-2 text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                                                <XCircle size={14} className="mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="font-bold block text-[10px] uppercase opacity-70 mb-0.5">{t.yourAns}</span>
                                                    {ans.selectedOptionIndex === -1 ? "Brak odpowiedzi" : question.options[ans.selectedOptionIndex]}
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                                                <CheckCircle size={14} className="mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="font-bold block text-[10px] uppercase opacity-70 mb-0.5">{t.correctAns}</span>
                                                    {question.options[question.correctAnswerIndex]}
                                                </div>
                                            </div>

                                            {/* AI Explanation Area */}
                                            <div className="mt-3">
                                                {explainingId === question.id ? (
                                                    <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 p-3 rounded-xl text-xs md:text-sm leading-relaxed relative">
                                                        <div className="flex items-center gap-2 font-bold mb-1 text-indigo-600">
                                                            <BrainCircuit size={14} /> {t.aiInstructor}
                                                        </div>
                                                        {aiExplanation}
                                                        <div className="absolute top-0 right-0 -mt-1 -mr-1 w-2 h-2 bg-indigo-400 rounded-full animate-ping" hidden={aiExplanation !== "AI analizuje odpowiedź..."}></div>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleExplainAI(question.id)}
                                                        className="text-xs font-bold text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition-colors px-2 py-1 hover:bg-indigo-50 rounded"
                                                    >
                                                        <BrainCircuit size={14} /> {t.askAi}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {examResult.score === examResult.totalQuestions && (
                                <div className="p-8 text-center text-emerald-600 font-medium bg-emerald-50/50">
                                    <CheckCircle size={48} className="mx-auto mb-2 opacity-50" />
                                    {t.noErrors}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button onClick={() => setView('WELCOME')} className="w-full">
                        {t.exitBtn}
                    </Button>
                </div>
            </div>
        );
    }

    if (view === 'ADMIN') {
        return (
            <div className="min-h-screen bg-slate-100 p-4 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                            <Settings className="text-slate-400" /> {t.adminPanel}
                        </h1>
                        <Button variant="outline" onClick={() => setView('WELCOME')} className="!px-4 !py-2">
                            <LogOut size={16} /> {t.logout}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Stats Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-500 mb-4 uppercase tracking-wider text-xs">{t.statsTests}</h3>
                            <div className="text-4xl font-bold text-slate-800 mb-2">{allResults.length}</div>
                            <div className="text-sm text-slate-400">
                                {t.statsAvg}: {allResults.length > 0 ? Math.round((allResults.filter(r => r.passed).length / allResults.length) * 100) : 0}%
                            </div>
                        </div>

                        {/* Database Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl"></div>
                            <h3 className="font-bold text-slate-500 mb-4 uppercase tracking-wider text-xs">{t.statsDb}</h3>
                            <div className="text-4xl font-bold text-slate-800 mb-4">{questionBank.length}</div>
                            <Button onClick={handleGenerateAIQuestion} disabled={aiGenerating} className="w-full !py-2 !text-sm">
                                {aiGenerating ? t.generate : t.addAiQuestion} <BrainCircuit size={16} />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Settings Column */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <ImageIcon size={18} /> {t.appearance}
                                </h3>
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-slate-600">{t.changeLogo}</label>
                                    <div className="flex items-center gap-4">
                                        <GliderLogo className="w-16 h-16 bg-slate-50 rounded-lg p-1 border" customSrc={customLogo} />
                                        <label className="flex-1 cursor-pointer">
                                            <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleLogoUpload} />
                                            <div className="px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 text-sm text-center hover:border-sky-500 hover:text-sky-500 transition-colors">
                                                {t.selectFile}
                                            </div>
                                        </label>
                                    </div>
                                    {customLogo && (
                                        <button onClick={() => { setCustomLogo(null); localStorage.removeItem('asz_logo'); }} className="text-xs text-red-500 hover:underline">
                                            {t.remove}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Lock size={18} /> {t.security}
                                </h3>
                                <AdminInput 
                                    label={t.changePass} 
                                    value={newAdminPass} 
                                    onChange={(e: any) => setNewAdminPass(e.target.value)} 
                                    placeholder="New Password" 
                                    type="password"
                                />
                                <Button onClick={changeAdminPassword} disabled={!newAdminPass} className="w-full !py-2">
                                    {t.save}
                                </Button>
                            </div>
                        </div>

                        {/* History Column */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col max-h-[600px]">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <History size={18} /> {t.historyTitle}
                                </h3>
                            </div>
                            <div className="overflow-y-auto flex-1 p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 sticky top-0">
                                        <tr>
                                            <th className="p-4">{t.colDate}</th>
                                            <th className="p-4">{t.colCandidate}</th>
                                            <th className="p-4 hidden sm:table-cell">{t.colScore}</th>
                                            <th className="p-4 text-right">{t.colActions}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {allResults.map(r => (
                                            <tr key={r.id} className="hover:bg-slate-50">
                                                <td className="p-4 text-slate-600">{new Date(r.date).toLocaleDateString()}</td>
                                                <td className="p-4 font-medium text-slate-800">
                                                    {r.user.firstName} {r.user.lastName}
                                                    <div className="text-xs text-slate-400 font-normal">{r.user.email}</div>
                                                </td>
                                                <td className="p-4 hidden sm:table-cell">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${r.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {r.score}/{r.totalQuestions}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button onClick={() => exportResultToPDF(r, questionBank, customLogo, language)} className="text-sky-600 hover:text-sky-800">
                                                        <Download size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

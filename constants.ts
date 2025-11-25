import { Category, Question, Language } from './types';

export const UI_TEXT = {
  PL: {
    // Welcome
    appTitle: "System Egzaminacyjny Licencji SPL",
    loginLabel: "Imię (Login)",
    passLabel: "Nazwisko (Hasło)",
    emailLabel: "Email",
    adminHint: "Wpisz 'Admin' dla panelu operatora",
    startBtn: "Rozpocznij Egzamin",
    historyBtn: "Moja Historia",
    coffeeBtn: "Postaw mi kawę (2€)",
    adminLoginInfo: "Wpisz swoje Imię i Nazwisko oraz Email, aby zacząć test",
    
    // Exam
    examTitle: "Egzamin Teoretyczny SPL (ULC)",
    question: "Pytanie",
    filled: "Wypełniono",
    nextBtn: "Dalej",
    prevBtn: "Poprzednie",
    finishBtn: "Zakończ Egzamin",
    mapLabel: "Mapa pytań:",
    
    // Modal
    modalTitle: "Zakończyć egzamin?",
    modalBody1: "Odpowiedziałeś na",
    modalBody2: "pytań.",
    modalBody3: "Czy na pewno chcesz zatwierdzić wynik? Po zatwierdzeniu nie będzie możliwości zmiany odpowiedzi.",
    modalCancel: "Wróć do testu",
    modalConfirm: "Tak, zatwierdź",

    // Result
    passTitle: "Egzamin Zdany!",
    failTitle: "Egzamin Niezdany",
    yourScore: "Twój wynik",
    analysisTitle: "Analiza Błędów",
    downloadPdf: "Pobierz Raport PDF",
    noErrors: "Gratulacje! Brak błędów. Jesteś gotowy do egzaminu państwowego.",
    yourAns: "Twoja odpowiedź:",
    correctAns: "Poprawna odpowiedź:",
    askAi: "Zapytaj AI dlaczego",
    aiInstructor: "Instruktor AI:",
    exitBtn: "Wróć do ekranu głównego",

    // Admin
    adminPanel: "Panel Operatora ASZ",
    logout: "Wyloguj",
    appearance: "Wygląd",
    changeLogo: "Zmień Logo (JPG)",
    selectFile: "Wybierz plik",
    remove: "Usuń",
    security: "Zabezpieczenia",
    changePass: "Zmień Hasło Admina",
    save: "Zapisz",
    statsTests: "Przeprowadzone Testy",
    statsAvg: "Średnia Zdawalność",
    statsDb: "Baza Pytań",
    generate: "Generowanie...",
    addAiQuestion: "+1 AI Pytanie",
    historyTitle: "Historia Egzaminów",
    colDate: "Data",
    colCandidate: "Kandydat",
    colEmail: "Email",
    colScore: "Wynik",
    colStatus: "Status",
    colActions: "Akcje",
    noResults: "Brak wyników do wyświetlenia.",
    
    // History Modal
    myHistoryTitle: "Moja Historia (Ostatnie 6 miesięcy)",
    enterEmailHint: "Wpisz email, aby zobaczyć historię.",
    close: "Zamknij"
  },
  EN: {
    // Welcome
    appTitle: "SPL License Exam System",
    loginLabel: "First Name (Login)",
    passLabel: "Last Name (Password)",
    emailLabel: "Email",
    adminHint: "Type 'Admin' for operator panel",
    startBtn: "Start Exam",
    historyBtn: "My History",
    coffeeBtn: "Send me coffee (2€)",
    adminLoginInfo: "Enter your First Name, Last Name and Email to start the test",
    
    // Exam
    examTitle: "SPL Exam (ULC/EASA)",
    question: "Question",
    filled: "Filled",
    nextBtn: "Next",
    prevBtn: "Previous",
    finishBtn: "Finish",
    mapLabel: "Question Map:",
    
    // Modal
    modalTitle: "Finish Exam?",
    modalBody1: "You answered",
    modalBody2: "questions.",
    modalBody3: "Are you sure you want to submit? You cannot change answers after submission.",
    modalCancel: "Return to test",
    modalConfirm: "Yes, submit",

    // Result
    passTitle: "Exam Passed!",
    failTitle: "Exam Failed",
    yourScore: "Your Score",
    analysisTitle: "Error Analysis",
    downloadPdf: "Download PDF Report",
    noErrors: "Congratulations! No errors.",
    yourAns: "Your answer:",
    correctAns: "Correct answer:",
    askAi: "Ask AI why",
    aiInstructor: "AI Instructor:",
    exitBtn: "Exit",

    // Admin
    adminPanel: "ASZ Operator Panel",
    logout: "Logout",
    appearance: "Appearance",
    changeLogo: "Change Logo (JPG)",
    selectFile: "Select File",
    remove: "Remove",
    security: "Security",
    changePass: "Change Admin Password",
    save: "Save",
    statsTests: "Tests Conducted",
    statsAvg: "Average Pass Rate",
    statsDb: "Question Bank",
    generate: "Generating...",
    addAiQuestion: "+1 AI Question",
    historyTitle: "Exam History",
    colDate: "Date",
    colCandidate: "Candidate",
    colEmail: "Email",
    colScore: "Score",
    colStatus: "Status",
    colActions: "Actions",
    noResults: "No results to display.",
    
    // History Modal
    myHistoryTitle: "My History (Last 6 Months)",
    enterEmailHint: "Enter email to see history.",
    close: "Close"
  }
};

// Baza pytań wzorowana na standardzie EASA/ULC dla licencji SPL
export const MOCK_DATABASE: Question[] = [
    // --- 1. AIR LAW (Prawo Lotnicze) ---
    {
        id: "law-001",
        category: Category.AIR_LAW,
        text: "Granica przestrzeni powietrznej niekontrolowanej (klasa G) w Polsce zazwyczaj kończy się na:",
        options: ["FL 95 (Poziom Lotu 95)", "FL 195", "3000 ft AMSL", "FL 660"],
        correctAnswerIndex: 0
    },
    {
        id: "law-002",
        category: Category.AIR_LAW,
        text: "Szybowiec i samolot silnikowy zbliżają się do lądowania na tym samym lotnisku. Pierwszeństwo ma:",
        options: ["Szybowiec (jako statek lżejszy od powietrza/bez napędu)", "Samolot silnikowy", "Statek powietrzny z prawej strony", "Statek powietrzny będący wyżej"],
        correctAnswerIndex: 0
    },
    {
        id: "law-003",
        category: Category.AIR_LAW,
        text: "Sygnał świetlny 'Seria czerwonych błysków' wystrzelona z ziemi do statku w locie oznacza:",
        options: ["Lotnisko niebezpieczne, nie ląduj", "Ląduj natychmiast", "Wróć na lotnisko", "Mimo wcześniejszych instrukcji nie ląduj na razie"],
        correctAnswerIndex: 0
    },
    {
        id: "law-004",
        category: Category.AIR_LAW,
        text: "Dwa szybowce lecą naprzeciw siebie (kursy zbieżne). Jak powinni zareagować piloci?",
        options: ["Obaj skręcają w prawo", "Obaj skręcają w lewo", "Szybowiec będący wyżej ustępuje", "Szybowiec z wiatrem ustępuje"],
        correctAnswerIndex: 0
    },
    {
        id: "law-005",
        category: Category.AIR_LAW,
        text: "Wyprzedzanie innego statku powietrznego w powietrzu należy wykonywać:",
        options: ["Z prawej strony (z wyjątkiem żagla, gdzie wyprzedza się po stronie wolnej od stoku)", "Z lewej strony", "Dołem", "Górą"],
        correctAnswerIndex: 0
    },
    {
        id: "law-006",
        category: Category.AIR_LAW,
        text: "Znak rejestracyjny polskiego cywilnego statku powietrznego składa się z liter:",
        options: ["SP-", "PL-", "PO-", "SN-"],
        correctAnswerIndex: 0
    },
    {
        id: "law-007",
        category: Category.AIR_LAW,
        text: "Minimalna wysokość lotu VFR nad gęstą zabudową miast to:",
        options: ["1000 ft (300m) nad najwyższą przeszkodą w promieniu 600m", "500 ft (150m) AGL", "2000 ft AGL", "Brak ograniczeń dla szybowców"],
        correctAnswerIndex: 0
    },
    {
        id: "law-008",
        category: Category.AIR_LAW,
        text: "W przestrzeni klasy C (Controlled), separacja jest zapewniana:",
        options: ["VFR od IFR oraz IFR od IFR", "Tylko dla lotów IFR", "Tylko między IFR a VFR", "Nie jest zapewniana"],
        correctAnswerIndex: 0 
    },
    {
        id: "law-009",
        category: Category.AIR_LAW,
        text: "W przestrzeni klasy G, dla lotów VFR poniżej 3000 ft AMSL, widzialność w locie musi wynosić co najmniej:",
        options: ["1.5 km (dla prędkości pozwalającej na uniknięcie kolizji)", "5 km", "8 km", "10 km"],
        correctAnswerIndex: 0
    },
    {
        id: "law-010",
        category: Category.AIR_LAW,
        text: "Zrzucanie przedmiotów z pokładu statku powietrznego w locie jest:",
        options: ["Zabronione, chyba że posiada się stosowne zezwolenia lub w sytuacji awaryjnej", "Dozwolone zawsze", "Dozwolone tylko nad lasami", "Zabronione tylko w nocy"],
        correctAnswerIndex: 0
    },
    {
        id: "law-011",
        category: Category.AIR_LAW,
        text: "Wysokość przejściowa (Transition Altitude) w Polsce wynosi zazwyczaj:",
        options: ["6500 ft AMSL", "FL 80", "1000 ft AGL", "FL 100"],
        correctAnswerIndex: 0
    },
    {
        id: "law-012",
        category: Category.AIR_LAW,
        text: "Skrót ATZ oznacza:",
        options: ["Aerodrome Traffic Zone (Strefa ruchu lotniskowego)", "Air Traffic Zone", "Airport Terminal Zone", "Area Traffic Zone"],
        correctAnswerIndex: 0
    },
    {
        id: "law-013",
        category: Category.AIR_LAW,
        text: "Kto odpowiada za bezpieczeństwo statku powietrznego podczas lotu?",
        options: ["Dowódca statku powietrznego", "Właściciel statku", "Służba ruchu lotniczego", "Szef wyszkolenia"],
        correctAnswerIndex: 0
    },
    {
        id: "law-014",
        category: Category.AIR_LAW,
        text: "Szybowiec lądujący przymusowo w terenie przygodnym:",
        options: ["Ma pierwszeństwo przed wszystkimi innymi statkami powietrznymi w powietrzu i na ziemi", "Musi ustąpić samolotom silnikowym", "Ma pierwszeństwo tylko przed balonami", "Nie ma żadnych praw"],
        correctAnswerIndex: 0
    },
    {
        id: "law-015",
        category: Category.AIR_LAW,
        text: "Loty VFR w nocy w Polsce:",
        options: ["Są dozwolone pod warunkiem złożenia planu lotu i zachowania łączności (przepisy VFR Noc)", "Są całkowicie zabronione dla szybowców", "Nie wymagają planu lotu", "Są dozwolone tylko w strefach kontrolowanych"],
        correctAnswerIndex: 0
    },
    {
        id: "law-016",
        category: Category.AIR_LAW,
        text: "Statek powietrzny wykonujący lot VFR wlot w strefę CTR (Controlled Traffic Region) musi:",
        options: ["Uzyskać zezwolenie kontroli ruchu lotniczego (TWR) przed wlotem", "Tylko zgłosić wlot", "Nie musi nic robić, jeśli leci poniżej 1000ft", "Może wlecieć, jeśli pogoda jest dobra"],
        correctAnswerIndex: 0
    },
    {
        id: "law-017",
        category: Category.AIR_LAW,
        text: "Jaki dokument jest wymagany na pokładzie szybowca podczas lotu w rejonie lotniska?",
        options: ["Świadectwo zdatności do lotu (ARC) lub jego kopia", "Książka pilota", "Ubezpieczenie OC w oryginale", "Tylko mapa"],
        correctAnswerIndex: 0
    },
    {
        id: "law-018",
        category: Category.AIR_LAW,
        text: "Licencja SPL wydawana jest na czas:",
        options: ["Nieokreślony (z zastrzeżeniem utrzymania bieżącej praktyki)", "5 lat", "10 lat", "2 lata"],
        correctAnswerIndex: 0
    },
    {
        id: "law-019",
        category: Category.AIR_LAW,
        text: "W przypadku spotkania balonu i szybowca, pierwszeństwo ma:",
        options: ["Balon (mniej sterowny)", "Szybowiec", "Statek z prawej strony", "Statek wyżej"],
        correctAnswerIndex: 0
    },
    {
        id: "law-020",
        category: Category.AIR_LAW,
        text: "Światło stałe czerwone z wieży do statku w locie oznacza:",
        options: ["Nie ląduj, ustąp pierwszeństwa innym", "Ląduj, lotnisko bezpieczne", "Wróć na lotnisko", "Lotnisko zamknięte"],
        correctAnswerIndex: 0
    },

    // --- 2. HUMAN PERFORMANCE (Człowiek) ---
    {
        id: "hum-001",
        category: Category.HUMAN_PERFORMANCE,
        text: "Zjawisko 'szarej kurtyny' (greyout) występuje przy:",
        options: ["Dużych przeciążeniach dodatnich (odpływ krwi z głowy)", "Dużych przeciążeniach ujemnych", "Niedotlenieniu na wysokości", "Zatruciu tlenkiem węgla"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-002",
        category: Category.HUMAN_PERFORMANCE,
        text: "Barotrauma ucha środkowego występuje najczęściej podczas:",
        options: ["Szybkiego zniżania (zwiększanie ciśnienia na zewnątrz, problem z wyrównaniem)", "Wznoszenia", "Lotu poziomego", "Zakrętów"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-003",
        category: Category.HUMAN_PERFORMANCE,
        text: "Hipoksja to stan spowodowany:",
        options: ["Niedoborem tlenu w tkankach", "Nadmiarem tlenu", "Niskim ciśnieniem krwi", "Stresem"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-004",
        category: Category.HUMAN_PERFORMANCE,
        text: "Choroba dekompresyjna może wystąpić:",
        options: ["Przy szybkim wznoszeniu na duże wysokości (>5000m) bez hermetyzacji", "Przy szybkim zniżaniu", "Tylko pod wodą", "Podczas lotu z dużą prędkością"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-005",
        category: Category.HUMAN_PERFORMANCE,
        text: "Hiperwentylacja (nadmierne oddychanie) prowadzi do:",
        options: ["Niedoboru dwutlenku węgla we krwi (hipokapnia)", "Niedoboru tlenu", "Zwiększenia wydolności organizmu", "Poprawy widzenia"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-006",
        category: Category.HUMAN_PERFORMANCE,
        text: "Zjawisko 'krótkowzroczności pustego pola' (empty field myopia) polega na:",
        options: ["Akomodacji oka na odległość ok. 1-2 metrów przy braku punktów odniesienia", "Widzeniu tylko obiektów bliskich", "Całkowitej ślepocie", "Widzeniu tylko w nocy"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-007",
        category: Category.HUMAN_PERFORMANCE,
        text: "Złudzenie Coriolisa powstaje, gdy:",
        options: ["Pilot poruszy głową podczas wykonywania ustalonego zakrętu", "Pilot leci we mgle", "Pilot ląduje na szerokim pasie", "Występuje turbulencja"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-008",
        category: Category.HUMAN_PERFORMANCE,
        text: "Objawy niedotlenienia (hipoksji) na wysokości mogą obejmować:",
        options: ["Euforię, upośledzenie oceny sytuacji, sinicę paznokci", "Ostry ból ucha", "Ból stawów", "Nadmierną potliwość"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-009",
        category: Category.HUMAN_PERFORMANCE,
        text: "Czas pożytecznej świadomości (TUC) na wysokości 5500m (18000ft) wynosi około:",
        options: ["20-30 minut", "1-2 minuty", "10 sekund", "Wiele godzin"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-010",
        category: Category.HUMAN_PERFORMANCE,
        text: "Zasada 'IM SAFE' służy do:",
        options: ["Oceny zdolności pilota do lotu (Illness, Medication, Stress, Alcohol, Fatigue, Eating)", "Sprawdzania szybowca", "Planowania trasy", "Komunikacji radiowej"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-011",
        category: Category.HUMAN_PERFORMANCE,
        text: "Złudzenie, że statek powietrzny znajduje się wyżej niż w rzeczywistości podczas podejścia, może być wywołane przez:",
        options: ["Wąski pas startowy lub teren wznoszący się przed pasem", "Szeroki pas startowy", "Lot nad wodą", "Mgłę"],
        correctAnswerIndex: 0
    },
    {
        id: "hum-012",
        category: Category.HUMAN_PERFORMANCE,
        text: "Najlepszym sposobem na skanowanie przestrzeni (wzrok) jest:",
        options: ["Sektorowe przesuwanie wzroku co 10-15 stopni i zatrzymywanie go na chwilę", "Ciągły ruch oczami", "Patrzenie w jeden punkt na horyzoncie", "Skupienie wzroku na przyrządach"],
        correctAnswerIndex: 0
    },

    // --- 3. METEOROLOGY (Meteorologia) ---
    {
        id: "met-001",
        category: Category.METEOROLOGY,
        text: "Termika wypracowana (bąbel) różni się od komina stałego tym, że:",
        options: ["Oderwała się od ziemi i dryfuje z wiatrem", "Jest zawsze silniejsza", "Występuje tylko nad wodą", "Nie powoduje turbulencji"],
        correctAnswerIndex: 0
    },
    {
        id: "met-002",
        category: Category.METEOROLOGY,
        text: "Wiatr przy powierzchni ziemi w porównaniu do wiatru gradientowego (na wysokości 2000ft) jest:",
        options: ["Słabszy i skręcony w lewo (na półkuli północnej - siła tarcia)", "Silniejszy i skręcony w prawo", "Taki sam", "Słabszy i skręcony w prawo"],
        correctAnswerIndex: 0
    },
    {
        id: "met-003",
        category: Category.METEOROLOGY,
        text: "Skrót 'NSC' w depeszy METAR oznacza:",
        options: ["Nil Significant Cloud (brak chmur istotnych operacyjnie poniżej 5000ft/MSA)", "No Sky Clear", "Nie ma chmur Cumulonimbus", "Niebo bezchmurne (SKC)"],
        correctAnswerIndex: 0
    },
    {
        id: "met-004",
        category: Category.METEOROLOGY,
        text: "Zjawisko 'Foehn' (Halny) powstaje, gdy:",
        options: ["Powietrze wilgotne wznosi się po stronie nawietrznej gór, a suche opada po zawietrznej (ogrzewając się adiabatycznie sucho)", "Wiatr wieje wzdłuż doliny", "Występuje inwersja", "Powietrze jest stabilne"],
        correctAnswerIndex: 0
    },
    {
        id: "met-005",
        category: Category.METEOROLOGY,
        text: "Chmury typu Lenticularis (soczewkowate) stojące w miejscu mimo silnego wiatru wskazują na występowanie:",
        options: ["Fali górskiej", "Termiki wypracowanej", "Frontu ciepłego", "Inwersji przyziemnej"],
        correctAnswerIndex: 0
    },
    {
        id: "met-006",
        category: Category.METEOROLOGY,
        text: "Front chłodny II rodzaju (szybki) charakteryzuje się:",
        options: ["Wąską strefą zachmurzenia (Cb), burzami i szkwałami", "Szeroką strefą opadów ciągłych", "Brakiem zjawisk atmosferycznych", "Powolnym wypieraniem powietrza ciepłego"],
        correctAnswerIndex: 0
    },
    {
        id: "met-007",
        category: Category.METEOROLOGY,
        text: "Inwersja temperatury to zjawisko, w którym:",
        options: ["Temperatura rośnie wraz z wysokością", "Temperatura spada szybciej niż standardowo", "Temperatura jest stała", "Występuje silny wiatr"],
        correctAnswerIndex: 0
    },
    {
        id: "met-008",
        category: Category.METEOROLOGY,
        text: "Mgła radiacyjna powstaje najczęściej:",
        options: ["W bezchmurne noce przy słabym wietrze (wypromieniowanie ciepła)", "Przy silnym wietrze", "W dzień", "Nad morzem"],
        correctAnswerIndex: 0
    },
    {
        id: "met-009",
        category: Category.METEOROLOGY,
        text: "Cumulus Congestus to chmura:",
        options: ["Kłębiasta mocno rozbudowana pionowo, mogąca dać opad", "Pierzasta", "Warstwowa deszczowa", "Niskiego piętra o małej rozciągłości"],
        correctAnswerIndex: 0
    },
    {
        id: "met-010",
        category: Category.METEOROLOGY,
        text: "QNH to ciśnienie:",
        options: ["Sprodzone do poziomu morza wg atmosfery wzorcowej (wskazuje wysokość AMSL)", "Na poziomie lotniska (QFE)", "Standardowe 1013 hPa (QNE)", "Kabnowe"],
        correctAnswerIndex: 0
    },
    {
        id: "met-011",
        category: Category.METEOROLOGY,
        text: "Gradient adiabatyczny suchy wynosi około:",
        options: ["1°C na 100m (3°C na 1000ft)", "0.6°C na 100m", "2°C na 100m", "Jest zmienny"],
        correctAnswerIndex: 0
    },
    {
        id: "met-012",
        category: Category.METEOROLOGY,
        text: "Najbardziej niebezpiecznym rodzajem oblodzenia jest:",
        options: ["Lód szklisty (clear ice) - szybki przyrost, zmiana profilu", "Szadź (rime ice)", "Szron", "Lód mieszany"],
        correctAnswerIndex: 0
    },
    {
        id: "met-013",
        category: Category.METEOROLOGY,
        text: "SIGMET to informacja o:",
        options: ["Występowaniu lub przewidywaniu zjawisk pogody niebezpiecznych dla lotnictwa", "Prognozie dla lotniska", "Warunkach rzeczywistych", "Wietrze górnym"],
        correctAnswerIndex: 0
    },
    {
        id: "met-014",
        category: Category.METEOROLOGY,
        text: "Punkt rosy to temperatura, w której:",
        options: ["Powietrze staje się nasycone parą wodną (wilgotność 100%)", "Woda zamarza", "Powietrze osiąga największą gęstość", "Zaczyna padać śnieg"],
        correctAnswerIndex: 0
    },
    {
        id: "met-015",
        category: Category.METEOROLOGY,
        text: "Skrót 'CAVOK' w depeszy METAR oznacza m.in.:",
        options: ["Widzialność ≥ 10 km, brak chmur poniżej 5000ft, brak zjawisk istotnych (np. CB)", "Widzialność 5 km", "Niebo zachmurzone", "Lotnisko zamknięte"],
        correctAnswerIndex: 0
    },
    {
        id: "met-016",
        category: Category.METEOROLOGY,
        text: "Turbulencja czystego nieba (CAT) występuje najczęściej:",
        options: ["W pobliżu prądów strumieniowych (Jet Stream)", "W chmurach Stratus", "Przy ziemi", "W inwersji"],
        correctAnswerIndex: 0
    },

    // --- 4. COMMUNICATIONS (Łączność) ---
    {
        id: "com-001",
        category: Category.COMMUNICATIONS,
        text: "Jeśli utracisz łączność radiową w locie z widocznością (VFR) dolatując do lotniska kontrolowanego, powinieneś:",
        options: ["Ustawić kod transpondera 7600 i obserwować sygnały świetlne", "Lądować natychmiast w terenie przygodnym", "Krążyć nad punktem zwrotnym do wyczerpania paliwa", "Nadawać 'MAYDAY'"],
        correctAnswerIndex: 0
    },
    {
        id: "com-002",
        category: Category.COMMUNICATIONS,
        text: "Sygnał 'PAN PAN' nadawany trzykrotnie oznacza:",
        options: ["Stan naglący (zagrożenie bezpieczeństwa, ale bez bezpośredniego zagrożenia życia)", "Bezpośrednie zagrożenie życia (Mayday)", "Prośbę o sprawdzenie radia", "Błąd nawigacyjny"],
        correctAnswerIndex: 0
    },
    {
        id: "com-003",
        category: Category.COMMUNICATIONS,
        text: "Co oznacza fraza 'ROGER'?",
        options: ["Otrzymałem całą twoją nadaną wiadomość (nie oznacza TAK/NIE)", "Tak / Potwierdzam zgodę (Affirm)", "Powtórz", "Zrozumiałem i wykonam (Wilco)"],
        correctAnswerIndex: 0
    },
    {
        id: "com-004",
        category: Category.COMMUNICATIONS,
        text: "Międzynarodowa częstotliwość alarmowa to:",
        options: ["121.500 MHz", "123.450 MHz", "118.000 MHz", "122.800 MHz"],
        correctAnswerIndex: 0
    },
    {
        id: "com-005",
        category: Category.COMMUNICATIONS,
        text: "Poprawna odpowiedź na instrukcję kontrolera zawierającą ustawienie QNH:",
        options: ["Należy powtórzyć (readback) ciśnienie QNH", "Wystarczy powiedzieć 'Roger'", "Wystarczy powiedzieć 'Wilco'", "Nie trzeba odpowiadać"],
        correctAnswerIndex: 0
    },
    {
        id: "com-006",
        category: Category.COMMUNICATIONS,
        text: "Kod transpondera oznaczający bezprawne ingerencję (porwanie) to:",
        options: ["7500", "7600 (Radio failure)", "7700 (Emergency)", "7000 (VFR standard)"],
        correctAnswerIndex: 0
    },
    {
        id: "com-007",
        category: Category.COMMUNICATIONS,
        text: "Sformułowanie 'GO AHEAD' (Śmiało) oznacza:",
        options: ["Nadawaj swoją wiadomość (używane rzadziej w nowej frazeologii)", "Kołuj dalej", "Startuj", "Ląduj"],
        correctAnswerIndex: 0
    },
    {
        id: "com-008",
        category: Category.COMMUNICATIONS,
        text: "W skali czytelności radia (1-5), ocena 3 oznacza:",
        options: ["Czytelne z trudnością", "Nieczytelne", "Czytelne", "Całkowicie czytelne"],
        correctAnswerIndex: 0
    },
    {
        id: "com-009",
        category: Category.COMMUNICATIONS,
        text: "Co oznacza fraza 'WILCO'?",
        options: ["Zrozumiałem wiadomość i ją wykonam (Will Comply)", "Zrozumiałem (Roger)", "Potwierdź", "Czekaj"],
        correctAnswerIndex: 0
    },
    {
        id: "com-10",
        category: Category.COMMUNICATIONS,
        text: "Znak wywoławczy 'GROUND' odnosi się do:",
        options: ["Kontroli ruchu naziemnego", "Wieży", "Zbliżania", "Informacji"],
        correctAnswerIndex: 0
    },
    {
        id: "com-011",
        category: Category.COMMUNICATIONS,
        text: "Przycisk PTT (Push to Talk) należy wcisnąć:",
        options: ["Chwilę przed rozpoczęciem mówienia i zwolnić chwilę po zakończeniu", "Po rozpoczęciu mówienia", "Tylko w sytuacjach awaryjnych", "Cały czas trzymać wciśnięty"],
        correctAnswerIndex: 0
    },
    {
        id: "com-012",
        category: Category.COMMUNICATIONS,
        text: "Fraza 'SAY AGAIN' oznacza:",
        options: ["Powtórz całą lub część ostatniej wiadomości", "Powiedz jeszcze raz swoje imię", "Nic nie słyszę", "Zmień częstotliwość"],
        correctAnswerIndex: 0
    },

    // --- 5. PRINCIPLES OF FLIGHT (Zasady lotu) ---
    {
        id: "pof-001",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Hamulce aerodynamiczne w szybowcu służą głównie do:",
        options: ["Zwiększenia oporu i stromego podejścia (psucia doskonałości)", "Zwiększenia siły nośnej", "Sterowania kierunkowego", "Zmniejszenia prędkości przeciągnięcia"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-002",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Środek ciężkości (SC) położony zbyt daleko z tyłu powoduje:",
        options: ["Zmniejszenie stateczności podłużnej i trudność w wyjściu z korkociągu", "Zwiększenie stateczności podłużnej", "Zwiększenie prędkości przeciągnięcia", "Tendencję do nurkowania"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-003",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Opór indukowany jest największy przy:",
        options: ["Małych prędkościach i dużych kątach natarcia", "Dużych prędkościach", "Małych kątach natarcia", "Locie nurkowym"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-004",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Współczynnik obciążenia w zakręcie o przechyleniu 60 stopni wynosi:",
        options: ["2 G", "1 G", "4 G", "1.5 G"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-005",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Autorotacja w korkociągu jest podtrzymywana przez:",
        options: ["Różnicę siły oporu i nośnej na skrzydle wewnętrznym (bardziej przeciągniętym) i zewnętrznym", "Ster kierunku", "Silnik", "Przesunięcie środka ciężkości"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-006",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Efekt przyziemny (Ground Effect) powoduje:",
        options: ["Zmniejszenie oporu indukowanego i wydłużenie dobiegu/wytrzymania", "Zwiększenie oporu", "Gwałtowne przyziemienie", "Zmniejszenie siły nośnej"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-007",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Zwichrzenie geometryczne skrzydła (washout) stosuje się, aby:",
        options: ["Końcówki skrzydeł przeciągały się później niż nasada (zachowanie sterowności lotek)", "Zwiększyć prędkość maksymalną", "Zmniejszyć rozpiętość", "Ułatwić transport"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-008",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Stosunek siły nośnej do oporu (L/D) osiąga wartość maksymalną przy:",
        options: ["Kącie natarcia optymalnym (największa doskonałość)", "Kącie krytycznym", "Najmniejszym kącie natarcia", "Prędkości minimalnej"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-009",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Wychylenie lotki w dół powoduje na tym skrzydle:",
        options: ["Wzrost siły nośnej i wzrost oporu (moment zawiasowy ujemny)", "Spadek siły nośnej", "Tylko spadek oporu", "Brak zmian oporu"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-010",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Przeciągnięcie (Stall) następuje po przekroczeniu:",
        options: ["Krytycznego kąta natarcia", "Prędkości maksymalnej", "Maksymalnej wagi", "Dopuszczalnych obrotów"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-011",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Podczas lotu z wyślizgiem (kulka po stronie wewnętrznej zakrętu):",
        options: ["Szybowiec 'wyślizguje się' na zewnątrz zakrętu (za duży przechył względem prędkości kątowej)", "Szybowiec wpada do środka zakrętu", "Sterowność jest najlepsza", "Opór jest najmniejszy"],
        correctAnswerIndex: 0
    },
    {
        id: "pof-012",
        category: Category.PRINCIPLES_OF_FLIGHT,
        text: "Jak zmieni się prędkość przeciągnięcia przy zakręcie o przechyleniu 45 stopni?",
        options: ["Wzrośnie o około 19%", "Pozostanie bez zmian", "Zmaleje", "Wzrośnie dwukrotnie"],
        correctAnswerIndex: 0
    },

    // --- 6. OPERATIONAL PROCEDURES (Procedury) ---
    {
        id: "ops-001",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Standardowy krąg nadlotniskowy szybowcowy wykonuje się:",
        options: ["Po stronie zawietrznej lotniska (z wiatrem na pozycji 'z wiatrem')", "Po stronie nawietrznej", "Zawsze na północ", "Dowolnie"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-002",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Pęknięcie liny wyciągarkowej na wysokości 30m. Prawidłowa reakcja:",
        options: ["Wykonanie lądowania na wprost (z ewentualnymi delikatnymi odchyleniami)", "Pełny krąg", "Zakręt o 180 stopni ('drzwi do hangaru')", "Oczekiwanie na spadochron"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-003",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Przy lądowaniu w terenie przygodnym, najważniejszym kryterium wyboru pola jest:",
        options: ["Wielkość, nawierzchnia, brak przeszkód i kierunek wiatru", "Bliskość drogi dojazdu", "Bliskość zabudowań", "Kolor uprawy"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-004",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Sygnał dawany przez pilota szybowca 'Kierunek w lewo' (podczas holu) to:",
        options: ["Nieregularne wychylenia szybowca w lewo (wyjście z cienia aerodynamicznego)", "Mruganie światłami", "Otwarcie hamulców", "Machanie skrzydłami"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-005",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Czynności 'CB SIFT CBE' (lub PL: KABINA) wykonuje się:",
        options: ["Przed startem", "Po lądowaniu", "Przed wejściem w krąg", "W połowie lotu"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-006",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Podczas holu za samolotem, jeśli samolot macha skrzydłami, oznacza to:",
        options: ["Wyłóż hamulce / Wyczepiaj (sygnał nakazujący lądowanie lub problem)", "Zwiększ prędkość", "Wszystko w porządku", "Sprawdź radio"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-007",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Szybowiec na holu nie może wznosić się znacznie powyżej samolotu holującego, ponieważ:",
        options: ["Grozi to uniesieniem ogona samolotu i wejściem w nurkowanie", "Samolot straci moc", "Lina się zerwie", "Szybowiec wejdzie w nadkrytyczny kąt natarcia"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-008",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "W przypadku pęknięcia liny na bezpiecznej wysokości (np. 150-200m) z wiatrem czołowym:",
        options: ["Możliwe wykonanie skróconego kręgu (esowanie lub 'odwrócona łza') i lądowanie z wiatrem lub pod wiatr zależnie od pozycji", "Lądowanie na wprost bez względu na przeszkody", "Użycie spadochronu", "Skok ze spadochronem"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-009",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Znak 'T' wyłożony na polu sygnałów startowych oznacza:",
        options: ["Kierunek lądowania i startu (równolegle do trzonu, w stronę poprzeczki)", "Miejsce parkowania", "Zakaz lądowania", "Szybowce lądują na trawę"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-010",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Krytycznym momentem startu za wyciągarką (największe kąty natarcia) jest:",
        options: ["Faza wznoszenia na pełnej linie (ok. 1/3 wysokości)", "Rozbieg", "Wyczepienie", "Końcówka holu"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-011",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Po wyczepieniu liny holowniczej, pierwszą czynnością pilota powinno być:",
        options: ["Ustalenie prędkości lotu swobodnego i sprawdzenie, czy lina została wyczepiona", "Rozpoczęcie krążenia", "Włączenie radia", "Zamknięcie podwozia"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-012",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Żółty krzyż wyłożony na polu sygnałów oznacza:",
        options: ["Zakaz lądowania (lotnisko niesprawne)", "Lądowanie z ostrożnością", "Szybowce lądują na pasie trawiastym", "Lotnisko wojskowe"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-013",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Dwie czerwone strzały wyłożone na polu sygnałów oznaczają:",
        options: ["Nakaz lądowania i startu w kierunku wskazanym przez strzały (standardowy krąg lewy jeśli nie ma strzał, prawy jeśli są strzały w prawo)", "Zakaz kołowania", "Pas startowy zamknięty", "Strefa spadochronowa"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-014",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Podczas startu za wyciągarką, jeśli szybowiec zaczyna odchylać się w lewo, pilot powinien:",
        options: ["Wyczepić linę natychmiast, jeśli kontrowanie sterem nie pomaga", "Zwiększyć kąt wznoszenia", "Wychylić drążek w prawo i kontynuować", "Krzyczeć przez radio"],
        correctAnswerIndex: 0
    },
    {
        id: "ops-015",
        category: Category.OPERATIONAL_PROCEDURES,
        text: "Białe 'Hantle' na polu sygnałów oznaczają:",
        options: ["Lądowanie i start wyłącznie z drogi utwardzonej (pas betonowy/asfaltowy)", "Zakaz lotów", "Szybowce lądują na trawę", "Strefa ćwiczeń"],
        correctAnswerIndex: 0
    },

    // --- 7. FLIGHT PERFORMANCE (Osiągi) ---
    {
        id: "perf-001",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Biegunowa prędkości szybowca przedstawia zależność:",
        options: ["Prędkości opadania od prędkości postępowej", "Siły nośnej od kąta natarcia", "Oporu od prędkości", "Doskonałości od wiatru"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-002",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Pierścień MacCready'ego na wariometrze służy do:",
        options: ["Wyznaczania optymalnej prędkości przelotu w zależności od spodziewanego noszenia", "Pomiaru wysokości", "Pomiaru temperatury", "Wskazywania kierunku"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-003",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Zatankowanie balastu wodnego powoduje:",
        options: ["Zwiększenie prędkości przelotowej przy tej samej doskonałości (przesunięcie biegunowej w prawo i w dół)", "Zwiększenie doskonałości maksymalnej", "Zmniejszenie prędkości opadania minimalnego", "Skrócenie rozbiegu"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-004",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Wiatr czołowy wpływa na zasięg szybowania (względem ziemi) następująco:",
        options: ["Zmniejsza go", "Zwiększa go", "Nie ma wpływu", "Zależy od wagi pilota"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-005",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Maksymalna doskonałość szybowca wynosi 40. Z wysokości 1000m w ciszy przeleci on:",
        options: ["40 km", "4 km", "10 km", "400 km"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-006",
        category: Category.FLIGHT_PERFORMANCE,
        text: "W locie pod wiatr, aby uzyskać największy zasięg, należy lecieć:",
        options: ["Szybciej niż prędkość optymalna w ciszy", "Wolniej (blisko prędkości ekonomicznej)", "Z prędkością minimalną", "Z Vne"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-007",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Gęstość powietrza maleje wraz ze wzrostem wysokości. Powoduje to, że prędkość rzeczywista (TAS) względem przyrządowej (IAS):",
        options: ["Jest wyższa", "Jest niższa", "Jest taka sama", "Zależy od temperatury silnika"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-008",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Obciążenie powierzchni skrzydła to:",
        options: ["Stosunek masy całkowitej do powierzchni skrzydła (kg/m2)", "Masa pilota podzielona przez powierzchnię", "Długość skrzydła przez szerokość", "Siła nośna razy masa"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-009",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Mucha (zabrudzenie) na krawędzi natarcia skrzydła laminarnego powoduje:",
        options: ["Wcześniejsze przejście przepływu w turbulentny, wzrost oporu i spadek siły nośnej", "Poprawę opływu", "Tylko zmianę koloru", "Zwiększenie doskonałości"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-010",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Wzrost temperatury powietrza (przy tym samym ciśnieniu) powoduje:",
        options: ["Spadek gęstości powietrza i pogorszenie osiągów startowych", "Wzrost gęstości", "Poprawę noszenia", "Krótszy rozbieg"],
        correctAnswerIndex: 0
    },
    {
        id: "perf-011",
        category: Category.FLIGHT_PERFORMANCE,
        text: "Najmniejsza prędkość opadania występuje przy prędkości:",
        options: ["Ekonomicznej (mniejszej niż optymalna)", "Optymalnej", "Maksymalnej", "Minimalnej"],
        correctAnswerIndex: 0
    },

    // --- 8. AIRCRAFT KNOWLEDGE (Wiedza o statku) ---
    {
        id: "ack-001",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Kompensacja wariometru (energia całkowita) odbywa się zazwyczaj za pomocą:",
        options: ["Rurki Venturiego (lub sondy Braunsweig) umieszczonej w przepływie", "Rurki Pitota", "Otworków statycznych w kabinie", "GPS"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-002",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Pomiar ciśnienia całkowitego (statyczne + dynamiczne) jest niezbędny do działania:",
        options: ["Prędkościomierza", "Wysokościomierza", "Wariometru", "Chyłomierza"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-003",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Elementem bezpiecznikowym w układzie sterowania, chroniącym przed trzepotaniem (flutter), jest:",
        options: ["Wyważenie masowe powierzchni sterowych", "Wyważenie aerodynamiczne", "Trymer", "Hamulec"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-004",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Nitka na owiewce kabiny służy do:",
        options: ["Wskazywania symetrii opływu (ślizgu/ześlizgu)", "Ozdoby", "Pomiaru prędkości", "Wskazywania kierunku wiatru na ziemi"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-005",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Bezpiecznik w linie holowniczej ma za zadanie:",
        options: ["Pęknąć przy przekroczeniu dopuszczalnego obciążenia, chroniąc strukturę szybowca", "Łączyć linę z samolotem", "Wskazywać siłę holu", "Zapobiegać splątaniu liny"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-006",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Błąd opóźnienia wysokościomierza podczas szybkiego zniżania powoduje, że przyrząd wskazuje:",
        options: ["Wysokość wyższą niż rzeczywista", "Wysokość niższą", "Wysokość poprawną", "Prędkość"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-007",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Konstrukcje z kompozytów (laminatów) są szczególnie wrażliwe na:",
        options: ["Wysoką temperaturę (dlatego są białe) i promieniowanie UV", "Wilgoć", "Niskie temperatury", "Smary"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-008",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Zakres żółtego łuku na prędkościomierzu oznacza:",
        options: ["Zakres prędkości dopuszczalnych tylko w spokojnym powietrzu (bez turbulencji)", "Zakres normalnej eksploatacji", "Zakres wypuszczania klap", "Zakres zabroniony"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-009",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Trymer w szybowcu służy do:",
        options: ["Zniwelowania sił na drążku sterowym dla danej prędkości", "Zwiększenia sterowności", "Hamowania", "Wypuszczania podwozia"],
        correctAnswerIndex: 0
    },
    {
        id: "ack-010",
        category: Category.AIRCRAFT_KNOWLEDGE,
        text: "Chyłomierz (tzw. kulka) wskazuje:",
        options: ["Kierunek wypadkowej siły ciężkości i siły odśrodkowej (jakość koordynacji zakrętu)", "Przechylenie w stopniach", "Prędkość kątową", "Horyzont sztuczny"],
        correctAnswerIndex: 0
    },

    // --- 9. NAVIGATION (Nawigacja) ---
    {
        id: "nav-001",
        category: Category.NAVIGATION,
        text: "Na mapie lotniczej w skali 1:500 000, 1 cm odpowiada:",
        options: ["5 km", "50 km", "500 m", "10 km"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-002",
        category: Category.NAVIGATION,
        text: "Kąt drogi (Track) różni się od kursu (Heading) o:",
        options: ["Kąt znoszenia (Dryf) spowodowany wiatrem", "Deklinację", "Dewiację", "Poprawkę wiatrową"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-003",
        category: Category.NAVIGATION,
        text: "Deklinacja magnetyczna to kąt między:",
        options: ["Północą geograficzną a magnetyczną", "Północą magnetyczną a busoli", "Osią podłużną a kursem", "Południkiem a równoleżnikiem"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-004",
        category: Category.NAVIGATION,
        text: "Lecąc kursem 090 z wiatrem wiejącym z kierunku 360 (z lewej), znoszenie będzie w:",
        options: ["Prawo, a kąt drogi > 090", "Lewo, kąt drogi < 090", "Prawo, kąt drogi < 090", "Brak znoszenia"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-005",
        category: Category.NAVIGATION,
        text: "Jedna minuta szerokości geograficznej to w przybliżeniu:",
        options: ["1 mila morska (NM) = 1852m", "1 kilometr", "1 mila lądowa", "10 km"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-006",
        category: Category.NAVIGATION,
        text: "Aby obliczyć Kurs Busoli (KB) mając Kurs Magnetyczny (KM), należy uwzględnić:",
        options: ["Dewiację (KB = KM - dev)", "Deklinację", "Wiatr", "Prędkość"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-007",
        category: Category.NAVIGATION,
        text: "Izogona to linia łącząca punkty o:",
        options: ["Jednakowej deklinacji magnetycznej", "Jednakowym ciśnieniu", "Jednakowej temperaturze", "Jednakowej wysokości"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-008",
        category: Category.NAVIGATION,
        text: "Czas UTC w Polsce zimą różni się od czasu lokalnego o:",
        options: ["-1 godzinę (Lokalny = UTC + 1)", "+1 godzinę", "-2 godziny", "Jest taki sam"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-009",
        category: Category.NAVIGATION,
        text: "Prędkość względem ziemi (GS) wynosi 120 km/h. Czas potrzebny na przebycie 40 km to:",
        options: ["20 minut", "15 minut", "30 minut", "10 minut"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-010",
        category: Category.NAVIGATION,
        text: "Loksodroma to linia przecinająca południki:",
        options: ["Pod tym samym kątem", "Pod różnymi kątami", "Zawsze prostopadle", "Zawsze równolegle"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-011",
        category: Category.NAVIGATION,
        text: "Wznoszenie 2 m/s to w przybliżeniu:",
        options: ["400 ft/min", "200 ft/min", "1000 ft/min", "100 ft/min"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-012",
        category: Category.NAVIGATION,
        text: "Na mapie w rzucie Lamberta linia prosta jest przybliżeniem:",
        options: ["Ortodromy (najkrótsza droga)", "Loksodromy", "Równoleżnika", "Południka"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-013",
        category: Category.NAVIGATION,
        text: "Jeżeli Słońce jest w najwyższym punkcie (południe słoneczne), wskazuje ono kierunek:",
        options: ["Południowy (na półkuli północnej)", "Północny", "Wschodni", "Zachodni"],
        correctAnswerIndex: 0
    },
    {
        id: "nav-014",
        category: Category.NAVIGATION,
        text: "Ostatnia poprawka w nawigacji: KD (Kąt Drogi) +/- PZ (Poprawka Znoszenia) daje:",
        options: ["KR (Kurs Rzeczywisty)", "KB (Kurs Busoli)", "KM (Kurs Magnetyczny)", "GS (Prędkość)"],
        correctAnswerIndex: 0
    }
];
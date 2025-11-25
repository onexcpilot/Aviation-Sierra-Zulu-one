
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExamResult, Question, Language } from '../types';
import { UI_TEXT } from '../constants';

// Funkcja usuwająca polskie znaki diakrytyczne, aby zapewnić czytelność w standardowym foncie Helvetica (PDF)
const normalizeText = (str: string) => {
    const map: {[key: string]: string} = {
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
        'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
    };
    return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, match => map[match] || match);
};

export const exportResultToPDF = (result: ExamResult, allQuestions: Question[], _customLogo?: string | null, language: Language = 'PL') => {
    // Create new document - Portrait
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    // Use standard Helvetica. Polish chars are normalized to ASCII to prevent encoding issues.
    doc.setFont("helvetica", "normal");
    const t = UI_TEXT[language];

    // --- Header Section ---
    // NOTE: Images/Logos are intentionally excluded to keep the report text-only as requested.
    
    const titleX = 14;
    
    // Main Title
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text("System Egzaminacyjny SPL", titleX, 18);
    
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(language === 'PL' ? "Raport Egzaminacyjny" : "Exam Report", titleX, 24);
    
    // Website link REMOVED per user request
    doc.setFontSize(9);
    doc.setTextColor(100); 
    doc.text(new Date().toLocaleDateString(), titleX, 29);

    // --- Candidate Info Block ---
    const infoY = 40;
    doc.setFontSize(9); // Reduced info font size
    doc.setTextColor(0); // Black

    // Format: Label: Value
    doc.setFont("helvetica", "bold");
    doc.text(normalizeText(t.colCandidate) + ":", 14, infoY);
    doc.text(normalizeText(t.colEmail) + ":", 14, infoY + 5);
    doc.text(normalizeText(t.colDate) + ":", 14, infoY + 10);
    doc.text(normalizeText(t.colScore) + ":", 14, infoY + 15);

    doc.setFont("helvetica", "normal");
    doc.text(normalizeText(`${result.user.firstName} ${result.user.lastName}`), 40, infoY);
    doc.text(normalizeText(`${result.user.email}`), 40, infoY + 5);
    doc.text(normalizeText(`${new Date(result.date).toLocaleString(language === 'PL' ? 'pl-PL' : 'en-US')}`), 40, infoY + 10);

    const percentage = ((result.score / result.totalQuestions) * 100).toFixed(1);
    const status = result.passed 
        ? (language === 'PL' ? "ZALICZONY" : "PASSED") 
        : (language === 'PL' ? "NIEZALICZONY" : "FAILED");
    
    // Result Color Logic
    if(result.passed) {
        doc.setTextColor(22, 163, 74); // Green
    } else {
        doc.setTextColor(220, 38, 38); // Red
    }
    doc.setFont("helvetica", "bold");
    doc.text(normalizeText(`${result.score}/${result.totalQuestions} (${percentage}%) - ${status}`), 40, infoY + 15);

    // --- Table Data Preparation ---
    const tableData = result.answers.map((ans, index) => {
        const question = allQuestions.find(q => q.id === ans.questionId);
        if (!question) return [index + 1, "Error", "", ""];

        // Only text is exported, no images.
        const correctOptionText = question.options[question.correctAnswerIndex];
        
        return [
            index + 1,
            normalizeText(question.text),
            normalizeText(correctOptionText),
            ans.isCorrect ? "OK" : (language === 'PL' ? "ZLE" : "BAD")
        ];
    });

    // --- Table Configuration ---
    
    autoTable(doc, {
        startY: infoY + 22,
        head: [[
            language === 'PL' ? 'Lp.' : 'No.',
            normalizeText(t.question),
            normalizeText(t.correctAns),
            normalizeText(t.colScore)
        ]],
        body: tableData,
        theme: 'grid',
        styles: { 
            font: "helvetica", 
            fontSize: 8,
            cellPadding: 2,
            overflow: 'linebreak',
            valign: 'middle',
            lineColor: [200, 200, 200],
            lineWidth: 0.1,
            textColor: [30, 41, 59]
        },
        headStyles: { 
            fillColor: [15, 23, 42],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 8
        },
        columnStyles: {
            0: { cellWidth: 8, halign: 'center' }, // Lp
            1: { cellWidth: 95, halign: 'left' }, // Question
            2: { cellWidth: 60, halign: 'left' }, // Correct Answer
            3: { cellWidth: 15, halign: 'center', fontStyle: 'bold' } // Result
        },
        didParseCell: (data) => {
            if (data.section === 'body' && data.column.index === 3) {
                const text = data.cell.raw;
                if (text === 'ZLE' || text === 'BAD') {
                    data.cell.styles.textColor = [220, 38, 38]; // Red
                } else if (text === 'OK') {
                    data.cell.styles.textColor = [22, 163, 74]; // Green
                }
            }
        }
    });

    // Filename normalization
    const safeLastName = normalizeText(result.user.lastName).replace(/[^a-zA-Z0-9]/g, '');
    doc.save(`SPL_Wynik_${safeLastName}_${new Date().toISOString().slice(0,10)}.pdf`);
};

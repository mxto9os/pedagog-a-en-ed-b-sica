document.addEventListener('DOMContentLoaded', function() {
    // Datos de la malla curricular (solo por semestres)
    const curriculumData = [
        {
            title: "Semestre 1",
            courses: [
                "Taller de Comunicación Oral y Escrita",
                "Metacognición y Formación Universitaria",
                "Lenguaje Artístico Visual",
                "Ciencias Naturales I: Tierra y Universo y su Didáctica",
                "Fundamentos Socioculturales de la Educación",
                "Ciencias Sociales I: Geografía y su Didáctica"
            ]
        },
        {
            title: "Semestre 2",
            courses: [
                "Teoría de la Educación",
                "Psicología del Desarrollo de la Infancia",
                "Educación Matemática I: Números y su Didáctica",
                "Lenguaje y Comunicación I: Fundamentos Lingüísticos, Oralidad y su Didáctica",
                "Cienas Sociales II: Historia Universal y su Didáctica",
                "Ciencias Naturales II: Seres Vivos y su Didáctica"
            ]
        },
        {
            title: "Semestre 3",
            courses: [
                "Teoría y Diseño Curricular",
                "Psicología del Aprendizaje",
                "Educación Matemática II: Geometría y su Didáctica",
                "Lenguaje y Comunicación II: Producción de Textos y su Didáctica",
                "Ciencias Sociales III: Historia de Chile y SI Didáctica",
                "Práctica de Pasantía: Contexto Escolar (Primera práctica)"
            ]
        },
        {
            title: "Semestre 4",
            courses: [
                "Evauluación Educativa",
                "Educación Física I: Habilidades Motrices",
                "Educación Matemática III: Álgebra y su Didáctica",
                "Lenguaje y Comunicación III: Comprensión de Textos y su Didáctica",
                "Ciencias Naturales III: Química y su Didáctica",
                "Práctica Inicial: Colaboración Docente"
            ]
        },
        {
            title: "Semestre 5",
            courses: [
                "Ciencias Naturales IV: Física y su Didáctica",
                "Ciencias Sociales IV: Formación Ciudadana y su Didáctica",
                "Educación Física II: Vida Activa y Saludable",
                "Educación Matemática IV: Datos y Probabilidades y su Didáctica",
                "Práctica Intermedia I: Integración Curricular"
            ]
        },
        {
            title: "Semestre 6",
            courses: [
                "Información Educativa",
                "Contextos Inclusivos",
                "Lenguaje y Comunicación V: Teatro escolar, Literatura Infantil y su Didáctica",
                "Inglés I",
                "Didáctica de la Matemática",
                "Práctica Intermedia II: Articulación de Lectura y Escritura Inicial"
            ]
        },
        {
            title: "Semestre 7",
            courses: [
                "Inglés II",
                "Orientación en Educación Básica",
                "Taller de Acompañamiento a la Progresión Académica I",
                "Lenguaje Artístico Musical",
                "Gestión Educativa de Aula Inicial",
                "Práctica Intermedia III: Enseñanza de la Matemática"
            ]
            },
    {
        title: "Semestre 7 - Matemática",
        mention: "math",
        courses: [
            "Profundización del Currículum de la Matemática en Educación Básica"
        ]
    },
    {
        title: "Semestre 7 - Lenguaje",
        mention: "language",
        courses: [
            "Profundización del Currículum de Lenguaje y Comunicación en Educación Básica"
        ]
    },
    {
            title: "Semestre 8",
            courses: [
                "Política Educacional Chilena",
                "Investigación Educativa",
                "Educación Tecnológica",
                "Taller de Acompañamiento a la Progresión Académica I",
                "Práctica Profesional I: Liderazgo Pedagógico"
              ]
    },
    {
        title: "Semestre 8 - Matemática",
        mention: "math",
        courses: [
            "Metodologías para el Aprendizaje de la Matemática en Educación Básica"
        ]
    },
    {
        title: "Semestre 8 - Lenguaje",
        mention: "language",
        courses: [
            "Metodologías para el Aprendizaje del Lenguaje y la Comunicación en Educación Básica"
        ]
    },
    {
            title: "Semestre 9 - Matemática",
            mention: "math",
            courses: [
                "Diseño de Instrumentos Evaluativos para la Matemática",
                "Seminario de la Especialidad (Matemática)",
                "Práctica Profesional II: Investigación-Acción (Matemática)"
            ]
            
        },
        {
            title: "Semestre 9 - Lenguaje",
            mention: "language",
            courses: [
                "Diseño de Instrumentos Evaluativos para el Lenguaje y la Comunicación",
                "Seminario de la Especialidad (Lenguaje)",
                "Práctica Profesional II: Investigación-Acción (Lenguaje)"
            ]
        },
        {
            title: "Semestre 10 - Matemática",
            mention: "math",
            courses: [
                "Taller de Software, Algoritmo y Programación para la Educación Matemática",
                "Práctica Profesional III (Matemática)",
                "Seminario de Grado (Matemática)"
            ]
        },
        {
            title: "Semestre 10 - Lenguaje",
            mention: "language",
            courses: [
                "Taller de Software, Multimodalidad y Medios de Comunicación",
                "Práctica Profesional III (Lenguaje)",
                "Seminario de Grado (Lenguaje)"
            ]
        }
    ];

    // Variables de estado
    let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || {};
    let currentMention = localStorage.getItem('currentMention') || 'none';
    let themeColor = localStorage.getItem('themeColor') || '#4a6fa5';

    // Elementos del DOM
    const semestersGrid = document.querySelector('.semesters-grid');
    const mentionSelect = document.getElementById('mentionSelect');
    const themeColorInput = document.getElementById('themeColor');
    const applyColorBtn = document.getElementById('applyColor');
    const generalProgress = document.getElementById('generalProgress');
    const progressText = document.getElementById('progressText');

    // Inicializar la interfaz
    function init() {
        renderSemesters();
        updateProgress();
        mentionSelect.value = currentMention;
        themeColorInput.value = themeColor;
        applyThemeColor(themeColor);
    }

    // Renderizar los semestres
    function renderSemesters() {
    semestersGrid.innerHTML = '';
    
    const filteredSemesters = curriculumData.filter(semester => {
        if (!semester.mention) return true;
        return currentMention === 'none' ? false : semester.mention === currentMention;
    });
    
    filteredSemesters.forEach(semester => {
        const semesterEl = document.createElement('div');
        semesterEl.className = 'semester';
        
        const semesterHeader = document.createElement('div');
        semesterHeader.className = 'semester-header';
        semesterHeader.innerHTML = `<h3 class="semester-title">${semester.title}</h3>`;
        
        const courseList = document.createElement('ul');
        courseList.className = 'course-list';
        
        semester.courses.forEach(course => {
            const courseId = course.replace(/\s+/g, '-').toLowerCase();
            const isCompleted = completedCourses[courseId] || false;
            const courseGrade = completedCourses[courseId]?.grade || '';
            
            const courseItem = document.createElement('li');
            courseItem.className = `course-item ${isCompleted ? 'completed' : ''} ${semester.mention ? 'mention-' + semester.mention : ''}`;
            courseItem.dataset.courseId = courseId;
            
            const courseContent = document.createElement('div');
            courseContent.className = 'course-content';
            
            const courseName = document.createElement('span');
            courseName.className = 'course-name';
            courseName.textContent = course;
            
            const gradeInput = document.createElement('input');
            gradeInput.type = 'number';
            gradeInput.className = 'grade-input';
            gradeInput.min = 1;
            gradeInput.max = 7;
            gradeInput.step = 0.1;
            gradeInput.value = courseGrade;
            gradeInput.placeholder = 'Nota';
            gradeInput.addEventListener('change', (e) => saveGrade(courseId, e.target.value));
            
            const gradeDisplay = document.createElement('span');
            gradeDisplay.className = 'grade-display';
            gradeDisplay.textContent = courseGrade;
            
            const checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'checkbox-container';
            
            courseContent.appendChild(courseName);
            courseContent.appendChild(gradeDisplay);
            courseContent.appendChild(gradeInput);
            courseContent.appendChild(checkboxContainer);
            
            courseItem.appendChild(courseContent);
            courseList.appendChild(courseItem);
            
            courseItem.addEventListener('click', (e) => {
                // Evitar que el click en el input de nota active el toggle
                if (e.target !== gradeInput) {
                    toggleCourseCompletion(courseId);
                }
            });
        });
        
        semesterEl.appendChild(semesterHeader);
        semesterEl.appendChild(courseList);
        semestersGrid.appendChild(semesterEl);
    });
}

// Nueva función para guardar el promedio
function saveGrade(courseId, grade) {
    if (!completedCourses[courseId]) {
        completedCourses[courseId] = {};
    }
    completedCourses[courseId].grade = grade;
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    
    // Actualizar la visualización
    const gradeDisplay = document.querySelector(`.course-item[data-course-id="${courseId}"] .grade-display`);
    if (gradeDisplay) {
        gradeDisplay.textContent = grade;
    }
}

// Modificar la función toggleCourseCompletion
function toggleCourseCompletion(courseId) {
    if (!completedCourses[courseId] || typeof completedCourses[courseId] === 'boolean') {
        completedCourses[courseId] = { grade: '' };
    } else {
        completedCourses[courseId] = !completedCourses[courseId];
    }
    
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    
    const courseItem = document.querySelector(`.course-item[data-course-id="${courseId}"]`);
    if (courseItem) {
        courseItem.classList.toggle('completed');
        
        // Mostrar/ocultar inputs según corresponda
        const gradeInput = courseItem.querySelector('.grade-input');
        const gradeDisplay = courseItem.querySelector('.grade-display');
        
        if (courseItem.classList.contains('completed')) {
            gradeInput.style.display = 'block';
            gradeDisplay.style.display = 'block';
            
            // Si ya tiene nota, mostrarla
            if (completedCourses[courseId]?.grade) {
                gradeDisplay.textContent = completedCourses[courseId].grade;
                gradeInput.value = completedCourses[courseId].grade;
            }
        } else {
            gradeInput.style.display = 'none';
            gradeDisplay.style.display = 'none';
        }
    }
    
    updateProgress();
}

    // Actualizar la barra de progreso
    function updateProgress() {
        const allCourses = curriculumData.flatMap(semester => semester.courses);
        const totalCourses = allCourses.length;
        
        // Contar cursos completados que están visibles según la mención seleccionada
        const visibleCourses = curriculumData.filter(semester => {
            if (!semester.mention) return true;
            return currentMention === 'none' ? false : semester.mention === currentMention;
        }).flatMap(semester => semester.courses);
        
        const completedCount = visibleCourses.filter(course => {
            const courseId = course.replace(/\s+/g, '-').toLowerCase();
            return completedCourses[courseId];
        }).length;
        
        const progressPercentage = Math.round((completedCount / visibleCourses.length) * 100) || 0;
        
        generalProgress.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% completado (${completedCount}/${visibleCourses.length} cursos)`;
    }

    // Aplicar color de tema
    function applyThemeColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
        
        // Calcular colores oscuro y claro basados en el color principal
        const darkColor = shadeColor(color, -20);
        const lightColor = shadeColor(color, 20);
        
        document.documentElement.style.setProperty('--primary-dark', darkColor);
        document.documentElement.style.setProperty('--primary-light', lightColor);
        
        // Actualizar botones
        const buttons = document.querySelectorAll('button:not(.complete-btn)');
        buttons.forEach(btn => {
            btn.style.backgroundColor = color;
        });
    }

    // Función para oscurecer/aclarar un color
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3), 16);
        let G = parseInt(color.substring(3,5), 16);
        let B = parseInt(color.substring(5,7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  

        R = Math.round(R);
        G = Math.round(G);
        B = Math.round(B);

        const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }

    // Event listeners
    mentionSelect.addEventListener('change', function() {
        currentMention = this.value;
        localStorage.setItem('currentMention', currentMention);
        renderSemesters();
        updateProgress();
    });

    applyColorBtn.addEventListener('click', function() {
        themeColor = themeColorInput.value;
        localStorage.setItem('themeColor', themeColor);
        applyThemeColor(themeColor);
    });

    // Inicializar la aplicación
    init();
});

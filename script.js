document.addEventListener('DOMContentLoaded', function() {
    // Datos de la malla curricular
    const curriculumData = [
        {
            title: "Año 1 - Semestre 1",
            courses: [
                "Taller de Comunicación Oral y Escrita",
                "Metacognición y Formación Universitaria",
                "Lenguaje Artístico Visual",
                "Ciencias Naturales I: Tierra y Universo y su Didáctica",
                "Ciencias Sociales I: Geografía y su Didáctica"
            ]
        },
        {
            title: "Año 1 - Semestre 2",
            courses: [
                "Fundamentos Socioculturales de la Educación",
                "Psicología del Desarrollo de la Infancia",
                "Educación Matemática I: Números y su Didáctica",
                "Lenguaje y Comunicación I: Fundamentos Lingüísticos, Oralidad y su Didáctica",
                "Ciencias Naturales II: Seres Vivos y su Didáctica"
            ]
        },
        {
            title: "Año 2 - Semestre 3",
            courses: [
                "Teoría de la Educación",
                "Psicología del Aprendizaje",
                "Educación Matemática II: Geometría y su Didáctica",
                "Lenguaje y Comunicación II: Producción de Textos y su Didáctica",
                "Práctica de Pasantía: Contexto Escolar (Primera práctica)"
            ]
        },
        {
            title: "Año 2 - Semestre 4",
            courses: [
                "Educación Física I: Habilidades Motrices",
                "Educación Matemática III: Álgebra y su Didáctica",
                "Lenguaje y Comunicación III: Comprensión de Textos y su Didáctica",
                "Ciencias Naturales III: Química y su Didáctica",
                "Práctica Inicial: Colaboración Docente"
            ]
        },
        {
            title: "Año 3 - Semestre 5",
            courses: [
                "Ciencias Naturales IV: Física y su Didáctica",
                "Evaluación Educativa",
                "Educación Física II: Vida Activa y Saludable",
                "Educación Matemática IV: Datos y Probabilidades y su Didáctica",
                "Práctica Intermedia I: Integración Curricular"
            ]
        },
        {
            title: "Año 3 - Semestre 6",
            courses: [
                "Orientación en Educación Básica",
                "Gestión Educativa de Aula Inicial",
                "Lenguaje Artístico Musical",
                "Inglés I",
                "Práctica Intermedia II: Articulación de Lectura y Escritura Inicial"
            ]
        },
        {
            title: "Año 4 - Semestre 7",
            courses: [
                "Inglés II",
                "Investigación Educativa",
                "Taller de Acompañamiento a la Progresión Académica II",
                "Educación Tecnológica",
                "Práctica Intermedia III: Enseñanza de la Matemática"
            ]
        },
        {
            title: "Año 4 - Semestre 8",
            courses: [
                "Informática Educativa",
                "Contextos Inclusivos",
                "Lenguaje y Comunicación V: Teatro Escolar, Literatura Infantil y su Didáctica",
                "Didáctica de la Matemática",
                "Práctica Profesional I: Liderazgo Pedagógico"
            ]
        },
        {
            title: "Año 5 - Semestre 9",
            mention: "math",
            courses: [
                "Profundización del Currículum de Matemática",
                "Metodologías para el Aprendizaje de la Matemática",
                "Seminario de la Especialidad (Matemática)",
                "Práctica Profesional II: Investigación-Acción (Matemática)"
            ]
        },
        {
            title: "Año 5 - Semestre 9",
            mention: "language",
            courses: [
                "Profundización del Currículum de Lenguaje y Comunicación",
                "Metodologías para el Aprendizaje del Lenguaje",
                "Seminario de la Especialidad (Lenguaje)",
                "Práctica Profesional II: Investigación-Acción (Lenguaje)"
            ]
        },
        {
            title: "Año 5 - Semestre 10",
            mention: "math",
            courses: [
                "Diseño de Instrumentos Evaluativos (Matemática)",
                "Taller de Software y Programación",
                "Práctica Profesional III (Matemática)",
                "Seminario de Grado (Matemática)"
            ]
        },
        {
            title: "Año 5 - Semestre 10",
            mention: "language",
            courses: [
                "Diseño de Instrumentos Evaluativos (Lenguaje)",
                "Taller de Software y Multimodalidad",
                "Práctica Profesional III (Lenguaje)",
                "Seminario de Grado (Lenguaje)"
            ]
        }
    ];

    // Variables de estado
    let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || {};
    let currentMention = localStorage.getItem('currentMention')) || 'none';
    let themeColor = localStorage.getItem('themeColor')) || '#4a6fa5';

    // Elementos del DOM
    const semestersContainer = document.querySelector('.semesters-container');
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
        semestersContainer.innerHTML = '';
        
        // Filtrar semestres según la mención seleccionada
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
                
                const courseItem = document.createElement('li');
                courseItem.className = `course-item ${isCompleted ? 'completed' : ''} ${semester.mention ? 'mention-' + semester.mention : ''}`;
                courseItem.dataset.courseId = courseId;
                
                const courseName = document.createElement('span');
                courseName.textContent = course;
                
                const completeBtn = document.createElement('button');
                completeBtn.className = 'complete-btn';
                completeBtn.textContent = isCompleted ? '✓ Completado' : 'Completar';
                completeBtn.addEventListener('click', () => toggleCourseCompletion(courseId));
                
                courseItem.appendChild(courseName);
                courseItem.appendChild(completeBtn);
                courseList.appendChild(courseItem);
            });
            
            semesterEl.appendChild(semesterHeader);
            semesterEl.appendChild(courseList);
            semestersContainer.appendChild(semesterEl);
        });
    }

    // Alternar estado de completado de un curso
    function toggleCourseCompletion(courseId) {
        completedCourses[courseId] = !completedCourses[courseId];
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
        
        // Actualizar la interfaz
        const courseItem = document.querySelector(`.course-item[data-course-id="${courseId}"]`);
        if (courseItem) {
            courseItem.classList.toggle('completed');
            const btn = courseItem.querySelector('.complete-btn');
            btn.textContent = completedCourses[courseId] ? '✓ Completado' : 'Completar';
            btn.style.backgroundColor = completedCourses[courseId] ? 'var(--completed-dark)' : 'var(--primary-color)';
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

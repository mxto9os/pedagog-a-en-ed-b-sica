document.addEventListener('DOMContentLoaded', function() {
    // Cargar configuración guardada
    loadSettings();
    
    // Configurar el selector de color
    const colorPicker = document.getElementById('themeColor');
    const applyColorBtn = document.getElementById('applyColor');
    
    applyColorBtn.addEventListener('click', function() {
        const newColor = colorPicker.value;
        document.documentElement.style.setProperty('--primary-color', newColor);
        document.documentElement.style.setProperty('--primary-dark', shadeColor(newColor, -20));
        document.documentElement.style.setProperty('--primary-light', shadeColor(newColor, 20));
        
        // Guardar el color seleccionado
        localStorage.setItem('themeColor', newColor);
    });
    
    // Configurar el selector de mención
    const mentionSelect = document.getElementById('mentionSelect');
    mentionSelect.addEventListener('change', function() {
        filterCoursesByMention(this.value);
        localStorage.setItem('selectedMention', this.value);
    });
    
    // Configurar botones de completado
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const course = this.parentElement;
            course.classList.toggle('completed');
            
            // Guardar estado del curso
            const year = course.getAttribute('data-year');
            const semester = course.getAttribute('data-semester');
            const courseName = course.querySelector('span').textContent;
            const isCompleted = course.classList.contains('completed');
            
            saveCourseStatus(year, semester, courseName, isCompleted);
        });
    });
    
    // Cargar estados de cursos completados
    loadCompletedCourses();
});

function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

function filterCoursesByMention(mention) {
    const allCourses = document.querySelectorAll('.course');
    const mentionSections = document.querySelectorAll('.mention-section');
    
    if (mention === 'all') {
        allCourses.forEach(course => course.style.display = 'flex');
        mentionSections.forEach(section => section.style.display = 'block');
    } else {
        allCourses.forEach(course => {
            const courseMention = course.closest('.mention-section')?.getAttribute('data-mention');
            if (!courseMention || courseMention === mention) {
                course.style.display = 'flex';
            } else {
                course.style.display = 'none';
            }
        });
        
        mentionSections.forEach(section => {
            if (section.getAttribute('data-mention') === mention) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
}

function saveCourseStatus(year, semester, courseName, isCompleted) {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || {};
    
    if (!completedCourses[year]) {
        completedCourses[year] = {};
    }
    
    if (!completedCourses[year][semester]) {
        completedCourses[year][semester] = {};
    }
    
    completedCourses[year][semester][courseName] = isCompleted;
    
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
}

function loadCompletedCourses() {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || {};
    
    Object.keys(completedCourses).forEach(year => {
        Object.keys(completedCourses[year]).forEach(semester => {
            Object.keys(completedCourses[year][semester]).forEach(courseName => {
                if (completedCourses[year][semester][courseName]) {
                    const courseElement = findCourseElement(year, semester, courseName);
                    if (courseElement) {
                        courseElement.classList.add('completed');
                    }
                }
            });
        });
    });
}

function findCourseElement(year, semester, courseName) {
    const courses = document.querySelectorAll(`.course[data-year="${year}"][data-semester="${semester}"]`);
    
    for (let course of courses) {
        if (course.querySelector('span').textContent === courseName) {
            return course;
        }
    }
    
    return null;
}

function loadSettings() {
    // Cargar color guardado
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        document.documentElement.style.setProperty('--primary-dark', shadeColor(savedColor, -20));
        document.documentElement.style.setProperty('--primary-light', shadeColor(savedColor, 20));
        document.getElementById('themeColor').value = savedColor;
    }
    
    // Cargar mención seleccionada
    const savedMention = localStorage.getItem('selectedMention');
    if (savedMention) {
        document.getElementById('mentionSelect').value = savedMention;
        filterCoursesByMention(savedMention);
    }
}

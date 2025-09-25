document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(currentTheme);

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    const yearButtons = document.querySelectorAll('.year-btn');
    const semesterSelection = document.getElementById('semester-selection');
    const semesterButtonsContainer = document.getElementById('semester-buttons');
    const subjectList = document.getElementById('subject-list');
    const subjectsUl = document.getElementById('subjects');
    const modal = document.getElementById('syllabus-modal');
    const closeButton = document.querySelector('.close-button');
    const syllabusContent = document.getElementById('syllabus-content');

    const syllabusData = {
        '1': { // 1st Year
            '1': [ // 1st Semester
                { code: 'IP3151', name: 'Induction Programme', type: 'Induction' },
                { code: 'HS3152', name: 'Professional English - 1', type: 'Theory' },
                { code: 'MA3151', name: 'Matrices and Calculus', type: 'Theory' },
                { code: 'PH3151', name: 'Engineering Physics', type: 'Theory' },
                { code: 'CY3151', name: 'Engineering Chemistry', type: 'Theory' },
                { code: 'GE3151', name: 'Problem Solving and Python Programming', type: 'Theory' },
                { code: 'GE3152', name: 'Heritage of Tamils', type: 'Theory' },
                { code: 'GE3171', name: 'Problem Solving and Python Programming Laboratory', type: 'Laboratory' },
                { code: 'BS3171', name: 'Physics and Chemistry Laboratory', type: 'Laboratory' },
                { code: 'GE3172', name: 'English Laboratory', type: 'Laboratory' }
            ],
            '2': [ // 2nd Semester
                { code: 'HS3252', name: 'Professional English - II', type: 'Theory' },
                { code: 'MA3251', name: 'Statistics and Numerical Methods', type: 'Theory' },
                { code: 'BM3251', name: 'Biosciences for Medical Engineering', type: 'Theory' },
                { code: 'BE3251', name: 'Basic Electrical and Electronics Engineering', type: 'Theory' },
                { code: 'BM3252', name: 'Medical Physics', type: 'Theory' },
                { code: 'GE3251', name: 'Engineering Graphics', type: 'Theory' },
                { code: 'GE3252', name: 'Tamils and Technology', type: 'Theory' },
                { code: 'GE3271', name: 'Engineering Practices Laboratory', type: 'Laboratory' },
                { code: 'BM3271', name: 'Biosciences Laboratory', type: 'Laboratory' },
                { code: 'GE3272', name: 'Communication Laboratory / Foreign Language', type: 'Laboratory' }
            ]
        },
        '2': { // 2nd Year
            '3': [ // 3rd Semester
                { code: 'MA3351', name: 'Transforms and Partial Differential Equations', type: 'Theory' },
                { code: 'BM3353', name: 'Fundamentals of Electronic Devices and Circuits', type: 'Theory' },
                { code: 'BM3301', name: 'Sensors and Measurements', type: 'Theory' },
                { code: 'BM3352', name: 'Electric Circuit Analysis', type: 'Theory' },
                { code: 'BM3351', name: 'Anatomy and Human Physiology', type: 'Theory' },
                { code: 'CS3391', name: 'Object oriented programming', type: 'Theory' },
                { code: 'BM3361', name: 'Fundamentals of Electronic Devices and Circuits Laboratory', type: 'Laboratory' },
                { code: 'BM3311', name: 'Sensors and Measurements Laboratory', type: 'Laboratory' },
                { code: 'CS3381', name: 'Object oriented programming Laboratory', type: 'Laboratory' },
                { code: 'GE3361', name: 'Professional Developments', type: 'Laboratory' }
            ],
            '4': [ // 4th Semester
                { code: 'MA3355', name: 'Random Processes and Linear Algebra', type: 'Theory' },
                { code: 'BM3491', name: 'Biomedical Instrumentation', type: 'Theory' },
                { code: 'BM3402', name: 'Analog and Digital Integrated Circuits', type: 'Theory' },
                { code: 'BM3451', name: 'Bio Control Systems', type: 'Theory' },
                { code: 'BM3401', name: 'Signal Processing', type: 'Theory' },
                { code: 'GE3451', name: 'Environmental Sciences and Sustainability', type: 'Theory' },
                { code: 'BM3411', name: 'Biomedical Instrumentation Laboratory', type: 'Laboratory' },
                { code: 'BM3412', name: 'Analog and Digital Integrated Circuits Laboratory', type: 'Laboratory' }
            ]
        },
        '3': { // 3rd Year
            '5': [ // 5th Semester
                { code: 'BM3551', name: 'Embedded Systems and IoMT', type: 'Theory' },
                { code: 'BM3591', name: 'Diagnostic and Therapeutic Equipment', type: 'Theory' },
                { code: 'PEC1', name: 'Professional Elective I', type: 'Elective' },
                { code: 'PEC2', name: 'Professional Elective II', type: 'Elective' },
                { code: 'PEC3', name: 'Professional Elective III', type: 'Elective' },
                { code: 'BM3562', name: 'Embedded systems and IOMT Laboratory', type: 'Laboratory' },
                { code: 'BM3561', name: 'Diagnostic and Therapeutic Equipment Laboratory', type: 'Laboratory' }

            ],
            '6': [ // 6th Semester
                 { code: 'CS3491', name: 'Artificial Intelligence and Machine Learning', type: 'Theory' },
                 { code: 'BM3651', name: 'Fundamentals of Healthcare Analytics', type: 'Theory' },
                 { code: 'BM3652', name: 'Medical Image Processing', type: 'Theory' },
                 { code: 'OEC1', name: 'Open Elective - I', type: 'Elective' },
                 { code: 'PEC4', name: 'Professional Elective IV', type: 'Elective' },
                 { code: 'PEC5', name: 'Professional Elective V', type: 'Elective' },
                 { code: 'PEC6', name: 'Professional Elective VI', type: 'Elective' }
            ]
        },
        '4': { // 4th Year
            '7': [ // 7th Semester
                 { code: 'GE3791', name: 'Human Values and Ethics', type: 'Theory' },
                 { code: 'MGT', name: 'Management - Elective', type: 'Elective' },
                 { code: 'OEC2', name: 'Open Elective - II', type: 'Elective' },
                 { code: 'OEC3', name: 'Open Elective - III', type: 'Elective' },
                 { code: 'OEC4', name: 'Open Elective - IV', type: 'Elective' },
                 { code: 'BM3711', name: 'Hospital Training', type: 'EEC' }
            ],
            '8': [ // 8th Semester
                 { code: 'BM3811', name: 'Project Work / Internship', type: 'EEC' }
            ]
        }
    };
    
    // Fully populated syllabus details
    const syllabusDetails = {
        'IP3151': `This is a mandatory 2-week programme to be conducted as soon as the students enter the institution. The purpose of this programme is to make the students feel comfortable in their new environment, open them up, set a healthy daily routine, create bonding, and develop awareness of themselves and society.`,
        'HS3152': `<strong>COURSE OBJECTIVES:</strong><br>To improve communicative competence, learn basic grammatic structures, acquire lexical competence, use language effectively in professional contexts, and develop the ability to read and write complex texts.`,
        'MA3151': `<strong>COURSE OBJECTIVES:</strong><br>To develop matrix algebra techniques, familiarize with differential calculus, functions of several variables, techniques of integration, and evaluating multiple integrals and their applications.`,
        'PH3151': `<strong>COURSE OBJECTIVES:</strong><br>To achieve an understanding of mechanics, gain knowledge of electromagnetic waves, introduce basics of oscillations, optics, lasers, and understand the importance of quantum physics.`,
        'CY3151': `<strong>COURSE OBJECTIVES:</strong><br>To understand water quality and treatment, basics of nanomaterials, phase rule and composites, types of fuels and their properties, and principles of energy conversion and storage devices.`,
        'GE3151': `<strong>COURSE OBJECTIVES:</strong><br>To understand algorithmic problem solving, solve problems using Python, define Python functions, use Python data structures, and perform input/output with files.`,
        'GE3152': `<strong>COURSE OBJECTIVES:</strong><br>To understand Tamil as a Classical Language, its literature, heritage from rock art to modern art, folk and martial arts, Thinai concept, and the contribution of Tamils to Indian culture.`,
        'GE3171': `<strong>COURSE OBJECTIVES:</strong><br>To understand problem solving approaches, learn basic programming constructs in Python, practice computing strategies, use Python data structures, and do input/output with files.`,
        'BS3171': `<strong>COURSE OBJECTIVES (Physics):</strong><br>To learn proper use of physics laboratory equipment, data collection and interpretation, problem-solving skills, and error determination.<br><strong>COURSE OBJECTIVES (Chemistry):</strong><br>To inculcate experimental skills for water quality parameters, familiarize with electroanalytical techniques, and demonstrate analysis of metals and alloys.`,
        'GE3172': `<strong>COURSE OBJECTIVES:</strong><br>To improve communicative competence, help learners use language effectively in academic/work contexts, develop listening strategies, and build on English language skills in authentic contexts.`,
        'HS3252': `<strong>COURSE OBJECTIVES:</strong><br>To improve reading and writing skills, learn various reading strategies, understand the purpose of different types of writing, develop analytical thinking, and understand job applications and interviews.`,
        'MA3251': `<strong>COURSE OBJECTIVES:</strong><br>To provide basic concepts of statistical and numerical methods, knowledge of hypothesis testing, solving algebraic equations, and numerical techniques for interpolation, differentiation, integration, and solving ODEs.`,
        'BM3251': `<strong>COURSE OBJECTIVES:</strong><br>To study structural and functional properties of biomolecules, understand their role in metabolic diseases, gain knowledge on living organisms, and understand the etiology and remedy for pathological diseases.`,
        'BE3251': `<strong>COURSE OBJECTIVES:</strong><br>To introduce basics of electric circuits, principles of electrical machines, analog devices, fundamental concepts of digital electronics, and working of measuring instruments.`,
        'BM3252': `<strong>COURSE OBJECTIVES:</strong><br>To understand the application of radiation concepts in Medical science, principles of ionizing and non-ionizing radiation, fundamentals of acoustic waves, and effects of radiation, sound, and light on the human body.`,
        'GE3251': `<strong>COURSE OBJECTIVES:</strong><br>To prepare students for drawing engineering curves, freehand sketches, orthographic projections, development of solids, and isometric and perspective projections.`,
        'GE3252': `<strong>COURSE OBJECTIVES:</strong><br>To understand weaving and ceramic technology, design and construction technology of ancient Tamils, manufacturing technology, agriculture and irrigation technology, and scientific Tamil & Tamil computing.`,
        'GE3271': `<strong>COURSE OBJECTIVES:</strong><br>To provide hands-on training in household plumbing, wood work, electrical wiring, welding, machining, assembling mechanical equipment, sheet metal work, soldering, and assembling electronic components.`,
        'BM3271': `<strong>COURSE OBJECTIVES:</strong><br>To provide practice on estimation and quantification of biomolecules, separation of macromolecules, use of compound microscope, and practice on chemical and histopathological examinations.`,
        'GE3272': `<strong>COURSE OBJECTIVES:</strong><br>To identify and apply group discussion skills, analyze concepts and make effective presentations, communicate effectively through formal and informal writing, and use appropriate language structures.`,
        'MA3351': `<strong>COURSE OBJECTIVES:</strong><br>To introduce basic concepts of PDE, Fourier series analysis, its application in solving boundary value problems, Fourier transform techniques, and Z-transform techniques for discrete time systems.`,
        'BM3353': `<strong>COURSE OBJECTIVES:</strong><br>To introduce the concept of diodes, Bipolar Junction Transistors, and FET. To study the various model parameters of Transistors, learn about special semiconductor devices, Power & Display devices, and their applications.`,
        'BM3301': `<strong>COURSE OBJECTIVES:</strong><br>To understand the purpose and methods of measurement, errors, principles of transduction, different bridges for measurement, display and recording devices, and various types of biosensors.`,
        'BM3352': `<strong>COURSE OBJECTIVES:</strong><br>To introduce the basic concepts of DC and AC circuits, study transient and steady state response, and introduce different methods of circuit analysis using Network theorems.`,
        'BM3351': `<strong>COURSE OBJECTIVE:</strong><br>To integrate the individual functions of all the cells, tissues, and organs into a functional whole, the human body. To emphasize on the cardiovascular, respiratory, urinary, and nervous systems.`,
        'CS3391': `<strong>COURSE OBJECTIVES:</strong><br>To understand Object Oriented Programming concepts and Java basics, principles of packages, inheritance, and interfaces, develop applications with threads and generics, define exceptions, use I/O streams, and design GUI applications using JAVAFX.`,
        'BM3361': `<strong>COURSE OBJECTIVE:</strong><br>To supplement theory courses, assist in understanding the operation of electronic circuits and devices, and provide experience in analyzing network theorems.`,
        'BM3311': `<strong>COURSE OBJECTIVES:</strong><br>To introduce the relevance of this course through demonstrations and simulations. To study the characteristics of sensors, signal conditioning circuits, and display devices.`,
        'CS3381': `<strong>COURSE OBJECTIVES:</strong><br>To build software development skills using java for real-world applications and to understand and apply concepts of classes, packages, interfaces, inheritance, exception handling, and file processing.`,
        'GE3361': `<strong>COURSE OBJECTIVES:</strong><br>To be proficient in important Microsoft Office tools (MS WORD, EXCEL, POWERPOINT) for creating quality technical documents, data manipulation, and presentations.`,
        'MA3355': `<strong>COURSE OBJECTIVES:</strong><br>To introduce basic notions of vector spaces, understand concepts of linear transformations and inner product spaces, provide necessary concepts in probability and random processes, and understand standard distributions applicable to engineering.`,
        'BM3491': `<strong>COURSE OBJECTIVES:</strong><br>To understand the origin of biological signals and electrode configurations, characteristics of Bio signals, design of bioamplifiers, and measurement of non-electrical bio-parameters and biochemical measurements.`,
        'BM3402': `<strong>COURSE OBJECTIVES:</strong><br>To study the circuit configuration and applications of linear integrated circuits, concept of ADC and DAC, design of combinational digital circuits, and analysis and design procedures for sequential circuits.`,
        'BM3451': `<strong>COURSE OBJECTIVES:</strong><br>To understand feedback and continuum in systems, the need for mathematical modeling, analyze systems in time and frequency domains, understand system stability, and apply modeling to biological systems.`,
        'BM3401': `<strong>COURSE OBJECTIVES:</strong><br>To understand continuous and discrete time signals and systems, learn analysis of LTI systems using Laplace and Z transform, represent signals in frequency domain using FFT, and gain knowledge about the design of IIR and FIR filters.`,
        'GE3451': `<strong>COURSE OBJECTIVES:</strong><br>To introduce concepts of environment, ecosystems, and biodiversity, impart knowledge on environmental pollution and natural disasters, facilitate understanding of resources and their degradation, and appreciate sustainable development goals.`,
        'BM3411': `<strong>COURSE OBJECTIVES:</strong><br>To study and design Bio amplifiers and to provide hands-on training on Measurement of physiological parameters.`,
        'BM3412': `<strong>COURSE OBJECTIVES:</strong><br>To design digital logic and circuits, learn the function of different ICs, understand the applications of operational amplifiers, learn the working of multivibrators, and design circuits for generating waveforms.`,
        'BM3551': `<strong>COURSE OBJECTIVES:</strong><br>To understand fundamental embedded systems design, hardware architecture of microcontrollers, programming aspects of embedded systems, IoT architecture, and IoMT infrastructure for healthcare applications.`,
        'BM3591': `<strong>COURSE OBJECTIVES:</strong><br>To understand devices for cardiology measurement, illustrate EEG recording, demonstrate EMG recording, explain respiratory diagnostic and therapeutic devices, and understand various sensory measurements.`,
        'PEC1': `Professional Elective courses are chosen from a list of specialized subjects to deepen knowledge in a specific area of biomedical engineering. Please refer to the PDF for the list of available electives.`,
        'PEC2': `Professional Elective courses are chosen from a list of specialized subjects to deepen knowledge in a specific area of biomedical engineering. Please refer to the PDF for the list of available electives.`,
        'PEC3': `Professional Elective courses are chosen from a list of specialized subjects to deepen knowledge in a specific area of biomedical engineering. Please refer to the PDF for the list of available electives.`,
        'BM3562': `<strong>COURSE OBJECTIVES:</strong><br>To acquire knowledge and understand the hardware architecture and programming aspects of embedded system design, understand IoT architecture and build simple IoT Systems, and understand IoMT infrastructure for healthcare applications.`,
        'BM3561': `<strong>COURSE OBJECTIVES:</strong><br>To demonstrate recording and analysis of different Bio potentials and to examine different therapeutic modalities.`,
        'CS3491': `<strong>COURSE OBJECTIVES:</strong><br>To study uninformed and Heuristic search techniques, learn techniques for reasoning under uncertainty, introduce Machine Learning and supervised learning algorithms, study ensembling and unsupervised learning, and learn basics of deep learning.`,
        'BM3651': `<strong>COURSE OBJECTIVES:</strong><br>To understand statistical methods for biomedical research design, comprehend mathematical and statistical theory in Healthcare, apply regression and correlation analysis, understand Meta analysis and variance analysis, and interpret investigational methods results.`,
        'BM3652': `<strong>COURSE OBJECTIVES:</strong><br>To learn fundamental concepts of medical Image Processing, understand image intensity transformation and filtering, be familiar with segmentation and restoration techniques, gain knowledge in medical image registration and visualization, and be familiar with applications of medical image analysis.`,
        'OEC1': `Open Elective courses are chosen from a list of subjects offered by other departments to provide interdisciplinary knowledge. Please refer to the PDF for the list of available electives.`,
        'PEC4': `Professional Elective courses are chosen from a list of specialized subjects to deepen knowledge in a specific area of biomedical engineering. Please refer to the PDF for the list of available electives.`,
        'PEC5': `Professional Elective courses are chosen from a list of specialized subjects to deepen knowledge in a specific area of biomedical engineering. Please refer to the PDF for the list of available electives.`,
        'PEC6': `Professional Elective courses are chosen from a list of specialized subjects to deepen knowledge in a specific area of biomedical engineering. Please refer to the PDF for the list of available electives.`,
        'GE3791': `<strong>COURSE OBJECTIVES:</strong><br>To create awareness about values and ethics in the Constitution of India, sensitize students about democratic values, inculcate respect for all people, instill scientific temper, and promote a sense of responsibility and duties of a citizen.`,
        'MGT': `Management Elective courses provide knowledge on various management principles relevant to engineering. Please refer to the PDF for the list of available management electives.`,
        'OEC2': `Open Elective courses are chosen from a list of subjects offered by other departments to provide interdisciplinary knowledge. Please refer to the PDF for the list of available electives.`,
        'OEC3': `Open Elective courses are chosen from a list of subjects offered by other departments to provide interdisciplinary knowledge. Please refer to the PDF for the list of available electives.`,
        'OEC4': `Open Elective courses are chosen from a list of subjects offered by other departments to provide interdisciplinary knowledge. Please refer to the PDF for the list of available electives.`,
        'BM3711': `<strong>COURSE OBJECTIVES:</strong><br>To observe medical professionals at work, provide access to healthcare Professionals for better understanding of their work, and demonstrate patient-care in a hospital setting.`,
        'BM3811': `<strong>COURSE OBJECTIVES:</strong><br>To develop the ability to solve a specific problem from identification and literature review to successful solution. To train students in preparing project reports and to face reviews and viva voce examination.`
    };

    yearButtons.forEach(button => {
        button.addEventListener('click', () => {
            const year = button.dataset.year;
            populateSemesterButtons(year);
            semesterSelection.style.display = 'block';
            subjectList.style.display = 'none'; // Hide subject list when a new year is chosen
        });
    });

    function populateSemesterButtons(year) {
        semesterButtonsContainer.innerHTML = '';
        const semesters = Object.keys(syllabusData[year]);
        semesters.forEach(semester => {
            const semBtn = document.createElement('button');
            const semesterNumber = (year - 1) * 2 + parseInt(semester) - ((year > 1) ? 2 : 0);
             if (year == 1 && semester == 1) semBtn.textContent = 'Semester 1';
            else if (year == 1 && semester == 2) semBtn.textContent = 'Semester 2';
            else if (year == 2 && semester == 3) semBtn.textContent = 'Semester 3';
            else if (year == 2 && semester == 4) semBtn.textContent = 'Semester 4';
            else if (year == 3 && semester == 5) semBtn.textContent = 'Semester 5';
            else if (year == 3 && semester == 6) semBtn.textContent = 'Semester 6';
            else if (year == 4 && semester == 7) semBtn.textContent = 'Semester 7';
            else if (year == 4 && semester == 8) semBtn.textContent = 'Semester 8';


            semBtn.classList.add('semester-btn');
            semBtn.addEventListener('click', () => {
                populateSubjectList(year, semester);
                subjectList.style.display = 'block';
            });
            semesterButtonsContainer.appendChild(semBtn);
        });
    }

    function populateSubjectList(year, semester) {
        subjectsUl.innerHTML = '';
        const subjects = syllabusData[year][semester];
        subjects.forEach(subject => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${subject.code}</strong>: ${subject.name} <i>(${subject.type})</i>`;
            li.addEventListener('click', () => {
                displaySyllabus(subject.code, subject.name);
            });
            subjectsUl.appendChild(li);
        });
    }

    function displaySyllabus(code, name) {
        const details = syllabusDetails[code] || 'Syllabus details for this elective can be found in the PDF.';
        syllabusContent.innerHTML = `<h3>${name} (${code})</h3><div>${details}</div>`;
        modal.style.display = 'block';
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

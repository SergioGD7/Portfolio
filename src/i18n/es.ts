import type { Content } from './types'

export const es: Content = {
  locale: 'es',
  htmlLang: 'es',

  meta: {
    title: 'Sergio González Díaz — QA Engineer y desarrollador',
    description:
      'QA Engineer certificado ISTQB en NTT DATA con 7 años de experiencia. Automatización con Playwright y TypeScript, pruebas de API, CI/CD y aplicaciones web con Next.js y Java.',
  },

  nav: {
    sections: {
      home: 'Inicio',
      about: 'Sobre mí',
      skills: 'Skills',
      experience: 'Experiencia',
      work: 'Proyectos',
      certifications: 'Certificaciones',
      contact: 'Contacto',
    },
    jumpTo: 'Ir a…',
    getInTouch: 'Hablemos',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    backToTop: 'Volver arriba',
    skipToContent: 'Saltar al contenido',
    language: 'Idioma',
    switchTo: 'View in English',
  },

  preloader: {
    checks: [
      'resolviendo recursos',
      'compilando shaders',
      'calentando el campo de partículas',
      'todas las suites en verde',
    ],
  },

  hero: {
    availability: 'Abierto a nuevas oportunidades',
    location: 'Salamanca, España',
    roles: ['QA Engineer', 'Automatización', 'Desarrollador Java', 'Coordinador de equipo'],
    tagline:
      'Siete años asegurando que el software hace lo que prometió: desde dispositivos IoT y descodificadores hasta plataformas del sector público.',
    viewWork: 'Ver mis proyectos',
    downloadCv: 'Descargar CV',
    sayHi: 'O simplemente saluda',
    scroll: 'Scroll',
    stats: [
      { value: '7', label: 'Años en QA y desarrollo' },
      { value: '6', label: 'Certificaciones' },
      { value: '5', label: 'Proyectos propios' },
    ],
  },

  marquee: [
    'ISTQB CTFL',
    'Playwright',
    'TypeScript',
    'Pruebas de API',
    'BDD / Gherkin',
    'Postman',
    'CI/CD',
    'GitLab',
    'Podman',
    'Java',
    'Python',
    'SQL',
    'Testmo · Jira · Xray',
    'Regresión',
    'UAT',
  ],

  about: {
    heading: {
      eyebrow: 'Sobre mí',
      title: 'Dos disciplinas,',
      highlight: 'un mismo instinto.',
    },
    bio: [
      'Empecé programando en Java en Viewnext, en el aplicativo de Catálogo de El Corte Inglés. Cuando se formó el equipo de Testing me eligieron para centralizar las pruebas del Catálogo, precisamente porque conocía su arquitectura y su lógica de negocio desde dentro. Sigue siendo aquello en lo que más me apoyo: sé cómo se construye una funcionalidad, así que sé dónde tiende a romperse.',
      'Desde entonces llevo siete años en aseguramiento de calidad, la mayoría en NTT DATA: primero en el ecosistema de hogar digital de Telefónica, donde acabé coordinando el equipo de QA, y después en EJIE, la Sociedad Informática del Gobierno Vasco, automatizando con Playwright y TypeScript.',
      'Me importa el "por qué" de todo: cómo funciona un sistema de verdad por debajo, no cómo se supone que funciona. Esa curiosidad es lo que convierte un reporte vago en un caso reproducible, y una suite que pasa en una que realmente protege el producto.',
    ],
    facts: [
      { label: 'Ubicación', value: 'Salamanca, España' },
      { label: 'Especialidad', value: 'Ingeniería de calidad' },
      { label: 'Automatizo con', value: 'Playwright · TypeScript' },
      { label: 'Idiomas', value: 'Español · Inglés B2' },
    ],
    roleCaption: 'QA Engineer y desarrollador',
    principles: [
      {
        title: 'Reproducir antes de reportar',
        body: 'Un bug que no se puede reproducir es un rumor. Persigo los pasos exactos, el estado exacto y la build exacta antes de que algo llegue a un ticket.',
      },
      {
        title: 'Leer el código que pruebas',
        body: 'Venir de desarrollo significa que puedo abrir la pull request, seguir la lógica y apuntar las pruebas a la rama que de verdad pinta frágil.',
      },
      {
        title: 'Automatizar la mitad aburrida',
        body: 'Las comprobaciones repetitivas son cosa de una máquina. Eso libera horas humanas para pruebas exploratorias, que es donde viven los defectos interesantes.',
      },
      {
        title: 'La calidad es un deporte de equipo',
        body: 'He hecho onboarding a nuevas incorporaciones, mentorizado a becarios y me he sentado en planificación con desarrollo, producto y management. El testing funciona mejor cuando empieza antes de la primera línea de código.',
      },
    ],
  },

  skills: {
    heading: {
      eyebrow: 'Skills',
      title: 'Con lo que trabajo',
      highlight: 'de verdad.',
      description:
        'Agrupadas por para qué sirven, en lugar de volcadas en una sola lista. Elige una categoría para filtrar.',
    },
    everything: 'Todo',
    everythingBlurb: 'Todo, de principio a fin.',
    groups: {
      qa: {
        title: 'Aseguramiento de calidad',
        blurb: 'Diseñar la red de seguridad tras la que sale un producto.',
        items: [
          'ISTQB CTFL',
          'Planes y estrategia de pruebas',
          'Pruebas manuales',
          'Pruebas de regresión',
          'Pruebas UAT',
          'Pruebas funcionales',
          'Pruebas de API',
          'Pruebas end-to-end',
          'Testing móvil — Android e iOS',
          'Testing de IoT y descodificadores',
          'Estimación de pruebas',
          'Planificación de pruebas por sprint',
          'Análisis de requisitos',
        ],
      },
      automation: {
        title: 'Automatización y herramientas',
        blurb: 'Convertir comprobaciones repetitivas en algo que ejecuta una máquina.',
        items: [
          'Playwright',
          'Selenium',
          'BDD',
          'Gherkin',
          'Postman',
          'Testmo',
          'Zephyr',
          'Xray',
          'Jira y Confluence',
          'ServiceNow',
        ],
      },
      engineering: {
        title: 'Desarrollo',
        blurb: 'La mitad de desarrollador: lo que me permite leer el código que pruebo.',
        items: [
          'TypeScript',
          'JavaScript',
          'Java',
          'Java EE',
          'JSP',
          'Python',
          'SQL',
          'Oracle',
          'MongoDB',
          'HTML y CSS',
          'Android',
          'Dojo Framework',
        ],
      },
      devops: {
        title: 'DevOps y plataforma',
        blurb: 'Donde las pruebas se ejecutan de verdad.',
        items: [
          'Git y GitLab',
          'Pipelines CI/CD',
          'Podman',
          'Dynatrace',
          'BackstageOSS',
          'AnthillPro',
          'Kiuwan',
          'Documentación en Markdown',
        ],
      },
      team: {
        title: 'Equipo y proceso',
        blurb: 'La parte del trabajo que no es código.',
        items: [
          'Coordinación de equipo QA',
          'Onboarding y mentoría',
          'Formación de becarios',
          'Gestión de proyectos',
          'Ceremonias ágiles',
          'Interlocución con stakeholders',
        ],
      },
    },
  },

  experience: {
    heading: {
      eyebrow: 'Experiencia',
      title: 'Siete años,',
      highlight: 'una misma dirección.',
    },
    currentBadge: 'Más reciente',
    entries: {
      'ntt-ejie': {
        role: 'QA Tester — Centers Senior Specialist',
        company: 'NTT DATA · EJIE (Gobierno Vasco)',
        period: 'Nov 2025 — Mar 2026',
        location: 'Salamanca, España',
        summary:
          'Tras la finalización del proyecto con Telefónica me incorporé al equipo asignado a EJIE, la Sociedad Informática del Gobierno Vasco, pasando de un QA principalmente manual a automatización y trabajo de plataforma.',
        blocks: [
          {
            label: 'QA y automatización',
            items: [
              'Diseño, actualización y mantenimiento de casos de prueba',
              'Automatización de pruebas con TypeScript y Playwright',
              'Ejecución y validación de APIs mediante Postman',
              'Gestión de proyectos y ciclos de pruebas de las iniciativas de EJIE a través de Testmo',
            ],
          },
          {
            label: 'Desarrollo y herramientas',
            items: [
              'Desarrollo de scripts en Python y JavaScript',
              'Integración de herramientas de inteligencia artificial para mejorar la eficiencia del entorno de trabajo',
              'Redacción y mantenimiento de documentación técnica en Markdown',
              'Actualización de la documentación existente del modelo SQA en BatArin',
            ],
          },
          {
            label: 'DevOps y monitorización',
            items: [
              'Control de versiones con Git y gestión de repositorios en GitLab, incluyendo ejecución de pipelines CI/CD',
              'Gestión y ejecución de contenedores con Podman',
              'Portales para desarrolladores con BackstageOSS',
              'Resolución de incidencias de AnthillPro y formación básica de Dynatrace',
            ],
          },
          {
            label: 'Gestión ágil y liderazgo',
            items: [
              'Gestión de tareas y seguimiento de sprints mediante ServiceNow',
              'Mentorización y formación técnica en QA a perfiles en prácticas',
            ],
          },
        ],
      },
      'ntt-telefonica-senior': {
        role: 'QA Tester — Centers Senior Specialist',
        company: 'NTT DATA · Telefónica',
        period: 'Ene 2024 — Nov 2025',
        location: 'Salamanca, España',
        summary:
          'Lideré el QA de las releases de Telefónica: definía la estrategia, coordinaba el equipo y era la voz de calidad en la mesa con desarrollo, producto y management.',
        blocks: [
          {
            label: 'Gestión ágil y liderazgo',
            items: [
              'Coordinación del equipo de QA, incluyendo asignación de tareas y onboarding de nuevas incorporaciones',
              'Liderazgo de la planificación de pruebas y definición de objetivos para futuras releases',
              'Interlocución constante y alineamiento con Desarrollo, Producto, Tech Leads y Management',
            ],
          },
          {
            label: 'Análisis y diseño de pruebas',
            items: [
              'Análisis de requisitos, historias de usuario y criterios de aceptación en Confluence',
              'Estimación de esfuerzos y tiempos para escenarios y fases de prueba',
              'Diseño integral de la estrategia de QA: test plans y escenarios BDD en Gherkin, integrados en Jira',
              'Preparación y configuración de entornos, aplicaciones y dispositivos de prueba',
            ],
          },
          {
            label: 'Ejecución y reporte',
            items: [
              'Ejecución de pruebas funcionales ágiles (fase Freeze) y de regresión (fase Done)',
              'Pruebas de integración con el back-end y validación de APIs mediante Postman',
              'Monitorización del proceso y elaboración de informes detallados de ejecución',
            ],
          },
        ],
      },
      'ntt-telefonica-specialist': {
        role: 'QA Tester — Centers Specialist',
        company: 'NTT DATA · Telefónica',
        period: 'Feb 2021 — Dic 2023',
        location: 'Salamanca, España',
        summary:
          'Ascenso a Centers Specialist a los seis meses de la incorporación, como reconocimiento al rendimiento y a la rápida adaptación al proyecto.',
        blocks: [
          {
            items: [
              'Asunción de mayores responsabilidades técnicas y operativas dentro del equipo de QA de Telefónica',
              'Gestión autónoma e integral, de extremo a extremo, de proyectos específicos de testing',
              'Cumplimiento de los estándares de calidad del cliente',
            ],
          },
        ],
      },
      'everis-junior': {
        role: 'QA Tester — Centers Junior',
        company: 'everis',
        period: 'Ago 2020 — Feb 2021',
        location: 'Salamanca, España',
        summary:
          'Incorporación a «QA Digital Home Services», el programa de aseguramiento de calidad del ecosistema de hogar digital de Telefónica.',
        blocks: [
          {
            items: [
              'Testing de dispositivos (IoT): ejecución de pruebas manuales y validación funcional sobre dispositivos físicos inteligentes, destacando Movistar Home',
              'Testing multiplataforma: verificación de calidad y reporte de incidencias en diversas aplicaciones móviles del cliente',
              'Testing en TV y descodificadores: certificación y validación funcional de aplicaciones web integradas en los descodificadores (Living Apps)',
            ],
          },
        ],
      },
      'viewnext-qa': {
        role: 'QA Tester',
        company: 'Viewnext · El Corte Inglés',
        period: 'Feb 2020 — Jun 2020',
        location: 'Salamanca, España',
        summary:
          'El salto de desarrollo a QA. Me seleccionaron para el nuevo equipo de Testing para centralizar las pruebas del Catálogo, precisamente por conocer su arquitectura y su lógica de negocio de haber trabajado sobre él.',
        blocks: [
          {
            items: [
              'Ampliación de responsabilidades al aseguramiento de calidad del aplicativo de Promociones',
              'Análisis funcional de requisitos y diseño integral de planes de prueba',
              'Ejecución de pruebas funcionales y validación de flujos de negocio end-to-end',
              'Validación de servicios y pruebas de integración de APIs con Postman',
              'Manejo avanzado del Sistema de Gestión de Promociones (SGP) para configurar entornos y escenarios',
              'Simulación y verificación de pedidos a través del sistema operativo CSC',
            ],
          },
        ],
      },
      'viewnext-dev': {
        role: 'Desarrollador Java junior',
        company: 'Viewnext · El Corte Inglés',
        period: 'Jun 2019 — Feb 2020',
        location: 'Salamanca, España',
        summary:
          'Tras el periodo de prácticas me incorporé a plantilla para seguir evolucionando el aplicativo de Catálogo de El Corte Inglés e integrar APIs propietarias.',
        blocks: [
          {
            label: 'Desarrollo y mantenimiento',
            items: [
              'Programación de nuevos evolutivos y soportes',
              'Resolución de incidencias técnicas',
              'Análisis estático y optimización continua de la calidad del código mediante Kiuwan',
              'Cobertura de guardias técnicas para garantizar la estabilidad del sistema',
            ],
          },
          {
            label: 'Gestión y documentación',
            items: [
              'Interlocución técnica directa con el equipo de Arquitectura de Software',
              'Elaboración y mantenimiento de documentación técnica detallada (manuales y DTAN)',
              'Participación activa en reuniones de seguimiento y coordinación',
            ],
          },
          {
            label: 'Stack',
            items: ['Java, Java EE, JavaScript, Dojo Framework, SQL / Oracle, MongoDB'],
          },
        ],
      },
      'viewnext-intern': {
        role: 'Estudiante en prácticas',
        company: 'Viewnext · El Corte Inglés',
        period: 'Feb 2019 — May 2019',
        location: 'Salamanca, España',
        summary:
          'Mi primer contacto con una base de código en producción, en dos áreas del proyecto de El Corte Inglés.',
        blocks: [
          {
            items: [
              'Colaboración en el aplicativo de la Intranet, consolidando desarrollo web con Servlets y jQuery',
              'Incorporación al equipo del Catálogo y aprendizaje de su ecosistema de APIs y aplicaciones propietarias',
              'Tareas de soporte y desarrollo de evolutivos en Java, Java EE y JavaScript',
            ],
          },
        ],
      },
      'dam-degree': {
        role: 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma',
        company: 'Colegio Santísima Trinidad',
        period: 'Ago 2017 — Abr 2019',
        location: 'Salamanca, España',
        summary:
          'Fundamentos de programación, bases de datos y desarrollo multiplataforma, desde Java de escritorio hasta móvil y web.',
        blocks: [
          {
            items: [
              'Java, bases de datos relacionales y diseño de software',
              'Primer proyecto publicado: Memorion',
            ],
          },
        ],
      },
    },
  },

  projects: {
    heading: {
      eyebrow: 'Proyectos',
      title: 'Cosas que construí',
      highlight: 'y luego rompí a propósito.',
      description:
        'Proyectos personales, llevados de principio a fin: diseño, implementación y el pase de pruebas que viene después.',
    },
    demo: 'Demo',
    code: 'Código',
    more: 'Todo lo demás está en GitHub',
    entries: {
      'masters-of-poker': {
        title: 'Masters of Poker',
        kicker: 'Motor de juego · Evaluación de manos',
        description:
          'Póker clásico contra un número configurable de jugadores, con ronda de apuestas completa, ranking de manos y un simulador de manos independiente. Lo interesante es el evaluador: puntuar correctamente todas las manos posibles de cinco cartas es exactamente el tipo de lógica que necesita una suite de pruebas exhaustiva detrás.',
      },
      'workout-planner': {
        title: 'Workout Planner',
        kicker: 'CRUD · Gráficas · Calendario',
        description:
          'Un planificador de entrenamientos donde creas rutinas, añades ejercicios y registras series, repeticiones y peso de cada uno. Ejercicios personalizados, flujos de edición y borrado, una gráfica de progreso sobre el periodo que elijas y una vista de calendario con todo lo realizado cada día.',
      },
      snake: {
        title: 'Snake',
        kicker: 'Bucle en tiempo real · Niveles',
        description:
          'El clásico arcade reconstruido para el navegador: cuatro niveles de dificultad, control de inicio y pausa, escenarios generados aleatoriamente, sistema de puntuación y ranking con los diez mejores resultados.',
      },
      'numbers-duel': {
        title: 'Duelo de Números',
        kicker: 'Por turnos · Dos jugadores',
        description:
          'Dos jugadores tiran los dados y eliminan la pieza que coincide con el resultado; una vez eliminada, el rival ya no puede reclamarla. Gana quien elimine la última pieza. Un juego pequeño con una cantidad sorprendente de casos límite en el orden de turnos.',
      },
      memorion: {
        title: 'Memorion',
        kicker: 'Java · Mi primer proyecto publicado',
        description:
          'Un juego de memoria escrito en Java durante el grado: encontrar todas las parejas en el menor tiempo y con el menor número de intentos, guardar y cargar una partida en curso y persistir los resultados en un ranking que se muestra al terminar.',
      },
    },
  },

  certifications: {
    heading: {
      eyebrow: 'Certificaciones',
      title: 'Credenciales,',
      highlight: 'no solo afirmaciones.',
      description: 'Cada credencial enlaza directamente a su certificado verificable.',
    },
    seeCertificate: 'Ver certificado',
    entries: {
      istqb: {
        title: 'ISTQB® Certified Tester — Foundation Level',
        issuer: 'iSQI',
        description:
          'El núcleo de la profesión de testing: técnicas, diseño de pruebas, la terminología que se usa en toda la industria y cómo encaja el trabajo de calidad en un ciclo de entrega.',
      },
      'genai-yb2': {
        title: 'GenAI Academy — Yellow Belt Nivel 2',
        issuer: 'NTT DATA',
        description:
          'IA generativa a lo largo del ciclo de entrega: generación y refactorización de código bajo revisión humana, refinamiento de requisitos, análisis técnico y testing y CI/CD asistidos por IA.',
      },
      selenium: {
        title: 'Selenium',
        issuer: 'NTT DATA University',
        description:
          'La suite de automatización open source: una única interfaz para dirigir navegadores desde varios lenguajes, y cómo se combinan sus herramientas para cubrir distintas necesidades de prueba.',
      },
      python: {
        title: 'Python',
        issuer: 'NTT DATA University',
        description:
          'Python para scripting, automatización y utilidades: el lenguaje al que recurro cuando una tarea de testing necesita código pegamento.',
      },
      'genai-yb1': {
        title: 'GenAI Academy — Yellow Belt Nivel 1',
        issuer: 'NTT DATA',
        description:
          'IA generativa aplicada para desarrolladores: patrones de prompting, selección de herramientas y mantener a la persona en el bucle.',
      },
      jira: {
        title: 'Curso técnico operativo de Jira',
        issuer: 'uLearn',
        description:
          'Jira como columna vertebral de un proceso de pruebas: flujos de trabajo, tipos de incidencia y reporting para equipos de QA.',
      },
    },
  },

  contact: {
    heading: {
      eyebrow: 'Contacto',
      title: '¿Tienes algo',
      highlight: 'que merezca probarse?',
      description:
        'Abierto a puestos de QA y desarrollo, y encantado de hablar de cualquier cosa relacionada con la calidad. Usa el formulario o escríbeme directamente.',
    },
    name: 'Nombre',
    email: 'Email',
    message: 'Mensaje',
    namePlaceholder: 'Ada Lovelace',
    emailPlaceholder: 'ada@ejemplo.com',
    messagePlaceholder: '¿En qué estás trabajando?',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sent: 'Enviado',
    copyEmail: 'Copiar dirección de email',
    honeypotLabel: 'Deja esto vacío',
    errors: {
      name: 'Dime cómo llamarte.',
      email: 'Eso no parece una dirección de email.',
      message: 'Un poco más de detalle, por favor: mínimo 10 caracteres.',
      incomplete: 'Todavía hay campos que necesitan atención.',
    },
    success: 'Mensaje enviado. Suelo responder en un par de días.',
    failure: (email) => `Algo ha fallado al enviarlo. Escríbeme directamente a ${email}.`,
  },

  footer: {
    workTogether: 'Trabajemos juntos',
    blurb:
      'QA Engineer y desarrollador. Pruebo lo que otros construyen y construyo cosas que merecen probarse.',
    sectionsTitle: 'Secciones',
    elsewhereTitle: 'En otros sitios',
    colophon: (year) =>
      `© ${year} Sergio González Díaz · Hecho con React, Three.js y demasiados casos de prueba`,
    backToTop: 'Volver arriba ↑',
  },

  palette: {
    placeholder: 'Buscar secciones, proyectos, enlaces…',
    groups: {
      navigate: 'Navegar',
      projects: 'Proyectos',
      certifications: 'Certificaciones',
      links: 'Enlaces',
      actions: 'Acciones',
    },
    section: 'Sección',
    copyEmail: 'Copiar dirección de email',
    sendEmail: 'Enviarme un email',
    noMatches: (query) => `Sin resultados para «${query}»`,
    navigateHint: '↑↓ navegar',
    openHint: '↵ abrir',
    results: (n) => `${n} resultados`,
  },
}

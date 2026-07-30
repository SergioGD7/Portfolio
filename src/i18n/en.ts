import type { Content } from './types'

export const en: Content = {
  locale: 'en',
  htmlLang: 'en',

  meta: {
    title: 'Sergio González Díaz — QA Engineer & Developer',
    description:
      'ISTQB-certified QA Engineer at NTT DATA with 7 years of experience. Test automation with Playwright and TypeScript, API testing, CI/CD, and web apps built with Next.js and Java.',
  },

  nav: {
    sections: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      work: 'Work',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    jumpTo: 'Jump to…',
    getInTouch: 'Get in touch',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    backToTop: 'Back to top',
    skipToContent: 'Skip to content',
    language: 'Language',
    switchTo: 'Ver en español',
  },

  preloader: {
    checks: ['resolving assets', 'compiling shaders', 'warming particle field', 'all suites green'],
  },

  hero: {
    availability: 'Open to new opportunities',
    location: 'Salamanca, Spain',
    roles: ['QA Engineer', 'Test Automation', 'Java Developer', 'Team Lead'],
    tagline:
      'Seven years making sure software does what it promised — from IoT devices and set-top boxes to public-sector platforms.',
    viewWork: 'View my work',
    downloadCv: 'Download CV',
    sayHi: 'Or just say hi',
    scroll: 'Scroll',
    stats: [
      { value: '7', label: 'Years in QA & development' },
      { value: '6', label: 'Certifications' },
      { value: '5', label: 'Side projects shipped' },
    ],
  },

  marquee: [
    'ISTQB CTFL',
    'Playwright',
    'TypeScript',
    'API testing',
    'BDD / Gherkin',
    'Postman',
    'CI/CD',
    'GitLab',
    'Podman',
    'Java',
    'Python',
    'SQL',
    'Testmo · Jira · Xray',
    'Regression',
    'UAT',
  ],

  about: {
    heading: {
      eyebrow: 'About',
      title: 'Two disciplines,',
      highlight: 'one instinct.',
    },
    bio: [
      'I started out writing Java at Viewnext, on the catalogue application for El Corte Inglés. When a testing team was formed, I was picked to own the catalogue test suite — precisely because I already knew its architecture and business logic from the inside. That is still the thing I lean on most: I know how a feature is built, so I know where it tends to break.',
      'Since then I have spent seven years in quality assurance, most of it at NTT DATA — first on Telefónica’s digital home ecosystem, where I ended up coordinating the QA team, and later on EJIE, the Basque Government’s IT company, automating with Playwright and TypeScript.',
      'I care about the "why" behind everything — how a system actually works under the hood, not just how it is supposed to. That curiosity is what turns a vague bug report into a reproducible case, and a passing test suite into one that actually protects the product.',
    ],
    facts: [
      { label: 'Based in', value: 'Salamanca, Spain' },
      { label: 'Focus', value: 'Quality engineering' },
      { label: 'Automating with', value: 'Playwright · TypeScript' },
      { label: 'Languages', value: 'Spanish · English B2' },
    ],
    roleCaption: 'QA Engineer & Developer',
    principles: [
      {
        title: 'Reproduce before you report',
        body: 'A bug that cannot be reproduced is a rumour. I chase the exact steps, the exact state and the exact build before anything reaches a ticket.',
      },
      {
        title: 'Read the code you test',
        body: 'Coming from development means I can open the pull request, follow the logic and aim my tests at the branch that actually looks fragile.',
      },
      {
        title: 'Automate the boring half',
        body: 'Repeatable checks belong to a machine. That frees the human hours for exploratory testing, where the interesting defects actually live.',
      },
      {
        title: 'Quality is a team sport',
        body: 'I have onboarded new joiners, mentored interns and sat in planning with development, product and management. Testing works best when it starts before a single line is written.',
      },
    ],
  },

  skills: {
    heading: {
      eyebrow: 'Skills',
      title: 'What I actually',
      highlight: 'work with.',
      description:
        'Grouped by what they are for, rather than dumped in one list. Pick a category to narrow it down.',
    },
    everything: 'Everything',
    everythingBlurb: 'Everything, end to end.',
    groups: {
      qa: {
        title: 'Quality Assurance',
        blurb: 'Designing the safety net a product ships behind.',
        items: [
          'ISTQB CTFL',
          'Test plans & strategy',
          'Manual testing',
          'Regression testing',
          'UAT testing',
          'Functional testing',
          'API testing',
          'End-to-end testing',
          'Mobile testing — Android & iOS',
          'IoT & set-top box testing',
          'Test estimation',
          'Sprint test planning',
          'Requirements analysis',
        ],
      },
      automation: {
        title: 'Automation & Tooling',
        blurb: 'Turning repeatable checks into something a machine runs.',
        items: [
          'Playwright',
          'Selenium',
          'BDD',
          'Gherkin',
          'Postman',
          'Testmo',
          'Zephyr',
          'Xray',
          'Jira & Confluence',
          'ServiceNow',
        ],
      },
      engineering: {
        title: 'Engineering',
        blurb: 'The developer half — what lets me read the code I test.',
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
          'HTML & CSS',
          'Android',
          'Dojo Framework',
        ],
      },
      devops: {
        title: 'DevOps & Platform',
        blurb: 'Where the tests actually run.',
        items: [
          'Git & GitLab',
          'CI/CD pipelines',
          'Podman',
          'Dynatrace',
          'BackstageOSS',
          'AnthillPro',
          'Kiuwan',
          'Markdown docs',
        ],
      },
      team: {
        title: 'Team & Process',
        blurb: 'The part of the job that is not code.',
        items: [
          'QA team coordination',
          'Onboarding & mentoring',
          'Intern training',
          'Project management',
          'Agile ceremonies',
          'Stakeholder alignment',
        ],
      },
    },
  },

  experience: {
    heading: {
      eyebrow: 'Experience',
      title: 'Seven years,',
      highlight: 'one direction.',
    },
    currentBadge: 'Latest',
    entries: {
      'ntt-ejie': {
        role: 'QA Tester — Centers Senior Specialist',
        company: 'NTT DATA · EJIE (Basque Government IT)',
        period: 'Nov 2025 — Mar 2026',
        location: 'Salamanca, Spain',
        summary:
          'After the Telefónica programme wrapped up, I joined the team assigned to EJIE, the Basque Government’s IT company, moving from mostly-manual QA into automation and platform work.',
        blocks: [
          {
            label: 'QA & automation',
            items: [
              'Designed, updated and maintained the test case suite',
              'Automated tests with TypeScript and Playwright',
              'Executed and validated APIs with Postman',
              'Ran project and test cycle management for EJIE initiatives in Testmo',
            ],
          },
          {
            label: 'Development & tooling',
            items: [
              'Wrote scripts in Python and JavaScript',
              'Introduced AI tooling to speed up day-to-day work',
              'Authored and maintained technical documentation in Markdown',
              'Updated the existing SQA model documentation in BatArin',
            ],
          },
          {
            label: 'DevOps & monitoring',
            items: [
              'Version control with Git and repository management in GitLab, including CI/CD pipeline runs',
              'Managed and ran containers with Podman',
              'Worked with BackstageOSS developer portals',
              'Resolved AnthillPro incidents; foundational Dynatrace training',
            ],
          },
          {
            label: 'Agile & leadership',
            items: [
              'Task management and sprint tracking in ServiceNow',
              'Mentored and technically trained QA interns',
            ],
          },
        ],
      },
      'ntt-telefonica-senior': {
        role: 'QA Tester — Centers Senior Specialist',
        company: 'NTT DATA · Telefónica',
        period: 'Jan 2024 — Nov 2025',
        location: 'Salamanca, Spain',
        summary:
          'Led QA for Telefónica releases: I owned the strategy, coordinated the team and was the QA voice in the room with development, product and management.',
        blocks: [
          {
            label: 'Agile & leadership',
            items: [
              'Coordinated the QA team, assigning work and onboarding new joiners',
              'Led test planning and defined objectives for upcoming releases',
              'Kept continuous alignment with Development, Product, Tech Leads and Management',
            ],
          },
          {
            label: 'Analysis & test design',
            items: [
              'Analysed requirements, user stories and acceptance criteria in Confluence',
              'Estimated effort and timelines for test scenarios and phases',
              'Built the end-to-end QA strategy: test plans and BDD scenarios in Gherkin, integrated into Jira',
              'Prepared test environments, applications and devices',
            ],
          },
          {
            label: 'Execution & reporting',
            items: [
              'Ran agile functional testing (Freeze) and regression testing (Done)',
              'Performed back-end integration testing and API validation with Postman',
              'Monitored the process and produced detailed execution reports',
            ],
          },
        ],
      },
      'ntt-telefonica-specialist': {
        role: 'QA Tester — Centers Specialist',
        company: 'NTT DATA · Telefónica',
        period: 'Feb 2021 — Dec 2023',
        location: 'Salamanca, Spain',
        summary:
          'Promoted to Centers Specialist six months after joining, in recognition of performance and how quickly I got up to speed on the project.',
        blocks: [
          {
            items: [
              'Took on greater technical and operational responsibility inside Telefónica’s QA team',
              'Owned specific testing projects end to end, autonomously',
              'Held the work to the client’s quality standards',
            ],
          },
        ],
      },
      'everis-junior': {
        role: 'QA Tester — Centers Junior',
        company: 'everis',
        period: 'Aug 2020 — Feb 2021',
        location: 'Salamanca, Spain',
        summary:
          'Joined "QA Digital Home Services", the quality assurance programme for Telefónica’s digital home ecosystem.',
        blocks: [
          {
            items: [
              'Device (IoT) testing: manual execution and functional validation on physical smart devices, notably Movistar Home',
              'Cross-platform testing: quality verification and defect reporting across the client’s mobile apps',
              'TV / set-top box testing: certification of web applications embedded directly in television decoders (Living Apps)',
            ],
          },
        ],
      },
      'viewnext-qa': {
        role: 'QA Tester',
        company: 'Viewnext · El Corte Inglés',
        period: 'Feb 2020 — Jun 2020',
        location: 'Salamanca, Spain',
        summary:
          'The move from development into QA. I was picked for the new testing team to centralise catalogue testing, precisely because I knew its architecture and business logic from having built on it.',
        blocks: [
          {
            items: [
              'Extended ownership to quality assurance for the Promotions application',
              'Functional requirement analysis and end-to-end test plan design',
              'Functional testing and validation of E2E business flows',
              'Service validation and API integration testing with Postman',
              'Advanced use of the Promotions Management System (SGP) to configure environments and scenarios',
              'Simulated and verified orders through the CSC operating system',
            ],
          },
        ],
      },
      'viewnext-dev': {
        role: 'Junior Java Developer',
        company: 'Viewnext · El Corte Inglés',
        period: 'Jun 2019 — Feb 2020',
        location: 'Salamanca, Spain',
        summary:
          'Hired onto the payroll after my placement, continuing to evolve the El Corte Inglés catalogue application and integrating proprietary APIs.',
        blocks: [
          {
            label: 'Development & maintenance',
            items: [
              'Built new features and support work',
              'Resolved technical incidents',
              'Static analysis and continuous code quality improvement with Kiuwan',
              'Covered technical on-call to keep the system available',
            ],
          },
          {
            label: 'Documentation & coordination',
            items: [
              'Direct technical liaison with the Software Architecture team',
              'Wrote and maintained detailed technical documentation (manuals, DTAN)',
              'Active participation in team follow-up and coordination meetings',
            ],
          },
          {
            label: 'Stack',
            items: ['Java, Java EE, JavaScript, Dojo Framework, SQL / Oracle, MongoDB'],
          },
        ],
      },
      'viewnext-intern': {
        role: 'Software Development Intern',
        company: 'Viewnext · El Corte Inglés',
        period: 'Feb 2019 — May 2019',
        location: 'Salamanca, Spain',
        summary:
          'My first contact with a production codebase, across two areas of the El Corte Inglés project.',
        blocks: [
          {
            items: [
              'Contributed to the Intranet application, consolidating web development with Servlets and jQuery',
              'Joined the Catalogue team and learned its ecosystem of proprietary APIs and applications',
              'Handled support tasks and built new features in Java, Java EE and JavaScript',
            ],
          },
        ],
      },
      'dam-degree': {
        role: 'Higher Diploma in Multiplatform Application Development',
        company: 'Colegio Santísima Trinidad',
        period: 'Aug 2017 — Apr 2019',
        location: 'Salamanca, Spain',
        summary:
          'Foundations in programming, databases and multiplatform development, from desktop Java to mobile and web.',
        blocks: [
          {
            items: [
              'Java, relational databases and software design',
              'First shipped project: Memorion',
            ],
          },
        ],
      },
    },
  },

  projects: {
    heading: {
      eyebrow: 'Selected work',
      title: 'Things I built',
      highlight: 'and then broke on purpose.',
      description:
        'Personal projects, shipped end to end — design, implementation and the test pass that follows.',
    },
    demo: 'Demo',
    code: 'Code',
    more: 'Everything else lives on GitHub',
    entries: {
      'masters-of-poker': {
        title: 'Masters of Poker',
        kicker: 'Game engine · Hand evaluation',
        description:
          'Classic poker against a configurable number of players, with a full betting round, hand ranking and a standalone hand simulator. The interesting part is the evaluator: ranking every possible five-card hand correctly is exactly the kind of logic that needs an exhaustive test suite behind it.',
      },
      'workout-planner': {
        title: 'Workout Planner',
        kicker: 'CRUD · Charts · Calendar',
        description:
          'A training planner where you build workouts, add exercises, and track sets, reps and weight per exercise. Custom exercises, edit and delete flows, a progress chart over a selectable period, and a calendar view of everything performed each day.',
      },
      snake: {
        title: 'Snake',
        kicker: 'Real-time loop · Difficulty tiers',
        description:
          'The arcade classic rebuilt for the browser: four difficulty levels, start and pause control, randomly generated scenarios, a scoring system and a top-ten leaderboard.',
      },
      'numbers-duel': {
        title: 'Numbers Duel',
        kicker: 'Turn-based · Two players',
        description:
          'Two players roll dice and remove the piece matching the result — once a piece is gone the opponent can no longer claim it. Whoever removes the last piece wins. A small game with a surprising number of turn-order edge cases.',
      },
      memorion: {
        title: 'Memorion',
        kicker: 'Java · My first shipped project',
        description:
          'A memory game written in Java during my degree: find every pair in the shortest time and the fewest attempts, save and load a game in progress, and persist results into a ranking shown at the end.',
      },
    },
  },

  certifications: {
    heading: {
      eyebrow: 'Certifications',
      title: 'Credentials,',
      highlight: 'not just claims.',
      description: 'Every badge below links straight to its verifiable certificate.',
    },
    seeCertificate: 'See certificate',
    entries: {
      istqb: {
        title: 'ISTQB® Certified Tester — Foundation Level',
        issuer: 'iSQI',
        description:
          'The core of the testing profession: techniques, test design, the vocabulary used across the industry, and how quality work fits into a delivery lifecycle.',
      },
      'genai-yb2': {
        title: 'GenAI Academy — Yellow Belt Level 2',
        issuer: 'NTT DATA',
        description:
          'Using generative AI across the delivery cycle: code generation and refactoring under human review, requirement refinement, technical analysis, and AI-assisted testing and CI/CD.',
      },
      selenium: {
        title: 'Selenium',
        issuer: 'NTT DATA University',
        description:
          'The open-source automation suite: a single interface for driving browsers from several languages, and how its tools combine to cover different testing needs.',
      },
      python: {
        title: 'Python',
        issuer: 'NTT DATA University',
        description:
          'Python for scripting, automation and tooling — the language I reach for when a testing task needs glue code.',
      },
      'genai-yb1': {
        title: 'GenAI Academy — Yellow Belt Level 1',
        issuer: 'NTT DATA',
        description:
          'Applied generative AI for developers: prompting patterns, tool selection and keeping a human in the loop.',
      },
      jira: {
        title: 'Jira Operational Technical Course',
        issuer: 'uLearn',
        description:
          'Jira as the backbone of a test process: workflows, issue types and reporting for QA teams.',
      },
    },
  },

  contact: {
    heading: {
      eyebrow: 'Contact',
      title: 'Got something',
      highlight: 'worth testing?',
      description:
        'Open to QA and development roles, and happy to talk about anything quality-related. Use the form, or reach me directly.',
    },
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Ada Lovelace',
    emailPlaceholder: 'ada@example.com',
    messagePlaceholder: 'What are you working on?',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Sent',
    copyEmail: 'Copy email address',
    honeypotLabel: 'Leave this empty',
    errors: {
      name: 'Tell me what to call you.',
      email: 'That does not look like an email address.',
      message: 'A little more detail, please — 10 characters minimum.',
      incomplete: 'Some fields still need attention.',
    },
    success: 'Message sent. I usually reply within a couple of days.',
    failure: (email) => `Something went wrong on the way out. Email me directly at ${email}.`,
  },

  footer: {
    workTogether: 'Let’s work together',
    blurb: 'QA Engineer and developer. I test what others build, and build things worth testing.',
    sectionsTitle: 'Sections',
    elsewhereTitle: 'Elsewhere',
    colophon: (year) =>
      `© ${year} Sergio González Díaz · Built with React, Three.js and too many test cases`,
    backToTop: 'Back to top ↑',
  },

  palette: {
    placeholder: 'Search sections, projects, links…',
    groups: {
      navigate: 'Navigate',
      projects: 'Projects',
      certifications: 'Certifications',
      links: 'Links',
      actions: 'Actions',
    },
    section: 'Section',
    copyEmail: 'Copy email address',
    sendEmail: 'Send me an email',
    noMatches: (query) => `No matches for “${query}”`,
    navigateHint: '↑↓ navigate',
    openHint: '↵ open',
    results: (n) => `${n} results`,
  },
}

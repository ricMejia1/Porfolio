// Keep projects separate so your HTML stays tidy.
// Access via global: window.PROJECTS
window.PROJECTS = [
  {
  id:'SCUTTLEROBOT',
  title:'Autonomous CQB Robot',
  badges:['cad','design','robotics','embedded','development','team'],
  summary:'Autonomous indoor robot for navigation, obstacle avoidance, and sensor-driven decisions in confined spaces.',
  img:'./assets/project-11.png',
  links:{
    code:'https://drive.google.com/drive/folders/1FBiU_TRFdzaVovgCkgrRUX202gUrafny?usp=sharing',
    live:'https://www.youtube.com/watch?v=yQ1Vi1F0Th8'
  },
  customButtons: [
    { label:'Drive',  url:'https://drive.google.com/drive/folders/1FBiU_TRFdzaVovgCkgrRUX202gUrafny?usp=sharing' },
    { label:'Live', url:'https://www.youtube.com/watch?v=yQ1Vi1F0Th8' }
  ],
  details:`
    <p><strong>Overview:</strong> Designed and built an autonomous close-quarters battle (CQB) robot capable of navigating confined indoor environments using onboard sensors and embedded control logic.</p>
    <p><strong>Responsibilities:</strong></p>
    <ul>
      <li>Mechanical design and CAD of the robot chassis and sensor mounts</li>
      <li>Embedded programming for real-time sensor processing and motion control</li>
      <li>Autonomous navigation logic including obstacle detection and path correction</li>
      <li>Team collaboration on system integration, testing, and iteration</li>
    </ul>
    <p><strong>Technical Focus:</strong> Emphasis on autonomy, robustness in tight spaces, and modular design for future expansion (additional sensors, mapping, or communication modules).</p>
  `
  },

  {
  id:'petfeeder',
  title:'Pet Feeder – Mechanical CAD Design',
  badges:['cad','design'],
  summary:'Gravity-fed pet feeder using timed servo actuation with fault-tolerant dispensing behavior.',
  img:'./assets/project-12.png',
  customButtons: [
    { label:'CAD', url:'https://a360.co/3YTwhwC' }
  ],
  details:`
    <p><strong>Overview:</strong> Designed a gravity-fed pet feeder that dispenses food using a servo-driven mechanism operating at fixed time intervals. The system relies on passive gravity flow while using controlled actuation to regulate dispensing.</p>

    <p><strong>System Behavior:</strong></p>
    <ul>
      <li>Food is stored above the dispensing mechanism and flows downward via gravity</li>
      <li>A servo motor actuates at a predefined period to allow controlled release</li>
      <li>If the servo becomes stalled or stops functioning, the feeder halts dispensing</li>
      <li>Once servo operation resumes, normal feeding automatically continues</li>
    </ul>

    <p><strong>Design Considerations:</strong></p>
    <ul>
      <li>Mechanical geometry optimized for consistent gravity-fed flow</li>
      <li>Fail-safe behavior to prevent overfeeding during actuator failure</li>
      <li>Simple, reliable mechanism with minimal moving parts</li>
      <li>Designed for manufacturability and ease of assembly</li>
    </ul>

    <p><strong>Focus:</strong> Mechanical reliability, passive feeding principles, and fault-tolerant control behavior.</p>
  `
  },

  {
  id:'gradecalculator',
  title:'Grade Calculator',
  badges:['development','web'],
  summary:'Interactive web application that calculates final grades based on weighted inputs and dynamically updates results in real time.',
  img:'./assets/project-10.png',
  links:{
    code:'https://github.com/ricMejia1/GradeCalculaor-',
    live:'https://ricardomejia.dev/GradeCalculator.html'
  },
  customButtons: [
    { label:'Code',  url:'https://github.com/ricMejia1/GradeCalculaor-' },
    { label:'Website', url:'https://ricardomejia.dev/GradeCalculator.html' }
  ],
  details:`
    <p><strong>Overview:</strong> Developed a responsive grade calculator to help students compute final course grades based on customizable weighting schemes.</p>
    <p><strong>Key Features:</strong></p>
    <ul>
      <li>User-defined number of grade categories and weight percentages</li>
      <li>Automatic conversion and validation of percentage inputs</li>
      <li>Real-time grade calculation and formatted output</li>
      <li>Clean, intuitive UI designed for fast academic use</li>
    </ul>
    <p><strong>Stack:</strong> HTML, CSS, JavaScript</p>
    <p><strong>Focus:</strong> Front-end logic, user experience, and accurate mathematical handling of weighted averages.</p>
  `
  },
  {
    id:'smartglow',
    title:'SmartGlow IoT Light System',
    badges:['iot','embedded','development','web'],
    summary:'Door/motion sensors drive a servo light switch with web UI.',
    img:'./assets/project-4.png',
    links:{
      code:'https://github.com/ricMejia1/SmartGlow-w-IoT.git',
      live:'https://drive.google.com/drive/folders/1qkIUoG9tqhSB6-Iv2N89J7lXyul8X8fk?usp=drive_link'
    },
    customButtons: [
      { label:'Code',  url:'https://github.com/ricMejia1/SmartGlow-w-IoT.git' },
      { label:'Drive', url:'https://drive.google.com/drive/folders/1qkIUoG9tqhSB6-Iv2N89J7lXyul8X8fk?usp=drive_link' }
    ],
    details:`<p><strong>Stack:</strong> STM32 HAL, Raspberry Pi gateway, Flask/JS dashboard.</p><ul><li>OTA config and metrics logging.</li></ul>`
  },

  { id:'capacitorcar',
  title:'Capacitor-Powered Car Model',
  badges:['development','design','cad','team','analysis/simulation'],
  summary:'Energy storage demo car; analysis & testing.',
  img:'./assets/project-5.png',
  customButtons: [
    { label:'Drive',  url:'https://drive.google.com/drive/folders/19SNVW9SbtQgfNyMUM3OWf6Z7b2OE8k4k?usp=drive_link' },
    { label:'Live', url:'https://youtu.be/_35I5piISPE?si=t393JVbpvvCSy-3K' }
  ],
  details:`<p><strong>Focus:</strong> discharge profiles & gearing.</p>`
  },

  { id:'k2639',
    title:'Liquid Controller Analysis',
    badges:['embedded','team','analysis/simulation'],
    summary:'Reverse-engineering & control behavior study.',
    img:'./assets/project-6.png',
    customButtons: [
      { label:'Drive',  url:'https://drive.google.com/drive/folders/1Jzd1oSr262niJ4GPv5OLErfCrSrziRyg?usp=drive_link' },
      
    ],
    details:`<p>Captured response curves and threshold behavior.</p>`
  },

  {
    id:'OPW',
    title:'Past Portfolio Website',
    badges:['development','design','web'],
    summary:'My earlier personal site static, fast, and minimal.',
    img:'./assets/project-7.png',
    links:{
      code:'https://github.com/ricMejia1/Porfolio_Old',
      live:'https://ricmejia1.github.io/Porfolio_Old/'
    },
    customButtons: [
      { label: 'Code', url: 'https://github.com/ricMejia1/Porfolio_Old' },
      { label: 'Website', url: 'https://ricmejia1.github.io/Porfolio_Old/' },
    ],
    details:`<p><strong>Stack:</strong> HTML, CSS, vanilla JS.</p><ul><li>Simple responsive layout with a static build.</li><li>Deployed on GitHub Pages.</li><li>Served as the foundation for my new portfolio’s structure.</li></ul>`
  },

  {
    id:'PBE',
    title:'PBE Website Co-Developer',
    badges:['development','design','web','team'],
    summary:'Marketing/info site for the PBE project with clean sections and CTAs.',
    img:'./assets/project-8.png',
    links:{
      code:'https://github.com/DhruvHalderia/PBEWebsite',
      live:'https://pbetamu.com/'
    },
    customButtons: [
      { label: 'Code', url: 'https://github.com/DhruvHalderia/PBEWebsite' },
      { label: 'Website', url: 'https://pbetamu.com/' },
    ],
    details:`<p><strong>Stack:</strong> HTML, CSS (utility classes), light JS.</p><ul><li>Landing page, features, and contact forms (mailto).</li><li>Fast, accessible components and sticky header.</li><li>Deployed via GitHub Pages with custom domain.</li></ul>`
  },

  {
    id:'SOG',
    title:'Sack_O_Games',
    badges:['development','design'],
    summary:'Mini game collection bundled into a clean mix of terminal control and GUI.',
    img:'./assets/project-9.png',
    links:{
      code:'https://github.com/ricMejia1/Sack_O_Games',
      game: true
    },
    customButtons: [
      { label: 'Code', url: 'https://github.com/ricMejia1/Sack_O_Games' },
      { label: 'Play', action: 'game', game: 'menu' }, // game launcher  
    ],
    details:`<p><strong>Stack:</strong> HTML, CSS, JavaScript (modules).</p><ul><li>Multiple casual games (e.g., tic-tac-toe, Snake, Math Game).</li><li>Local settings.</li><li>Mobile-first controls with accessible keyboard input.</li></ul>`
  },

  {
    id:'linetracker',
    title:'Line Tracking Robot',
    badges:['robotics','embedded','development'],
    summary:'Sensor-guided line follower with control tuning.',
    img:'./assets/project-2.png.JPG',
    links:{
      code:'https://github.com/ricMejia1/LineTrackingRobot',
    },
    customButtons: [
      { label: 'Code/Video', url: 'https://github.com/ricMejia1/LineTrackingRobot' },
    ],
    details:`<p><strong>Stack:</strong> Logic based programming, Quartus Prime.</p><ul><li>Reliable line detection and cornering.</li></ul>`
  },

  {
    id:'frc4063',
    title:'Team 4063 FRC Robot',
    badges:['robotics','embedded','cad','team'],
    summary:'Competition robot design & programming for FRC 4063.',
    img:'./assets/project-1.png.JPG',
    links:{
      live:'https://youtu.be/uuoONiXpf4c?si=wNI9PEBVdEZ8wm8m'
    },
    customButtons: [
      { label: 'Video', url: 'https://youtu.be/uuoONiXpf4c?si=wNI9PEBVdEZ8wm8m' },
    ],
    details:`<p><strong>Focus:</strong> drivetrain, controls, wiring, driver practice.</p><ul><li>Sensor integration & autonomous routines.</li><li>Match strategy and pit operations.</li></ul>`
  },

  {
    id:'expandlet',
    title:'Expandlet',
    badges:['cad','design','development'],
    summary:'Expandable outlet that retracts in wall to keep everything organized.',
    img:'./assets/project-3.png.jpg',
    links:{
      code:'https://github.com/ricMejia1/expandlet',
      live:'https://cad.onshape.com/documents/25098a4e49e090ec0328f6b9/w/deb332f122e549273e05fcb3/e/46866bcea86862d21a10f647?renderMode=0&uiState=6680e86c6f7b3b4c17906bec'
    },
    customButtons: [
      { label: 'Video', url: 'https://github.com/ricMejia1/expandlet' },
      { label: 'CAD', url: 'https://cad.onshape.com/documents/25098a4e49e090ec0328f6b9/w/deb332f122e549273e05fcb3/e/46866bcea86862d21a10f647?renderMode=0&uiState=6680e86c6f7b3b4c17906bec' },
    ],
    details:`<p><strong>Tools:</strong> Onshape CAD. Parametric parts and hinges.</p>`
  },



];

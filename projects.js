// Keep projects separate so your HTML stays tidy.
// Access via global: window.PROJECTS
window.PROJECTS = [
  {
  id:'cruisecontrolcar',
  title:'Cruise Control Car & System',
  badges:['embedded','robotics','development','analysis/simulation','ros2','team'],
  summary:'Closed-loop cruise-control vehicle system using encoder feedback, PI control, FreeRTOS task scheduling, and ROS 2-ready software architecture.',
  img:'./assets/project-cruise-control-car-photo.png',
  imageFit:'cover',
  customButtons: [
    { label:'Drive', url:'https://drive.google.com/drive/folders/1iEW0jt3PufBL7giHiRp5Q-sfJluDW24V?usp=sharing' }
  ],
  details:`
    <p><strong>Overview:</strong> Developed the Cruise Control Car & System, a closed-loop vehicle speed-control project designed to maintain target motor speed during load or terrain changes.</p>
    <p><strong>Responsibilities:</strong></p>
    <ul>
      <li>Built the program to use ROS 2 as part of the vehicle-control software architecture</li>
      <li>Implemented embedded speed control using Arduino Mega, encoder feedback, PWM motor actuation, and a PmodHB5 motor driver</li>
      <li>Designed and tuned a PI controller from system-identification data and Simulink modeling</li>
      <li>Moved from a super-loop structure to FreeRTOS tasks for sensing, control, actuation, display, telemetry, and input handling</li>
      <li>Collected and analyzed 20 rad/s and 30 rad/s test data to compare simulated and physical system response</li>
    </ul>
    <p><strong>Results:</strong> Demonstrated stable speed regulation at a 30 rad/s target with 1.55% overshoot and approximately 5.62% measured steady-state error in hardware testing.</p>
    <p><strong>Focus:</strong> ROS 2, FreeRTOS, PI control, encoder feedback, PWM motor control, system identification, Simulink, telemetry, and applied mechatronics.</p>
  `
  },

  {
  id:'mxet400-mini-project-2',
  title:'ROS 2 UR3e Robotic Workcell',
  badges:['robotics','embedded','development','ros2','manufacturing','team'],
  summary:'Semester-long manufacturing automation cell programmed with ROS 2 on Ubuntu to coordinate a UR3e arm, gripper I/O, conveyor motion, sensors, and multiple workcell tasks.',
  img:'./assets/project-mxet400-mini-project-2.png',
  imageFit:'cover',
  customButtons: [
    { label:'Code', url:'https://github.com/ricMejia1/UR3e-Robotic-Workcell-Tic-Tac-Toe.git' },
    { label:'3x3 Demo', url:'https://youtu.be/eBHpF_Ke12I' }
  ],
  details:`
    <p><strong>Overview:</strong> Built and programmed a semester-long manufacturing automation cell using ROS 2 on Ubuntu, a Universal Robots UR3e arm, conveyor hardware, gripper I/O, color sensing, and repeatable task sequencing.</p>
    <p><strong>Responsibilities:</strong></p>
    <ul>
      <li>Implemented the automated manufacturing cell over the semester as an integrated robot, conveyor, sensing, and operator-workflow system</li>
      <li>Developed a Python ROS 2 node using rclpy to coordinate robot motion, I/O, conveyor control, color feedback, and task sequencing</li>
      <li>Commanded UR3e joint trajectories through the FollowJointTrajectory action interface</li>
      <li>Controlled gripper and conveyor behavior through UR SetIO service calls for tool digital outputs and analog conveyor power</li>
      <li>Subscribed to a block_color topic to react to sensor readings and route blocks through the correct automated behavior</li>
      <li>Programmed multiple cell operations, including pallet pickup, color-sensor staging, conveyor transfer, grid placement, and safe return-to-home behavior</li>
      <li>Demonstrated one operation as a 3x3 grid placement task where the robot selected moves, placed blocks, and detected wins or ties</li>
      <li>Tested and tuned waypoint sequencing, motion timing, gripper actuation, conveyor power, and fault recovery through lab iteration</li>
    </ul>
    <p><strong>Project links:</strong> <a href="https://github.com/ricMejia1/UR3e-Robotic-Workcell-Tic-Tac-Toe.git" target="_blank" rel="noreferrer">Code repository</a> / <a href="https://youtu.be/eBHpF_Ke12I" target="_blank" rel="noreferrer">3x3 grid demo</a> / <a href="https://www.youtube.com/watch?v=vQY4j_ghDbc" target="_blank" rel="noreferrer">additional cell tasks</a></p>
    <p><strong>Focus:</strong> ROS 2, Ubuntu Linux, Universal Robots UR3e, Python, manufacturing automation, action clients, service clients, trajectory control, sensor feedback, I/O control, conveyor integration, and workcell commissioning.</p>
  `
  },

  {
  id:'SCUTTLEROBOT',
  title:'Autonomous CQB Robot',
  badges:['cad','design','robotics','embedded','development','team'],
  summary:'Autonomous indoor robot for navigation, obstacle avoidance, and sensor-driven decisions in confined spaces.',
  img:'./assets/project-11.png',
  imageFit:'cover',
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
  title:'Pet Feeder - Mechanical CAD Design',
  badges:['cad','design'],
  summary:'Gravity-fed pet feeder using timed servo actuation with fault-tolerant dispensing behavior.',
  img:'./assets/project-12.png',
  imageFit:'contain',
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
  imageFit:'contain',
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
    summary:'STM32 and Raspberry Pi IoT system that used door/motion sensing, servo actuation, and a web dashboard to control a physical light switch.',
    img:'./assets/project-4.png',
    imageFit:'contain',
    links:{
      code:'https://github.com/ricMejia1/SmartGlow-w-IoT.git',
      live:'https://drive.google.com/drive/folders/1qkIUoG9tqhSB6-Iv2N89J7lXyul8X8fk?usp=drive_link'
    },
    customButtons: [
      { label:'Code',  url:'https://github.com/ricMejia1/SmartGlow-w-IoT.git' },
      { label:'Drive', url:'https://drive.google.com/drive/folders/1qkIUoG9tqhSB6-Iv2N89J7lXyul8X8fk?usp=drive_link' }
    ],
    details:`<p><strong>Stack:</strong> STM32 HAL, Raspberry Pi gateway, Flask/JavaScript dashboard, sensors, and servo actuation.</p><ul><li>Built embedded sensing and actuation logic for physical light-switch control.</li><li>Connected the embedded device to a web-facing dashboard for configuration and monitoring.</li><li>Focused on practical IoT integration: sensor input, actuator output, communication, and troubleshooting.</li></ul>`
  },

  { id:'capacitorcar',
  title:'Kick-It Car - Capacitor-Powered Vehicle',
  badges:['development','design','cad','team','analysis/simulation'],
  summary:'3D-printed capacitor-powered vehicle with Simulink energy-regeneration modeling and propulsion analysis.',
  img:'./assets/project-5.png',
  imageFit:'cover',
  customButtons: [
    { label:'Drive',  url:'https://drive.google.com/drive/folders/19SNVW9SbtQgfNyMUM3OWf6Z7b2OE8k4k?usp=drive_link' },
    { label:'Live', url:'https://youtu.be/_35I5piISPE?si=t393JVbpvvCSy-3K' }
  ],
  details:`
    <p><strong>Overview:</strong> Designed and built a 3D-printed vehicle powered by a capacitor system using gears, inductors, and magnets.</p>
    <ul>
      <li>Modeled energy regeneration and propulsion dynamics in Simulink</li>
      <li>Analyzed kinetic-to-electrical energy conversion behavior</li>
      <li>Tested discharge profiles, gearing choices, and system efficiency tradeoffs</li>
    </ul>
    <p><strong>Focus:</strong> Energy storage, mechanical-to-electrical conversion, system optimization, and controls-informed testing.</p>
  `
  },

  { id:'k2639',
    title:'Liquid Controller Analysis',
    badges:['embedded','team','analysis/simulation'],
    summary:'Reverse-engineered a liquid controller to study threshold behavior, response curves, and control decisions from measured system output.',
    img:'./assets/project-6.png',
    imageFit:'contain',
    customButtons: [
      { label:'Drive',  url:'https://drive.google.com/drive/folders/1Jzd1oSr262niJ4GPv5OLErfCrSrziRyg?usp=drive_link' },
      
    ],
    details:`<p><strong>Overview:</strong> Studied a liquid controller by capturing response behavior, identifying thresholds, and documenting how the controller reacted to changing input conditions.</p><ul><li>Collected and interpreted response curves from the physical system.</li><li>Mapped observed behavior to control decisions and operating limits.</li><li>Focused on measurement, troubleshooting, and controls interpretation rather than black-box use.</li></ul>`
  },

  {
    id:'OPW',
    title:'Past Portfolio Website',
    badges:['development','design','web'],
    summary:'My earlier personal site static, fast, and minimal.',
    img:'./assets/project-7.png',
    imageFit:'contain',
    links:{
      code:'https://github.com/ricMejia1/Porfolio_Old',
      live:'https://ricmejia1.github.io/Porfolio_Old/'
    },
    customButtons: [
      { label: 'Code', url: 'https://github.com/ricMejia1/Porfolio_Old' },
      { label: 'Website', url: 'https://ricmejia1.github.io/Porfolio_Old/' },
    ],
    details:`<p><strong>Stack:</strong> HTML, CSS, vanilla JS.</p><ul><li>Simple responsive layout with a static build.</li><li>Deployed on GitHub Pages.</li><li>Served as the foundation for my new portfolio's structure.</li></ul>`
  },

  {
    id:'PBE',
    title:'PBE Website Co-Developer',
    badges:['development','design','web','team'],
    summary:'Marketing/info site for the PBE project with clean sections and CTAs.',
    img:'./assets/project-8.png',
    imageFit:'contain',
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
    imageFit:'contain',
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
    summary:'Sensor-guided robot that used line detection, motor control, and tuning to follow a path reliably through turns.',
    img:'./assets/project-2.png.JPG',
    imageFit:'cover',
    links:{
      code:'https://github.com/ricMejia1/LineTrackingRobot',
    },
    customButtons: [
      { label: 'Code/Video', url: 'https://github.com/ricMejia1/LineTrackingRobot' },
    ],
    details:`<p><strong>Stack:</strong> Logic-based programming and Quartus Prime.</p><ul><li>Implemented sensor-driven line detection and motor behavior.</li><li>Tuned response for reliable cornering and path recovery.</li><li>Focused on embedded decision logic and repeatable robot behavior.</li></ul>`
  },

  {
    id:'frc4063',
    title:'Team 4063 FRC Robot',
    badges:['robotics','embedded','cad','team'],
    summary:'FRC competition robot work covering drivetrain behavior, wiring, sensor integration, driver practice, and autonomous routines.',
    img:'./assets/project-1.png.JPG',
    imageFit:'cover',
    links:{
      live:'https://youtu.be/uuoONiXpf4c?si=wNI9PEBVdEZ8wm8m'
    },
    customButtons: [
      { label: 'Video', url: 'https://youtu.be/uuoONiXpf4c?si=wNI9PEBVdEZ8wm8m' },
    ],
    details:`<p><strong>Focus:</strong> Drivetrain, controls, wiring, sensor integration, autonomous routines, driver practice, match strategy, and pit operations.</p><ul><li>Helped connect mechanical, electrical, and programming decisions into a working competition robot.</li><li>Worked in a team environment where reliability and fast troubleshooting mattered.</li></ul>`
  },

  {
    id:'expandlet',
    title:'Expandlet',
    badges:['cad','design','development'],
    summary:'Concept CAD project for a retractable expandable outlet focused on hinge geometry, packaging, and organized cable access.',
    img:'./assets/project-3.png.jpg',
    imageFit:'cover',
    links:{
      code:'https://github.com/ricMejia1/expandlet',
      live:'https://cad.onshape.com/documents/25098a4e49e090ec0328f6b9/w/deb332f122e549273e05fcb3/e/46866bcea86862d21a10f647?renderMode=0&uiState=6680e86c6f7b3b4c17906bec'
    },
    customButtons: [
      { label: 'Video', url: 'https://github.com/ricMejia1/expandlet' },
      { label: 'CAD', url: 'https://cad.onshape.com/documents/25098a4e49e090ec0328f6b9/w/deb332f122e549273e05fcb3/e/46866bcea86862d21a10f647?renderMode=0&uiState=6680e86c6f7b3b4c17906bec' },
    ],
    details:`<p><strong>Tools:</strong> Onshape CAD.</p><ul><li>Modeled parametric parts and hinge behavior for a retractable outlet concept.</li><li>Focused on packaging, movement clearance, and usability in a wall-mounted form factor.</li></ul>`
  },



];



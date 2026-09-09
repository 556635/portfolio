/**
 * AHMED ABDELBASET - PORTFOLIO INTERACTION ENGINE
 * Vanilla JS, Fast, Zero Dependencies, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initTypewriter();
  initSkillsFilter();
  initTerminalSimulator();
  initBackToTop();
  initScrollSpy();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        }
      });
    });
  }
}

/* ==========================================================================
   3. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Virtualization Clusters (Proxmox & HCI)',
    'Next-Gen Firewalls (Fortinet FortiGate)',
    'Site-to-Site IPsec VPN Tunnels',
    'Active Directory & Security Baselines',
    'High-Availability Enterprise Networks',
    'Level-3 System & Incident Diagnostics'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   4. SKILLS CATEGORY FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE TERMINAL SIMULATOR
   ========================================================================== */
let terminalHistoryList = [];
let terminalHistoryIdx = -1;

function initTerminalSimulator() {
  const input = document.getElementById('terminal-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      if (rawCmd) {
        terminalHistoryList.push(rawCmd);
        terminalHistoryIdx = terminalHistoryList.length;
        processTerminalCommand(rawCmd);
      }
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (terminalHistoryIdx > 0) {
        terminalHistoryIdx--;
        input.value = terminalHistoryList[terminalHistoryIdx];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (terminalHistoryIdx < terminalHistoryList.length - 1) {
        terminalHistoryIdx++;
        input.value = terminalHistoryList[terminalHistoryIdx];
      } else {
        terminalHistoryIdx = terminalHistoryList.length;
        input.value = '';
      }
      e.preventDefault();
    }
  });
}

function runQuickCommand(cmd) {
  const input = document.getElementById('terminal-input');
  if (input) {
    input.value = cmd;
    processTerminalCommand(cmd);
    input.value = '';
  }
}

function processTerminalCommand(cmd) {
  const history = document.getElementById('terminal-history');
  const screen = document.getElementById('terminal-screen');
  if (!history || !screen) return;

  const normalized = cmd.toLowerCase().trim();

  // Create input echo row
  const echoLine = document.createElement('div');
  echoLine.className = 't-output-line';
  echoLine.innerHTML = `<span class="t-prompt"><span class="user-part">guest@ahmed-sys</span>:<span class="dir-part">~</span>$&nbsp;</span><span class="text-white">${escapeHtml(cmd)}</span>`;
  history.appendChild(echoLine);

  // Response container
  const responseLine = document.createElement('div');
  responseLine.className = 't-output-line';

  switch (normalized) {
    case 'help':
      responseLine.innerHTML = `
        <span class="text-cyan">Available Commands:</span><br>
        &nbsp;&nbsp;<span class="cmd-highlight">about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Summary of Ahmed's background & credentials<br>
        &nbsp;&nbsp;<span class="cmd-highlight">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List of core technologies & hypervisors<br>
        &nbsp;&nbsp;<span class="cmd-highlight">experience</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Enterprise career journey & positions<br>
        &nbsp;&nbsp;<span class="cmd-highlight">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Highlighted infrastructure labs & deployments<br>
        &nbsp;&nbsp;<span class="cmd-highlight">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Direct email, phone, and LinkedIn info<br>
        &nbsp;&nbsp;<span class="cmd-highlight">download-cv</span>&nbsp;&nbsp;&nbsp;&nbsp;- Open / download full CV document<br>
        &nbsp;&nbsp;<span class="cmd-highlight">uptime</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Check system uptime and cluster health<br>
        &nbsp;&nbsp;<span class="cmd-highlight">ping</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Simulate network latency check<br>
        &nbsp;&nbsp;<span class="cmd-highlight">theme</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Toggle dark/light theme<br>
        &nbsp;&nbsp;<span class="cmd-highlight">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the terminal screen
      `;
      break;

    case 'about':
      responseLine.innerHTML = `
        <span class="text-cyan">Ahmed Abdelbaset Hamza</span> | B.Sc. Computer Science (2019–2023)<br>
        IT Infrastructure & Network Engineer based in Cairo, Egypt.<br>
        Currently managing physical data centers, Proxmox VE, Sangfor HCI, FortiGate firewalls, and Active Directory at EHCSS.
      `;
      break;

    case 'skills':
      responseLine.innerHTML = `
        <span class="text-cyan">Infrastructure & Virtualization:</span> Proxmox VE, Sangfor HCI, Hyper-V, LXC, ZFS<br>
        <span class="text-cyan">Firewalls & Security:</span> Fortinet FortiGate, Site-to-Site IPsec VPN, NAT, VIPs<br>
        <span class="text-cyan">Networking:</span> Inter-VLAN Routing, Subnetting, TCP/IP, DNS, DHCP, LAN/WAN<br>
        <span class="text-cyan">Systems & Directory:</span> Windows Server (2016-2022), AD DS, Group Policies (GPO), M365<br>
        <span class="text-cyan">ITSM & Tools:</span> ITIL Incident Lifecycle, SLA Compliance, L3 Escalations, RDP, AnyDesk
      `;
      break;

    case 'experience':
      responseLine.innerHTML = `
        <span class="text-green">[Jan 2025 – Present]</span> <strong>IT Infrastructure & Tech Support Engineer</strong> @ EHCSS<br>
        &nbsp;&nbsp;→ Data center ops, Sangfor HCI, Proxmox, FortiGate NGFW, IPsec VPN tunnels, L3 support.<br>
        <span class="text-green">[Jan 2024 – Dec 2024]</span> <strong>Information Technology Specialist</strong> @ Telecom Egypt<br>
        &nbsp;&nbsp;→ Enterprise helpdesk, client network troubleshooting, DNS/DHCP, VPN client configuration.
      `;
      break;

    case 'projects':
      responseLine.innerHTML = `
        1. <strong>Enterprise High-Availability Proxmox Cluster:</strong> Live migration, ZFS storage, LXC containers.<br>
        2. <strong>FortiGate Multi-Site IPsec VPN:</strong> Encrypted branch interconnectivity & granular NAT policies.<br>
        3. <strong>Active Directory Security Baseline:</strong> Hardened GPO policies, OU structure & RBAC.<br>
        4. <strong>Enterprise Network Segmentation:</strong> 802.1Q VLAN trunking & Inter-VLAN routing isolation.
      `;
      break;

    case 'contact':
      responseLine.innerHTML = `
        Email: <a href="mailto:ahmedabdelbast836@gmail.com" class="text-cyan">ahmedabdelbast836@gmail.com</a><br>
        Phone: <a href="tel:+201020284751" class="text-cyan">+20 102 028 4751</a><br>
        LinkedIn: <a href="https://www.linkedin.com/in/ahmed-abdelbaset-688295307" target="_blank" class="text-cyan">linkedin.com/in/ahmed-abdelbaset-688295307</a><br>
        Location: Cairo, Egypt
      `;
      break;

    case 'download-cv':
    case 'cv':
      responseLine.innerHTML = `<span class="text-green">Opening CV in a new browser tab...</span>`;
      window.open('Ahmed_Abdelbaset_CV.html', '_blank');
      break;

    case 'uptime':
      responseLine.innerHTML = `
        <span class="text-green">09:15:00 up 412 days, 14:22, 2 users, load average: 0.12, 0.08, 0.05</span><br>
        Cluster Status: <span class="text-cyan">All 6 Proxmox/Sangfor Nodes Healthy (SLA: 99.98%)</span>
      `;
      break;

    case 'ping':
      responseLine.innerHTML = `
        PING 8.8.8.8 (8.8.8.8): 56 data bytes<br>
        64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=14.2 ms<br>
        64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=13.8 ms<br>
        --- 8.8.8.8 ping statistics ---<br>
        2 packets transmitted, 2 packets received, 0.0% packet loss
      `;
      break;

    case 'theme':
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) toggleBtn.click();
      responseLine.innerHTML = `<span class="text-cyan">Theme successfully toggled.</span>`;
      break;

    case 'clear':
      history.innerHTML = '';
      return;

    default:
      responseLine.innerHTML = `<span class="text-amber">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="cmd-highlight">'help'</span> for instructions.`;
      break;
  }

  history.appendChild(responseLine);
  screen.scrollTop = screen.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   6. CONTACT FORM SUBMISSION HANDLER
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
  const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
  
  // Trigger user's email client
  window.location.href = `mailto:ahmedabdelbast836@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  alert(`Thank you, ${name}! Your email client has been prepared with your message to ahmedabdelbast836@gmail.com.`);
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
}

/* ==========================================================================
   8. ACTIVE NAV LINK SCROLL SPY
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * AHMED ABDELBASET HAMZA - EXECUTIVE SYSTEMS PORTFOLIO INTERACTION ENGINE
 * Vanilla JavaScript, High Performance, Zero Framework Bloat
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initThemeSwitcher();
  initMobileNav();
  initTypewriter();
  initSkillsFilter();
  initSystemsTerminal();
  initBackToTop();
  initScrollSpy();
  initScrollReveal();
  initNavbarScroll();
  initScrollProgress();
  initCursorGlow();
  initCounters();
  initCardTilt();
  initServiceSpotlight();
  initSmoothAnchors();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 700);
  });

  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 4000);
}

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const html = document.documentElement;

  const saved = localStorage.getItem('executive-theme') || 'dark';
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('executive-theme', next);
    });
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0a0c11');
    }
    if (icon) {
      if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-item');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          const icon = toggle.querySelector('i');
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
   2.5 SMOOTH ANCHOR NAVIGATION (Native scrollIntoView — stable, linear)
   ========================================================================== */
function initSmoothAnchors() {
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   3. EXECUTIVE TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'Cisco CCNA (200-301) Networking',
    'Fortinet FortiGate Next-Gen Firewalls',
    'Multi-Site Site-to-Site IPsec VPN Hubs',
    'Proxmox VE & Sangfor HCI Clusters',
    'Active Directory Forest & CIS GPO Hardening',
    'Level-3 Production Incident Resolution'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 75;

  function run() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 35;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 75;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2400; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 450;
    }

    setTimeout(run, delay);
  }

  run();
}

/* ==========================================================================
   4. SKILLS CATEGORY FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.s-tab-btn');
  const cards = document.querySelectorAll('.s-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });
}

/* ==========================================================================
   5. SYSTEMS CLI CONSOLE SIMULATOR
   ========================================================================== */
let cmdHistory = [];
let cmdHistoryIndex = -1;

function initSystemsTerminal() {
  const input = document.getElementById('terminal-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      if (command) {
        cmdHistory.push(command);
        cmdHistoryIndex = cmdHistory.length;
        execCommand(command);
      }
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (cmdHistoryIndex > 0) {
        cmdHistoryIndex--;
        input.value = cmdHistory[cmdHistoryIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (cmdHistoryIndex < cmdHistory.length - 1) {
        cmdHistoryIndex++;
        input.value = cmdHistory[cmdHistoryIndex];
      } else {
        cmdHistoryIndex = cmdHistory.length;
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
    execCommand(cmd);
    input.value = '';
  }
}

function execCommand(cmd) {
  const historyContainer = document.getElementById('terminal-history');
  const screen = document.getElementById('terminal-screen');
  if (!historyContainer || !screen) return;

  const normalized = cmd.toLowerCase().trim();

  // Echo user input
  const echo = document.createElement('div');
  echo.className = 'cli-echo-row';
  echo.innerHTML = `<span class="cli-prompt-text"><span class="user-txt">engineer@ahmed-sys</span>:<span class="path-txt">~</span>$&nbsp;</span><span class="text-white">${sanitize(cmd)}</span>`;
  historyContainer.appendChild(echo);

  // Response container
  const res = document.createElement('div');
  res.className = 'cli-res-row';

  switch (normalized) {
    case 'help':
      res.innerHTML = `
        <span class="text-cyan">Available System Commands:</span><br>
        &nbsp;&nbsp;<span class="cmd-glow">ccna</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Cisco Certified Network Associate verification &amp; domains<br>
        &nbsp;&nbsp;<span class="cmd-glow">certifications</span>&nbsp;&nbsp;&nbsp;- Full list of professional credentials<br>
        &nbsp;&nbsp;<span class="cmd-glow">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Core infrastructure &amp; virtualization stack<br>
        &nbsp;&nbsp;<span class="cmd-glow">testimonials</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Leadership &amp; peer endorsements<br>
        &nbsp;&nbsp;<span class="cmd-glow">experience</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- EHCSS &amp; Telecom Egypt production history<br>
        &nbsp;&nbsp;<span class="cmd-glow">ping</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Run network ICMP latency simulation<br>
        &nbsp;&nbsp;<span class="cmd-glow">uptime</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- High-Availability cluster health metrics<br>
        &nbsp;&nbsp;<span class="cmd-glow">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Direct email, phone, and LinkedIn info<br>
        &nbsp;&nbsp;<span class="cmd-glow">cv</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Open complete resume in a new tab<br>
        &nbsp;&nbsp;<span class="cmd-glow">theme</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Toggle dark/light interface<br>
        &nbsp;&nbsp;<span class="cmd-glow">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear screen history
      `;
      break;

    case 'ccna':
      res.innerHTML = `
        <span class="text-green">[VERIFIED]</span> <strong>Cisco Certified Network Associate (CCNA 200-301)</strong><br>
        &nbsp;&nbsp;• <strong>Network Fundamentals:</strong> Subnetting (IPv4/IPv6), Routers, Switches, Endpoints<br>
        &nbsp;&nbsp;• <strong>Network Access:</strong> VLANs (802.1Q), Trunking, EtherChannel (LACP), RSTP<br>
        &nbsp;&nbsp;• <strong>IP Connectivity:</strong> Routing tables, Static routes, OSPFv2, Inter-VLAN routing<br>
        &nbsp;&nbsp;• <strong>IP Services:</strong> DHCP scopes, DNS, NTP, NAT/PAT (Inside/Outside), SNMP<br>
        &nbsp;&nbsp;• <strong>Security Fundamentals:</strong> Standard &amp; Extended ACLs, Port Security, VPNs
      `;
      break;

    case 'certifications':
    case 'certs':
      res.innerHTML = `
        1. <span class="text-cyan">Cisco CCNA (200-301)</span> — Certified Network Associate<br>
        2. <span class="text-cyan">Fortinet Network Security</span> — FortiGate NGFW, NAT &amp; IPsec VPN Hub<br>
        3. <span class="text-cyan">Windows Server 2022</span> — Active Directory Domain Services &amp; GPO<br>
        4. <span class="text-cyan">Proxmox VE &amp; Sangfor HCI</span> — High-Availability Virtual Clusters
      `;
      break;

    case 'testimonials':
    case 'endorsements':
      res.innerHTML = `
        • <strong>Eng. T. Mansour (Senior Infrastructure Director, EHCSS):</strong><br>
        &nbsp;&nbsp;"Ahmed transformed our remote silos connectivity. His precision in FortiGate IPsec tunnels was outstanding."<br><br>
        • <strong>M. Khaled (Service Operations Manager, Telecom Egypt):</strong><br>
        &nbsp;&nbsp;"Ahmed consistently achieved 98%+ SLA resolution rates and handled complex escalations with calm technical authority."
      `;
      break;

    case 'skills':
      res.innerHTML = `
        <span class="text-cyan">Networking:</span> Cisco Switching/Routing, Inter-VLAN, Subnetting, TCP/IP, DNS, DHCP<br>
        <span class="text-cyan">Security:</span> Fortinet FortiGate NGFW, Site-to-Site IPsec VPN, NAT/VIP, ACLs<br>
        <span class="text-cyan">Virtualization:</span> Proxmox VE, Sangfor HCI, Hyper-V, LXC, ZFS Storage<br>
        <span class="text-cyan">Systems:</span> Windows Server 2016-2022, Active Directory, Group Policies (GPO)<br>
        <span class="text-cyan">Support:</span> ITIL Incident Lifecycle, SLA Compliance, Tier-3 Diagnostics
      `;
      break;

    case 'experience':
      res.innerHTML = `
        <span class="text-green">[Jan 2025 – Present]</span> <strong>IT Infrastructure &amp; Tech Support Engineer</strong> @ EHCSS<br>
        &nbsp;&nbsp;→ Data center ops, Sangfor HCI, Proxmox, FortiGate NGFW, IPsec VPN tunnels, L3 support.<br>
        <span class="text-green">[Jan 2024 – Dec 2024]</span> <strong>Information Technology Specialist</strong> @ Telecom Egypt<br>
        &nbsp;&nbsp;→ Enterprise helpdesk, client network troubleshooting, DNS/DHCP, VPN client configuration.
      `;
      break;

    case 'ping':
      res.innerHTML = `
        PING gateway.ehcss.gov.eg (10.10.0.1): 56 data bytes<br>
        64 bytes from 10.10.0.1: icmp_seq=1 ttl=64 time=1.42 ms<br>
        64 bytes from 10.10.0.1: icmp_seq=2 ttl=64 time=1.18 ms<br>
        64 bytes from 10.10.0.1: icmp_seq=3 ttl=64 time=1.25 ms<br>
        --- gateway.ehcss.gov.eg ping statistics ---<br>
        <span class="text-green">3 packets transmitted, 3 packets received, 0.0% packet loss, RTT avg: 1.28ms</span>
      `;
      break;

    case 'uptime':
      res.innerHTML = `
        <span class="text-green">System Uptime: 438 days, 16 hours, 42 minutes</span><br>
        Cluster Status: <span class="text-cyan">All 6 Proxmox/Sangfor Nodes Healthy (SLA Uptime: 99.98%)</span><br>
        Active Site-to-Site VPN Tunnels: <span class="text-green">All 14 Regional Silo Tunnels UP (AES-256)</span>
      `;
      break;

    case 'cv':
    case 'download-cv':
      res.innerHTML = `<span class="text-green">Opening official resume in a new browser tab...</span>`;
      window.open('Ahmed_Abdelbaset_CV.html', '_blank');
      break;

    case 'contact':
      res.innerHTML = `
        Email: <a href="mailto:ahmedabdelbast836@gmail.com" class="text-cyan">ahmedabdelbast836@gmail.com</a><br>
        Phone: <a href="tel:+201020284751" class="text-cyan">+20 102 028 4751</a><br>
        LinkedIn: <a href="https://www.linkedin.com/in/ahmed-abdelbaset-688295307" target="_blank" class="text-cyan">linkedin.com/in/ahmed-abdelbaset-688295307</a><br>
        GitHub: <a href="https://github.com/556635" target="_blank" class="text-cyan">github.com/556635</a>
      `;
      break;

    case 'theme':
      const tBtn = document.getElementById('theme-toggle');
      if (tBtn) tBtn.click();
      res.innerHTML = `<span class="text-cyan">Theme successfully toggled.</span>`;
      break;

    case 'clear':
      historyContainer.innerHTML = '';
      return;

    default:
      res.innerHTML = `<span class="text-amber">command not recognized: '${sanitize(cmd)}'</span>. Type <span class="cmd-glow">'help'</span> for instructions.`;
      break;
  }

  historyContainer.appendChild(res);
  screen.scrollTop = screen.scrollHeight;
}

function sanitize(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   6. TOAST NOTIFICATION & CLIPBOARD COPY
   ========================================================================== */
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied: ${text}`);
    if (buttonElement) {
      const originalIcon = buttonElement.innerHTML;
      buttonElement.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i>';
      setTimeout(() => {
        buttonElement.innerHTML = originalIcon;
      }, 2000);
    }
  }).catch(() => {
    showToast(`Failed to copy to clipboard`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 2500);
}

/* ==========================================================================
   7. CONTACT FORM HANDLER
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
  const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);

  window.location.href = `mailto:ahmedabdelbast836@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  showToast('Email draft opened successfully!');
}

/* ==========================================================================
   8. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

/* ==========================================================================
   9. SCROLL SPY (IntersectionObserver — exclusive active section mapping)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');
  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  // Fallback for older browsers: plain scroll position mapping
  if (!('IntersectionObserver' in window)) {
    const update = () => {
      let current = '';
      const pos = window.scrollY + 120;
      sections.forEach(section => {
        if (pos >= section.offsetTop) current = section.getAttribute('id');
      });
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return;
  }

  const ratios = new Map();
  let lastActive = '';
  let pending = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    });

    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;

      let bestId = '';
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });

      if (bestId && bestId !== lastActive) {
        lastActive = bestId;
        setActive(bestId);
      }
    });
  }, { threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.55, 0.8, 1] });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   10. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  // Fallback for older browsers
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    // Also reveal auto-annotated cards immediately
    document.querySelectorAll('.cert-card, .testimonial-card, .s-card, .featured-project-box, .bento-box, .timeline-row')
      .forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Auto-annotate direct card children of grid/group containers with reveal + staggered delay
  const gridSelectors = [
    '.certifications-grid > .cert-card',
    '.testimonials-slider-grid > .testimonial-card',
    '.proof-grid > *',
    '.skills-matrix-grid > .s-card',
    '.projects-featured-grid > .featured-project-box',
    '.bento-about-grid > .bento-box',
    '.timeline-v2 > .timeline-row'
  ];

  gridSelectors.forEach((sel, idx) => {
    const cards = document.querySelectorAll(sel);
    cards.forEach(card => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal');
        const delay = idx % 4;
        if (delay > 0) card.classList.add(`reveal-delay-${delay}`);
        observer.observe(card);
      }
    });
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11. NAVBAR SCROLL STATE (Elevation & Shadow on Scroll)
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('navbar');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }
  });
}

/* ==========================================================================
   12. SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = percent + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ==========================================================================
   13. INTERACTIVE CURSOR GLOW
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 3;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function render() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.transform = `translate3d(${glowX - 210}px, ${glowY - 210}px, 0)`;
    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
    15. HERO STAT COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count')) || 0;
  const suffix = el.getAttribute('data-suffix') || '';
  const decimals = String(target).includes('.') ? 1 : 0;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = (eased * target).toFixed(decimals);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ==========================================================================
   16. 3D CARD TILT ON HOVER
   ========================================================================== */
function initCardTilt() {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover || !('IntersectionObserver' in window)) return;

  const cards = document.querySelectorAll('.cert-card, .featured-project-box, .s-card, .bento-box');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('reveal') && !card.classList.contains('visible')) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 6;
      const ry = (px - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   17. SERVICE CARD SPOTLIGHT (Mouse-follow radial highlight)
   ========================================================================== */
function initServiceSpotlight() {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) return;

  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
}

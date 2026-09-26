// Fields:
//   tag, title, shortDesc  -> required
//   tech                   -> array of strings
//   longDesc               -> shown in the modal (falls back to shortDesc)
//   features               -> array of bullet strings
//   images / videos        -> paths or full URLs, videos go in Videos/
//   link                   -> { label: "...", url: "..." } or null
//   featured               -> optional boolean
const PROJECTS = [
    {
        tag:       "Gameplay Mechanic",
        title:     "Spectating System",
        shortDesc: "A robust spectating system that lets you spectate every player in the game using a simple UI.",
        tech:      ["Spectating", "Gameplay Mechanic", "UI State Management", "Camera"],
        longDesc:  "A spectating system built for Roblox that allows players to cycle through active players using a simple UI. It handles edge cases such as players leaving, respawning, and empty lobbies, while keeping the camera correctly bound to Humanoids at all times. The system is built around clean state management (Idle/Spectating), proper event cleanup to avoid memory leaks, and dynamic player list updates to ensure reliable transitions between targets.",
        features:  [
            "Cycle through all active players using next/previous controls",
            "Automatic camera binding to target Humanoid",
            "Dynamic player list updates when players join or leave",
            "Handles edge cases like empty lobbies and target player disconnections or respawns",
            "State-based system (Idle / Spectating) with clean UI synchronization",
            "Automatic fallback to a valid player if current target becomes invalid",
            "Seamless exit back to the local player's character and camera control"
        ],
        images: [],
        videos: ["Videos/SpectateDEMO.mp4"],
        link: null,
    },
    {
        tag:       "Input",
        title:     "Input Controller",
        shortDesc: "An extremely simple to use wrapper for UserInputService that features filtered Input signals, binding actions, unbinding actions, combos and so much more.",
        tech:      ["UserInputService", "Wrapper"],
        longDesc:  "A lightweight but powerful wrapper around Roblox's UserInputService. The goal was to make predictable APIs for UIS that are easy to understand and simplify things that have been stressing developers for a while.",
        features: [
            "Filtered input signals, automatically are checked for no gameProcessed",
            "Bind and unbind actions easily",
            "Combo detection (e.g. press E then F within 1s)",
            "More utility functions like IsKeyDown, GetHeldDuration, GetCurrentDevice, GetMousePos",
            "And many more. Read my actual documentation for more info"
        ],
        images: [],
        videos: ["Videos/InputControllerDEMO.mp4"],
        link: {
            label: "View on GitHub",
            url: "https://github.com/rowdy176/InputController"
        },
    },
    {
        tag:       "Library",
        title:     "Scheduler",
        shortDesc: "A configurable, tick based task scheduler with centralized task management and delayed task execution.",
        tech:      ["Task Management", "Tick Based"],
        longDesc:  "A tick based task scheduler designed around centralized task management. Each Scheduler instance has its own configurable tick rate and supports immediate tasks, delayed tasks, and task cancellation without creating a seperate delayed thread for every task. Scheduler uses the tombstone marking pattern to remove tasks via ID instead of having an expensive O(2n) search for the task by searching linearly through _tasks and _queue.",
        features:  [
            "Configurable tick rate",
            "Immediate tasks with Push()",
            "Delayed tasks wtih Delay()",
            "Task cancellation with Remove()",
            "Centralized task queues",
            "Deferred task removal using a tombstone marking pattern",
            "Independent scheduler instances (OOP)"
        ],
        images: [],
        videos: [],
        link: {
            label: "View on GitHub",
            url: "https://github.com/rowdy176/Libraries/tree/main/Major%20Libraries/Scheduler"
        },
    },
    {
        tag: "Combat System",
        title: "Data Driven Combat Prototype",
        shortDesc: "A scalable, data driven combat system built around reusable weapon, armor, and gear constructors.",
        tech: ["Object-Oriented-Programming", "Data Driven Design"],
        longDesc: "A modular combat prototype designed around seperating item data from runtime behaviour. Weapon definitions are stored independently from weapon types and shared metadata, while constructors turn those definitions into reusable runtime objects. The same weapon system can be used by both players and NPCs without any structural change in code, with centralized networking and automatic resource cleanup through the Steward library.",
        features: [
            "Hierarchical, data driven weapon definitions",
            "Separate item data, type behaviour, and metadata",
            "Reusable Weapon, ArmorPiece, and Gear constructors",
            "Player and NPC compatible weapon system",
            "Server authoritative combat logic",
            "Configurable hitboxes, ranges, speeds, damage types, blocking, and parrying",
            "Animation driven hit detection",
            "Automatic connection and resource cleanup through Steward (self-made library).",
            "Unique runtime weapon instances"
        ],
        images: [],
        videos: ["Videos/DataDrivenCombatSystemPrototype.mp4"],
        link: null,
        featured: true,
    }
];

const grid = document.getElementById('ProjectsGrid');

const renderOrder = PROJECTS
    .map((_, i) => i)
    .sort((a, b) => (PROJECTS[b].featured === true) - (PROJECTS[a].featured === true));

renderOrder.forEach(index => {
    const project = PROJECTS[index];
    const isFeatured = project.featured === true;
    const techHTML = project.tech.map(t => `<span>${t}</span>`).join('');

    const coverHTML = (isFeatured && project.images && project.images.length)
        ? `<div class="ProjectCover"><img src="${project.images[0]}" alt="${project.title} preview" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`
        : '';

    const card = document.createElement('div');
    card.className = 'ProjectCard reveal' + (isFeatured ? ' ProjectCard--featured' : '');
    card.innerHTML = `
        ${coverHTML}
        <div class="ProjectBody">
            <span class="ProjectTag">${project.tag}</span>
            <h3 class="ProjectName">${project.title}</h3>
            <p class="ProjectDesc">${project.shortDesc}</p>
            <div class="ProjectTech">${techHTML}</div>
            <button class="BtnViewProject" type="button" data-index="${index}">View project</button>
        </div>
    `;
    grid.appendChild(card);
});

const overlay = document.getElementById('ModalOverlay');
const modalBody = document.getElementById('ModalBody');
const closeBtn = document.getElementById('ModalClose');
let lastFocused = null;

function openModal(index) {
    const p = PROJECTS[index];

    document.getElementById('Modal').classList.toggle('Modal--featured', p.featured === true);

    const featuresHTML = p.features && p.features.length
        ? `<ul class="ModalFeatures">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>`
        : '';

    const imagesHTML = p.images && p.images.length
        ? `<div class="ModalMedia">${p.images.map(src => `<img src="${src}" alt="${p.title} screenshot" class="ModalImg" loading="lazy" onerror="this.style.display='none'">`).join('')}</div>`
        : '';

    const videosHTML = p.videos && p.videos.length
        ? `<div class="ModalMedia">${p.videos.map(src =>
            `<video class="ModalVideo" src="${src}" controls muted playsinline>
                Your browser doesn't support HTML5 video.
            </video>`
          ).join('')}</div>`
        : '';

    const linkHTML = p.link
        ? `<a href="${p.link.url}" target="_blank" rel="noopener noreferrer" class="Btn ModalLink">${p.link.label} ↗</a>`
        : '';

    const techHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    modalBody.innerHTML = `
        <span class="ModalTag">${p.tag}</span>
        <h2 class="ModalTitle">${p.title}</h2>
        <div class="ModalTech">${techHTML}</div>
        <p class="ModalDesc">${p.longDesc || p.shortDesc}</p>
        ${featuresHTML}
        ${imagesHTML}
        ${videosHTML}
        ${linkHTML}
    `;

    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
}

function closeModal() {
    modalBody.querySelectorAll('video').forEach(v => v.pause());
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}

document.addEventListener('click', e => {
    const btn = e.target.closest('.BtnViewProject');
    if (btn) openModal(Number(btn.dataset.index));
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

const navToggle = document.getElementById('NavToggle');
const navLinks = document.getElementById('NavLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
        const handleEl = btn.querySelector('.ContactHandle');
        const original = handleEl.textContent;
        try {
            await navigator.clipboard.writeText(btn.dataset.copy);
            handleEl.textContent = 'Copied!';
            setTimeout(() => { handleEl.textContent = original; }, 1500);
        } catch (err) {

        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.Stat, .SectionTitle, .SkillTags, .ContactCard, .CapRow').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});
document.querySelectorAll('.ProjectCard').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.NavLinks a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
            current = section.getAttribute('id');
        }
    });
    navAnchors.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

const yearEl = document.getElementById('Year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

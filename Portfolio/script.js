// title and shortdesc are necessary
// incase I forget, images can be paths or URLS
// yt videos now have to be in Videos/ folder urgh so annoying
// links need to be in this format {label: "hi lol", url: "goofyurl"}
// links can be anything tbh
const PROJECTS = [
    {
        tag:       "Gameplay Mechanic",
        title:     "Spectating System",
        shortDesc: "A plug-and-play spectating system that lets you spectate every player in the game using a simple UI.",
        tech:      ["Luau", "Spectating", "Gameplay Mechanic", "UI State Management", "Plug-and-play", "Camera"],
        longDesc:  "A spectating system built for Roblox that allows players to cycle through active players using a simple UI. It handles edge cases such as players leaving, respawning, and empty lobbies, while keeping the camera correctly bound to Humanoids at all times. The system is built around clean state management (Idle/Spectating), proper event cleanup to avoid memoryl eaks, and dynamic player list updates to ensure reliable transitions between targets.",
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
        tech:      ["Luau", "UserInputService", "Wrapper"],
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
        tag:       "UI",
        title:     "Admin Panel",
        shortDesc: "A custom in-game admin dashboard for whitelisted users using Iris ImGui.",
        tech:      ["Luau", "UI"],
        longDesc:  "An in-game admin panel using Iris ImGui. Only whitelisted user IDs can open it. However, this project is rather old, discontinued and won't be shown publicly. I don't even know why I added this here in the first place.",
        features: [
            "Whitelist system, only specific user IDs can get it and use it",
            "Built with Iris ImGui for a clean developer-tool look",
            "That's about it"
        ],
        images: [],
        videos: [],
        link: null,
    },
    {
        tag:       "Game",
        title:     "Active Incremental Simulator",
        shortDesc: "I have an incremental game that I am actively working on. It features systems like saving, quests & dialogues, Player data handling and so much more!",
        tech:      ["Luau", "Game", "Studio", "Incremental", "Active Project"],
        longDesc:  "An incremental game built entirely from scratch in Roblox Studio. This is my main long-term project for now. \n\n In the images linked under, please do not judge my building skills, I know I am horrible at building :)",
        features: [
            "Full save/load system that easily saves Inventory items and Quests",
            "Quest & dialogue system with branching conversations",
            "Modular architecture, that means each system is its own module",
            "Very scalable",
        ],
        images: [
            "Images/OutsideImage.png",
            "Images/OutsideImage2.png",
            "Images/PortalHub.png",
            "Images/ProjectExplorer.png",
            "Images/ProjectExplorer2.png"
        ],
        videos: [],
        link: null,
    },
];

// this is the no-no square. no touching after this point
const grid = document.getElementById('ProjectsGrid');

PROJECTS.forEach((project, index) => {
    const techHTML = project.tech.map(t => `<span>${t}</span>`).join('');
    const card = document.createElement('div');
    card.className = 'ProjectCard reveal';
    card.innerHTML = `
        <div class="ProjectTag">${project.tag}</div>
        <h3 class="ProjectName">${project.title}</h3>
        <p class="ProjectDesc">${project.shortDesc}</p>
        <div class="ProjectTech">${techHTML}</div>
        <button class="BtnViewProject" data-index="${index}">View Project</button>
    `;
    grid.appendChild(card);
});

const overlay = document.getElementById('ModalOverlay');
const modalBody = document.getElementById('ModalBody');
const closeBtn = document.getElementById('ModalClose');

function openModal(index) {
    const p = PROJECTS[index];

    const featuresHTML = p.features && p.features.length
        ? `<ul class="ModalFeatures">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>`
        : '';

    const imagesHTML = p.images && p.images.length
        ? `<div class="ModalMedia">${p.images.map(src => `<img src="${src}" alt="screenshot" class="ModalImg">`).join('')}</div>`
        : '';

    const videosHTML = p.videos && p.videos.length
        ? `<div class="ModalVideos">${p.videos.map(src =>
            `<video class="ModalVideo" src="${src}" controls muted playsinline>
                Your browser doesn't support HTML5 video.
            </video>`
          ).join('')}</div>`
        : '';

    const linkHTML = p.link
        ? `<a href="${p.link.url}" target="_blank" class="BtnPrimary ModalLink">${p.link.label} ↗</a>`
        : '';

    const techHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    modalBody.innerHTML = `
        <div class="ModalTag">${p.tag}</div>
        <h2 class="ModalTitle">${p.title}</h2>
        <div class="ProjectTech ModalTech">${techHTML}</div>
        <p class="ModalDesc">${p.longDesc || p.shortDesc}</p>
        ${featuresHTML}
        ${imagesHTML}
        ${videosHTML}
        ${linkHTML}
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalBody.querySelectorAll('video').forEach(v => v.pause());
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('BtnViewProject')) {
        openModal(Number(e.target.dataset.index));
    }
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.StatCard, .SkillGroup, .ContactCard, .SectionTitle, .AboutText').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

document.querySelectorAll('.ProjectCard').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.NavLinks a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

/* ═══════════════════════════════════════════════════════════════
   ARCADE VAULT - Main Application
   ═══════════════════════════════════════════════════════════════ */

// Game data structure (populate this with your games)
const GAMES = [
    // ═══════════════════════════════════════════════════════════════
    // GAMES LIST
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'pokemon-ruby',
        title: 'Pokemon Ruby',
        system: 'GBA',
        category: 'gba',
        core: 'gba',
        romPath: '/roms/gba/pokemon-ruby.gba'
    },
    // ═══════════════════════════════════════════════════════════════
    // ADD MORE GAMES BELOW
    // ═══════════════════════════════════════════════════════════════
    //
    // {
    //     id: 'game-id',
    //     title: 'Game Title',
    //     system: 'SYSTEM',
    //     category: 'category',
    //     core: 'core',
    //     romPath: '/roms/folder/filename.ext'
    // },
    //
    // ═══════════════════════════════════════════════════════════════
    // AVAILABLE CORES:
    // nes, snes, gba, gb, gbc, n64, nds, psx, segaMD, segaGG, arcade
    // ═══════════════════════════════════════════════════════════════
];

// Configuration
const CONFIG = {
    romBasePath: '/roms',
    emulatorPath: '/emulators',
    categories: ['nes', 'snes', 'gba', 'n64', 'arcade', 'other']
};

/* ═══════════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 ARCADE VAULT INITIALIZED');
    
    initializeStats();
    renderGames();
    updateCategoryCounts();
    initializeNavigation();
    initializeCategoryCards();
});

/* ═══════════════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════════════ */

function initializeStats() {
    const gameCount = GAMES.length;
    const romCount = GAMES.filter(g => g.romPath).length;
    
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues[0]) statValues[0].textContent = gameCount;
    if (statValues[1]) statValues[1].textContent = romCount;
}

/* ═══════════════════════════════════════════════════════════════
   GAME RENDERING
   ═══════════════════════════════════════════════════════════════ */

function renderGames(filter = null) {
    const grid = document.getElementById('games-grid');
    if (!grid) return;
    
    let gamesToRender = GAMES;
    
    if (filter) {
        gamesToRender = GAMES.filter(game => game.category === filter);
    }
    
    if (gamesToRender.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎮</div>
                <p class="empty-text">NO GAMES LOADED</p>
                <p class="empty-subtext">Insert coin to continue...</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = gamesToRender.map(game => createGameCard(game)).join('');
    
    // Add click listeners
    grid.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => launchGame(card.dataset.gameId));
    });
}

function createGameCard(game) {
    return `
        <div class="game-card" data-game-id="${game.id}">
            <div class="game-card-image">
                ${game.coverImage 
                    ? `<img src="${game.coverImage}" alt="${game.title}">`
                    : '🎮'}
            </div>
            <div class="game-card-title">${game.title}</div>
            <div class="game-card-system">${game.system}</div>
        </div>
    `;
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY HANDLING
   ═══════════════════════════════════════════════════════════════ */

function updateCategoryCounts() {
    CONFIG.categories.forEach(category => {
        const count = GAMES.filter(g => g.category === category).length;
        const card = document.querySelector(`[data-category="${category}"]`);
        if (card) {
            const countEl = card.querySelector('.category-count');
            if (countEl) countEl.textContent = count;
        }
    });
}

function initializeCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    // Remove active state from all cards
    document.querySelectorAll('.category-card').forEach(c => {
        c.style.borderColor = '';
    });
    
    // Add active state to selected card
    const selectedCard = document.querySelector(`[data-category="${category}"]`);
    if (selectedCard) {
        selectedCard.style.borderColor = 'var(--neon-magenta)';
    }
    
    renderGames(category);
    
    // Scroll to games section
    document.querySelector('.games-section')?.scrollIntoView({ 
        behavior: 'smooth' 
    });
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════ */

function initializeNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle navigation (extend this as needed)
            const text = link.textContent.trim();
            switch(text) {
                case 'HOME':
                    renderGames();
                    break;
                case 'GAMES':
                    document.querySelector('.games-section')?.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                    break;
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   GAME LAUNCHING (Placeholder)
   ═══════════════════════════════════════════════════════════════ */

function launchGame(gameId) {
    const game = GAMES.find(g => g.id === gameId);
    if (!game) {
        console.error('Game not found:', gameId);
        return;
    }
    
    console.log('Launching game:', game.title);
    
    // Build player URL with parameters
    const playerUrl = new URL('player.html', window.location.origin);
    playerUrl.searchParams.set('rom', game.romPath);
    playerUrl.searchParams.set('core', game.core);
    playerUrl.searchParams.set('title', game.title);
    
    // Navigate to player
    window.location.href = playerUrl.toString();
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

function searchGames(query) {
    const lowerQuery = query.toLowerCase();
    return GAMES.filter(game => 
        game.title.toLowerCase().includes(lowerQuery) ||
        game.system.toLowerCase().includes(lowerQuery)
    );
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAMES, CONFIG, renderGames, launchGame };
}

# ROMs Directory

Place your ROM files in the appropriate subdirectories:

```
roms/
├── nes/        - Nintendo Entertainment System (.nes)
├── snes/       - Super Nintendo (.sfc, .smc)
├── gba/        - Game Boy Advance (.gba)
├── n64/        - Nintendo 64 (.n64, .z64, .v64)
├── arcade/     - Arcade ROMs (.zip)
└── other/      - Other systems
```

## Adding Games

1. Place the ROM file in the correct folder
2. Add the game entry to `GAMES` array in `app.js`:

```javascript
{
    id: 'game-slug',
    title: 'Game Title',
    system: 'NES',
    category: 'nes',
    romPath: '/roms/nes/game.nes',
    coverImage: '/covers/game.png',  // optional
    description: 'Game description'   // optional
}
```

## Legal Notice

Only use ROMs for games you legally own. This site is for educational purposes.

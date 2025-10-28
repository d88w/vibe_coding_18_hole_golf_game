// Initialize Kaboom
kaboom({
    width: 800,
    height: 600,
    background: [34, 139, 34],
    canvas: document.querySelector('#game-container canvas') || undefined,
});

// Define gravity
setGravity(1600);

// Movement constants
const MOVE_SPEED = 240;
const JUMP_FORCE = 600;

// 18 Hole Configurations (Par 3, 4, and 5 holes totaling 72)
const holes = [
    // Hole 1 - Par 4
    { par: 4, platforms: [{x: 150, y: 450, length: 150}, {x: 400, y: 380, length: 150}, {x: 600, y: 300, length: 150}], 
      green: {x: 700, y: 155}, bunkers: [{x: 600, y: 160, r: 30}, {x: 780, y: 170, r: 40}], 
      trees: [{x: 50, y: 470}, {x: 350, y: 500}, {x: 500, y: 460}, {x: 150, y: 380}, {x: 450, y: 320}] },
    
    // Hole 2 - Par 3 (shorter, easier)
    { par: 3, platforms: [{x: 200, y: 450, length: 180}, {x: 470, y: 380, length: 160}], 
      green: {x: 700, y: 300}, bunkers: [{x: 750, y: 370, r: 35}], 
      water: [{x: 400, y: 450, w: 320, h: 60}],
      trees: [{x: 100, y: 490}, {x: 200, y: 150}, {x: 600, y: 150}] },
    
    // Hole 3 - Par 5 (long, challenging)
    { par: 5, platforms: [{x: 100, y: 480, length: 120}, {x: 250, y: 420, length: 50}, {x: 400, y: 350, length: 60}, {x: 550, y: 240, length: 100}, {x: 490, y: 295, length: 30}], 
      green: {x: 630, y: 130}, bunkers: [{x: 760, y: 160, r: 25}], 
      water: [{x: 300, y: 450, w: 420, h: 20}],
      trees: [{x: 50, y: 200}, {x: 200, y: 270}, {x: 350, y: 200}, {x: 480, y: 130}] },
    
    // Hole 4 - Par 4
    { par: 4, platforms: [{x: 180, y: 450, length: 140}, {x: 380, y: 370, length: 160}, {x: 620, y: 280, length: 130}], 
      green: {x: 720, y: 180}, bunkers: [{x: 620, y: 150, r: 30}, {x: 780, y: 270, r: 30}], 
      trees: [{x: 80, y: 480}, {x: 280, y: 200}, {x: 520, y: 120}, {x: 700, y: 430}] },
    
    // Hole 5 - Par 4
    { par: 4, platforms: [{x: 140, y: 470, length: 160}, {x: 350, y: 390, length: 140}, {x: 580, y: 310, length: 150}], 
      green: {x: 710, y: 220}, bunkers: [{x: 650, y: 240, r: 35}], 
      trees: [{x: 60, y: 490}, {x: 240, y: 260}, {x: 450, y: 230}, {x: 650, y: 420}] },
    
    // Hole 6 - Par 3
    { par: 3, platforms: [{x: 220, y: 450, length: 270}, {x: 520, y: 350, length: 210}], 
      green: {x: 690, y: 200}, bunkers: [{x: 630, y: 220, r: 30}, {x: 740, y: 215, r: 28}], 
      trees: [{x: 120, y: 480}, {x: 350, y: 260}, {x: 600, y: 470}] },
    
    // Hole 7 - Par 4
    { par: 4, platforms: [{x: 160, y: 460, length: 145}, {x: 360, y: 380, length: 155}, {x: 590, y: 300, length: 140}], 
      green: {x: 710, y: 200}, bunkers: [{x: 660, y: 220, r: 32}], 
      trees: [{x: 70, y: 485}, {x: 260, y: 210}, {x: 480, y: 440}, {x: 550, y: 360}] },
    
    // Hole 8 - Par 5
    { par: 5, platforms: [{x: 120, y: 465, length: 510}, {x: 270, y: 355, length: 205}, {x: 560, y: 255, length: 105}, {x: 450, y: 165, length: 95}], 
      green: {x: 640, y: 115}, bunkers: [{x: 690, y: 235, r: 28}], 
      water: [{x: 350, y: 320, w: 30, h: 20}],
      trees: [{x: 50, y: 195}, {x: 180, y: 165}, {x: 330, y: 425}, {x: 480, y: 420}] },
    
    // Hole 9 - Par 4
    { par: 4, platforms: [{x: 170, y: 455, length: 150}, {x: 390, y: 375, length: 150}, {x: 610, y: 290, length: 140}], 
      green: {x: 650, y: 190}, bunkers: [{x: 540, y: 200, r: 30}], 
      trees: [{x: 90, y: 380}, {x: 290, y: 205}, {x: 510, y: 125}, {x: 680, y: 440}] },
    
    // Hole 10 - Par 4
    { par: 4, platforms: [{x: 155, y: 465, length: 155}, {x: 375, y: 385, length: 145}, {x: 595, y: 305, length: 145}], 
      green: {x: 715, y: 205}, bunkers: [{x: 600, y: 200, r: 25}, {x: 760, y: 220, r: 15}], 
      trees: [{x: 65, y: 390}, {x: 275, y: 215}, {x: 495, y: 235}, {x: 665, y: 455}] },
    
    // Hole 11 - Par 5 (with water hazard!)
    { par: 5, platforms: [{x: 110, y: 480, length: 115}, {x: 260, y: 420, length: 108}, {x: 405+50, y: 350, length: 218-50}, {x: 305, y: 250, length: 108}], 
      green: {x: 535, y: 200}, bunkers: [{x: 585, y: 240, r: 30}], 
      water: [{x: 330, y: 450, w: 420, h: 40}],
      trees: [{x: 45, y: 300}, {x: 175, y: 270}, {x: 325, y: 150}, {x: 675, y: 320}] },
    
    // Hole 12 - Par 3
    { par: 3, platforms: [{x: 210, y: 445, length: 275}, {x: 415, y: 345, length: 265}], 
      green: {x: 395, y: 215}, bunkers: [{x: 495, y: 215, r: 20}], 
      trees: [{x: 110, y: 475}, {x: 120, y: 155}, {x: 595, y: 465}] },
    
    // Hole 13 - Par 4
    { par: 4, platforms: [{x: 165, y: 460, length: 148}, {x: 370, y: 380, length: 153}, {x: 600, y: 295, length: 138}], 
      green: {x: 715, y: 195}, bunkers: [{x: 775, y: 300, r: 30}], 
      water: [{x: 320, y: 450, w: 420, h: 30}],
      trees: [{x: 75, y: 185}, {x: 270, y: 110}, {x: 490, y: 330}, {x: 670, y: 245}] },
    
    // Hole 14 - Par 4
    { par: 4, platforms: [{x: 175, y: 450, length: 145}, {x: 385, y: 370, length: 148}, {x: 605, y: 285, length: 135}], 
      green: {x: 710, y: 185}, bunkers: [{x: 655, y: 205, r: 32}], 
      trees: [{x: 85, y: 175}, {x: 285, y: 200}, {x: 505, y: 120}] },
    
    // Hole 15 - Par 5
    { par: 5, platforms: [{x: 115, y: 478, length: 118}, {x: 265, y: 418, length: 110}, {x: 410, y: 348, length: 120}, {x: 300, y: 258, length: 110}], 
      green: {x: 540, y: 218}, bunkers: [{x: 540, y: 300, r: 25}], 
      trees: [{x: 48, y: 198}, {x: 178, y: 168}, {x: 578, y: 428}] },
    
    // Hole 16 - Par 3
    { par: 3, platforms: [{x: 205, y: 458, length: 372}, {x: 510, y: 358, length: 162}], 
      green: {x: 690, y: 208}, bunkers: [{x: 630, y: 218, r: 32}], 
      water: [{x: 290, y: 440, w: 40, h: 20}],
      trees: [{x: 105, y: 178}, {x: 335, y: 158}, {x: 395, y: 168}] },
    
    // Hole 17 - Par 4
    { par: 4, platforms: [{x: 168, y: 458, length: 147}, {x: 375, y: 378, length: 151}, {x: 598, y: 293, length: 137}], 
      green: {x: 713, y: 193}, bunkers: [{x: 663, y: 213, r: 34}], 
      trees: [{x: 78, y: 183}, {x: 275, y: 138}, {x: 495, y: 228}, {x: 668, y: 443}] },
    
    // Hole 18 - Par 5 (Final hole, challenging)
    { par: 5, platforms: [{x: 110, y: 480, length: 115}, {x: 260, y: 420, length: 108}, {x: 405, y: 350, length: 218}, {x: 285, y: 250, length: 128}], 
      green: {x: 135, y: 200}, bunkers: [{x: 185, y: 240, r: 30}], 
      trees: [{x: 445, y: 300}, {x: 575, y: 270}, {x: 325, y: 150}, {x: 575, y: 420}] },
];

// Game state variables
let currentHole = 0;
let holeStrokes = 0;
let totalStrokes = 0;
let completedStrokesSnapshot = 0; // Strokes from completed holes (frozen during current hole)
let gameWon = false;
let inBunker = false;
let inWater = false;
let lastPlatformPos = vec2(20, 518); // Track last safe platform position
let scorecard = []; // Track score for each hole
const TOTAL_PAR = 72;

// Player reference
let player = null;

// UI elements
let holeNumberText = null;
let holeStatsText = null;
let totalLabelText = null;
let totalScoreText = null;
let instructionsText = null;

// Event handler references
let enterHandler = null;

// Function to clear all hole elements
function clearHole() {
    // Destroy all hole-specific elements
    destroyAll("platform");
    destroyAll("sandBunker");
    destroyAll("waterHazard");
    destroyAll("tree");
    destroyAll("tee");
    destroyAll("green");
    destroyAll("goal");
    destroyAll("flagpole");
    destroyAll("flag");
    destroyAll("holeComplete");
    destroyAll("penaltyMsg");
}

// Function to load a specific hole
function loadHole(holeNum) {
    clearHole();
    
    const hole = holes[holeNum];
    gameWon = false;
    holeStrokes = 0;
    completedStrokesSnapshot = totalStrokes; // Capture completed strokes at start of hole (frozen for display)
    inBunker = false;
    inWater = false;
    lastPlatformPos = vec2(20, 518); // Reset to starting tee position
    
    // Add golf tee
    add([
        rect(24, 6),
        pos(8, 549),
        color(255, 69, 0),
        z(1),
        "tee",
    ]);
    add([
        rect(16, 8),
        pos(12, 555),
        color(255, 69, 0),
        z(1),
        "tee",
    ]);
    add([
        rect(8, 8),
        pos(16, 563),
        color(255, 69, 0),
        z(1),
        "tee",
    ]);

    // Add decorative trees
    hole.trees.forEach(tree => {
        add([
            rect(15, 30),
            pos(tree.x, tree.y),
            color(101, 67, 33),
            z(-2),
            "tree",
        ]);
        add([
            circle(25),
            pos(tree.x + 7, tree.y - 10),
            color(0, 80, 0),
            z(-2),
            "tree",
        ]);
    });

    // Add sand bunkers
    hole.bunkers.forEach(bunker => {
        add([
            circle(bunker.r),
            pos(bunker.x, bunker.y),
            color(238, 214, 175),
            area(),
            body({ isStatic: true }),
            z(-0.8),
            "sandBunker",
        ]);
    });

    // Add water hazards (if hole has them)
    if (hole.water) {
        hole.water.forEach(water => {
            add([
                rect(water.w, water.h),
                pos(water.x, water.y),
                color(30, 144, 255),
                area(),
                body({ isStatic: true }),
                z(-0.9),
                "waterHazard",
            ]);
        });
    }

    // Create ground platform
    add([
        rect(800, 50),
        pos(0, 550),
        color(0, 100, 0),
        area(),
        body({ isStatic: true }),
        "platform",
    ]);

    // Create floating platforms
    hole.platforms.forEach(platform => {
        add([
            rect(platform.length, 20),
            pos(platform.x, platform.y),
            color(0, 100, 0),
            area(),
            body({ isStatic: true }),
            "platform",
        ]);
    });
    
    // Reset player position and visibility AFTER platforms are created
    player.pos = vec2(20, 518);
    player.opacity = 1;
    // Ensure player can move
    if (player.paused) player.paused = false;

    // Add putting green
    add([
        circle(100),
        pos(hole.green.x, hole.green.y),
        color(50, 205, 50),
        z(-1),
        "green",
    ]);

    // Add the goal
    add([
        circle(25),
        pos(hole.green.x, hole.green.y),
        color(0, 0, 0),
        area(),
        body({ isStatic: true }),
        "goal",
    ]);

    // Add flag pole
    add([
        rect(3, 60),
        pos(hole.green.x, hole.green.y - 60),
        color(255, 255, 255),
        z(0.5),
        "flagpole",
    ]);

    // Add flag
    add([
        rect(30, 20),
        pos(hole.green.x + 3, hole.green.y - 60),
        color(255, 0, 0),
        z(0.5),
        "flag",
    ]);

    // Update UI
    updateUI();
}

// Function to update UI
function updateUI() {
    const hole = holes[currentHole];
    holeNumberText.text = `HOLE ${currentHole + 1}`;
    holeStatsText.text = `Par ${hole.par}  •  Strokes: ${holeStrokes}`;
    
    // Use frozen snapshot of completed strokes (captured at start of hole)
    // This ensures the number doesn't change while playing the current hole
    // Example: On hole 3, if you shot 4 on hole 1 and 5 on hole 2, this stays at 9 (4+5) throughout hole 3
    
    // Calculate cumulative par for completed holes only (0 to currentHole-1)
    let completedPar = 0;
    for (let i = 0; i < currentHole; i++) {
        completedPar += holes[i].par;
    }
    
    // Calculate par differential for completed holes
    const differential = completedStrokesSnapshot - completedPar;
    let differentialText;
    if (differential === 0) {
        differentialText = "E";
    } else if (differential > 0) {
        differentialText = `+${differential}`;
    } else {
        differentialText = `${differential}`;
    }
    
    totalScoreText.text = `Par ${TOTAL_PAR}  •  ${completedStrokesSnapshot}  •  ${differentialText}`;
}

// Initialize player
player = add([
    circle(16),
    pos(20, 518),
    color(255, 255, 255),
    area(),
    body(),
    "player",
]);

// Create persistent UI elements with improved hierarchy

// TOP LEFT - Current Hole (Primary Info)
holeNumberText = add([
    text(`HOLE 1`, {
        size: 28,
    }),
    pos(15, 12),
    color(255, 215, 0), // Gold
    fixed(),
    z(100),
    "ui",
]);

holeStatsText = add([
    text(`Par 4  •  Strokes: 0`, {
        size: 18,
    }),
    pos(15, 45),
    color(255, 255, 255), // White
    fixed(),
    z(100),
    "ui",
]);

// Total Score (below hole info)
totalLabelText = add([
    text(`TOTAL STROKES`, {
        size: 14,
    }),
    pos(15, 75),
    color(200, 200, 200), // Light gray
    fixed(),
    z(100),
    "ui",
]);

totalScoreText = add([
    text(`Par 72  •  0  •  E`, {
        size: 18,
    }),
    pos(15, 95),
    color(255, 255, 255), // White
    fixed(),
    z(100),
    "ui",
]);

// BOTTOM - Instructions (Tertiary Info)
instructionsText = add([
    text("← → Move  •  Space/↑ Jump  •  Each jump = 1 stroke  •  Avoid hazards!", {
        size: 12,
    }),
    pos(785, 575),
    anchor("right"),
    color(220, 220, 220), // Slightly dimmed white
    fixed(),
    z(100),
    "ui",
]);

// Player movement
onKeyDown("left", () => {
    if (!gameWon) player.move(-MOVE_SPEED, 0);
});

onKeyDown("right", () => {
    if (!gameWon) player.move(MOVE_SPEED, 0);
});

onKeyDown("a", () => {
    if (!gameWon) player.move(-MOVE_SPEED, 0);
});

onKeyDown("d", () => {
    if (!gameWon) player.move(MOVE_SPEED, 0);
});

// Jump
onKeyPress("space", () => {
    if (player.isGrounded() && !gameWon) {
        player.jump(JUMP_FORCE);
        holeStrokes++;
        updateUI();
    }
});

onKeyPress("up", () => {
    if (player.isGrounded() && !gameWon) {
        player.jump(JUMP_FORCE);
        holeStrokes++;
        updateUI();
    }
});

onKeyPress("w", () => {
    if (player.isGrounded() && !gameWon) {
        player.jump(JUMP_FORCE);
        holeStrokes++;
        updateUI();
    }
});

// Keep player within screen bounds
player.onUpdate(() => {
    if (player.pos.x < 0) {
        player.pos.x = 0;
    }
    if (player.pos.x > width() - player.radius * 2) {
        player.pos.x = width() - player.radius * 2;
    }
    
    // Reset if player falls off screen
    if (player.pos.y > height() + 100) {
        player.pos = vec2(20, 518);
    }
});

// Check for sand bunker collision
player.onCollide("sandBunker", () => {
    if (!inBunker && !gameWon) {
        inBunker = true;
        holeStrokes++;
        updateUI();
        
        const penaltyMsg = add([
            text("+1 PENALTY", {
                size: 24,
            }),
            pos(width() / 2, height() / 2),
            anchor("center"),
            color(255, 100, 100),
            fixed(),
            z(100),
            "penaltyMsg",
        ]);
        
        wait(1.5, () => {
            destroy(penaltyMsg);
        });
    }
});

player.onCollideEnd("sandBunker", () => {
    inBunker = false;
});

// Track last safe platform position
player.onCollide("platform", () => {
    if (!inWater && !gameWon) {
        // Store the position on top of the platform
        lastPlatformPos = vec2(player.pos.x, player.pos.y);
    }
});

// Check for water hazard collision (stroke and distance penalty)
player.onCollide("waterHazard", () => {
    if (!inWater && !gameWon) {
        inWater = true;
        holeStrokes++; // Penalty stroke
        updateUI();
        
        // Show penalty message
        const penaltyMsg = add([
            text("WATER HAZARD!\nStroke & Distance", {
                size: 24,
            }),
            pos(width() / 2, height() / 2),
            anchor("center"),
            color(30, 144, 255),
            fixed(),
            z(100),
            "penaltyMsg",
        ]);
        
        wait(1, () => {
            destroy(penaltyMsg);
        });
        
        // Return ball to last platform after brief delay
        wait(0.5, () => {
            player.pos = lastPlatformPos;
            inWater = false;
        });
    }
});

// Check for goal collision
player.onCollide("goal", () => {
    if (!gameWon) {
        gameWon = true;
        player.opacity = 0;
        
        // Record score for this hole
        const hole = holes[currentHole];
        const scoreDiff = holeStrokes - hole.par;
        scorecard.push({ hole: currentHole + 1, par: hole.par, strokes: holeStrokes, diff: scoreDiff });
        totalStrokes += holeStrokes;
        
        let scoreText = "";
        let scoreColor = [255, 255, 255];
        
        if (holeStrokes < hole.par) {
            scoreText = "BIRDIE!";
            scoreColor = [255, 215, 0];
        } else if (holeStrokes === hole.par) {
            scoreText = "PAR!";
            scoreColor = [255, 255, 255];
        } else if (holeStrokes === hole.par + 1) {
            scoreText = "BOGEY";
            scoreColor = [255, 165, 0];
        } else {
            scoreText = "DOUBLE BOGEY+";
            scoreColor = [200, 200, 200];
        }
        
        add([
            text(scoreText, {
                size: 60,
            }),
            pos(width() / 2, height() / 2 - 60),
            anchor("center"),
            color(scoreColor[0], scoreColor[1], scoreColor[2]),
            fixed(),
            z(100),
            "holeComplete",
        ]);
        
        add([
            text(`${holeStrokes} Strokes (${scoreDiff >= 0 ? '+' : ''}${scoreDiff})`, {
                size: 24,
            }),
            pos(width() / 2, height() / 2 - 10),
            anchor("center"),
            color(255, 255, 255),
            fixed(),
            z(100),
            "holeComplete",
        ]);

        // Check if this was the last hole
        if (currentHole === 17) {
            // Show final scorecard
            wait(2, () => {
                showFinalScorecard();
            });
        } else {
            // Show "Next Hole" button
            const nextButton = add([
                text("Press ENTER for Next Hole", {
                    size: 20,
                }),
                pos(width() / 2, height() / 2 + 40),
                anchor("center"),
                color(100, 255, 100),
                fixed(),
                z(100),
                "holeComplete",
            ]);

            // Cancel any existing enter handler
            if (enterHandler) {
                enterHandler.cancel();
            }
            
            // Add Enter key handler for next hole
            enterHandler = onKeyPress("enter", () => {
                currentHole++;
                loadHole(currentHole);
                enterHandler.cancel();
                enterHandler = null;
            });
        }
    }
});

// Function to show final scorecard
function showFinalScorecard() {
    destroyAll("holeComplete");
    
    // Clear the hole to show completion screen on clean green background
    clearHole();
    player.opacity = 0; // Hide the player
    
    // Hide the HUD elements
    holeNumberText.hidden = true;
    holeStatsText.hidden = true;
    totalLabelText.hidden = true;
    totalScoreText.hidden = true;
    instructionsText.hidden = true;
    
    const finalDiff = totalStrokes - TOTAL_PAR;
    let finalText = "";
    let finalColor = [255, 255, 255];
    
    if (finalDiff < 0) {
        finalText = `UNDER PAR BY ${Math.abs(finalDiff)}!`;
        finalColor = [255, 215, 0];
    } else if (finalDiff === 0) {
        finalText = "EVEN PAR!";
        finalColor = [255, 255, 255];
    } else {
        finalText = `OVER PAR BY ${finalDiff}`;
        finalColor = [255, 165, 0];
    }
    
    add([
        text("COURSE COMPLETE!", {
            size: 50,
        }),
        pos(width() / 2, 60),
        anchor("center"),
        color(255, 215, 0),
        fixed(),
        z(100),
        "finalScore",
    ]);
    
    add([
        text(finalText, {
            size: 36,
        }),
        pos(width() / 2, 110),
        anchor("center"),
        color(finalColor[0], finalColor[1], finalColor[2]),
        fixed(),
        z(100),
        "finalScore",
    ]);
    
    add([
        text(`Total Strokes: ${totalStrokes} | Par: ${TOTAL_PAR}`, {
            size: 22,
        }),
        pos(width() / 2, 150),
        anchor("center"),
        color(255, 255, 255),
        fixed(),
        z(100),
        "finalScore",
    ]);

    // Show abbreviated scorecard
    let scorecardY = 190;
    add([
        text("SCORECARD", {
            size: 20,
        }),
        pos(width() / 2, scorecardY),
        anchor("center"),
        color(255, 215, 0),
        fixed(),
        z(100),
        "finalScore",
    ]);

    scorecardY += 30;
    
    // Show scores in a compact format (two rows)
    let row1 = "Holes 1-9:  ";
    let row2 = "Holes 10-18: ";
    
    for (let i = 0; i < 9; i++) {
        const score = scorecard[i];
        const display = score.diff === 0 ? "E" : (score.diff > 0 ? `+${score.diff}` : score.diff);
        row1 += `${display} `;
    }
    
    for (let i = 9; i < 18; i++) {
        const score = scorecard[i];
        const display = score.diff === 0 ? "E" : (score.diff > 0 ? `+${score.diff}` : score.diff);
        row2 += `${display} `;
    }
    
    add([
        text(row1, {
            size: 14,
        }),
        pos(width() / 2, scorecardY),
        anchor("center"),
        color(255, 255, 255),
        fixed(),
        z(100),
        "finalScore",
    ]);

    add([
        text(row2, {
            size: 14,
        }),
        pos(width() / 2, scorecardY + 20),
        anchor("center"),
        color(255, 255, 255),
        fixed(),
        z(100),
        "finalScore",
    ]);

    add([
        text("Refresh Page to Play Again", {
            size: 18,
        }),
        pos(width() / 2, height() - 40),
        anchor("center"),
        color(100, 255, 100),
        fixed(),
        z(100),
        "finalScore",
    ]);
}

// Load the first hole
loadHole(0);


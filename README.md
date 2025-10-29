# The Wang Golf Championship
## The Coolest 18-Hole Golf Platformer Game

A complete 18-hole golf course platformer that combines classic platforming mechanics with authentic golf scoring. Navigate a golf ball through varied terrain from tee to green, tracking your performance across a full round of 72 par!

## How to Play the Game

Download all files in the repo. Then, simply open `game.html` in any modern web browser. No server or build process required.

## Objective

Complete all 18 holes with the lowest total score! Each hole presents unique challenges with varying distances and obstacles. Your goal is to reach par (72 strokes) or better across the entire course. All holes have the chance of Par and some have the chance of Birdie.

## Controls

- **← → Arrow Keys**: Move the ball horizontally
- **Space** or **↑ Up Arrow**: Jump (only when grounded on a platform)
- **Enter**: Proceed to next hole (after completing current hole)

**Important**: 
- Each jump = 1 stroke (movement doesn't count!)
- Plan your jumps carefully to minimize your score
- To play again after completing 18 holes, refresh the page

## Game Mechanics

### 18-Hole Course Structure
The course features **18 unique holes** with varying difficulty:
- **Par 3 Holes**: 4 holes (shorter distance, fewer platforms)
- **Par 4 Holes**: 10 holes (medium distance, moderate platforming)
- **Par 5 Holes**: 4 holes (longer distance, more challenging layouts)
- **Total Par**: 72 strokes

### Scoring System
Your score for each hole depends on how many jumps (strokes) you take relative to par:

- **🏆 BIRDIE** (Gold): Under par - Excellent!
- **✓ PAR** (White): Exactly par - Great job!
- **○ BOGEY** (Orange): One over par
- **✗ DOUBLE BOGEY+** (Gray): Two or more over par

**Final Course Score**:
- **Under Par**: You beat the course!
- **Even Par (72)**: Perfect round!
- **Over Par**: Room for improvement, try again!

### Penalty System

**Sand Bunkers** (beige circles) are strategically placed around putting greens. Touching a bunker adds **+1 penalty stroke** automatically and displays a warning message.

**Water Hazards** (blue rectangles) appear on select holes throughout the course (Holes 2, 3, 11, 13, 14). Water hazards enforce the **stroke and distance** penalty:
- **+1 penalty stroke** is added
- Ball returns to the **last platform** you landed on
- More punishing than bunkers - plan your route carefully!
- These holes require strategic thinking and precise jumps

### HUD & Tracking
The game displays comprehensive scoring information with clear visual hierarchy:

**Top Left - All Game Information:**
- **HOLE X** (Large, Gold) - Current hole number
- **Par X • Strokes: X** (Medium, White) - Current hole stats
- **TOTAL STROKES** (Small label, Gray)
- **Par 72 • X • +/-X** (Medium, White) - Course par, completed strokes, differential

**Bottom Right - Instructions:**
- Controls and tips displayed in compact single line
- Right-aligned to stay out of the way during gameplay

**Live Updates**: Current hole strokes update with each jump

**Total Scoring Display:**
- Shows strokes from **completed holes only** (current hole not counted)
- This number is **frozen** while you play each hole - it won't change with each jump
- Differential compares your completed strokes to the par of completed holes
- **Example on Hole 1:** `Par 72 • 0 • E` (no holes completed yet - stays at 0 throughout hole 1)
- **Example on Hole 3 after shooting 4 and 5 on holes 1 & 2:** `Par 72 • 9 • +2` (stays at 9 throughout hole 3)
- **E** = Even par, **+2** = Two over par, **-2** = Two under par

### Course Elements (Per Hole)
- **Starting Tee** (orange) - Where the ball begins each hole
- **Floating Platforms** (dark green) - Vary in number and position per hole
- **Decorative Trees** (dark green) - No collision, add atmosphere
- **Putting Green** (lighter green circle) - Surrounds the hole
- **The Hole** (black circle with red flag) - Your target!
- **Sand Bunkers** (beige) - Penalty hazards around greens (+1 stroke)
- **Water Hazards** (blue) - Stroke and distance penalty on select holes (+1 stroke + return to last platform)

### Physics & Movement
- **Gravity** pulls the ball down naturally (1600)
- **Horizontal movement** is smooth and responsive (240 speed)
- **Jump force** provides consistent platforming (600 force)
- Ball stays within screen boundaries
- Falls respawn at the starting tee (strokes remain)

## Progression & Scorecard

### Hole Completion
After sinking the ball in each hole:
1. Your score for that hole is displayed (Birdie, Par, Bogey, etc.)
2. The score differential (+/-) relative to par is shown
3. Press **ENTER** to advance to the next hole
4. Your cumulative score carries forward

### Final Scorecard
After completing all 18 holes, you'll see:
- **Course completion message** with your final standing vs par
- **Total strokes** compared to the course par of 72
- **Compact scorecard** showing your performance on each hole (displayed as +/- vs par)
- To play again, simply **refresh the page**

## Strategy Tips

- **Plan your route**: Study each hole's platform layout before jumping
- **Minimize jumps**: Each stroke counts - find the most efficient path
- **Avoid bunkers**: Sand hazards add penalty strokes and can ruin a good round
- **AVOID WATER**: Water hazards send you back to your last platform - extremely costly!
- **Track your platforms**: On water hazard holes (2, 3, 11, 13, 14), know where your safe landing zones are
- **Scout the hole**: Take a moment to identify hazards before your first jump
- **Free movement**: Move left/right without penalty while airborne
- **Par 3s are opportunities**: Shorter holes are chances for birdies
- **Par 5s require patience**: Don't rush the longer holes - consistency beats risk
- **Mind the middle holes**: Holes 11-14 feature multiple water hazards - extra caution needed!
- **Track your total**: Keep an eye on your cumulative score vs par throughout the round
- **Falls cost strokes**: Be careful near edges - respawning doesn't reset your count!

## Technical Details

### Files Structure
- **`game.html`** - Clean HTML structure with styling and canvas container
- **`game.js`** - Complete game logic, all 18 hole configurations, and game systems
- Separated for better code organization and maintainability

### Technology Stack
- Built with [Kaboom.js](https://kaboomjs.com/) v3000.0.1
- 800x600 game canvas
- No external dependencies beyond the Kaboom.js CDN
- Simple geometric shapes (no sprites required)
- Pure JavaScript ES6+ features

### Game Systems
- **18 unique hole configurations** stored in a holes array
- **Dynamic level loading system** - `loadHole()` function clears and rebuilds each hole
- **Persistent scorecard tracking** across all 18 holes
- **Real-time UI updates** with visual hierarchy
- **State management**: Tracks current hole, hole strokes, total strokes, and scorecard
- **Collision detection**: Separate handlers for goals, bunkers, water, and platforms
- **Event handler management**: Properly cancels and recreates handlers to prevent conflicts
- **UI persistence**: Fixed HUD elements remain visible across hole transitions

## Customization

You can easily modify the game by editing the `game.js` file:

### Hole Configuration
Each hole in the `holes` array (lines 15-140) contains:
- **par**: Target strokes for the hole (3, 4, or 5)
- **platforms**: Array of floating platform objects `{x, y, length}`
- **green**: Position of the putting green and hole `{x, y}`
- **bunkers**: Array of sand hazard objects `{x, y, r}` (radius)
- **water**: (Optional) Array of water hazard objects `{x, y, w, h}` (width, height)
- **trees**: Array of decorative tree positions `{x, y}`

### Physics & Controls
- **JUMP_FORCE**: Adjust jump height (default: 600)
- **MOVE_SPEED**: Modify horizontal movement speed (default: 240)
- **setGravity()**: Change gravity strength (default: 1600)

### Course Design
- Add/remove holes from the `holes` array
- Adjust TOTAL_PAR constant if changing hole count/pars
- Modify platform layouts for different difficulty
- Reposition bunkers to increase/decrease challenge
- Change tree placements for visual variety

### Visual Customization

**Game Elements** (in `game.js`):
- **Colors**: Update `color()` values for any element (ball, platforms, hazards, etc.)
- **Sizes**: Modify platform lengths, bunker radii, green size
- **UI**: Adjust text sizes and positions in the HUD elements (lines 330-380)
  - Hole number display (top-left, primary)
  - Hole stats display (top-left, secondary)
  - Total strokes with differential (top-left, tertiary)
  - Instructions (bottom-right)

**Page Styling** (in `game.html`):
- Modify the `<style>` section for page background, container border, and shadows
- Adjust canvas container dimensions if needed


# 18-Hole Golf Platformer Game

A complete 18-hole golf course platformer that combines classic platforming mechanics with authentic golf scoring. Navigate a golf ball through varied terrain from tee to green, tracking your performance across a full round of 72 par!

## How to Run

Simply open `game.html` in any modern web browser. No server or build process required.

## Objective

Complete all 18 holes with the lowest total score! Each hole presents unique challenges with varying distances and obstacles. Your goal is to reach par (72 strokes) or better across the entire course.

## Controls

- **Left/Right Arrow Keys**: Move the ball horizontally
- **Space** or **Up Arrow**: Jump (only when grounded on a platform)
- **Enter**: Proceed to next hole (after completing current hole)
- **R**: Restart the entire course (after finishing 18 holes)

**Note**: Each jump counts as one stroke - horizontal movement does not!

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

**Water Hazards** (blue rectangles) appear on select holes (notably Hole 11). Water hazards enforce the **stroke and distance** penalty:
- **+1 penalty stroke** is added
- Ball returns to the **last platform** you landed on
- More punishing than bunkers - plan your route carefully!

### HUD & Tracking
The game displays comprehensive scoring information:
- **Top Left**: Current hole number (Hole X/18)
- **Top Right**: Hole strokes and par for current hole
- **Top Right**: Total strokes vs total par (X/72)
- **Live Updates**: Stroke counter updates with each jump

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
- Option to **restart the course** by pressing **R**

## Strategy Tips

- **Plan your route**: Study each hole's platform layout before jumping
- **Minimize jumps**: Each stroke counts - find the most efficient path
- **Avoid bunkers**: Sand hazards add penalty strokes and can ruin a good round
- **AVOID WATER**: Water hazards send you back to your last platform - extremely costly!
- **Track your platforms**: On water hazard holes, know where your safe landing zones are
- **Free movement**: Move left/right without penalty while airborne
- **Par 3s are opportunities**: Shorter holes are chances for birdies
- **Par 5s require patience**: Don't rush the longer holes - consistency beats risk
- **Hole 11 warning**: Features water hazards - take your time and plan carefully!
- **Track your total**: Keep an eye on your cumulative score vs par throughout the round
- **Falls cost strokes**: Be careful near edges - respawning doesn't reset your count!

## Technical Details

- Built with [Kaboom.js](https://kaboomjs.com/) v3000.0.1
- Single HTML file with embedded JavaScript
- 800x600 game canvas
- No external dependencies beyond the Kaboom.js CDN
- Simple geometric shapes (no sprites required)
- **18 unique hole configurations** stored in a holes array
- Dynamic level loading system
- Persistent scorecard tracking across holes
- Real-time UI updates

### Game Architecture
- **State management**: Tracks current hole, hole strokes, total strokes, and scorecard
- **Dynamic level loading**: `loadHole()` function clears and rebuilds each hole
- **Collision detection**: Separate handlers for goals, bunkers, and platforms
- **UI persistence**: Fixed HUD elements remain across hole transitions

## Customization

You can easily modify the game by editing the `game.html` file:

### Hole Configuration
Each hole in the `holes` array contains:
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
- **Colors**: Update `color()` values for any element
- **Sizes**: Modify platform lengths, bunker radii, green size
- **UI**: Adjust text sizes and positions in the HUD elements


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

### Scoring System (Par 4)
The hole is set to **Par 4**. Your final score depends on how many jumps (strokes) you take:

- **🏆 BIRDIE** (Gold): Under 4 strokes - Excellent!
- **✓ PAR** (White): Exactly 4 strokes - Great job!
- **○ BOGEY** (Orange): 5 strokes - One over par
- **✗ COMPLETE** (Gray): 6+ strokes - Multiple over par

### Penalty System
**Sand Bunkers** (beige circles) are positioned around the putting green. Touching a bunker adds **+1 penalty stroke** automatically and displays a warning message.

### Course Layout
- **Starting Tee** (orange) - Where the ball begins
- **3 Floating Platforms** (dark green) - Navigate across these to reach the green
- **Decorative Trees** (dark green) - No collision, purely visual
- **Putting Green** (lighter green circle) - The final target area
- **The Hole** (black circle with flag) - Your goal!

### Physics & Movement
- **Gravity** pulls the ball down naturally
- **Horizontal movement** is smooth and responsive
- Ball stays within screen boundaries
- Falls off the bottom respawn at the starting tee

## Strategy Tips

- Plan your jumps carefully - each one adds to your stroke count!
- Avoid the sand bunkers near the green to prevent penalty strokes
- You can move left/right freely without penalty while in the air
- Finding the most efficient path is key to achieving a Birdie
- The ball respawns at the start if you fall, but your stroke count remains

## Technical Details

- Built with [Kaboom.js](https://kaboomjs.com/) v3000.0.1
- Single HTML file with embedded JavaScript
- 800x600 game canvas
- No external dependencies beyond the Kaboom.js CDN
- Simple geometric shapes (no sprites required)

## Customization

You can easily modify the game by editing `game.html`:
- **Par setting**: Change the `par` constant (currently 4)
- **Platform positions**: Edit the `platforms` array for different layouts
- **Jump height**: Adjust `JUMP_FORCE` constant (currently 600)
- **Movement speed**: Modify `MOVE_SPEED` constant (currently 240)
- **Gravity**: Change `setGravity()` value (currently 1600)
- **Colors**: Update `color()` values for any game object
- **Bunker positions**: Modify sand bunker coordinates for difficulty


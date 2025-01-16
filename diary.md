14.1: made some background pixel-art and started to code only to throw the whole code away.

15.1: restarted the coding, did the player object and used the skeleton spritesheet, coded randomized items

16.1: Made items spawn consecutively, added values for score and lives in main, implemented so that when items hit the ground the player loses a life

   
2) if statement for items so that if its a ball or meat = +10 and if its trash or a bomb -10 in blockobject collission
   if (this.items[this.index] === "./images/ball.png" || this.items[this.index] === "./images/meat.png") {
                global.score += 10;  // Player gains 10 points for catching ball or meat
            } 
            else if (this.items[this.index] === "./images/bomb.png" || this.items[this.index] === "./images/trash.png") {
                global.score -= 10;  // Player loses 10 points for catching bomb or trash
            }


























   

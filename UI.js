export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.liveImage = document.getElementById("lives")
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur=0;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    //score
    context.fillText("Puntuación: " + this.game.score, 20, 50);
    // context.fillText("Score: " + this.game.score, 20, 50);

    //timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    // context.fillText('Time: ' + this.game.time, 20 , 80)
    context.fillText("Tiempo: " + (this.game.time * 0.001).toFixed(1), 20, 80);

    //lives
    for(let i=0; i< this.game.lives ; i++){
      context.drawImage(this.liveImage, 25 * i +20,95,25,25)
    }

    ///gamme over message;
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score > this.game.winnigScore) {
        context.fillText(
          "Orión: ",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20,
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText(
          "¿Vamos que si se puede ?",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20,
        );
      } else {
        context.fillText(
          "Bien jugado ",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20,
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText(
          "Buena suerte en la siguiente partida",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20,
        );
      }
    }

    context.restore();
  }
}

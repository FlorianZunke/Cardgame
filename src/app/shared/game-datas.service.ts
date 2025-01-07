import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDatasService {

  players: string[] = [];
  cardStack: string[] = [];
  playedCards: string[] = [];
  currentPLayer: number = 0;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.cardStack.push('cross-' + i);
      this.cardStack.push('diamond-' + i);
      this.cardStack.push('heart-' + i);
      this.cardStack.push('pik-' + i);
    }
    shuffle(this.cardStack);


  }

  public toJson() {
    return {
      players: this.players,
      cardStack: this.cardStack,
      playedCards: this.playedCards,
      currentPLayer: this.currentPLayer,
    }
  }
}


function shuffle(cardStack: string[]) {
  let currentIndex = cardStack.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cardStack[currentIndex], cardStack[randomIndex]] = [
      cardStack[randomIndex], cardStack[currentIndex]];
  }
}

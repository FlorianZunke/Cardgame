import { Injectable } from '@angular/core';
import { Firestore, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


export class GameDatasService {
  public players: string[] = [];
  public cardStack: string[] = [];
  public playedCards: string[] = [];
  public currentPLayer: number = 0;
  public currentCard: string = '';
  public drawCardAnimation: boolean = false;

  gameId: string | undefined;
  

  constructor(private firestore: Firestore) {
    
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
      currentCard: this.currentCard,
      drawCardAnimation: this.drawCardAnimation
    }
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGamesRef(collId: string, docId:string) {
    return doc(collection(this.firestore, collId), docId)
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

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameDatasService } from '../shared/game-datas.service';
import { PlayerComponent } from './player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../shared/components/game-info/game-info.component';
import { updateDoc, onSnapshot } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  
  // gameId: string;
  game = inject(GameDatasService);
  unSubGame;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {


    this.unSubGame = this.subGamesList(); //Muss das in den Constructor? 
    
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      console.log(params);
      // this.gameId = params;

      // this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {
      // console.log('game updated', game)
      // this.game.currenPlayer = currentPlayer})
      
    });
  }


  ngOnDestroy(): void {
    this.unSubGame();
  }


  subGamesList() {
    return onSnapshot(this.game.getGamesRef(), (game) => {
      game.forEach((element) => (console.log(element.data(), element.id)
      ))
    });
  }


  async updateGame() {
    await updateDoc(this.game.getSingleGamesRef('games', 'CMj0WQlU8i86MGXEuiaf'), {
      players: this.game.players,
      cardStack: this.game.cardStack,
      playedCards: this.game.playedCards,
      currentPLayer: this.game.currentPLayer
    }).catch((err) => {
      console.log('hat nicht geklappt', err);
    })
  }


  drawCard() {
    if (this.game.drawCardAnimation) return
    else this.game.drawCardAnimation = true;

    let currentCards = this.game.cardStack.pop();
    // this.updateGame();

    if (currentCards != undefined) {
      this.game.currentCard = currentCards;
      this.game.currentPLayer++;
      this.game.currentPLayer = this.game.currentPLayer % this.game.players.length;
    }

    setTimeout(() => {
      this.game.drawCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard)
      // this.updateGame();
    }, 2000);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        // this.updateGame();
      }
    });
  }
}

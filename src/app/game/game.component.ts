import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameDatasService } from '../shared/game-datas.service';
import { PlayerComponent } from './player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../shared/components/game-info/game-info.component';
import { updateDoc, doc, Firestore, docData } from '@angular/fire/firestore';
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
  firestore = inject(Firestore);
  game = inject(GameDatasService);
  gameData$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.game.gameId = params['id'];
    });

    if (this.game.gameId) {
      this.unsubGameList();
    }
  }


  unsubGameList() {
    const docRef = this.game.getSingleGamesRef('games', `${this.game.gameId}`);
    this.gameData$ = docData(docRef);
    this.gameData$.subscribe((game) => {
      this.game.players = game.players;
      this.game.cardStack = game.cardStack;
      this.game.currentCard = game.currentCard;
      this.game.currentPLayer = game.currentPLayer;
      this.game.playedCards = game.playedCards;
      this.game.drawCardAnimation = game.drawCardAnimation;
    });
  }


  saveGame() {
    const gameDocRef = doc(this.firestore, `games/${this.game.gameId}`);
    updateDoc(gameDocRef, this.game.toJson())
      .then(() => {
        console.log('Game successfully saved.');
      })
      .catch((error) => {
        console.error('Error saving game: ', error);
      });
  }


  drawCard() {
    if (this.game.drawCardAnimation) return
    else this.game.drawCardAnimation = true;

    let currentCards = this.game.cardStack.pop();

    if (currentCards != undefined) {
      this.game.currentCard = currentCards;
      this.game.currentPLayer++;
      this.game.currentPLayer = this.game.currentPLayer % this.game.players.length;
      this.saveGame();
    }

    setTimeout(() => {
      this.game.drawCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard)
      this.saveGame();
    }, 2000);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}

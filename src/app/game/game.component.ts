import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameDatasService } from '../shared/game-datas.service';
import { PlayerComponent } from './player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../shared/components/game-info/game-info.component';
import { Firestore, collectionData, collection, doc, updateDoc, onSnapshot, addDoc } from '@angular/fire/firestore';
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
  currentCard: string = '';
  drawCardAnimation: boolean = false;
  firestore: Firestore = inject(Firestore);


  unSubGame;

  game = inject(GameDatasService);
  // game: GameDatasService = new GameDatasService;

 
  constructor( private route: ActivatedRoute, public dialog: MatDialog ) {

    this.unSubGame = this.subGamesList();

  }


  ngOnInit(): void {
    // this.newGame();

    this.route.params.subscribe((params) => {
      console.log(params);
      // Muss man das nicht unsubscriben??
    });
  }


  ngOnDestroy(): void {
    this.unSubGame();
  }


  async addGame() {
    await addDoc(this.getGamesRef(), this.game.toJson()).catch((err) => {
      console.error(err);
    }
    ).then((docRef) => {
      // console.log('Games with ID:', docRef);
    })
  }

  async updateGame(game: GameDatasService) {
    await updateDoc(this.getSingleGamesRef('games', 'A6DoGpL8kn0FngcV0zAJ'), {
    });
    
  }


  subGamesList() {
    return onSnapshot(this.getGamesRef(), (game: any) => {
      game.forEach((element: any) => (console.log(element.data(), element.id)
      ))
    });
  }


  getGamesRef() {
    return collection(this.firestore, 'games');
  }


  getSingleGamesRef(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId)
  }


  drawCard() {
    if (this.drawCardAnimation) return
    else this.drawCardAnimation = true;

    let currentCards = this.game.cardStack.pop();

    if (currentCards != undefined) {
      this.currentCard = currentCards;


      this.game.currentPLayer++;
      this.game.currentPLayer = this.game.currentPLayer % this.game.players.length;
    }

    setTimeout(() => {
      this.drawCardAnimation = false;
      this.game.playedCards.push(this.currentCard)
    }, 2000);
  }


  newGame() {
    this.game = new GameDatasService;
    this.addGame();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {

      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}

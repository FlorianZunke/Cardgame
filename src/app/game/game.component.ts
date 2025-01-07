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
import { error } from 'console';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent, AsyncPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  currentCard: string = '';
  drawCardAnimation: boolean = false;
  game = inject(GameDatasService);
  firestore: Firestore = inject(Firestore);

  unSubGame;

  constructor(public dialog: MatDialog) {

    this.unSubGame = onSnapshot(this.getGamesRef(), (game) => {
      game.forEach((element) => (console.log(element.id)
      ))
    });
  }

  ngOnInit(): void {
    this.startGame();
  }


  ngOnChanges() {
    this.updateGame(this.getGamesRef().id, 'R4Ux6ctksf4xYd0yVis6', this.game.toJson());
  }


  ngOnDestroy(): void {
    this.unSubGame();
  }


  async updateGame(collId: string, docId: string, item: {}) {
    await updateDoc(this.getSingleGamesRef(collId, docId), item).catch(
      (err) => { console.log(err); }
    );
  }


  async addGame(item: {}) {
    await addDoc(this.getGamesRef(), item).catch((err) => {
      console.error(err);
    }
    ).then((docRef) => {
      console.log('Games with ID:', docRef);
    })
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


  startGame() {
    this.game = new GameDatasService;
    this.addGame(this.game.toJson);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {

      if (name && name.length > 0) {
        this.game.players.push(name)
      }
    });
  }

}

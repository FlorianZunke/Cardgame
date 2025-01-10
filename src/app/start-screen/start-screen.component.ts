import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { GameDatasService } from '../shared/game-datas.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})


export class StartScreenComponent {
  game = inject(GameDatasService);
  firestore = inject(Firestore);
  
  
  constructor( private router: Router ) { }

  async newGame() {
    let game = new GameDatasService(this.firestore);

    try {
      const docRef = await addDoc(collection(this.firestore, 'games'), game.toJson());
      await this.router.navigateByUrl(`/game/${docRef.id}`);
    }
    catch (err) {
      console.error('Fehler beim Hinzufügen des Spiels: ', err);
    }
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { GameDatasService } from '../shared/game-datas.service';
import { GameComponent } from '../game/game.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})


export class StartScreenComponent {
  game = inject(GameDatasService);


  constructor( private route: ActivatedRoute, private router: Router) { }

  newGame() {
    this.addGame();
    this.router.navigateByUrl('/game/gameId');
  }


  async addGame() {
    await addDoc(this.game.getGamesRef(), this.game.toJson()).catch((err) => {
      console.error(err);
    }
    ).then((docRef) => {

    })
  }
}

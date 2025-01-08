import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})


export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { }

  newGame() {
    // this.addGame();

    this.router.navigateByUrl('/game');
  }

// Funktion gibt es schon in der game.component.ts
  // async addGame() {
  //   await addDoc(this.getGamesRef(), this.game.toJson()).catch((err) => {
  //     console.error(err);
  //   }
  //   ).then((docRef) => {
  //     // console.log('Games with ID:', docRef);
  //   })
  // }
}

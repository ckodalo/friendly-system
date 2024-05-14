import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";



@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    animations: [
      trigger('slide', [
        state('0', style({ transform: 'translateX(0)' })),
        state('1', style({ transform: 'translateX(-100%)' })),
        transition('0 <=> 1', animate('0.5s ease-in-out'))
      ])
    ]
  })

export class LandingComponent {


    currentIndex = 0;

    testimonials = [
      { quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: 'Jane Doe, Teacher' },
      { quote: 'Suspendisse potenti. Nulla facilisi.', author: 'John Smith, Student' },
      { quote: 'Fusce pulvinar, justo eu fringilla aliquet, ante leo ultricies dolor, eu porta turpis elit vitae purus.', author: 'Emily Brown, Parent' },
      { quote: 'Proin eget ante quis libero blandit fermentum.', author: 'David Johnson, Administrator' }
    ];
  

    get visibleTestimonials() {
      return [
        this.testimonials[this.currentIndex],
        this.testimonials[(this.currentIndex + 1) % this.testimonials.length]
      ];
    }
  
    prev() {
      this.currentIndex = (this.currentIndex === 0) ? this.testimonials.length - 2 : this.currentIndex - 2;
    }
  
    next() {
      this.currentIndex = (this.currentIndex + 2) % this.testimonials.length;
    }
}
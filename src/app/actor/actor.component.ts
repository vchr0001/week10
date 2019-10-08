import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  extraDB: any[] = [];

  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = "";
  year: number = 0;
  movieId: string = "";
  aYear: number = 0;

  constructor(private dbService: DatabaseService) { }

  extraTask() {
    this.dbService.extraTask().subscribe((data: any[]) => {
      this.extraDB = data;
    });
  }
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  // Movies section---------------------------------------------------------------------------------------
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Create a new Movies, POST request
  onSaveMovies() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovies(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Movies
  onDeleteMovies(item) {
    this.dbService.deleteMovies(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  deleteBeforeYear(aYear) {
    this.dbService.deleteBefore(aYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  onClickActors(item) {
    this.actorId = item._id;
  }

  //Add actor to movie
  addActorToMovie(item) {
    let obj = { 'id': this.actorId };
    this.movieId = item._id;
    this.dbService.insertActor(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.year = 0;
    this.movieId = "";
    this.aYear = 0;

  }
}
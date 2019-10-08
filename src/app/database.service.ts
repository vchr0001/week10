import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  //movies
  getMovies() {
    return this.http.get("/movies");
  }
  createMovies(data) {
    return this.http.post("/movies", data, httpOptions);
  }
  deleteMovies(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteBefore(aYear){
    let url = "/movies/" + aYear + "/before";
    return this.http.delete(url, httpOptions);
  }
  insertActor(movieId,actorId){
    let url="/movies/"+movieId+"/actors";
    return this.http.post(url,actorId,httpOptions);
  }
  extraTask(){
    let url = "/extra";
    return this.http.get(url)
  }
}
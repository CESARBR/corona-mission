import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

const SEEN_SLIDES_KEY = "seenSlides";
const LOGGED_USER_KEY = "loggedUser";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) {}

  isSeenSlides(): Promise<boolean> {
    return this.storage.get(SEEN_SLIDES_KEY);
  }

  markSeenSlides(): Promise<any> {
    return this.storage.set(SEEN_SLIDES_KEY, true);
  }

}

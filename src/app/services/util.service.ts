import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { File } from "@ionic-native/file/ngx";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor(
    private webView: WebView,
    private file: File,
    private sanitizer: DomSanitizer
  ) {}

  getCorrectImageUrl(fileName) {
    let imageSrc = this.webView.convertFileSrc(
      this.file.dataDirectory + fileName
    );

    return this.sanitizer.bypassSecurityTrustUrl(imageSrc);
  }
}

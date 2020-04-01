import { Component, OnInit } from "@angular/core";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { NavParams } from "@ionic/angular";

@Component({
  selector: "app-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.scss"]
})
export class CallComponent implements OnInit {

  private readonly DDI = "+55";
  private phoneNumber;
  private popoverRef: HTMLIonPopoverElement;

  constructor(private callNumber: CallNumber, private navParams: NavParams) {
    this.phoneNumber = navParams.data.phoneNumber;
    this.popoverRef = navParams.data.popover;
  }

  ngOnInit() {}

  call() {
    this.callNumber
      .callNumber(this.phoneNumber, true)
      .then(res => {
      })
      .catch(err => {
      });
    this.popoverRef.dismiss();
  }

  whatsapp() {
    window.open(`https://api.whatsapp.com/send?phone=${this.DDI}${this.phoneNumber}`, "_system");
    this.popoverRef.dismiss();
  }
}

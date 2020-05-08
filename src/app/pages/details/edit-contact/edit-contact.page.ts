import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform, LoadingController } from "@ionic/angular";
import { DataService } from "src/app/services/data.service";
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { UtilService } from "../../../services/util.service";
import { SafeUrl } from "@angular/platform-browser";
import { ContactDatabaseService } from 'src/app/services/sqlite/contact-database.service';

@Component({
  templateUrl: "./edit-contact.page.html",
  styleUrls: ["./edit-contact.page.scss"],
})
export class EditContactPage implements OnInit {
  idContact: number;
  ionicForm: FormGroup;
  contactsPath: string;
  person: any;
  isSubmitted = false;
  loading: any;
  imageSrc: SafeUrl;
  cameraOptions: {};

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private plt: Platform,
    private dataService: DataService,
    private contactDatabaseService: ContactDatabaseService,
    private router: ActivatedRoute,
    public loadingController: LoadingController,
    private camera: Camera,
    private utilService: UtilService,
    private file: File
  ) {
  }

  async ionViewWillEnter() {
    this.loading = await this.loadingController.create({
      message: "Aguarde...",
    });
    await this.loading.present();

    this.idContact = this.router.snapshot.params.id;
    const contact = await this.contactDatabaseService.getById(this.idContact);
      this.person = contact.rows.item(0);
    this.ionicForm.controls["name"].setValue(this.person.name);
    this.ionicForm.controls["age"].setValue(this.person.age);
    this.ionicForm.controls["phone"].setValue(this.person.phone);
    this.ionicForm.controls["relationship"].setValue(this.person.relationship);

    const iconFileName: string = "person_icon.png";
    let avatarName: string = this.person.avatar;

    this.imageSrc = !avatarName.endsWith(iconFileName)
      ? this.utilService.getCorrectImageUrl(this.person.avatar)
      : this.person.avatar;

    this.loading.dismiss();
  }
  ngOnInit() {
    this.ionicForm = this.formBuilder.group(
      {
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(200),
          ],
        ],
        age: [
          "",
          [Validators.required, Validators.pattern("[1-9]{1}[0-9]{0,2}")],
        ],
        phone: ["", [Validators.required]],
        relationship: ["", Validators.required],
      },
      {
        validators: this.ageValidation.bind(this),
      }
    );
  }

  ageValidation(formGroup: FormGroup) {
    const { value: age } = formGroup.get("age");
    return age == 0 || age >= 130 ? { ageInvalid: true } : false;
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.updateUser();
    }
  }

  async updateUser() {
    this.person.name = this.ionicForm.value.name;
    this.person.age = this.ionicForm.value.age;
    this.person.phone = this.ionicForm.value.phone;
    this.person.relationship = this.ionicForm.value.relationship;
    this.person.mission = "Clique para realizar missões!";
    this.person.mission_color = "dark";
    this.person.mission_label_color = "dark";

    await this.contactDatabaseService.updateContactInfo(this.person);

    this.dataService.setData(this.idContact, this.idContact);
    // let str = 'details/' + this.idContact;
    this.navCtrl.setDirection("forward");
    this.navCtrl.navigateForward("/home");
  }

  defineCameraOptions() {
    this.cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      correctOrientation: true,
    };
  }

  async openGalleryPhotos() {
    this.defineCameraOptions();

    try {
      const fileUri: string = await this.camera.getPicture(this.cameraOptions);
      const tempImage = fileUri;

      let fileName: string;

      if (this.plt.is("ios")) {
        fileName = fileUri.split("/").pop();
      } else {
        fileName = fileUri.substring(
          fileUri.lastIndexOf("/") + 1,
          fileUri.indexOf("?")
        );
      }

      const tempBaseFilesystemPath = tempImage.substr(
        0,
        tempImage.lastIndexOf("/") + 1
      );
      const newBaseFilesystemPath = this.file.dataDirectory;
      await this.file.copyFile(
        tempBaseFilesystemPath,
        fileName,
        newBaseFilesystemPath,
        fileName
      );
      this.person.avatar = fileName;
      this.imageSrc = this.utilService.getCorrectImageUrl(this.person.avatar);

      await this.contactDatabaseService.updateContactAvatar(this.idContact, this.person.avatar);
    } catch (error) {
      console.log(error);
    }
  }

}

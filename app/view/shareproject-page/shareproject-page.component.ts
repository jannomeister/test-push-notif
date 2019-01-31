import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Video } from 'nativescript-videoplayer';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { action } from "ui/dialogs";

// MODELS
import { Media } from "../../models/media.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { MediaService } from "../../services/media.service";
import { FacebookService } from "../../services/facebook.service";
import { UserProgressService } from "../../services/user-progress.service";
import { ComponentEventService } from "../../services/component-event.service";

import * as dialogs from "ui/dialogs";
import * as lodash from "lodash";
import * as httpModule from "http";
import * as application from "tns-core-modules/application";
import * as imageSourceModule from "tns-core-modules/image-source";
import * as fileSystemModule from "tns-core-modules/file-system";

declare var NSObject: any;
declare var interop: any;
declare var UIImage: any;
declare var NSError: any;
declare var UIImageWriteToSavedPhotosAlbum: any;
declare var UISaveVideoAtPathToSavedPhotosAlbum: any;
declare var enums: any;

@Component({
    selector: "shareproject-page",
    moduleId: module.id,
    templateUrl: "./shareproject-page.component.html",
    styleUrls: ['./shareproject-page.component.css'],
})
export class ShareProjectComponent implements OnInit {

    @ViewChild("videoPlayer") videoPlayer: ElementRef;

    userId: number = 0;

    media: Media;

    constructor(
        private page: Page,
        private params: ModalDialogParams,
        private _userService: UserService,
        private _mediaService: MediaService,
        private _facebookService: FacebookService,
        private _componentService: ComponentEventService,
        private _userProgressService: UserProgressService
    ) {
        this.media = new Media();
    }

    ngOnInit(){
        this.userId = this._userService.getCurrentUserId();

        this.getMedia();
    }

    close() {
        if(this.params.context.type === 'video'){
            this.destroyVideo();
        }
        
        this.params.closeCallback({ success: true });
    }

    saveVideo() {
        this.saveVideoToGallery();
    }

    destroyVideo() {
        this.videoPlayer.nativeElement.destroy();
    }

    saveMedia() {
        let options = {
            title: "Media Option",
            cancelButtonText: "Cancel",
            actions: ["Save Media"]
        };

        action(options).then((result) => {
            if(result !== 'Cancel') {
                if(this.media.type === 'image') {
                    this.saveImageToGallery();
                }else if(this.media.type === 'video'){
                    this.saveVideoToGallery();
                }
            }
        });
    }

    saveImageToGallery() {
        this._componentService.showLoader("Saving...");

        httpModule.getImage(this.media.link).then((imgSource) => {
            
            if(application.ios) {
                this.toIOSGallery(imgSource).then((res: any) => {
                    this._componentService.hideLoader();
                    this._componentService.showAlert("Success!", "Image successfully saved!")
                }).catch(e => {
                    this._componentService.hideLoader();
                    this._componentService.showAlert("Ooops!", e.data)
                })
            }else {
                this.toAndroidGallery(imgSource).then((res: any) => {
                    this._componentService.hideLoader();
                    this._componentService.showAlert("Success!", "Image successfully saved!")
                }).catch(e => {
                    this._componentService.hideLoader();
                    this._componentService.showAlert("Ooops!", e.data)
                })
            }

        }, (e) => {
            this._componentService.hideLoader();
        });
    }

    saveVideoToGallery() {
        this._componentService.showLoader("Saving...");

        httpModule.getFile(this.media.link).then((resultFile) => {
            
            if(application.ios) {
                this.saveVideoToIOSGallery(resultFile.path).then((res: any) => {
                    this._componentService.hideLoader();
                    this._componentService.showAlert("Success!", "Video successfully saved!")
                }).catch(e => {
                    this._componentService.hideLoader();
                    this._componentService.showAlert("Ooops!", e.data)
                })
            }

            this.updateUserProgress();
        }, (e) => {
            console.log(e)
            this._componentService.hideLoader();
        });
    }

    saveVideoToIOSGallery(path) {
        let successMsg = { success: true, data: "Video successfully saved!" }
        let errMsg = { success: false, data: "Something went wrong. Unable to save video." }; 

        return new Promise((resolve, reject) => {
            if(!path) {
                reject(errMsg);
            }else {
                UISaveVideoAtPathToSavedPhotosAlbum(
                    path, 
                    null,
                    null,
                    null);

                resolve(successMsg)

            }
        })
    }

    toAndroidGallery(imageSource) {
        let successMsg = { success: true, data: "Image successfully saved!" }
        let errMsg = { success: false, data: "Something went wrong. Unable to save image." };

        return new Promise((resolve, reject) => {
            if(!imageSource) {
                reject(errMsg)
            }else {
                let folderPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).toString();
                let fileName = 'img_' + new Date().getTime() + '.jpg';
                let path = fileSystemModule.path.join(folderPath, fileName);
                let exists = fileSystemModule.File.exists(path);

                if(!exists) {
                    let saved = imageSource.saveToFile(path, enums.ImageFormat.jpeg);
                    if(saved) {
                        this.broadCast(new java.io.File(path));
                        resolve(successMsg)
                    }else{
                        reject(errMsg)
                    }
                }else {
                    reject(errMsg)
                }
            }
        })
    }

    broadCast(imageFile) {
        let mediaScanIntent = new android.content.Intent(android.content.Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        let contentUri = android.net.Uri.fromFile(imageFile);
        mediaScanIntent.setData(contentUri);
        application.android.foregroundActivity.sendBroadcast(mediaScanIntent);
    }

    toIOSGallery(imgSource) {
        let successMsg = { success: true, data: "Image successfully saved!" }
        let errMsg = { success: false, data: "Something went wrong. Unable to save image." };

        return new Promise((resolve, reject) => {
            if(!imgSource) {
                reject(errMsg)
            }else {
                let CompletionTarget = NSObject.extend({
                    "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": function(
                        image, error, context) {
                        if (error) {
                            reject(errMsg);
                        }
                    }
                }, {
                    exposedMethods: {
                        "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": {
                            returns: interop.types.void,
                            params: [UIImage, NSError, interop.Pointer]
                        }
                    }
                });

                let completionTarget = CompletionTarget.new();

                UIImageWriteToSavedPhotosAlbum(
                    imgSource.ios, 
                    completionTarget,
                    "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:",
                    null);

                resolve(successMsg)
            }
        })
    }

    async getMedia() {
        try{
            let res = await this._mediaService.getMedia(this.params.context.mediaResourceId);
            if(res.data) {
                this.media.deserialize(res.data)
            }
        }catch(e) {
            console.log(e)
        }
    }

    async updateUserProgress() {
        try {
            let res = await this._userProgressService.updateProgress(this.userId, { downloadVideos: 'done' });

            console.log(res)
        }catch(e) {
            console.log(e)
        }
    }
}


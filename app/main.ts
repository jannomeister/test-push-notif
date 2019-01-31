import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { 
	on as applicationOn, 
	launchEvent, 
	suspendEvent, 
	resumeEvent, 
	exitEvent, 
	lowMemoryEvent, 
	uncaughtErrorEvent, 
	ApplicationEventData 
} from "application";
import { init } from "nativescript-facebook";
import { registerElement } from 'nativescript-angular/element-registry';
import { Video } from 'nativescript-videoplayer';

import * as application from 'application';

declare var __extends: any;
var nsPlatform = require( "nativescript-platform" );

require("nativescript-plugin-firebase");

if(nsPlatform.ios){
	
	var MyDelegate = (function (_super) {
	    __extends(MyDelegate, _super);
	    function MyDelegate() {
	        _super.apply(this, arguments);
	    }
	    MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {

	    	var audioSession = AVAudioSession.sharedInstance();

		    try {
		        audioSession.setCategoryError(AVAudioSessionCategoryPlayback);

		        audioSession.setActiveError(true);
				console.log("audioSession category set and active");

		    } catch(err) {
		        console.log("setting audioSession category failed");
		    }

	        console.log("applicationWillFinishLaunchingWithOptions: " + launchOptions);
	        return true;
	    };
	    MyDelegate.prototype.applicationDidBecomeActive = function (application) {
	        console.log("applicationDidBecomeActive: " + application);
	    };
	    MyDelegate.ObjCProtocols = [UIApplicationDelegate];
	    return MyDelegate;
	})(UIResponder);
	application.ios.delegate = MyDelegate;
}

registerElement("VideoPlayer", () => Video);
registerElement("Shimmer", () => require("nativescript-shimmer").Shimmer);
registerElement("Carousel", () => require("nativescript-carousel").Carousel);
registerElement("StarRating", () => require("nativescript-star-ratings").StarRating);
registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

platformNativeScriptDynamic().bootstrapModule(AppModule);

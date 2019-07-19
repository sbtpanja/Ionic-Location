import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
    location: Geoposition;
    lastUpdatedon: Date;
    watching: Subscription;
    count: number;
    constructor(private geolocation: Geolocation, private locationAccuracy: LocationAccuracy) { }

    async ngOnInit() {
        let options: GeolocationOptions = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true,
        };
        this.count = 0;
        
        var canRequest = await this.locationAccuracy.canRequest();
        if (canRequest) {
            try {
                var heighAcc = await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                alert("High Accuracy \n" + JSON.stringify(heighAcc));

                this.watching = this.geolocation.watchPosition(options).subscribe((data) => {
                    this.location = data;
                    this.lastUpdatedon = new Date();
                    this.count++;
                });

            } catch (e) {
                alert(JSON.stringify(e));
            }

        } else {
            alert("GPS already is being used by some other Application");
        }


    }

    ngOnDestroy() {
        this.watching.unsubscribe();
    }
}

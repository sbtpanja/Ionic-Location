import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Subscription } from 'rxjs';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { async } from 'rxjs/internal/scheduler/async';

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
    constructor(private geolocation: Geolocation,
        private androidPermissions: AndroidPermissions,
        private locationAccuracy: LocationAccuracy) { }

    async ngOnInit() {
        
        this.count = 0;

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(result => {
            alert(result.hasPermission);
            if (result.hasPermission) {
                this.requestLocation();
            } else {
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(async () => {
                    this.requestLocation();
                }, error => {
                    alert('requestPermission Error requesting location permissions ' + error)
                });
            }
        });
    }

    async requestLocation() {
        let options: GeolocationOptions = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true,
        };

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
            alert("Please enable location");
        }
    }

    ngOnDestroy() {
        this.watching.unsubscribe();
    }
}

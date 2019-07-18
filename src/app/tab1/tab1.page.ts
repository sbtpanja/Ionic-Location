import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
    location: Geoposition;
    lastUpdatedon: Date;
    
    constructor(private geolocation: Geolocation) { }

    ngOnInit() {
        let watch = this.geolocation.watchPosition();

        watch.subscribe((data) => {
            this.location = data;
            this.lastUpdatedon = new Date();

        });
    }

    ngOnDestroy() {        
    }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DropboxService } from '../dropbox.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  folderVideo = "/video/myvideo.mp4";
  data: any;
  constructor(
    private sanitizer: DomSanitizer,
    private dropboxService: DropboxService
  ) { }

  ngOnInit() {
    // this.myvideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
  }

  ngAfterViewInit() {
    this.getVideo();
  }


  sanitize(link) {
    return this.sanitizer.bypassSecurityTrustUrl(link)
  }

  async getVideo() {
    try {
        this.data = await this.dropboxService
        .getPreview(this.folderVideo)
        .toPromise();
        console.log(this.data);
        // this.myvideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.link)
        
    } catch (error) {
      console.log(error);
    }
  }

}

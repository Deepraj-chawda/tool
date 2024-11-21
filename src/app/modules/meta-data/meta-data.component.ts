import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrl: './meta-data.component.css'
})
export class MetaDataComponent {
  images: string[] = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg',
    'assets/image5.jpg',
    'assets/image6.jpg',
    'assets/image6.jpg',
    'assets/image6.jpg',
  ];
  selectedImage: string | null = null;
  selectedIndex: number | null = null;
  details: { [key: string]: string } | null = null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectedIndex = 0;
    this.selectedImage = this.images[this.selectedIndex];
    this.details = this.mockDetails[this.selectedIndex];
  }

  // Mock API details for demonstration
  private mockDetails = [
    { Name: 'Image 1', Description: 'Details of image 1' },
    { Name: 'Image 2', Description: 'Details of image 2' },
    { Name: 'Image 3', Description: 'Details of image 3' },
    { Name: 'Image 4', Description: 'Details of image 3' },
    { Name: 'Image 5', Description: 'Details of image 3' },
    { Name: 'Image 6', Description: 'Details of image 3' },
  ];

  selectImage(index: number): void {
    this.selectedIndex = index;
    this.selectedImage = this.images[index];
    this.details = this.mockDetails[index];
  }

}

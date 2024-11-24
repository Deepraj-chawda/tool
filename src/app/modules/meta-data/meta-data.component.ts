import { Component, inject } from '@angular/core';
import { MetadataService } from '../../services/metadata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.css']
})
export class MetaDataComponent {
  metaService: MetadataService = inject(MetadataService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  selectedFiles: File[] = []; // Store selected files
  images: string[] = []; // URLs for previewing selected images
  exifData: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  headerData: any = null;

  selectedIndex: number | null = null; // Track selected image index
  details: { [key: string]: string } | null = null;

  // File selection handler
  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    const validFiles = files.filter((file) => file.type.startsWith('image/'));

    if (validFiles.length === 0) {
      this.errorMessage = 'No valid image files selected.';
      this.toastr.error(this.errorMessage);
      return;
    }

    this.selectedFiles = validFiles;
    this.images = validFiles.map((file) => URL.createObjectURL(file));
    this.errorMessage = '';
    this.selectedIndex = 0;
    this.selectImage(0);
  }

  // Image selection handler
  selectImage(index: number): void {
    this.selectedIndex = index;
    //this.details = { Name: `Image ${index + 1}`, Description: `Details of image ${index + 1}` };
    this.exifData = null; // Clear EXIF data when switching images

    // Call the EXIF API for the newly selected image
    this.uploadAndExtractExif(this.selectedFiles[index]);
    // if(this.openUploadModal) {
    //   const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal')!);
    //   uploadModal.hide();
    // }
  }

  // Upload and call the API for the selected image
  uploadAndExtractExif(selectedFile: File): void {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    const token = parsedUser?.access_token;

    if (!token) {
      this.errorMessage = 'You are not authenticated! Please log in to continue.';
      this.toastr.error(this.errorMessage);
      return;
    }

    this.isLoading = true; // Set loading state
    this.closeUploadModal();
    this.metaService.extractExif(selectedFile, token).subscribe(
      (response) => {
        this.exifData = response;
        console.log(this.exifData);
        this.extractDetails(this.exifData);
        this.toastr.success('EXIF data extracted successfully!');
      },
      (error) => {
        this.errorMessage = 'Failed to extract EXIF data. Please try again.';
        this.toastr.error(this.errorMessage);
      },
      () => {
        this.isLoading = false;
      }
    );

    this.metaService.extractHeader(selectedFile, token).subscribe(
      (response) => {
        this.headerData = response;
        console.log(this.headerData);

        this.toastr.success('Header Structure data extracted successfully!');
      },
      (error) => {
        this.errorMessage = 'Failed to extract Header Structure data. Please try again.';
        this.toastr.error(this.errorMessage);
      },
      () => {
        this.isLoading = false; // Reset loading state
      }
    );
  }

  // Upload button action (optional, for explicitly uploading)
  onUpload(): void {
    if (this.selectedIndex === null) {
      this.errorMessage = 'Please select an image to upload!';
      this.toastr.error(this.errorMessage);
      return;
    }

    // Call the EXIF extraction when explicitly clicking upload
    this.uploadAndExtractExif(this.selectedFiles[this.selectedIndex]);
  }


  extractDetails(exifResponse: any): void {
  // Initialize default values
  let createDate = 'N/A';
  let modifyDate = 'N/A';
  let software = 'N/A';

  // Helper function to search for a key in a section
  const findKeyInSection = (section: any[], key: string): string | null => {
    const entry = section.find(([entryKey]: [string]) => entryKey === key);
    return entry ? entry[1] : null;
  };

  // Iterate over all groups in the response
  for (const groupName in exifResponse) {
    const section = exifResponse[groupName];
    if (Array.isArray(section)) {
      if (createDate === 'N/A') createDate = findKeyInSection(section, 'FileCreateDate') || createDate;
      if (modifyDate === 'N/A') modifyDate = findKeyInSection(section, 'ModifyDate') || modifyDate;
      if (software === 'N/A') software = findKeyInSection(section, 'Software') || software;
    }
  }

  // Update the details object
  this.details = {
    CreateDate: createDate,
    ModifyDate: modifyDate,
    Software: software,
  };
}

openUploadModal() {
  const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal')!);
  uploadModal.show();
}

closeUploadModal() {
  const modalElement = document.getElementById('uploadModal');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
  }
}


onFileSelect(event: any) {
  const files = Array.from(event.target.files) as File[];
    const validFiles = files.filter((file) => file.type.startsWith('image/'));

    if (validFiles.length === 0) {
      this.errorMessage = 'No valid image files selected.';
      this.toastr.error(this.errorMessage);
      return;
    }

    this.selectedFiles = validFiles;
    this.images = validFiles.map((file) => URL.createObjectURL(file));
    this.errorMessage = '';
    this.selectedIndex = 0;
}
// Triggered when a file is dropped
onFileDrop(event: DragEvent) {
  event.preventDefault();

  // Use event.dataTransfer for drag-and-drop files
  const files = Array.from(event.dataTransfer?.files || []) as File[];

  const validFiles = files.filter((file) => file.type.startsWith('image/'));

  if (validFiles.length === 0) {
    this.errorMessage = 'No valid image files selected.';
    this.toastr.error(this.errorMessage);
    return;
  }

  this.selectedFiles = validFiles;
  this.images = validFiles.map((file) => URL.createObjectURL(file));
  this.errorMessage = '';
  this.selectedIndex = 0;
}

// Prevents default behavior on dragover
onDragOver(event: DragEvent) {
  event.preventDefault();
}

}

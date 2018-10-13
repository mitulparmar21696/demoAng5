import { Component, OnInit } from '@angular/core';
import { DocumentCategory } from '../shared/document-category.model';
import { ActiveInactive } from '../../../manage/facility-type/shared/active-inactive.model';
import { DocumentCategoryService } from '../shared/document-category.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';

@Component({
  selector: 'app-document-category-form',
  templateUrl: './document-category-form.component.html',
  styleUrls: ['./document-category-form.component.css']
})
export class DocumentCategoryFormComponent implements OnInit {

  documentCategory: DocumentCategory;

  value:any;
  private loading:any;
  selectedDropwdownValue: IsActive = new IsActive(true, "Active");
   buttonName: string = "Add";
  isClickedOnce: boolean = false;
   isInvalidFile: boolean = false;

   DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];

  formData = new FormData();

   isActiveId: any;

  constructor(private _ftService: DocumentCategoryService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.documentCategory = this._ftService.getter();
    if (this.documentCategory.ID == undefined) {
      this.buttonName = "Add";
      // this.isActiveId = true
    }
    else {
      this.buttonName = "Update";
      console.log(this.documentCategory.IsActive)
      // this.isActiveId = this.documentCategory.IsActive;
    }
    if (this.documentCategory.IsActive != undefined) {
      if (this.documentCategory.IsActive == true) {
        this.isActiveId = true;
      }
      else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Document Category";
  }

  onChange(event) {
    var files = event.srcElement.files;
    if( files[0].type  == 'image/png' ||  files[0].type == 'image/jpg'  ||  files[0].type == 'image/jpeg') {
      this.isInvalidFile = false;
      this.formData.append('Data', files[0], files[0].name);    
    }
    else {
      alert("Only Image files can be uploaded");
      this.isInvalidFile = true;
      return this.isInvalidFile;
      
    }
  }

  processForm() {
    this.loading=true;
    
    this.isClickedOnce = true;
    var documentCategoryName = $("#documentCategory").val().toString();    
    if ($.trim(documentCategoryName) == "") {
      this.documentCategory.Name = "";
      this.loading=false;
      alert('Please add document category name');
    }
    else {
      this.documentCategory.IsActive = this.isActiveId;
      if (this.documentCategory.ID == undefined) {
        if(this.documentCategory.IsUser == undefined) {
          this.documentCategory.IsUser = 0
        }
        this._ftService.InsertDocumentCategory(this.documentCategory).subscribe((tt: any) => {
          
          if (tt.status == 200 || tt.status == "200") {
            
            this.UploadImageAfterInsert(tt.data[0].ID);

            if(this.value == null) {
              
            }
            
             alert("Document Category added successfully");
             this._ftService.set_documents(tt.data);
             this.loading=false;
            this._router.navigate(['documents/document_category']);
          }
          else {
            this.loading=false;
            alert('Document Category already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      else {
        this._ftService.UpdateDocumentCategory(this.documentCategory).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.documentCategory.ID);
            
            alert( "Document Category updated successfully");
            this._ftService.set_documents(tt.data);
            this.loading=false;
            this._router.navigate(['documents/document_category']);
          }
          else {
            this.loading=false;
            alert('Document Category already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToDocumentCategory() {
    this._router.navigate(['documents/document_category']);
  }

  UploadImageAfterInsert(id) {
    let value:number = +id;
    
    this._ftService.UploadImage(value, this.formData).subscribe((data: any) => {
      return data;
    }, (error) => {
      console.log(error);
    })
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg'
      || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'img') {
      return true;
    }
    else {
      return false;
    }
  }

  IsAdmin(event) {
    this.value = event.target.checked;
    if(this.value == true){
      this.documentCategory.IsUser = 1
      
    }
    else {
      this.documentCategory.IsUser = 0;
    }
  }
}

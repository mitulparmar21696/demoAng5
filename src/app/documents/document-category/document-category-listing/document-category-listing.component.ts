import { Component, OnInit } from '@angular/core';
import { DocumentCategory } from '../shared/document-category.model';
import { environment } from '../../../../environments/environment';
import { DocumentCategoryService } from '../shared/document-category.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';
import { element } from 'protractor';

@Component({
  selector: 'app-document-category-listing',
  templateUrl: './document-category-listing.component.html',
  styleUrls: ['./document-category-listing.component.css']
})
export class DocumentCategoryListingComponent implements OnInit {
  documents: DocumentCategory[] = [];
  document = new DocumentCategory();
  selectedFTs: DocumentCategory[];
  private loading:any;
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'Description', header: 'Description' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedDocumentCategoryString: string = "";
  nameId: any;
  actionStatus: any;
  checkedValue: any;


  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _ttService: DocumentCategoryService, 
              private _router: Router ) { 
                this.loading=false;   
  }

  ngOnInit() {
    this.loading=true;
    this.GetDocumentCategoryListFromService();
    this.nameId = '1';
    
  }

  CustomAction() {
    if (this.nameId && this.selectedFTs && this.selectedFTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedFTs.forEach(element => {
            this.selectedDocumentCategoryString += element.ID + ",";
          });
          this.selectedDocumentCategoryString = this.selectedDocumentCategoryString.length > 0 ? this.selectedDocumentCategoryString.substring(0, this.selectedDocumentCategoryString.length - 1) : ""
                    
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._ttService.ActionStatus(this.selectedDocumentCategoryString, this.actionStatus).subscribe((data: any) => {
              this.GetDocumentCategoryListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedDocumentCategoryString).subscribe((data: any) => {
              this.GetDocumentCategoryListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedDocumentCategoryString = "";
          this.nameId = -1;

        }  
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one document ');
    }
  }

  GetDocumentCategoryList() {
    this.GetDocumentCategoryListFromService();
  }

  DeleteDocumentCategory(tt) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      this.DeleteDocumentCategoryFromService(tt);
      this.GetDocumentCategoryListFromService();
    }
    else {
        this.GetDocumentCategoryListFromService();
      }
  }

  GetDocumentCategoryListFromService() {
    this._ttService.GetDocumentCategoryList().subscribe((data: any) => {
      data.data.forEach(element => {
        // element.IsActive = element.IsActive == "true" ? "true" : "false";
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
     
      this._ttService.set_documents(data.data);
      this.documents = this._ttService.getDocuments();
      this.loading=false;
      this.allelements();

    }, (error) => {
      console.log(error);
    });
  }

  DeleteDocumentCategoryFromService(tt) {
    this._ttService.DeleteDocumentCategory(tt).subscribe((data: any) => {
      this.GetDocumentCategoryListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertDocumentCategory() {
    let documentCategory = new DocumentCategory();
    this._ttService.setter(documentCategory);
    this._router.navigate(['/documents/document_category/form'])
  }

  UpdateDocumentCategory(tt) {
    if (confirm('Are you sure to perform this action?') == true) {
        this._ttService.setter(tt);
        this._router.navigate(['/documents/document_category/form'])
    }
    else {
        this.GetDocumentCategoryListFromService();
      }
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: DocumentCategory) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      this._ttService.ActionStatus(ft.ID, changeTo).subscribe((success:any) => {
      this._ttService.set_documents(success.data);
      this.documents = this._ttService.getDocuments();
    });
    }
      
    else 
      {
        this.GetDocumentCategoryListFromService();
      }
  }

  allelements() {
    this.documents.forEach(element => {
      console.log(element.IsActive);
    })
  }
}

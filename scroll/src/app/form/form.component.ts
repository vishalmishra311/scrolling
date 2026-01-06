import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {


  public selectedImage!: File;
  

  constructor(private prodctServivce:ProductService){

  }

  public onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }


  // called on form submit
  public addProduct(form: NgForm) {
    if (!this.selectedImage) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('image', this.selectedImage);
    form.resetForm();
    
    this.prodctServivce.addProduct(formData).subscribe()
  }

}

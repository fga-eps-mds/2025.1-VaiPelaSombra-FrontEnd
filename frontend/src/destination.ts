
export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrlMain: string;
  imageUrlsGallery: string[];
  isFavorited?: boolean;

}

export interface NewList {
    name: string; 
}
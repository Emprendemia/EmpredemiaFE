export interface Course {
  _id: string;
  title: string;
  description: string;
  modules: {
    title: string;
    time: string;
  }[];
  hours: number;
  videoUrl: string;
  image:string;
  teacher: string;
  category:
    | 'Redes sociales y publicidad'
    | 'Educación financiera'
    | 'Gestión y E-commerce'
    | 'Packaging'
    | 'Envios y logística'
    | 'Mentalidad emprendedora'
    | 'Atención al Cliente y Post-Venta';
  state: 'in_review' | 'published' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

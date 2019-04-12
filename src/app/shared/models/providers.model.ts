import { Location } from "./location.model"

export class Providers {
  public id: number;
  public name: string;
  public active: boolean;
  public category: string;
  public isDefault: boolean;
  public slug: string;

  public locations: Array<Location>;
}

export class FilterParam {
  filterItem: any;

  constructor(
    public title: string,
    public key: string,
    public isChecked: boolean
  ) { }
}

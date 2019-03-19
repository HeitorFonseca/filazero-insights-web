import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fzCurrency'
})
export class FzCurrencyPipe implements PipeTransform {
  transform(input: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(input);
    }
}

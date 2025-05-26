import { Pipe, PipeTransform } from '@angular/core';
import { TaskResponse } from 'src/app/core/models/response-api.models';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: TaskResponse[] | null, text: string | null): TaskResponse[] | null {
    if (value) {
      let result = value.slice(0);
      if (text) {
        result = result.filter(
          (item) =>
            item.description.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
        );
      }
      return result;
    }
    return null;
  }
}

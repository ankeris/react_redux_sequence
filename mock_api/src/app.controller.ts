import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// types
import { Person, Facility, Exposure } from '../../shared_types/types';

@ApiUseTags('api')
@Controller('/api')
export class AppController {
  constructor() {}
  
  @Get('/person/:input')
  @ApiResponse({ status: 200, description: 'Person', type: Person})
  getContent(@Param() params): Observable<Person> {
    // create random response
    const res: Person = {
      val1: params.input.length * 2,
      val2: params.input.length * 3
    }
    return of(res).pipe(delay(200));
  }

  @Get('/facility/:input')
  @ApiResponse({ status: 200, description: 'Facility', type: Facility})
  getNavigation(@Param() params): Observable<Facility> {
    const res: Facility = {
      val3: params.input * 2,
      val4: params.input * 3
    }
    return of(res).pipe(delay(200));
  }

  @Get('/exposure/:input')
  @ApiResponse({ status: 200, description: 'Exposure', type: Facility})
  getSettings(@Param() params): Observable<Exposure> {
    const res: Exposure = {
      val5: params.input * 2,
    }
    return of(res).pipe(delay(200));
  }
 
}

import {TestBed} from "@angular/core/testing";
import {FormatTimePipe} from "./time.pipe";

describe('BreadcrumbsComponent', () => {
    let pipe: FormatTimePipe;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ FormatTimePipe ],
            providers: [ ]
        });
        pipe = new FormatTimePipe();
        
    });

  it ('should transform without minutes if minutes is 0', () => {
    const passedData = '120';
    const expectedData = '2 h';

    expect(pipe.transform(passedData))
        .toBe(expectedData);
  });

  it ('should transform without hours if hours is 0', () => {
    const passedData = '20';
    const expectedData = '20 min';

    expect(pipe.transform(passedData))
        .toBe(expectedData);
  });

  it ('should transform with minutes and hours', () => {
    const passedData = '80';
    const expectedData = '1 h 20 min';

    expect(pipe.transform(passedData))
        .toBe(expectedData);
  });

  it ('should transform if duration is 0', () => {
    const passedData = '0';
    const expectedData = '0 min';

    expect(pipe.transform(passedData))
        .toBe(expectedData);
  });
});
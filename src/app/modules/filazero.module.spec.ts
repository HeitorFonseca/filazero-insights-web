import { FilazeroModule } from './filazero.module';

describe('FilazeroModule', () => {
  let filazeroModule: FilazeroModule;

  beforeEach(() => {
    filazeroModule = new FilazeroModule();
  });

  it('should create an instance', () => {
    expect(filazeroModule).toBeTruthy();
  });
});

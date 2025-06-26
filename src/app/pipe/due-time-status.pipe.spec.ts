import { DueTimeStatusPipe } from './due-time-status.pipe';

describe('DueTimeStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new DueTimeStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

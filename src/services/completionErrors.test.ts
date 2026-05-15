import { describe, expect, it } from 'vitest';
import { getCompletionErrorMessage } from './completionErrors';

describe('getCompletionErrorMessage', () => {
  it('explains the Supabase mountain foreign key setup issue', () => {
    expect(
      getCompletionErrorMessage(
        {
          code: '23503',
          message: 'insert or update on table "completed_mountains" violates foreign key constraint'
        },
        'save'
      )
    ).toContain('mountain_id 외래 키');
  });

  it('falls back to an operation-specific generic message', () => {
    expect(getCompletionErrorMessage({ message: 'network error' }, 'delete')).toContain('삭제에 실패');
  });

  it('explains the multiple completion migration for duplicate records', () => {
    expect(
      getCompletionErrorMessage(
        {
          code: '23505',
          message: 'duplicate key value violates unique constraint "completed_mountains_pkey"'
        },
        'save'
      )
    ).toContain('allow_multiple_completed_mountains');
  });
});

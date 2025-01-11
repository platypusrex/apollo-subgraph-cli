import type { Post } from '../types/generated';

const posts: Post[] = [
  { id: 1, title: 'Foo', content: 'Foo bar', userId: 1 },
  { id: 2, title: 'Foo', content: 'Foo bar', userId: 2 },
  { id: 3, title: 'Foo', content: 'Foo bar', userId: 3 },
  { id: 4, title: 'Foo', content: 'Foo bar', userId: 4 },
  { id: 5, title: 'Foo', content: 'Foo bar', userId: 5 },
  { id: 6, title: 'Foo', content: 'Foo bar', userId: 6 },
  { id: 7, title: 'Foo', content: 'Foo bar', userId: 1 },
  { id: 8, title: 'Foo', content: 'Foo bar', userId: 2 },
  { id: 9, title: 'Foo', content: 'Foo bar', userId: 3 },
  { id: 10, title: 'Foo', content: 'Foo bar', userId: 4 },
  { id: 11, title: 'Foo', content: 'Foo bar', userId: 5 },
  { id: 12, title: 'Foo', content: 'Foo bar', userId: 1 },
  { id: 13, title: 'Foo', content: 'Foo bar', userId: 2 },
  { id: 14, title: 'Foo', content: 'Foo bar', userId: 3 },
  { id: 15, title: 'Foo', content: 'Foo bar', userId: 4 },
];

export const postData = new Map<number, Post>(
  posts.map(({ id, ...rest }) => [id, { id, ...rest }])
);

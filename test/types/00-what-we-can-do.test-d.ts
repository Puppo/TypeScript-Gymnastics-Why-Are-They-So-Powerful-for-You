import { describe, expectTypeOf, test } from "vitest";

describe("What we can do", ()=> {

  test('parse url params', () => {
    const path = 'user/:id';
    const params = { id: '123' };

    expectTypeOf<ParseUrlParams<typeof path>>().toEqualTypeOf<typeof params>();
    navigate(path, params);
  });

  test('parse url params with error', () => {
    const url = 'user/:id/name/:name';
    const params = { id: '123' };

    navigate(url, params);
  });
});




type ParseUrlParams<Url> =
  Url extends `${infer Path}(${infer OptionalPath})`
    ? ParseUrlParams<Path> & Partial<ParseUrlParams<OptionalPath>>
    : Url extends `${infer Start}/${infer Rest}`
    ? ParseUrlParams<Start> & ParseUrlParams<Rest>
    : Url extends `:${infer Param}`
    ? Record<Param, string>
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    : {};


function navigate<T extends string>(
  path: T,
  params: ParseUrlParams<T>
) {
  // interpolate params
  let url = Object.entries<string>(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, value),
    path
  );

  // clean url
  url = url.replace(/(\(|\)|\/?:[^/]+)/g, '')

  // update url
  history.pushState({}, '', url);
}
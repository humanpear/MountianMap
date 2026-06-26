Place manually verified mountain hero images here.

Default path:

```text
public/mountain-images/{mountainId}/hero.png
```

Example:

```text
public/mountain-images/0000000077/hero.png
```

The mountain detail header automatically tries this default path:

```ts
/mountain-images/{mountainId}/hero.png
```

Adding `heroImage` to a guide is optional. Use it only when a mountain needs a
custom path or metadata:

```ts
heroImage: {
  src: '/mountain-images/0000000077/hero.png',
  alt: '지리산 대표 이미지'
}
```

Use local `.png` files for representative images. Do not use 숲나들e image URLs
as `heroImage` sources.

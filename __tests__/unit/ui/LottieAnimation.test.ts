import { faker } from '@faker-js/faker';
import { act, render, screen } from '@testing-library/svelte';
import { afterEach } from 'fast-check';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TESTS_SEED } from '~/shared/lib/constants';
import LottieAnimationS from '~/shared/ui/LottieAnimation.svelte';

vi.mock(import('@lottiefiles/dotlottie-svelte'), async (importOriginal) => {
  const modules = await importOriginal();

  const { default: DotLottieSvelte } = await import('../../mock/DotLottieSvelte.svelte');

  return {
    ...modules,
    DotLottieSvelte: DotLottieSvelte as any,
  };
});

let onChange: ((event: { matches: boolean }) => void) | undefined;

const addEventListener = vi.fn((_, handler) => onChange = (event: { matches: boolean }) => handler(event));
const removeEventListener = vi.fn(() => onChange = undefined);
const matchMediaMock = vi.fn(media => ({
  media,
  matches: false,
  addEventListener,
  removeEventListener,
}));

const URLMock = vi.fn(class {
  constructor(
    public url: string,
    public base: string,
  ) {
    this.url = 'lottie';
    this.base = 'base';
  }

  get href() {
    return `${this.base}/${this.url}`;
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  faker.seed(TESTS_SEED);

  vi.stubGlobal('matchMedia', matchMediaMock);
  vi.stubGlobal('URL', URLMock);
});

describe('lottieAnimation component', () => {
  it('render component and change state with matchMedia', async () => {
    const name = 'lottie-name';
    const loop = true;
    const autoplay = true;

    const { unmount } = render(LottieAnimationS, { name, loop, autoplay });

    const lottie = screen.getByTestId('dot-lottie-svelte');

    expect(lottie).toBeInTheDocument();
    expect(matchMediaMock).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalledTimes(1);

    expect(lottie).toHaveAttribute('data-src', 'base/lottie');
    expect(lottie).toHaveAttribute('data-loop', String(loop));
    expect(lottie).toHaveAttribute('data-autoplay', String(autoplay));

    await act(() => onChange?.({ matches: true }));

    expect(lottie).toHaveAttribute('data-src', 'base/lottie');
    expect(lottie).toHaveAttribute('data-loop', 'false');
    expect(lottie).toHaveAttribute('data-autoplay', 'false');

    unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });
});

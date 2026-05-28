import '~/source/00-config/index.css';
import '~global/index.css';
import '~utility/index.css';

import { Public_Sans } from 'next/font/google';
import { JSX, PropsWithChildren } from 'react';
import { loadCurrentTheme, themeToCss } from '~/lib/theme';
import sourceSansPro from '~global/fonts/source-sans';

const publicSans = Public_Sans({
  display: 'auto',
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-public-sans',
});

// Theme is read on every request so the JSON-upload mechanism reflects the
// most recently POSTed bundle without a rebuild.
export const dynamic = 'force-dynamic';

async function RootLayout({
  children,
}: PropsWithChildren): Promise<JSX.Element> {
  const mode = process.env.NEXT_PUBLIC_THEME_MODE ?? 'none';
  const shellBrandUrl = process.env.NEXT_PUBLIC_SHELL_BRAND_URL;

  let themeCss: string | null = null;
  if (mode === 'json') {
    const bundle = await loadCurrentTheme();
    if (bundle) themeCss = themeToCss(bundle);
  }

  return (
    <html
      lang="en"
      className={`${sourceSansPro.variable} ${publicSans.variable}`}
    >
      <head>
        {themeCss && (
          <style
            id="dtcg-theme"
            dangerouslySetInnerHTML={{ __html: themeCss }}
          />
        )}
        {mode === 'link' && shellBrandUrl && (
          <link rel="stylesheet" href={shellBrandUrl} />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;

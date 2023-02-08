import { transform } from 'lightningcss';

import type { Transformer, Options } from '../types';

const transformer: Transformer<Options.Lightning> = async ({
  content,
  filename,
  options = {},
}) => {
  const {
    code,
    map,
    dependencies: $dependencies,
  } = transform({
    filename: filename as string,
    code: Buffer.from(content),
    sourceMap: true,
    ...options,
  });

  const dependencies = $dependencies?.map((dependency) => {
    return dependency.url;
  });

  return {
    code: code.toString(),
    map: (map as Buffer)?.toString(),
    dependencies,
  };
};

export { transformer };

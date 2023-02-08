import { getTagInfo } from '../modules/tagInfo';
import { concat } from '../modules/utils';
import { prepareContent } from '../modules/prepareContent';

import type { PreprocessorGroup, Options } from '../types';

export default (options?: Options.Lightning): PreprocessorGroup => ({
  async style(svelteFile) {
    const { transformer } = await import('../transformers/lightning');
    let { content, filename, attributes, lang, alias, dependencies } =
      await getTagInfo(svelteFile);

    if (alias === 'lcss') {
      options = {
        ...options,
        stripIndent: true,
      };
    }

    if (lang !== 'lcss') {
      return { code: content };
    }

    content = prepareContent({ options, content });

    const transformed = await transformer({
      content,
      filename,
      attributes,
      options,
    });

    return {
      ...transformed,
      dependencies: concat(dependencies, transformed.dependencies),
    };
  },
});

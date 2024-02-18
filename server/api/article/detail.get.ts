import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (query) =>
    z
      .object({
        id: z.string(),
      })
      .safeParse(query),
  );

  if (!result.success) return Err_400(event, result.error.message);

  const isArticle = await ArticleSchema.exists({
    id: result.data.id,
    isDelete: false,
  });

  if (!isArticle) return Err_400(event, 'Article not found');

  const article = await ArticleSchema.findOne({ isDelete: false })
    .where('id')
    .equals(result.data.id);

  return article;
});

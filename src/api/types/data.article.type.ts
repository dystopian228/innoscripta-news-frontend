import Author from "./data.author.type";
import Source from "./data.source.type";

type Article = {
  id: number;
  title: string;
  headline: string|null;
  leadParagraph: string|null;
  publishDate: number;
  articleUrl: string;
  imageUrl: string|null;
  category: string;
  source: Source|null;
  authors: Author[]|null;
};

export default Article;
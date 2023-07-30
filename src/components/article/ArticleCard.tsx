import React from "react";
import {Card, type CustomFlowbiteTheme} from "flowbite-react";
import Article from "../../api/types/responses/data.article.type";
import Author from "../../api/types/responses/data.author.type";
import {timeAgo} from "../../util/timeutil";

const customTheme: CustomFlowbiteTheme['card'] = {
    root: {
        children: "flex flex-col gap-6 grow",
    }
};

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({article}) => {

    let authorNames = '';
    if (article.authors) {
        authorNames = article.authors.reduce(
            (accumulator: string, current: Author) => (current.name || current.organization) ? `${current.name ? (`${current.title ?? ''} ${current.name}`) : current.organization}, ${accumulator}` : '',
            ''
        );
        authorNames = authorNames.slice(0, authorNames.length - 2);
    }

    return <Card
        renderImage={() => (
            <img className={`rounded-lg object-fit md:h-[426px] h-[213px] ${article.imageUrl ? 'object-cover' : ''}`} height={550}
                 src={article.imageUrl ?? '/logo.svg'} alt={article.title}/>)}
        className="p-4 gap-6 justify-start grow"
        theme={customTheme}
        href={article.articleUrl}
        //@ts-ignore
        target="_blank"
    >
        <div className="grow">
            <span className="text-gray-500 text-sm leading-tight">{timeAgo(article.publishDate)}</span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                <p style={{lineBreak: 'anywhere'}}>
                    {article.title}
                </p>
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
                <p style={{lineBreak: 'anywhere'}}>
                    {article.headline}
                </p>
            </div>
        </div>
        <span
            className="text-gray-500 leading-tight">{article.source?.name} {authorNames ? '•' : ''} {authorNames}
        </span>
    </Card>;
}

export default ArticleCard;
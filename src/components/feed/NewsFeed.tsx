import ArticleCard from "../article/ArticleCard";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeCategory,
    fetchNews,
    selectAllArticles, selectCategory,
    selectError,
    selectNextPage,
    selectStatus,
    emptyArticles
} from "../../redux/slices/news.slice";
import Article from "../../api/types/data.article.type";
import {ApiResponseEnum} from "../../api/api.response.enum";
import axios from "axios";
import {Button} from "flowbite-react";
import {BlipCircle} from "../common/Loader";
import {useParams} from "react-router-dom";

interface NewsFeedProps {
}

const NewsFeed: React.FC<NewsFeedProps> = () => {
    let {category} = useParams();
    const dispatch = useDispatch();
    const articles: Article[] = useSelector(selectAllArticles);
    const nextPage: number | null = useSelector(selectNextPage);
    const requestStatus: ApiResponseEnum = useSelector(selectStatus);
    const selectedCategory = useSelector(selectCategory);
    const error: string | null = useSelector(selectError);

    const cancelToken = axios.CancelToken;
    const tokenSource = cancelToken.source();

    useEffect(() => {
        console.log(requestStatus);
        console.log(category);
        console.log(selectedCategory);
        if (selectedCategory != category) {
            console.log('in');
            dispatch(changeCategory(category ?? null));
        } else if (requestStatus === ApiResponseEnum.IDLE) {
             // @ts-ignore
             dispatch(fetchNews({page: 1, cancelToken: tokenSource, category: category ?? null}));
         }

    }, [requestStatus, dispatch, category, selectedCategory])

    useEffect(() => {
        return () => {
            tokenSource.cancel();
        };
    }, []);

    return <div className="grid gap-y-4 justify-center">
        {requestStatus === ApiResponseEnum.LOADING && articles.length === 0 && <BlipCircle colored/>}
        <div className="grid grid-cols-2 md:grid-cols-3 xs:grid-cols-1 md:gap-x-8 gap-y-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article}/>
            ))}
        </div>
        {
            articles.length > 0 && nextPage &&
            <Button
                className="place-self-center from-purple-500 via-purple-600 to-purple-700"
                gradientDuoTone="purpleToBlue"
                isProcessing={requestStatus === ApiResponseEnum.LOADING}
                onClick={() => {
                    // @ts-ignore
                    dispatch(fetchNews({page: nextPage, cancelToken: tokenSource, category: category ?? null}));
                }}
            >
                <p>
                    Load more
                </p>
            </Button>

        }
    </div>
}

export default NewsFeed;
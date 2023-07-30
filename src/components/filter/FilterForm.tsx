import NewsyForm, {FieldGroup} from "../common/formik/Form";
import React, {useEffect} from "react";
import axios, {CancelTokenSource} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectCategories} from "../../redux/slices/root.slice";
import {capitalizeWord} from "../../util/common";
import {fetchSources, selectSearchSources} from "../../redux/slices/news.slice";
import Source from "../../api/types/responses/data.source.type";
import {FormikHelpers} from "formik";

interface IFilterFormProps {
    onSubmit: Function;
}

const FilterForm: React.FC<IFilterFormProps> = (props) => {

    const categories = useSelector(selectCategories);
    const sources = useSelector(selectSearchSources);
    const cancelToken = axios.CancelToken;
    const tokenSource = cancelToken.source();

    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchSources({cancelToken}));
    }, []);

    const handleSubmit = (
        values: {
            keyword: string;
            sources: string[];
            categories: string[];
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _formikApi: FormikHelpers<{
            keyword: string;
            sources: string[];
            categories: string[];
        }>,
    ): void => {
        // @ts-ignore
        dispatch(props.onSubmit({
            page: 1,
            category: null,
            filterObject: values,
            cancelToken: tokenSource,
            clearNews: true,
            withFilter: true
        }));
    };

    const fieldGroups: FieldGroup[] = [
        {
            title: 'Search',
            className: 'grid md:grid-cols-3 grid-cols-1 gap-4 flex-wrap',
            fields: [
                {
                    id: 'keyword',
                    name: 'keyword',
                    label: 'Search',
                    placeholder: 'Phrase or words...',
                    required: false,
                    type: 'text',
                    componentType: 'textField',
                    optionList: [],
                    className: 'grow'
                },
                {
                    id: 'categories',
                    name: 'categories',
                    label: 'Categories',
                    placeholder: '',
                    required: false,
                    type: '',
                    componentType: 'multiselect',
                    optionList: categories ? categories.map((category: string) => ({
                        label: capitalizeWord(category), value: category
                    })) : [],
                    className: 'grow'
                },
                {
                    id: 'sources',
                    name: 'sources',
                    label: 'Sources',
                    placeholder: '',
                    required: false,
                    type: '',
                    componentType: 'multiselect',
                    optionList: sources ? sources.map((source: Source) => ({
                        label: source.name, value: source.symbol
                    })) : [],
                    className: 'grow'
                },
            ]
        }
    ];


    const initialValues = {
        keyword: '',
        categories: [],
        sources: [],
    }

    useEffect(() => {

    }, []);

    return <div className="items-center justify-center">{categories && sources &&
        <NewsyForm initialValues={initialValues}
                   validationSchema={null}
                   handleSubmit={handleSubmit} fieldGroups={fieldGroups}
                   tokenSource={tokenSource} error={''}
                   className='' loading={false}/>}</div>
};

export default FilterForm;
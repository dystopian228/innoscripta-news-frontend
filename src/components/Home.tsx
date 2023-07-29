import NewsFeed from "./feed/NewsFeed";

export default function Home() {
    return <div className="md:container md:mx-auto">
        <div className="my-10 py-10 font-bold text-center uppercase font-mono">
            <h1 className="text-2xl">All the news that's fit for you.</h1>
            <h2 className="text-xl">All in one place.</h2>
        </div>
        <NewsFeed/>
    </div>
}
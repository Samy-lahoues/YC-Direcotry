import { auth } from "@/auth";
import StartupCard, { StartupCardTypes } from "../../components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/lib/live";
import { SanityLive } from "@/lib/live";
// ? this import used in the first real fetch (using ISR)
// import { client } from "@/sanity/lib/client"
// ! fake post
//  const Posts = [{
//   _id : 1,
//   _createdAt: new Date,
//   views : 55,
//   author : { id : 1, name : "Samy"},
//   description : 'This is a description',
//   image : 'https://placehold.jp/600x400.png',
//   category : 'robots',
//   title : "we robots"
// }]

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;
  // const Posts = await client.fetch(STARTUPS_QUERY)
  const params = { search: query || null };
  const session = await auth();
  const { data: Posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {Posts?.length > 0 ? (
            Posts.map((post: StartupCardTypes) => (
              <StartupCard
                key={post._id}
                views={post.views}
                _createdAt={post._createdAt}
                title={post.title}
                description={post.description}
                image={post.image}
                category={post.category}
                author={post.author}
                _id={post._id}
              />
            ))
          ) : (
            <p className="no-results">no startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};
export default Home;

export default function Home({ posts }) {
  return (
    <>
      <h1>Titles</h1>
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <a href={`${post.attributes.Slug}/${post.id}`}>
                {post.attributes.Title}
              </a>
              <img
                width="100"
                src={
                  post.attributes.MainImage?.data.attributes.formats.small.url
                }
                title={
                  post.attributes.MainImage?.data.attributes.alternativeText
                }
              />
            </div>
          ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  // get posts
  const res = await fetch(
    "https://strapi-app-c93qz.ondigitalocean.app/api/Posts?populate=MainImage"
  );
  const posts = await res.json();
  return {
    props: { posts: posts.data },
  };
}

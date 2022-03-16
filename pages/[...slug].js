export default function Post({ post }) {
  return (
    <>
      <h1>{post.attributes.Title}</h1>
      <div>
        <p>{post.attributes.Content}</p>
        <img
          src={post.attributes.MainImage?.data.attributes.formats.medium.url}
          title={post.attributes.MainImage?.data.attributes.alternativeText}
        />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://strapi-app-c93qz.ondigitalocean.app/api/Posts/${context.params.slug[1]}?populate=MainImage`
  );
  const post = await res.json();
  return {
    props: { post: post.data },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://strapi-app-c93qz.ondigitalocean.app/api/Posts?populate=MainImage"
  );
  const posts = await res.json();
  return {
    paths:
      posts.data.map((post) => ({
        params: { slug: [post.attributes.Slug, post.id.toString()] },
      })) || [],
    fallback: false,
  };
}

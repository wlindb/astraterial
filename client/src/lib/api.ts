import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.CMS_BASE_URL ?? '',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.CMS_READ_API_KEY ?? ''}`
  }
});

export type PostMetadata = {
  title: string;
  slug: string;
  id: string;
  entryId: string;
  createdOn: Date;
  modifiedOn: Date;
  savedOn: Date;
  firstPublishedOn: Date;
  lastPublishedOn: Date;
  createdBy: {
    displayName: string;
  }
  featuredimage: string;
};

const LIST_POSTS = gql`
  query ListPosts {
      listPosts(limit: 40) {
          data {
              entryId
              title
              id
              slug
              createdOn
              modifiedOn
              savedOn
              firstPublishedOn
              lastPublishedOn
              createdBy {
                  displayName
              }
              featuredimage
              title
          }
      }
  }
`;

type LIST_POSTS_RESPONSE = {
  listPosts: {
    data: {
      entryId: string;
      title: string;
      id: string;
      slug: string;
      createdOn: Date;
      modifiedOn: Date;
      savedOn: Date;
      firstPublishedOn: Date;
      lastPublishedOn: Date;
      createdBy: {
        displayName: string;
      }
      featuredimage: string;
    }[];
  };
};

export async function getBlogPosts(): Promise<PostMetadata[]> {
  console.log('Env: ', process.env.CMS_BASE_URL, process.env.CMS_READ_API_KEY);
  try {
    const response = await client.query<LIST_POSTS_RESPONSE>({
      query: LIST_POSTS
    });
    if (!response) {
      console.error('Failed to fetch blog posts');
      return [];
    }

    const { data, error, errors } = response;
    if (error || errors) {
      console.error('Failed to fetch blog posts', error);
      return Promise.reject(error);
    }
    console.log('Data: ', data);
    const { listPosts } = data;
    if (!listPosts) {
      return Promise.reject('Failed to fetch blog posts');
    }

    const postData = listPosts.data?.filter(post => post !== null) ?? [];
    const posts = postData
      .filter(post => post.title && post.slug && post.id && post.entryId)
      .map(post => {
        if (!post || !post.title || !post.slug || !post.id || !post.entryId) {
          return;
        }
        // const { title, slug, id, entryId,  } = post;
        return post
      })
      .filter(post => post !== undefined);
    return posts;
  } catch (error) {
    return Promise.reject(error);
  }
}

const GET_POST_BY_ENTRY_ID = gql`
  query GetPost($entryId: String!) {
    getPost(where: { entryId: $entryId }) {
      data {
        id
        entryId
        modelId
        createdOn
        modifiedOn
        savedOn
        deletedOn
        restoredOn
        firstPublishedOn
        lastPublishedOn
        revisionCreatedOn
        revisionModifiedOn
        revisionSavedOn
        revisionDeletedOn
        revisionRestoredOn
        revisionFirstPublishedOn
        revisionLastPublishedOn
        publishedOn
        title
        slug
        featuredimage
        body(format: "html")
      }
    }
  }
`;

type GET_POST_BY_ENTRY_ID_RESPONSE = {
  getPost: {
    data: {
      id: string;
      entryId: string;
      modelId: string;
      createdOn: string;
      modifiedOn: string;
      savedOn: string;
      deletedOn: string;
      restoredOn: string;
      firstPublishedOn: string;
      lastPublishedOn: string;
      revisionCreatedOn: string;
      revisionModifiedOn: string;
      revisionSavedOn: string;
      revisionDeletedOn: string;
      revisionRestoredOn: string;
      revisionFirstPublishedOn: string;
      revisionLastPublishedOn: string;
      publishedOn: string;
      title: string;
      slug: string;
      featuredimage: string;
      body: string;
    };
  };
};

export async function getBlogPost(entryId: string): Promise<{
  title: string | undefined;
  slug: string | undefined;
  id: string;
  body: string;
  featuredimage: string | undefined;
  lastPublishedOn: Date;
}> {
  console.log('Fetching blog post with id: ', entryId);

  const { data, error, errors } = await client.query<GET_POST_BY_ENTRY_ID_RESPONSE>({
    query: GET_POST_BY_ENTRY_ID,
    variables: { entryId },
  });

  if (error || errors) {
    console.error('Failed to fetch blog post', error);
    return Promise.reject(error);
  }

  const post = data.getPost?.data;
  if (!post) {
    return Promise.reject('Failed to fetch blog post');
  }

  const { title, slug, id, body, featuredimage } = post;
  console.log('Title: ', title);

  return {
    title: title ?? undefined,
    slug: slug ?? undefined,
    id,
    body,
    featuredimage: featuredimage ?? undefined,
    lastPublishedOn: new Date(post.lastPublishedOn),
  };
}


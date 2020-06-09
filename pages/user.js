import Link from "next/link";

/* components */
import Layout from "../components/layout/Layout";

function User({ users }) {
  function renderUsers() {
    return users.data.map((user, i) => {
      return (
        <Link
          key={i}
          href={{
            pathname: `/user/${user.id}`,
            query: {},
          }}
        >
          <a className="card">
            <h3 className="headline">
              {user.firstName} {user.lastName}
            </h3>
            <p>{user.email}</p>
            <small>Posts: {user.posts.length}</small>{" "}
            <small>Jobs: {user.jobs.length}</small>
          </a>
        </Link>
      );
    });
  }

  return (
    <Layout title="Next.js with Sequelize | User Page">
      <div className="container">
        <main>
          <h1 className="title">
            Sequelize &amp; <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <p className="description">
            <img
              src="/sequelize.svg"
              alt="Sequelize"
              height="120"
              style={{ marginRight: "1rem" }}
            />
            <img src="/nextjs.svg" alt="Next.js" width="160" />
          </p>
          <p className="account">
            Have an Account?
            <Link href={{ pathname: "/user/login" }}>
              <a>Login</a>
            </Link>
            or
            <Link href={{ pathname: "/user/register" }}>
              <a>Register</a>
            </Link>
          </p>
          <h2>
            <Link
              href={{
                pathname: "/",
              }}
            >
              <a>&larr; </a>
            </Link>
            Recent Users
          </h2>
          <div className="grid">{users.data.length && renderUsers()}</div>
        </main>
      </div>
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getServerSideProps(context) {
  const { query, req, res, headers } = context;
  const host = process.env.NODE_ENV === "production" ? "http://" : "http://";

  const baseApiUrl = `${host}${req.headers.host}/api`;

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const usersApi = await fetch(`${baseApiUrl}/user`);
  const users = await usersApi.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  };
}

export default User;
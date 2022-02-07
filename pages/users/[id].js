import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Title from "../../components/title";

export default function User({ user }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>CARGANDO...</div>;
  }

  return (
    <Layout>
      <Title>User ID {user.id}</Title>
      <div className="card">
        <h3>User</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>

      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </Layout>
  );
}

// PARA PODER CONECTARME A TRAVES DEL PROXY
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

export async function getStaticPaths() {
  const proxyAgent = new HttpsProxyAgent("http://192.168.30.120:3128");
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    agent: proxyAgent,
  });
  const users = await res.json();
  // const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];

  const paths = users.map((user) => {
    return {
      params: {
        id: `${user.id}`,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

// // PARA PODER CONECTARME A TRAVES DEL PROXY
// import fetch from "node-fetch";
// import { HttpsProxyAgent } from "https-proxy-agent";

export async function getStaticProps({ params }) {
  const proxyAgent = new HttpsProxyAgent("http://192.168.30.120:3128");
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
    {
      agent: proxyAgent,
    }
  );
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}

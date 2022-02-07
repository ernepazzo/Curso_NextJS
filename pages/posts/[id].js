import Layout from "../../components/layout";
import Title from "../../components/title";

export default function Post({ post }) {
  return (
    <Layout>
      <Title>Post Details</Title>
      <div className="card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: black;
            text-decoration: none;
            border: 2px solid #eaeaea;
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

export async function getServerSideProps({ params }) {
  const proxyAgent = new HttpsProxyAgent("http://192.168.30.120:3128");
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { agent: proxyAgent }
  );
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

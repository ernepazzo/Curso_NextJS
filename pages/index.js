import Head from "next/head";
import Layout from "../components/layout";
import Title from "../components/title";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Aprendamos NextJS</title>
        <meta name="description" content="Este curso de NextJS"/>
      </Head>
      <Title>Home Page</Title>
      <p>Aprendamos NextJS!!!</p>
      <style jsx>
        {`
          p {
            color: darkgray;
            font-size: 30px;
          }

          p:hover {
            color: darkred;
          }
        `}
      </style>
    </Layout>
  );
}

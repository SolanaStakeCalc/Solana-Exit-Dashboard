import { getSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

export default function Home({ session }) {
  const { data, error } = useSWR('/api/indicators', fetcher);

  if (!session) return <p>You must be logged in to view this page.</p>;
  if (error) return <p>Failed to load indicators.</p>;
  if (!data) return <p>Loading...</p>;

  const { indicators, allConfirmed } = data;

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1>📈 Solana Exit Timing Dashboard</h1>
      <h2 style={{ color: allConfirmed ? 'green' : 'red' }}>
        {allConfirmed ? '✅ PHASE 2 CONFIRMED' : '❌ Phase 2 Not Fully Confirmed'}
      </h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((item, i) => (
            <tr key={i}>
              <td>{item.indicator}</td>
              <td style={{ textAlign: 'center' }}>{item.conditionMet ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { session } };
}

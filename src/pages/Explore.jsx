export default function Explore() {
  return (
    <div className="center-page">
      <div className="card">
        <h2 className="title">Explore 🚀</h2>
        <button className="btn" onClick={() => window.location.href='/buddies'}>
          See Buddies Nearby 👥
        </button>
        <button className="btn" onClick={() => window.location.href='/activities'}>
          See Activities Nearby ⚽
        </button>
      </div>
    </div>
  );
}

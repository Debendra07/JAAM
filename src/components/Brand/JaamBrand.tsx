import "./jaam-brand.css";

export default function JaamBrand() {
  return (
    <div className="brand" aria-label="JAAM Music for your spirit">
      <img
        src={`${import.meta.env.BASE_URL}artwork/jaam-wine-glass.svg`}
        alt=""
        className="brand__logo"
        aria-hidden="true"
      />

      <div className="brand__copy">
        <div className="brand__name">JAAM</div>
        <div className="brand__tagline">MUSIC FOR YOUR SPIRIT</div>
      </div>
    </div>
  );
}

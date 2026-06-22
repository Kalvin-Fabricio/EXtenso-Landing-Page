import telaapp from "../assets/telaapp.png";

export default function AppMockup() {
  return (
    <div className="mockup-shell" aria-label="Prévia visual do aplicativo EXtenso">
      <div className="mockup-phone">
        <img
          src={telaapp}
          alt="Tela do aplicativo EXtenso"
          className="mockup-image"
        />
      </div>
    </div>
  );
}
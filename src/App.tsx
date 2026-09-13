import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";

import {
  couple,
  coupleVideo,
  ending,
  hero,
  letter,
  photos,
  reasons,
  scratchCards,
  song,
} from "./data";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type ScratchCardProps = {
  label: string;
  image: string;
  caption: string;
};

function ScratchCard({ label, image, caption }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const moveCounter = useRef(0);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper || revealed) return;

    const rect = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      rect.width,
      rect.height
    );

    gradient.addColorStop(0, "#d8d3c9");
    gradient.addColorStop(0.5, "#f1eee7");
    gradient.addColorStop(1, "#bbb5a9");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(35, 35, 32, 0.08)";

    for (let i = 0; i < 900; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 2 + 0.5;

      ctx.fillRect(x, y, size, size);
    }

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#27251f";
    ctx.textAlign = "center";

    ctx.font = "700 13px 'IBM Plex Mono'";
    ctx.fillText("SCRATCH HERE", rect.width / 2, rect.height / 2 - 5);

    ctx.font = "11px 'IBM Plex Mono'";
    ctx.fillText(
      "YOUR SURPRISE IS WAITING",
      rect.width / 2,
      rect.height / 2 + 17
    );
  };

  useEffect(() => {
    setupCanvas();

    const handleResize = () => setupCanvas();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [revealed]);

  const getPosition = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const scratch = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!drawing.current || revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getPosition(event);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 42;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    moveCounter.current += 1;

    if (moveCounter.current % 8 === 0) {
      checkReveal();
    }
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const sampleCanvas = document.createElement("canvas");
    const sampleWidth = 60;
    const sampleHeight = Math.max(
      30,
      Math.round((height / width) * sampleWidth)
    );

    sampleCanvas.width = sampleWidth;
    sampleCanvas.height = sampleHeight;

    const sampleCtx = sampleCanvas.getContext("2d");

    if (!sampleCtx) return;

    sampleCtx.drawImage(
      canvas,
      0,
      0,
      width,
      height,
      0,
      0,
      sampleWidth,
      sampleHeight
    );

    const data = sampleCtx.getImageData(
      0,
      0,
      sampleWidth,
      sampleHeight
    ).data;

    let transparent = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 100) {
        transparent++;
      }
    }

    const total = data.length / 4;
    const percentage = transparent / total;

    if (percentage > 0.48) {
      setRevealed(true);
    }
  };

  const pointerDown = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (revealed) return;

    drawing.current = true;

    event.currentTarget.setPointerCapture(event.pointerId);

    const { x, y } = getPosition(event);

    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const pointerUp = () => {
    if (!drawing.current) return;

    drawing.current = false;

    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.beginPath();
    }

    checkReveal();
  };

  return (
    <article className={`scratch-card ${revealed ? "is-revealed" : ""}`}>
      <div className="scratch-label">{label}</div>

      <div className="scratch-image" ref={wrapperRef}>
        <img src={image} alt={label} />

        {!revealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={pointerDown}
            onPointerMove={scratch}
            onPointerUp={pointerUp}
            onPointerCancel={pointerUp}
            onPointerLeave={pointerUp}
          />
        )}

        {revealed && (
          <div className="scratch-revealed">
            <Sparkles size={24} />
            <span>LUCKY!</span>
          </div>
        )}
      </div>

      <p>{caption}</p>
    </article>
  );
}

function App() {
  const [rolling, setRolling] = useState(false);
  const [jackpot, setJackpot] = useState(false);
  const [rollValues, setRollValues] = useState(["00", "00", "00"]);

  const [selectedReason, setSelectedReason] = useState<number | null>(
    null
  );

  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(
    null
  );

  const [letterOpen, setLetterOpen] = useState(false);

  const [boothStarted, setBoothStarted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [captured, setCaptured] = useState<number[]>([]);
  const [flash, setFlash] = useState(false);

  const [confetti, setConfetti] = useState(false);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const reasonsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Create the YouTube player in a DOM node that lives OUTSIDE React's
    // render tree (appended directly to <body>). If we let React manage
    // this node instead, the YouTube API silently swaps it for an <iframe>
    // behind React's back, and the next time React re-renders (like during
    // the roll animation) it can crash the whole app because the DOM no
    // longer matches what React expects.
    const container = document.createElement("div");
    container.className = "hidden-yt-player";
    document.body.appendChild(container);

    const createPlayer = () => {
      playerRef.current = new window.YT.Player(container, {
        videoId: song.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      playerRef.current?.destroy?.();
      container.remove();
    };
  }, []);

  const toggleMusic = () => {
    const player = playerRef.current;
    if (!player) return;

    if (musicPlaying) {
      player.pauseVideo();
      setMusicPlaying(false);
    } else {
      player.playVideo();
      setMusicPlaying(true);
    }
  };

  const rollDate = () => {
    if (rolling) return;

    setRolling(true);
    setJackpot(false);

    const target = [
      String(couple.anniversaryMonth).padStart(2, "0"),
      String(couple.anniversaryDay).padStart(2, "0"),
      String(couple.anniversaryYear).slice(-2),
    ];

    let ticks = 0;

    const interval = window.setInterval(() => {
      ticks++;

      setRollValues([
        String(Math.floor(Math.random() * 12) + 1).padStart(2, "0"),
        String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"),
        String(Math.floor(Math.random() * 30) + 1).padStart(2, "0"),
      ]);

      if (ticks >= 18) {
        window.clearInterval(interval);

        setRollValues(target);

        setTimeout(() => {
          setRolling(false);
          setJackpot(true);
          setConfetti(true);

          setTimeout(() => {
            setConfetti(false);
          }, 4500);
        }, 450);
      }
    }, 110);
  };

  const scrollToReasons = () => {
    reasonsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const startPhotobooth = () => {
    setBoothStarted(true);
    setCaptured([]);
    setCurrentPhoto(0);
    setCountdown(3);
  };

  useEffect(() => {
    if (!boothStarted || countdown === null) return;

    if (countdown === 0) {
      setFlash(true);

      setTimeout(() => {
        setFlash(false);

        setCaptured((previous) => {
          if (previous.includes(currentPhoto)) {
            return previous;
          }

          return [...previous, currentPhoto];
        });

        if (currentPhoto < photos.length - 1) {
          setCurrentPhoto((previous) => previous + 1);
          setCountdown(3);
        } else {
          setCountdown(null);
        }
      }, 350);

      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((previous) =>
        previous === null ? null : previous - 1
      );
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [boothStarted, countdown, currentPhoto]);

  return (
    <main>
      {confetti && (
        <div className="confetti-layer" aria-hidden="true">
          {Array.from({ length: 45 }).map((_, index) => (
            <span
              key={index}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
              }}
            />
          ))}
        </div>
      )}

      {flash && <div className="camera-flash" />}

      <button
        className={`music-toggle ${musicPlaying ? "is-playing" : ""}`}
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pause our song" : "Play our song"}
      >
        {musicPlaying ? <Pause size={16} /> : <Play size={16} />}
        <span>{musicPlaying ? "PLAYING" : "PLAY OUR SONG"}</span>
      </button>

      <section className="hero-section">
        <div className="top-stamp">
          <span>S002</span>
          <span>LUCKY US</span>
          <span>EST. {couple.anniversaryYear}</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>

          <h1>
            {hero.title}
            <br />
            <em>{hero.subtitle}</em>
          </h1>

          <p className="hero-description">{hero.description}</p>

          <button
            className="primary-button"
            onClick={rollDate}
            disabled={rolling}
          >
            <Ticket size={18} />
            {rolling ? "ROLLING..." : "ROLL OUR DATE"}
          </button>
        </div>

        <div className="lotto-machine">
          <div className="machine-top">
            <span>LOVE LOTTO</span>
            <Heart size={18} fill="currentColor" />
          </div>

          <div className="machine-window">
            {rollValues.map((value, index) => (
              <div
                className={`lotto-ball ball-${index + 1} ${
                  rolling ? "rolling" : ""
                }`}
                key={index}
              >
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="machine-bottom">
            <span>YOUR LUCKY NUMBERS</span>
          </div>
        </div>

        <button className="scroll-hint" onClick={scrollToReasons}>
          <span>KEEP GOING</span>
          <ArrowDown size={18} />
        </button>
      </section>

      <section className="winner-section">
        <div className="section-kicker">THE WINNING TICKET</div>

        <div className={`winner-ticket ${jackpot ? "winner-active" : ""}`}>
          <div className="ticket-left">
            <div className="ticket-number">S002</div>
            <span>LOVE LOTTO</span>
          </div>

          <div className="ticket-main">
            <p>THE DATE WE GOT LUCKY</p>

            <strong>
              {jackpot
                ? couple.anniversary
                : rolling
                ? "•• •• ••••"
                : "•• •• ••••"}
            </strong>

            <div className="ticket-names">
              {couple.name1} <span>×</span> {couple.name2}
            </div>

            {jackpot && (
              <div className="jackpot-message">
                <Sparkles size={16} />
                JACKPOT! YOU'RE MY WINNER.
              </div>
            )}
          </div>

          <div className="ticket-right">
            <div className="barcode">
              {Array.from({ length: 18 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
          </div>
        </div>

        <p className="winner-note">
          Some dates are just dates. <strong>This one is ours.</strong>
        </p>
      </section>

      <section className="numbers-section" ref={reasonsRef}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">PICK A NUMBER</p>
            <h2>10 little things I like about you.</h2>
          </div>

          <p>
            There is no wrong number.
            <br />
            Every one leads back to you.
          </p>
        </div>

        <div className="number-grid">
          {reasons.map((reason, index) => (
            <button
              className="number-ball"
              key={reason.number}
              onClick={() => setSelectedReason(index)}
            >
              <span>{reason.number}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="photobooth-section">
        <div className="booth-header">
          <div>
            <p className="eyebrow">MEMORY BOOTH</p>
            <h2>Smile for the camera.</h2>
          </div>

          <div className="booth-counter">
            {captured.length.toString().padStart(2, "0")} /{" "}
            {photos.length.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="photobooth">
          <div className="booth-top">
            <span>LUCKY MOMENTS</span>
            <Camera size={20} />
          </div>

          <div className="booth-screen">
            {boothStarted ? (
              <img
                src={photos[currentPhoto].src}
                alt={`Memory ${currentPhoto + 1}`}
              />
            ) : (
              <div className="booth-placeholder">
                <Camera size={42} />
                <span>YOUR PHOTO BOOTH</span>
                <small>10 memories waiting</small>
              </div>
            )}

            {countdown !== null && (
              <div className="countdown">
                {countdown === 0 ? "CHEESE!" : countdown}
              </div>
            )}
          </div>

          <div className="booth-controls">
            {!boothStarted || captured.length >= photos.length ? (
              <button
                className="primary-button dark"
                onClick={startPhotobooth}
              >
                <Camera size={18} />
                {captured.length >= photos.length
                  ? "TAKE THEM AGAIN"
                  : "START PHOTO BOOTH"}
              </button>
            ) : (
              <div className="booth-status">
                <span>GET READY...</span>
                {countdown !== null && <strong>{countdown}</strong>}
              </div>
            )}
          </div>
        </div>

        {captured.length > 0 && (
          <div className="photo-strip">
            {captured.map((photoIndex) => (
              <button
                key={photoIndex}
                onClick={() => setSelectedPhoto(photoIndex)}
              >
                <img
                  src={photos[photoIndex].src}
                  alt={photos[photoIndex].caption}
                />
                <span>{String(photoIndex + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="video-section">
        <div className="section-heading centered">
          <div>
            <p className="eyebrow">ONE MORE MEMORY</p>
            <h2>Our little video.</h2>
          </div>

          <p>
            Press play.
            <br />
            This one's my favorite.
          </p>
        </div>

        <div className="video-frame">
          <video src={coupleVideo.src} controls playsInline />
        </div>

        <p className="video-caption">{coupleVideo.caption}</p>
      </section>

      <section className="scratch-section">
        <div className="section-heading centered">
          <div>
            <p className="eyebrow">A LITTLE SECRET</p>
            <h2>Scratch to reveal.</h2>
          </div>

          <p>
            Don't worry.
            <br />
            There is something cute underneath.
          </p>
        </div>

        <div className="scratch-grid">
          {scratchCards.map((card) => (
            <ScratchCard
              key={card.label}
              label={card.label}
              image={card.image}
              caption={card.caption}
            />
          ))}
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-card">
          <div className="letter-card-top">
            <span>{letter.label}</span>
            <Heart size={18} />
          </div>

          <div className="letter-card-body">
            <p className="letter-small">{letter.intro}</p>

            <h2>{letter.title}</h2>

            <div className="letter-preview">
              {letter.body.split("\n\n").slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <button
              className="outline-button"
              onClick={() => setLetterOpen(true)}
            >
              OPEN MY LETTER
            </button>
          </div>

          <div className="letter-card-bottom">
            <span>FOR {couple.name2.toUpperCase()}</span>
            <span>♥</span>
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="final-ticket">
          <p className="eyebrow">{ending.eyebrow}</p>

          <h2>{ending.title}</h2>

          <div className="final-divider">
            <span />
            <Heart size={18} fill="currentColor" />
            <span />
          </div>

          <h3>{ending.subtitle}</h3>

          <p>
            {couple.name1} & {couple.name2}
          </p>

          <button
            className="primary-button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <RotateCcw size={17} />
            PLAY AGAIN
          </button>
        </div>

        <footer>
          <span>S002 · LUCKY US</span>
          <span>MADE WITH LOVE</span>
        </footer>
      </section>

      {selectedReason !== null && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedReason(null)}
        >
          <div
            className="reason-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedReason(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-ball">
              {reasons[selectedReason].number}
            </div>

            <p className="eyebrow">
              NUMBER {reasons[selectedReason].number}
            </p>

            <h2>{reasons[selectedReason].title}</h2>

            <p>{reasons[selectedReason].text}</p>

            <Heart size={20} fill="currentColor" />
          </div>
        </div>
      )}

      {selectedPhoto !== null && (
        <div
          className="modal-backdrop photo-modal-backdrop"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="photo-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={20} />
            </button>

            <img
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].caption}
            />

            <div className="photo-modal-caption">
              <span>
                MEMORY {String(selectedPhoto + 1).padStart(2, "0")}
              </span>
              <p>{photos[selectedPhoto].caption}</p>
            </div>

            <div className="photo-navigation">
              <button
                onClick={() =>
                  setSelectedPhoto(
                    selectedPhoto === 0
                      ? photos.length - 1
                      : selectedPhoto - 1
                  )
                }
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() =>
                  setSelectedPhoto(
                    selectedPhoto === photos.length - 1
                      ? 0
                      : selectedPhoto + 1
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {letterOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setLetterOpen(false)}
        >
          <div
            className="full-letter"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setLetterOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="letter-date">
              {couple.anniversary}
            </div>

            <p className="eyebrow">{letter.label}</p>

            <h2>{letter.title}</h2>

            <div className="letter-body">
              {letter.body.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="letter-signature">
              Always,
              <strong>{couple.name1}</strong>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
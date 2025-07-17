import { useEffect, useState } from "react";
import onePieceArcs from "../data/onePieceArcs.json";

function getCurrentArc(episode) {
    if (!episode) return null;
    const arc = onePieceArcs.find((a) => episode >= a.start && episode <= a.end);
    return arc ? arc.name : "Onbekende arc";
}

const Counter = () => {
    const [episode, setEpisode] = useState(null);
    const [arc, setArc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            const query = `
        query {
          MediaListCollection(userName: "sendrastisch", type: ANIME, status: CURRENT) {
            lists {
              entries {
                media {
                  title {
                    romaji
                  }
                }
                progress
              }
            }
          }
        }
      `;

            try {
                const response = await fetch("https://graphql.anilist.co", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ query }),
                });

                const json = await response.json();
                const onePieceProgress = json.data.MediaListCollection.lists[0].entries[0].progress;

                if (onePieceProgress) {
                    setEpisode(onePieceProgress);
                    setArc(getCurrentArc(onePieceProgress));
                } else {
                    setEpisode(null);
                    setArc(null);
                }
            } catch (error) {
                console.error("Fout bij ophalen One Piece progressie:", error);
                setEpisode(null);
                setArc(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (loading) {
        return (
            <section className="relative h-1/2 z-10 text-white font-fell text-4xl m-1 flex flex-col items-center justify-center">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="relative z-10 text-white font-fell text-6xl text-center m-1 mt-12 flex flex-col items-center justify-center">
            <p className="mb-1">{`${arc ?? "Arc onbekend"} Arc`}</p>
            <p className="text-9xl">{`Ep ${episode ?? "-"}`}</p>
        </section>
    );
};

export default Counter;

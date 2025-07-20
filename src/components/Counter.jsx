import { useEffect, useState } from "react";
import onePieceArcs from "../data/onePieceArcs.json";

function getCurrentArc(episode) {
    if (!episode) return null;
    const arc = onePieceArcs.find((a) => episode >= a.start && episode <= a.end);
    return arc ? arc.name : "Onbekende arc";
}

function convertDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const Counter = () => {
    const [episode, setEpisode] = useState(null);
    const [arc, setArc] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
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
                updatedAt
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
                const updatedAt = json.data.MediaListCollection.lists[0].entries[0].updatedAt;

                if (onePieceProgress) {
                    setEpisode(onePieceProgress);
                    setArc(getCurrentArc(onePieceProgress));
                    setUpdatedAt(updatedAt);
                } else {
                    setEpisode(null);
                    setArc(null);
                    setUpdatedAt(null);
                }
            } catch (error) {
                console.error("Fout bij ophalen One Piece progressie:", error);
                setEpisode(null);
                setArc(null);
                setUpdatedAt(null);
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
            <p className="text-xl">{`Last updated: ${convertDate(updatedAt)}`} </p>
        </section>
    );
};

export default Counter;

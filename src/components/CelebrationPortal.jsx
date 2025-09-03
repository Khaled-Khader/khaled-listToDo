    import { createPortal } from "react-dom";
    import Confetti from "react-confetti";
    import { useEffect, useState } from "react";

    export default function CelebrationPortal({ show }) {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        function handleResize() {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!show) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 pointer-events-none">
        <Confetti
            width={dimensions.width}
            height={dimensions.height}
            numberOfPieces={600}
            recycle={false}
            gravity={0.3}
        />
        </div>,
        document.getElementById("portal-root")
    );
    }

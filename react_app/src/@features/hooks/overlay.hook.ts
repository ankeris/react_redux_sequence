import { useState } from "react";

const useOverlay = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const [overlayMessage, setOverlayMessage] = useState<string>('');
    const [overlayTitle, setOverlayTitle] = useState<string>('');

    function toggleOverlay() {
        setIsShowing(!isShowing);
    }

    return {
      isShowing,
      toggleOverlay,
      setOverlayMessage,
      overlayMessage,
      overlayTitle,
      setOverlayTitle
    }
}

export default useOverlay
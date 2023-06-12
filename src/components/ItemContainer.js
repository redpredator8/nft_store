import React, { useState } from "react";

function ItemContainer({ result }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };
  return (
    <div
      className="item_container"
      key={result.mintAddress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item_content">
        <img
          src={result.onChainCollection.data.image}
          alt="Image"
          className="item_image"
        />
        {showOverlay && (
          <div className="item_overlay">
            <div className="item_title">{result.title}</div>
            <div className="item_price">${result.price}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemContainer;

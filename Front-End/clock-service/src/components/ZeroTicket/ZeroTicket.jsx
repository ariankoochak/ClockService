import React from "react";
import notFoundTicketsImageSrc from "../../assets/images/notFoundTicket.png";
export default function ZeroTicket() {
    return (
        <>
            <div className="zero-ticket">
                <img src={notFoundTicketsImageSrc} alt="not found ticket" />
                <h2>شما هیچ تیکتی ندارید</h2>
            </div>
        </>
    );
}

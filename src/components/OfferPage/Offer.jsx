import React, { useState } from "react";
import {Button} from "flowbite-react";
import ModalOffer from "./Modal_Offer"



const Timelineitem = () => {
  const [showModal , setShowModal] = useState(false);

  return (
    <div>
      <Button className="bg-pallate-Third w-full hover:bg-pallate-Third text-4xl" onClick={ () => setShowModal(true)}>
            Create Card
      </Button>
      <ModalOffer isVisible={showModal} onClose={() => setShowModal(false)}/>

    </div>
  );
};

export default Timelineitem;

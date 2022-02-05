import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoCardOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

const pros = [
  {
    name: "Free Shipping",
    description: "Orders over $99",
    icon: <IoPaperPlaneOutline />,
    id: 1,
  },
  {
    name: "30 days return",
    description: "If goods have problem",
    icon: <FiRefreshCcw />,
    id: 2,
  },
  {
    name: "Secure payment",
    description: "100% secure payment",
    icon: <IoCardOutline />,
    id: 3,
  },
  {
    name: "24h Support",
    description: "Dedicated Support",
    icon: <IoPersonOutline />,
    id: 4,
  },
];

export default pros;

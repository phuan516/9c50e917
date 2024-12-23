import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";

const Detail = ({ callDetails, isDetailOpen, setIsDetailOpen }) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isDetailOpen ? 0 : "100%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        background: "white",
        zIndex: 1000,
      }}
    >
      <div style={{ padding: "20px" }}>
        <button
          className="back-icon"
          onClick={() => {
            setIsDetailOpen(false);
          }}
        >
          <BiArrowBack size={20} />
        </button>
        <section>
          <h3>Call Details</h3>
          <p>
            Direction: <span>{callDetails?.direction}</span>
          </p>
          <p>
            From: <span>{callDetails?.from}</span>
          </p>
          <p>
            To: <span>{callDetails?.to}</span>
          </p>
          <p>
            Via: <span>{callDetails?.via}</span>
          </p>
        </section>
        <section>
          <h3>Call Status</h3>
          <p>
            Type: <span>{callDetails?.call_type}</span>
          </p>
          <p>
            Duration: <span>{callDetails?.duration} seconds</span>
          </p>
          <p>
            Archived: <span>{callDetails?.is_archived ? "Yes" : "No"}</span>
          </p>
        </section>
        <section>
          <h3>Metadata</h3>
          <p>
            Call ID: <span>{callDetails?.id}</span>
          </p>
          <p>
            Created:{" "}
            <span>{new Date(callDetails?.created_at).toLocaleString()}</span>
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Detail;

import React, { useEffect } from "react";
import styles from "./index.module.css";
import { UserInformationProps } from "@/consts/interfaces";
import Image from "next/image";
import ProfileImage from "../../../../public/Profile_avatar_placeholder_large.png";

interface UserDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: UserInformationProps;
}

  // We have three methods of closing the modal:
  // - Clicking the close button
  // - Clicking outside the modal
  // - Pressing Escape on our keyboard; for which we add an event handler (which we remove when the component unmounts)
const UserDetails: React.FC<UserDetailsProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.userDetailsModalOverlay} onClick={onClose}>
      <div
        className={styles.userDetailsModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.userDetailsModalHeaderSection}>
          <Image
            className={styles.userDetailsModalUserAvatar}
            src={ProfileImage}
            width={50}
            height={50}
            alt="User Avatar"
          />
          <h2 className={styles.userDetailsModalContentUserName}>
            {data.name}
          </h2>
          <a
            href={`https://${data.website}`}
            target="_blank"
            className={styles.userDetailsModalContentUserWebsite}
          >
            {data.website}
          </a>
          <hr className={styles.userDetailsModalDivider} />
        </div>

        <div className={styles.userDetailsModalBodySection}>
          <h3 className={styles.userDetailsModalContentSectionTitle}>
            Contact Details
          </h3>
          <p className={styles.userDetailsModalContentSectionInfo}>
            <a href={`mailto:${data.email}`}>
              Email: <b>{data.email}</b>{" "}
            </a>
          </p>
          <p className={styles.userDetailsModalContentSectionInfo}>
            <a href={`tel:${data.phone}`}>
              Phone: <b>{data.phone}</b>
            </a>
          </p>
          <p className={styles.userDetailsModalContentSectionInfo}>
            Username: <b>{data.username}</b>
          </p>

          <h3 className={styles.userDetailsModalContentSectionTitle}>
            Company{": "}{data.company.name}
          </h3>
          <p className={styles.userDetailsModalContentSectionInfo}>
            Summary: {data.company.bs}
          </p>
          <p className={styles.userDetailsModalContentSectionInfo}>
            Motto:{" "}
            <span className={styles.userDetailsModalContentSectionInfoQuote}>
              &apos;{data.company.catchPhrase}&apos;
            </span>
          </p>

          <h3 className={styles.userDetailsModalContentSectionTitle}>
            Address
          </h3>
          <p className={styles.userDetailsModalContentSectionInfo}>
            {`${data.address.suite} ${data.address.street}, ${data.address.city}`}
          </p>
          <p className={styles.userDetailsModalContentSectionInfo}>
            {data.address.zipcode}
          </p>
          <p
            className={styles.userDetailsModalContentSectionInfoSmallText}
          >{`${data.address.geo.lat}, ${data.address.geo.lng}`}</p>
          <button
            className={styles.userDetailsModalCloseButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

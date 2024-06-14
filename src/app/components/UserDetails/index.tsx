import React, { ReactNode, useEffect } from 'react';
import styles from "./index.module.css";
import { UserInformationProps } from '@/consts/interfaces';

interface UserDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: UserInformationProps;
}

const UserDetails: React.FC<UserDetailsProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.userDetailsModalOverlay} onClick={onClose}>
      <div className={styles.userDetailsModalContent} onClick={e => e.stopPropagation()}>
        <h2>{data.name}</h2>

        <h3>Contact details</h3>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>

        <h3>Web</h3>
        <p>Username: {data.username}</p>
        <p>Website: {data.website}</p>

        <h3>Company</h3>
        <p>{data.company.name}</p>
        <p>Summary: {data.company.bs}</p>
        <p>{data.company.catchPhrase}</p>

        <h3>Address</h3>
        <p>{`${data.address.suite} ${data.address.street}, ${data.address.city}, ${data.address.zipcode}`}</p>
        <p>{`${data.address.geo.lat}, ${data.address.geo.lng}`}</p>
        <button className={styles.userDetailsModalCloseButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetails;

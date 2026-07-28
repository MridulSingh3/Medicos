import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  // Support both 'doctors' and legacy 'docters' typo variable names safely
  const contextData = useContext(AdminContext);
  const doctorsList = contextData.doctors || contextData.docters || [];
  const { aToken, getAllDocters, getAllDoctors, changeAvailablity } = contextData;

  useEffect(() => {
    if (aToken) {
      // Call whichever function is defined in context
      if (getAllDoctors) getAllDoctors();
      else if (getAllDocters) getAllDocters();
    }
  }, [aToken]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        All Doctors
      </h1>

      <div style={styles.grid}>
        {doctorsList.map((item) => (
          <div key={item._id} style={styles.card} className="doctor-card">
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.info}>
              <h2 style={styles.name}>{item.name}</h2>
              <p style={styles.speciality}>{item.speciality}</p>

              <div style={styles.availabilityGroup}>
                <input
                  type="checkbox"
                  id={`avail-${item._id}`}
                  checked={item.available}
                  onChange={() => changeAvailablity(item._id)}
                  style={{ cursor: 'pointer' }}
                />
                <label
                  htmlFor={`avail-${item._id}`}
                  style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                >
                  Available
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .doctor-card {
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
        }

        .doctor-card:hover {
          background-color: #007bff;
          color: white;
          transform: translateY(-2px);
        }

        .doctor-card:hover h2,
        .doctor-card:hover p,
        .doctor-card:hover label {
          color: white;
        }

        @media (max-width: 768px) {
          .doctor-card {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .doctor-card {
            width: 100%;
          }

          .doctor-card img {
            height: 150px !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    padding: '1rem',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  info: {
    marginTop: '1rem',
  },
  name: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
  },
  speciality: {
    color: '#555',
    marginBottom: '0.5rem',
  },
  availabilityGroup: {
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default DoctorsList;